import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Category from 'src/database/models/category.model';

@Injectable()
export class CategoriesExistPipe implements PipeTransform {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  async transform(value: string[]) {
    if (!Array.isArray(value)) {
      throw new BadRequestException('categoryIds must be an array of numbers');
    }

    const found = await this.categoryModel.findAll({
      where: { id: value },
    });

    if (found.length !== value.length) {
      const foundIds = found.map((c) => c.id);
      const missing = value.filter((id) => !foundIds.includes(id));

      throw new BadRequestException(
        `These categories do not exist: ${missing.join(', ')}`,
      );
    }

    return value;
  }
}
