import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // strips out properties not in the DTO
      whitelist: true,
    }),
  );

  const sequelize = app.get(Sequelize);

  const isDev = process.env.NODE_ENV !== 'production';
  await sequelize.sync({ force: isDev });

  await app.listen(3000);
}

bootstrap();
