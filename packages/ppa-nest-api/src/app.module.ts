import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DATABASE_CONFIG } from './database/database.config';
import { SharedModule } from './shared.module';

@Module({
  imports: [SequelizeModule.forRoot(DATABASE_CONFIG), SharedModule],
})
export class AppModule {}
