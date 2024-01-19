import { Test, TestingModule } from '@nestjs/testing';
import { PlanningPokerService } from './planning-poker.service';

describe('PlanningPokerService', () => {
  let service: PlanningPokerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanningPokerService],
    }).compile();

    service = module.get<PlanningPokerService>(PlanningPokerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
