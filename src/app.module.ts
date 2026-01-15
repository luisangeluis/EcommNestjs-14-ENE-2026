import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getSequelizeConfig } from './database/sequelize.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { Sequelize } from 'sequelize-typescript';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import configuration from './config/configuration';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './cart/cart.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.dev.env' : '.env',
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getSequelizeConfig,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 15,
        },
      ],
    }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  // constructor(private sequelize: Sequelize) {}
  // async onModuleInit() {
  //   // ⚠️ ¡Esto eliminará TODAS las tablas y las recreará!
  //   await this.sequelize.sync({ force: true });
  //   console.log('🔥 Base de datos recreada desde los modelos');
  // }
}
