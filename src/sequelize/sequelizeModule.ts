import { SequelizeModule } from '@nestjs/sequelize';

export const sequelizeModule = SequelizeModule.forRoot({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  models: [],
});
