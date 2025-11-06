import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getSequelizeConfig } from './sequelize/sequelize.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { Sequelize } from 'sequelize-typescript';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.dev.env',
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getSequelizeConfig,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private sequelize: Sequelize) {}
  // async onModuleInit() {
  //   // ⚠️ ¡Esto eliminará TODAS las tablas y las recreará!
  //   await this.sequelize.sync({ force: true });
  //   console.log('🔥 Base de datos recreada desde los modelos');
  // }
}
