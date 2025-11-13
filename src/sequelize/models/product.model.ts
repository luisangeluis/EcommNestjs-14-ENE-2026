import { Optional } from 'sequelize';
import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export interface ProductAttributes {
  id: string;
  title: string;
  description?: string;
  price: string;
  userId: string;
}

export interface ProductCreationAttributes
  extends Optional<ProductAttributes, 'id'> {}

@Table
export default class Produc extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id!: string;

  @AllowNull(false)
  @Column
  title!: string;

  @AllowNull(true)
  @Column
  description!: string;

  @AllowNull(false)
  @Column
  price!: string;

  @AllowNull(false)
  @Column
  userId!: string;
}
