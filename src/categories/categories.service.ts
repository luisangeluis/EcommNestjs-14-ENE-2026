import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Category from 'src/database/models/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryModel: typeof Category,
  ) {}

  async findAll() {
    return await this.categoryModel.findAll();
  }
}
