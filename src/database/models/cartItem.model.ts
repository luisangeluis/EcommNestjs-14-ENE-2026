import { Optional } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import Cart, { CartAttributes } from './cart.model';
import Product from './product.model';

export interface CartItemAttributes {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  subtotal: number;
}

export interface CartItemCreationAttributes extends Optional<
  CartItemAttributes,
  'id'
> {}

@Table
export default class CartItem extends Model<
  CartItemAttributes,
  CartItemCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id!: string;

  @ForeignKey(() => Cart)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  cartId!: string;

  @AllowNull(false)
  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID,
  })
  productId!: string;

  @Default(1)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  quantity!: number;

  // @AllowNull(false)
  // @Column({
  //   type: DataType.DECIMAL(10, 2),
  // })
  // subtotal!: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @BelongsTo(() => Product)
  product: Product;
}
