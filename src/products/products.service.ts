import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import Product from 'src/database/models/product.model';
import { Op } from 'sequelize';
import { Pagination } from 'src/common/utils/pagination.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto, userId: string) {
    console.log('userId', userId);

    const { categoryIds, ...productData } = createProductDto;

    const product = await this.productModel.create({
      ...productData,
      userId,
    });

    if (categoryIds?.length) {
      await product.$set('categories', categoryIds);
    }

    return await this.productModel.findByPk(product.id, {
      include: [
        {
          association: 'categories',
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });
  }

  async findAll(page: number = 1, search: string = '', limit: number = 20) {
    const pagination = new Pagination(limit, page);
    const where: any = {};

    if (search && search.trim() !== '') {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    const { rows, count } = await this.productModel.findAndCountAll({
      ...pagination.options,
      where,
      order: [['createdAt', 'DESC']], // optional
      include: ['categories'],
    });

    return {
      ...pagination.response(count),
      rows,
    };
  }

  async findMyProducts(userId: string) {
    return await this.productModel.findAll({ where: { userId } });
  }

  async findOne(id: string) {
    return await this.productModel.findByPk(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto, userId: string) {
    const product = await this.productModel.findOne({ where: { id, userId } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await product.update(updateProductDto);

    return product;
  }

  async remove(userId: string, productId: string) {
    return await this.productModel.destroy({
      where: { userId, id: productId },
    });
  }
}
