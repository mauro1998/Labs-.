import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const DATABASE_CONFIG: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: '.db/data.sqlite3',
  autoLoadModels: true,
  synchronize: true,
};
