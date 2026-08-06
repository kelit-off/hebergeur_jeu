import { Module } from '@nestjs/common';
import { ServersController } from './servers.controller';
import { ServersService } from './servers.service';
import { PterodactylModule } from '../pterodactyl/pterodactyl.module';

@Module({
  imports: [PterodactylModule],
  controllers: [ServersController],
  providers: [ServersService],
})
export class ServersModule {}
