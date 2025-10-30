import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const getSequelizeConfig = async (
  config: ConfigService,
): Promise<SequelizeModuleOptions> => {
  return {
    dialect: 'mysql',
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT'),
    username: config.get<string>('DB_USER'),
    password: config.get<string>('DB_PASS'),
    database: config.get<string>('DB_NAME'),
  };
};
