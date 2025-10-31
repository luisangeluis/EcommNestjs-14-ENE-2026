import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // strips out properties not in the DTO
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
