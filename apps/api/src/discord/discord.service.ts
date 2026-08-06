import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

interface DiscordEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

interface DiscordNotification {
  title: string;
  description?: string;
  color: number;
  fields?: DiscordEmbedField[];
}

const COLOR = {
  info: 0x5865f2,
  success: 0x2ecc71,
  warning: 0xf1c40f,
  danger: 0xe74c3c,
};

@Injectable()
export class DiscordService {
  private readonly logger = new Logger(DiscordService.name);

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private async notify(notification: DiscordNotification): Promise<void> {
    const webhookUrl = this.config.get<string>('DISCORD_WEBHOOK_URL');
    if (!webhookUrl) {
      this.logger.warn(
        `DISCORD_WEBHOOK_URL non configuré, notification ignorée: ${notification.title}`,
      );
      return;
    }

    try {
      await firstValueFrom(
        this.http.post(webhookUrl, {
          embeds: [
            {
              title: notification.title,
              description: notification.description,
              color: notification.color,
              fields: notification.fields,
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      );
    } catch (error) {
      // Une notification Discord manquée ne doit jamais casser le flux
      // principal (paiement, création de ticket, etc.).
      this.logger.error(
        `Échec de l'envoi de la notification Discord "${notification.title}": ${(error as Error).message}`,
      );
    }
  }

  notifyNewTicket(
    ticket: { id: string; subject: string },
    user: { email: string },
  ) {
    return this.notify({
      title: '🎫 Nouveau ticket de support',
      color: COLOR.info,
      fields: [
        { name: 'Sujet', value: ticket.subject },
        { name: 'Utilisateur', value: user.email, inline: true },
        { name: 'ID', value: ticket.id, inline: true },
      ],
    });
  }

  notifyPaymentSucceeded(
    invoice: { montant: number; stripeInvoiceId: string },
    user: { email: string },
  ) {
    return this.notify({
      title: '💳 Paiement réussi',
      color: COLOR.success,
      fields: [
        { name: 'Utilisateur', value: user.email, inline: true },
        { name: 'Montant', value: `${invoice.montant} €`, inline: true },
        { name: 'Facture Stripe', value: invoice.stripeInvoiceId },
      ],
    });
  }

  notifyPaymentFailed(
    invoice: { stripeInvoiceId: string },
    user: { email: string },
  ) {
    return this.notify({
      title: '⚠️ Échec de paiement',
      color: COLOR.danger,
      fields: [
        { name: 'Utilisateur', value: user.email, inline: true },
        { name: 'Facture Stripe', value: invoice.stripeInvoiceId },
      ],
    });
  }

  notifyServerProvisioned(server: { name: string }, user: { email: string }) {
    return this.notify({
      title: '🖥️ Serveur provisionné',
      color: COLOR.success,
      fields: [
        { name: 'Serveur', value: server.name, inline: true },
        { name: 'Utilisateur', value: user.email, inline: true },
      ],
    });
  }
}
