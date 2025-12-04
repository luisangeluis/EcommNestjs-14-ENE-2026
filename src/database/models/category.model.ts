import { Optional } from 'sequelize';
import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import ProductCategory from './product-category.model';
import Product from './product.model';

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

  @BelongsToMany(() => Product, () => ProductCategory)
  products!: Category[];
}
