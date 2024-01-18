import { Test, TestingModule } from '@nestjs/testing';
import { RoundActionController } from './round-action.controller';

describe('RoundActionController', () => {
  let controller: RoundActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoundActionController],
    }).compile();

    controller = module.get<RoundActionController>(RoundActionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
