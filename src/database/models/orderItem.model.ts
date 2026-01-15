import { Model, Optional } from 'sequelize';

export interface OrderItemAttributes {
  id: string;
  orderId: string;
  productId: string;
  productTitle: string;
  price: string;
  quantity: number;
  total: number;
}

export interface OrderItemCreationAttributes extends Optional<
  OrderItemAttributes,
  'id'
> {}

export default class OrderItem extends Model<
  OrderItemAttributes,
  OrderItemCreationAttributes
> {}
