import { ApiHideProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';

export class SingleEntityResponseDto<T, M extends BaseModel<T>> {
  @ApiHideProperty()
  data: T;

  constructor(model: M) {
    this.data = model.toEntity();
  }
}
