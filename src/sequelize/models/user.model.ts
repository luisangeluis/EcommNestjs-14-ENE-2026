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
} from 'sequelize-typescript';

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

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
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @AllowNull(false)
  @Default(true)
  @Column
  isActive: boolean;
}
