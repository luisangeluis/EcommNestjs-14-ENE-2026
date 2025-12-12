import { Optional } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './user.model';

export interface CartAttributes {
  id: string;
  userId: string;
  isActive: boolean;
}

export interface CartCreationAttributes
  extends Optional<CartAttributes, 'id'> {}

@Table
export default class Cart extends Model<
  CartAttributes,
  CartCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id!: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId!: string;

  @Default(false)
  @Column
  isActive?: boolean;

  @BelongsTo(() => User)
  user: User;
}
