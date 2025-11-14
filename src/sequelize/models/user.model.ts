import { Optional } from 'sequelize';
import {
  AllowNull,
  Column,
  PrimaryKey,
  Model,
  Table,
  IsEmail,
  Default,
  DataType,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import Product from './product.model';

export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

@Table
export default class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id!: string;

  @AllowNull(false)
  @Column
  firstName!: string;

  @AllowNull(false)
  @Column
  lastName!: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @AllowNull(false)
  @Default(true)
  @Column
  isActive: boolean;

  @HasMany(() => Product)
  products: Product[];
}
