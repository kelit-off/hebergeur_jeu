import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { DiscordService } from '../discord/discord.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class SupportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly discord: DiscordService,
  ) {}

  async findAllForUser(userId: string) {
    return this.prisma.supportTicket.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async findOwnedTicket(ticketId: string, userId: string) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id: ticketId },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
    if (!ticket) {
      throw new NotFoundException('Ticket introuvable');
    }
    if (ticket.userId !== userId) {
      throw new ForbiddenException('Ce ticket ne vous appartient pas');
    }
    return ticket;
  }

  async findOne(ticketId: string, userId: string) {
    return this.findOwnedTicket(ticketId, userId);
  }

  async create(userId: string, dto: CreateTicketDto) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const ticket = await this.prisma.supportTicket.create({
      data: {
        userId,
        subject: dto.subject,
        messages: { create: { body: dto.message, fromAdmin: false } },
      },
      include: { messages: true },
    });

    await this.discord.notifyNewTicket(ticket, user);

    return ticket;
  }

  async addMessage(ticketId: string, userId: string, dto: CreateMessageDto) {
    const ticket = await this.findOwnedTicket(ticketId, userId);
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const message = await this.prisma.supportMessage.create({
      data: { ticketId: ticket.id, body: dto.body, fromAdmin: false },
    });

    await this.discord.notifyNewTicket(
      { id: ticket.id, subject: `[Réponse] ${ticket.subject}` },
      user,
    );

    return message;
  }
}
