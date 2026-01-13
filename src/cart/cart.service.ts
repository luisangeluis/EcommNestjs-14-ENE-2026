import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import Cart from 'src/database/models/cart.model';
import { AddItemDto } from './dto/add-item.dto';
import CartItem from 'src/database/models/cartItem.model';
import Product from 'src/database/models/product.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private readonly cartModel: typeof Cart,
    @InjectModel(CartItem) private readonly cartItemModel: typeof CartItem,
  ) {}

  //Add product to Cart
  async addItem(userId: string, addItemDto: AddItemDto) {
    const { productId, quantity } = addItemDto;

    const [cart] = await this.cartModel.findOrCreate({
      where: { userId },
    });

    const cartItem = await this.cartItemModel.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      cartItem.quantity = quantity;

      await cartItem.save();

      return cartItem;
    }

    return await this.cartItemModel.create({
      cartId: cart.id,
      productId,
      quantity,
    });
  }

  //Find userCart
  async findOneByUserId(userId: string) {
    const [cart] = await this.cartModel.findOrCreate({
      where: { userId },
      defaults: { userId },
      attributes: ['id'],
      include: [
        {
          model: CartItem,
          attributes: ['id', 'quantity'],
          include: [
            {
              model: Product,
              attributes: ['id', 'title', 'price'],
            },
          ],
        },
      ],
    });

    return cart;
  }

  async removeItem(userId: string, cartItemId: string) {
    const cartItem = await this.cartItemModel.findOne({
      where: { id: cartItemId },
      include: [{ model: Cart, where: { userId } }],
    });

    if (!cartItem) {
      throw new NotFoundException('Item not found in your cart');
    }

    cartItem.destroy();

    return { message: 'Item removed from cart' };
  }

  //
  async cleanCart(userId: string) {
    const cart = await this.cartModel.findOne({
      where: { userId },
    });

    if (!cart) return 0;

    return await this.cartItemModel.destroy({
      where: { cartId: cart.id },
    });
  }
}
