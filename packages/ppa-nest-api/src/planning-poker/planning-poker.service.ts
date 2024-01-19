import { Injectable } from '@nestjs/common';

@Injectable()
export class PlanningPokerService {
  // create(createPlanningPokerDto: CreatePlanningPokerDto) {
  //   return 'This action adds a new planningPoker';
  // }

  findAll() {
    return `This action returns all planningPoker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planningPoker`;
  }

  // update(id: number, updatePlanningPokerDto: UpdatePlanningPokerDto) {
  //   return `This action updates a #${id} planningPoker`;
  // }

  remove(id: number) {
    return `This action removes a #${id} planningPoker`;
  }
}
