import { IsNumberString, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  title!: string;
  description!: string;
  price!: number;
}
