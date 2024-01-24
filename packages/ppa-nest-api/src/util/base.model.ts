import { Model } from 'sequelize-typescript';

export abstract class BaseModel<T> extends Model {
  public abstract toEntity(): T;
}
