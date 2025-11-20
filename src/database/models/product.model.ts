import { Optional } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './user.model';

export interface ProductAttributes {
  id: string;
  title: string;
  description?: string;
  price: number;
  userId: string;
}

export interface ProductCreationAttributes
  extends Optional<ProductAttributes, 'id'> {}

@Table
export default class Product extends Model<
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
  description?: string;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  price!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId!: string;

  @BelongsTo(() => User)
  user: User;
}
