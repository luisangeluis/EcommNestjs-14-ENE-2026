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

export interface CategoryAttributes {
  id: string;
  name: string;
}

export interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'id'> {}

@Table
export default class Category extends Model<
  CategoryAttributes,
  CategoryCreationAttributes
> {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column
  id!: string;

  @AllowNull(false)
  @Column
  name!: string;
}
