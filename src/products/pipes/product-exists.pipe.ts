import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Product from 'src/database/models/product.model';

export class ProductExistsPipe {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async transform(value: string) {
    if (typeof value !== 'string')
      throw new BadRequestException('productId must be an string');

    const product = await this.productModel.findByPk(value);

    if (!product)
      throw new BadRequestException(`Product with id: ${value} does not exist`);

    return value;
  }
}
