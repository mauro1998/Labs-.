import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoundActionController } from './round-action.controller';
import { RoundActionModel } from './round-action.model';
import { RoundActionService } from './round-action.service';

@Module({
  imports: [SequelizeModule.forFeature([RoundActionModel])],
  controllers: [RoundActionController],
  providers: [RoundActionService],
  exports: [RoundActionService],
})
export class RoundActionModule {}
