import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const getSequelizeConfig = async (
  config: ConfigService,
): Promise<SequelizeModuleOptions> => {
  return {
    dialect: 'mysql',
    host: config.get<string>('DB_HOST') || 'localhost',
    port: config.get<number>('DB_PORT') || 3306,
    username: config.get<string>('DB_USER') || 'root',
    password: config.get<string>('DB_PASS') || '',
    database: config.get<string>('DB_NAME') || 'testdb',
    autoLoadModels: true,
    synchronize: false,
    // logging: true,
  };
};
