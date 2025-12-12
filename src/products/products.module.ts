import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import Product from 'src/database/models/product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import Category from 'src/database/models/category.model';
import ProductCategory from 'src/database/models/product-category.model';
import CartItem from 'src/database/models/cartItem.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Category, ProductCategory, CartItem]),
  ],
  exports: [ProductsService],

  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
