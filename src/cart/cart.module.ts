import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Cart from 'src/database/models/cart.model';
import Product from 'src/database/models/product.model';
import CartItem from 'src/database/models/cartItem.model';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [SequelizeModule.forFeature([Cart, CartItem, Product])],
})
export class CartModule {}
