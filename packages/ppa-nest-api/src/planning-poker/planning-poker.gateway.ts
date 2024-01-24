import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { PlanningPokerService } from './planning-poker.service';

@WebSocketGateway()
export class PlanningPokerGateway {
  constructor(private readonly planningPokerService: PlanningPokerService) {}

  // @SubscribeMessage('createPlanningPoker')
  // create(@MessageBody() createPlanningPokerDto: CreatePlanningPokerDto) {
  //   return this.planningPokerService.create(createPlanningPokerDto);
  // }

  @SubscribeMessage('findAllPlanningPoker')
  findAll() {
    return this.planningPokerService.findAll();
  }

  @SubscribeMessage('findOnePlanningPoker')
  findOne(@MessageBody() id: number) {
    return this.planningPokerService.findOne(id);
  }

  // @SubscribeMessage('updatePlanningPoker')
  // update(@MessageBody() updatePlanningPokerDto: UpdatePlanningPokerDto) {
  //   return this.planningPokerService.update(
  //     updatePlanningPokerDto.id,
  //     updatePlanningPokerDto,
  //   );
  // }

  @SubscribeMessage('removePlanningPoker')
  remove(@MessageBody() id: number) {
    return this.planningPokerService.remove(id);
  }
}
