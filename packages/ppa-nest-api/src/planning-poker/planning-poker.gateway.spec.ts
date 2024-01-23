import { Test, TestingModule } from '@nestjs/testing';
import { PlanningPokerGateway } from './planning-poker.gateway';
import { PlanningPokerService } from './planning-poker.service';

describe('PlanningPokerGateway', () => {
  let gateway: PlanningPokerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanningPokerGateway, PlanningPokerService],
    }).compile();

    gateway = module.get<PlanningPokerGateway>(PlanningPokerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
