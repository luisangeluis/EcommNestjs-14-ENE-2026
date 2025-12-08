import { Injectable } from '@nestjs/common';
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
    const { categoryIds, ...productData } = createProductDto;

    const product = await this.productModel.create({
      ...productData,
      userId,
    });

    if (categoryIds?.length) {
      await product.$set('categories', categoryIds);
    }

    return await this.productModel.findByPk(product.id, {
      include: ['categories'],
    });
  }

  async findAll(page: number = 1, search?: string, limit: number = 20) {
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
      order: [['createdAt', 'DESC']], // optioal
      include: ['categories'],
    });

    return pagination.response(rows, count);
  }

  async findMeAll(userId: string) {
    return await `return all products with userId ${userId}`;
  }

  findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
