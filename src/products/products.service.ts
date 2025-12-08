import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import Product from 'src/database/models/product.model';
import { Op } from 'sequelize';

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

  async findAll(page: number = 1, search?: string) {
    const limit = 20;
    const currentPage = page > 0 ? page : 1;
    const offset = (currentPage - 1) * limit;
    const where: any = {};

    if (search && search.trim() !== '') {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    const { rows, count } = await this.productModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']], // optioal
    });

    return {
      total: count,
      page: currentPage,
      limit,
      totalPages: Math.ceil(count / limit),
      data: rows,
    };
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
