import { Optional } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { extensions } from 'sequelize/types/utils/validator-extras';
import { OrderStatus } from 'src/orders/enums/order-status.enum';

export interface OrderAttributes {
  id: string;
  userId: string;
  subtotal: number;
  status: string;
}

export interface OrderCreationAttributes extends Optional<
  OrderAttributes,
  'id'
> {}

@Table
export default class Order extends Model<
  OrderAttributes,
  OrderCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id!: string;

  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  userId!: string;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  subtotal!: number;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    defaultValue: OrderStatus.PENDING,
  })
  status!: OrderStatus;
}
