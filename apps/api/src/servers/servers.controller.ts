import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ServersService } from './servers.service';
import { PowerActionDto } from './dto/power-action.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'servers', version: '1' })
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.serversService.findAllForUser(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.serversService.findOne(id, user.id);
  }

  @Post(':id/power')
  powerAction(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
    @Body() body: PowerActionDto,
  ) {
    return this.serversService.powerAction(id, user.id, body);
  }
}
