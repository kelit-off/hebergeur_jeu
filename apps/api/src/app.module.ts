import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StripeModule } from './common/stripe/stripe.module';
import { PterodactylModule } from './pterodactyl/pterodactyl.module';
import { DiscordModule } from './discord/discord.module';
import { GamesModule } from './games/games.module';
import { ServersModule } from './servers/servers.module';
import { SupportModule } from './support/support.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    StripeModule,
    PterodactylModule,
    DiscordModule,
    GamesModule,
    ServersModule,
    SupportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
