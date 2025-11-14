import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import Product from 'src/sequelize/models/product.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  exports: [ProductsService],

  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
