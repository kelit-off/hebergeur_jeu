import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { PterodactylModule } from '../../pterodactyl/pterodactyl.module';
import { DiscordModule } from '../../discord/discord.module';

@Module({
  imports: [PterodactylModule, DiscordModule],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
