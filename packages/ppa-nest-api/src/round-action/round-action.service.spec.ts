import { Test, TestingModule } from '@nestjs/testing';
import { RoundActionService } from './round-action.service';

describe('RoundActionService', () => {
  let service: RoundActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundActionService],
    }).compile();

    service = module.get<RoundActionService>(RoundActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
