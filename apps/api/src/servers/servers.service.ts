import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { PterodactylService } from '../pterodactyl/pterodactyl.service';
import { PowerActionDto } from './dto/power-action.dto';

@Injectable()
export class ServersService {
  private readonly logger = new Logger(ServersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly pterodactyl: PterodactylService,
  ) {}

  async findAllForUser(userId: string) {
    return this.prisma.server.findMany({
      where: { userId },
      include: { game: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async findOwnedServer(serverId: string, userId: string) {
    const server = await this.prisma.server.findUnique({
      where: { id: serverId },
      include: { game: true },
    });
    if (!server) {
      throw new NotFoundException('Serveur introuvable');
    }
    if (server.userId !== userId) {
      throw new ForbiddenException('Ce serveur ne vous appartient pas');
    }
    return server;
  }

  async findOne(serverId: string, userId: string) {
    const server = await this.findOwnedServer(serverId, userId);

    if (!server.pterodactylIdentifier) {
      return { ...server, resources: null };
    }

    try {
      const resources = await this.pterodactyl.getServerResources(
        server.pterodactylIdentifier,
      );
      return { ...server, resources };
    } catch (error) {
      this.logger.warn(
        `Impossible de récupérer les ressources Pterodactyl du serveur ${server.id}: ${(error as Error).message}`,
      );
      return { ...server, resources: null };
    }
  }

  async powerAction(serverId: string, userId: string, dto: PowerActionDto) {
    const server = await this.findOwnedServer(serverId, userId);

    if (!server.pterodactylIdentifier) {
      throw new NotFoundException(
        "Ce serveur n'est pas encore provisionné sur le panel Pterodactyl",
      );
    }

    await this.pterodactyl.sendPowerAction(
      server.pterodactylIdentifier,
      dto.signal,
    );
    return { message: `Signal "${dto.signal}" envoyé` };
  }
}
