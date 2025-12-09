import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'A new product',
    description: 'Product title',
  })
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'Product description',
    description: 'Product description',
  })
  @MaxLength(500)
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '300',
    description: 'Product price',
  })
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @ApiProperty({
    example: ['categoryId', 'anotherCategoryId'],
    description: 'Category id',
  })
  @ArrayMinSize(1)
  @IsArray()
  @IsString({ each: true })
  categoryIds!: string[];
}
