import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Cart from 'src/database/models/cart.model';
import Product from 'src/database/models/product.model';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [SequelizeModule.forFeature([Cart, Product])],
})
export class CartModule {}
