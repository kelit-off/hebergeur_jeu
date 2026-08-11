import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { computeMonthlyPrice } from './pricing.util';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const games = await this.prisma.game.findManyOrThrow({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
    return games.map((game) => ({
      ...game,
      monthlyPrice: computeMonthlyPrice(game),
    }));
  }

  async findBySlug(slug: string) {
    const game = await this.prisma.game.findUnique({ where: { slug } });
    if (!game || !game.isActive) {
      throw new NotFoundException('Jeu introuvable');
    }
    return { ...game, monthlyPrice: computeMonthlyPrice(game) };
  }
}
