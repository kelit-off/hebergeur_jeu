import { Controller, Get, Param } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller({ path: 'games', version: '1' })
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.gamesService.findBySlug(slug);
  }
}
