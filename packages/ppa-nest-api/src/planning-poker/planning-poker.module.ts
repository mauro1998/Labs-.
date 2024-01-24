import { Module } from '@nestjs/common';
import { PlanningPokerService } from './planning-poker.service';
import { PlanningPokerGateway } from './planning-poker.gateway';
import { SharedModule } from 'src/shared.module';

@Module({
  imports: [SharedModule],
  providers: [PlanningPokerGateway, PlanningPokerService],
})
export class PlanningPokerModule {}
