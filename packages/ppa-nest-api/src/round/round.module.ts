import { Module } from '@nestjs/common';
import { RoundController } from './round.controller';
import { RoundService } from './round.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoundModel } from './round.model';

@Module({
  imports: [SequelizeModule.forFeature([RoundModel])],
  controllers: [RoundController],
  providers: [RoundService],
  exports: [RoundService],
})
export class RoundModule {}
