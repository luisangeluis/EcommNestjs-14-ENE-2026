import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import Cart from 'src/database/models/cart.model';
import { AddItemDto } from './dto/add-item.dto';
import CartItem from 'src/database/models/cartItem.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private readonly cartModel: typeof Cart,
    @InjectModel(CartItem) private readonly cartItemModel: typeof CartItem,
  ) {}

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

  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
