import { Optional } from 'sequelize';
import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Product from './product.model';
import Category from './category.model';

export interface ProductCategoryAttributes {
  id: string;
  productId: string;
  categoryId: string;
}

export interface ProductCategoryCreationAttributes
  extends Optional<ProductCategoryAttributes, 'id'> {}

@Table
export default class ProductCategory extends Model<
  ProductCategoryAttributes,
  ProductCategoryCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id!: string;

  @ForeignKey(() => Product)
  @Column
  productId!: string;

  @ForeignKey(() => Category)
  @Column
  categoryId!: string;
}
