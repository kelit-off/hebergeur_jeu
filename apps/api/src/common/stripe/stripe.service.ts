import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { ServerStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PterodactylService } from '../../pterodactyl/pterodactyl.service';
import { DiscordService } from '../../discord/discord.service';
import { computeMonthlyPrice } from '../../games/pricing.util';

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private readonly stripe: Stripe;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly pterodactyl: PterodactylService,
    private readonly discord: DiscordService,
  ) {
    const secretKey = this.config.get<string>('STRIPE_SECRET_KEY');
    if (!secretKey) {
      this.logger.warn(
        "STRIPE_SECRET_KEY non configuré — les appels Stripe échoueront tant que la clé n'est pas fournie",
      );
    }
    // Une clé placeholder permet au SDK de s'instancier ; le premier appel réel
    // échouera bruyamment (401 Stripe) si la vraie clé n'a pas été configurée.
    this.stripe = new Stripe(secretKey || 'sk_test_not_configured');
  }

  private async getOrCreateCustomer(user: {
    id: string;
    email: string;
    stripeCustomerId: string | null;
  }): Promise<string> {
    if (user.stripeCustomerId) {
      return user.stripeCustomerId;
    }

    const customer = await this.stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });

    return customer.id;
  }

  private async getOrCreatePriceForGame(game: {
    id: string;
    name: string;
    stripePriceId: string | null;
    ramMinGo: number;
    cpuMinCores: number;
    diskMinGo: number;
    prix_unitaire_ram: number;
    prix_unitaire_cpu: number;
    prix_unitaire_disk: number;
  }): Promise<string> {
    if (game.stripePriceId) {
      return game.stripePriceId;
    }

    const monthlyPrice = computeMonthlyPrice(game);
    const product = await this.stripe.products.create({ name: game.name });
    const price = await this.stripe.prices.create({
      product: product.id,
      currency: 'eur',
      unit_amount: Math.round(monthlyPrice * 100),
      recurring: { interval: 'month' },
    });

    await this.prisma.game.update({
      where: { id: game.id },
      data: { stripePriceId: price.id },
    });

    return price.id;
  }

  async createSubscriptionCheckout(
    userId: string,
    gameSlug: string,
    serverName: string,
  ) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
    const game = await this.prisma.game.findUnique({
      where: { slug: gameSlug },
    });
    if (!game || !game.isActive) {
      throw new NotFoundException('Jeu introuvable');
    }

    const customerId = await this.getOrCreateCustomer(user);
    const priceId = await this.getOrCreatePriceForGame(game);

    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: { userId: user.id, gameId: game.id, serverName },
    });

    const latestInvoice = subscription.latest_invoice as Stripe.Invoice & {
      payment_intent?: Stripe.PaymentIntent;
    };
    const clientSecret = latestInvoice?.payment_intent?.client_secret;
    if (!clientSecret) {
      throw new BadRequestException(
        "Impossible d'initialiser le paiement pour cet abonnement",
      );
    }

    return { clientSecret, subscriptionId: subscription.id };
  }

  constructWebhookEvent(rawBody: Buffer, signature: string): Stripe.Event {
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      throw new BadRequestException('STRIPE_WEBHOOK_SECRET non configuré');
    }
    return this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    );
  }

  async handleWebhookEvent(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'invoice.paid':
        await this.handleInvoicePaid(event.data.object);
        break;
      case 'invoice.payment_failed':
        await this.handleInvoicePaymentFailed(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object);
        break;
      default:
        this.logger.debug(`Événement Stripe ignoré: ${event.type}`);
    }
  }

  private async handleInvoicePaid(invoice: Stripe.Invoice): Promise<void> {
    const subscriptionId =
      typeof invoice.parent?.subscription_details?.subscription === 'string'
        ? invoice.parent.subscription_details.subscription
        : ((invoice as unknown as { subscription?: string }).subscription ??
          null);

    if (!subscriptionId) {
      this.logger.warn(
        `Facture ${invoice.id} sans abonnement associé, ignorée`,
      );
      return;
    }

    // Idempotence : une facture déjà connue ne doit pas être re-traitée.
    const existingInvoice = await this.prisma.invoice.findUnique({
      where: { stripeInvoiceId: invoice.id },
    });
    if (existingInvoice) {
      return;
    }

    const subscription =
      await this.stripe.subscriptions.retrieve(subscriptionId);
    const { userId, gameId, serverName } = subscription.metadata as {
      userId?: string;
      gameId?: string;
      serverName?: string;
    };
    if (!userId || !gameId) {
      this.logger.error(
        `Abonnement ${subscriptionId} sans métadonnées userId/gameId`,
      );
      return;
    }

    const [user, game] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.game.findUnique({ where: { id: gameId } }),
    ]);
    if (!user || !game) {
      this.logger.error(
        `Utilisateur ou jeu introuvable pour l'abonnement ${subscriptionId}`,
      );
      return;
    }

    const montant = (invoice.amount_paid ?? 0) / 100;

    // La facture est toujours écrite, même si le provisioning Pterodactyl échoue ensuite.
    try {
      await this.prisma.invoice.create({
        data: {
          userId: user.id,
          stripeInvoiceId: invoice.id,
          stripeSubscriptionId: subscriptionId,
          montant,
          statut: 'paid',
        },
      });
    } catch (error) {
      this.logger.error(
        `Échec de l'écriture de la facture ${invoice.id}: ${(error as Error).message}`,
      );
    }

    let server = await this.prisma.server.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (!server) {
      let pterodactylServerId: number | null = null;
      let pterodactylIdentifier: string | null = null;

      try {
        let pterodactylUserId = user.pterodactylUserId;
        if (!pterodactylUserId) {
          pterodactylUserId = await this.pterodactyl.getOrCreateUser(user);
          await this.prisma.user.update({
            where: { id: user.id },
            data: { pterodactylUserId },
          });
        }

        const created = await this.pterodactyl.createServer({
          name: serverName ?? `${game.name}-${user.id.slice(0, 6)}`,
          pterodactylUserId,
          eggId: game.eggId,
          nestId: game.nestId,
          nodeId: game.nodeId,
          dockerImage: game.dockerImage,
          startup: game.startup,
          environment: game.environment as Record<string, unknown>,
          ramGo: game.ramMinGo,
          cpuCores: game.cpuMinCores,
          diskGo: game.diskMinGo,
        });
        pterodactylServerId = created.id;
        pterodactylIdentifier = created.identifier;
      } catch (error) {
        this.logger.error(
          `Provisioning Pterodactyl échoué pour l'utilisateur ${user.email}: ${(error as Error).message}`,
        );
      }

      server = await this.prisma.server.create({
        data: {
          userId: user.id,
          gameId: game.id,
          name: serverName ?? `${game.name}-${user.id.slice(0, 6)}`,
          status: pterodactylServerId
            ? ServerStatus.RUNNING
            : ServerStatus.PENDING,
          ramGo: game.ramMinGo,
          cpuCores: game.cpuMinCores,
          diskGo: game.diskMinGo,
          prixMensuel: computeMonthlyPrice(game),
          stripeSubscriptionId: subscriptionId,
          pterodactylServerId,
          pterodactylIdentifier,
          expiresAt: addMonths(new Date(), 1),
        },
      });

      await this.discord.notifyServerProvisioned(server, user);
    } else {
      server = await this.prisma.server.update({
        where: { id: server.id },
        data: {
          status: ServerStatus.RUNNING,
          expiresAt: addMonths(
            server.expiresAt && server.expiresAt > new Date()
              ? server.expiresAt
              : new Date(),
            1,
          ),
        },
      });
    }

    await this.discord.notifyPaymentSucceeded(
      { montant, stripeInvoiceId: invoice.id },
      user,
    );
  }

  private async handleInvoicePaymentFailed(
    invoice: Stripe.Invoice,
  ): Promise<void> {
    const subscriptionId =
      typeof invoice.parent?.subscription_details?.subscription === 'string'
        ? invoice.parent.subscription_details.subscription
        : ((invoice as unknown as { subscription?: string }).subscription ??
          null);
    if (!subscriptionId) return;

    const server = await this.prisma.server.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      include: { user: true },
    });
    if (!server) return;

    await this.prisma.server.update({
      where: { id: server.id },
      data: { status: ServerStatus.SUSPENDED },
    });

    await this.discord.notifyPaymentFailed(
      { stripeInvoiceId: invoice.id },
      server.user,
    );
  }

  private async handleSubscriptionDeleted(
    subscription: Stripe.Subscription,
  ): Promise<void> {
    const server = await this.prisma.server.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });
    if (!server) return;

    if (server.pterodactylServerId) {
      try {
        await this.pterodactyl.deleteServer(server.pterodactylServerId);
      } catch (error) {
        this.logger.error(
          `Suppression Pterodactyl échouée pour le serveur ${server.id}: ${(error as Error).message}`,
        );
      }
    }

    await this.prisma.server.update({
      where: { id: server.id },
      data: { status: ServerStatus.DELETED },
    });
  }
}
