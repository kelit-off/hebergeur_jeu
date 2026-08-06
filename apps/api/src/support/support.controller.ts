import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'support/tickets', version: '1' })
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.supportService.findAllForUser(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.supportService.findOne(id, user.id);
  }

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() body: CreateTicketDto) {
    return this.supportService.create(user.id, body);
  }

  @Post(':id/messages')
  addMessage(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
    @Body() body: CreateMessageDto,
  ) {
    return this.supportService.addMessage(id, user.id, body);
  }
}
