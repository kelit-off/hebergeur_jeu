import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class PowerActionDto {
  @ApiProperty({ enum: ['start', 'stop', 'restart', 'kill'] })
  @IsIn(['start', 'stop', 'restart', 'kill'])
  signal: 'start' | 'stop' | 'restart' | 'kill';
}
