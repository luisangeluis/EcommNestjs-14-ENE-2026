import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title!: string;

  @MaxLength(500)
  @IsOptional()
  description?: string;

  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsArray()
  @IsString({ each: true })
  categoryIds!: string[];
}
