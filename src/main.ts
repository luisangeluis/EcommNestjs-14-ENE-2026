import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //DTO's
  app.useGlobalPipes(
    new ValidationPipe({
      // strips out properties not in the DTO
      whitelist: true,
    }),
  );

  //SEQUELIZE
  const sequelize = app.get(Sequelize);
  const isDev = process.env.NODE_ENV !== 'production';

  //SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Ecommerce Nest')
    .setDescription('Ecommerce with Nestjs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}

bootstrap();
