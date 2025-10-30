import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { sequelizeModule } from './sequelize/sequelizeModule';

@Module({
  imports: [sequelizeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
