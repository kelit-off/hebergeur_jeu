import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import type { Request } from 'express';
import { StripeService } from './stripe.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import type { AuthUser } from '../../auth/decorators/current-user.decorator';

@Controller({ path: 'stripe', version: '1' })
export class StripeController {
  private readonly logger = new Logger(StripeController.name);

  constructor(private readonly stripeService: StripeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async checkout(
    @CurrentUser() user: AuthUser,
    @Body() body: CreateCheckoutDto,
  ) {
    return this.stripeService.createSubscriptionCheckout(
      user.id,
      body.gameSlug,
      body.serverName,
    );
  }

  @Post('webhook')
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    if (!req.rawBody || !signature) {
      throw new BadRequestException('Requête webhook invalide');
    }

    const event = this.stripeService.constructWebhookEvent(
      req.rawBody,
      signature,
    );
    try {
      await this.stripeService.handleWebhookEvent(event);
    } catch (error) {
      this.logger.error(
        `Traitement du webhook ${event.type} échoué: ${(error as Error).message}`,
      );
      throw error;
    }
    return { received: true };
  }
}
