import { ApiHideProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';

export class MultipleEntitiesResponseDto<T, M extends BaseModel<T>> {
  @ApiHideProperty()
  data: T[];

  constructor(models: M[]) {
    this.data = models.map((model) => model.toEntity());
  }
}
