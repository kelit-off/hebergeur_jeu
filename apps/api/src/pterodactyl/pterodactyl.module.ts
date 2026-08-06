import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PterodactylService } from './pterodactyl.service';

@Module({
  imports: [HttpModule],
  providers: [PterodactylService],
  exports: [PterodactylService],
})
export class PterodactylModule {}
