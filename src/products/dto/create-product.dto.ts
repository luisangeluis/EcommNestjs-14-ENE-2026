import { IsNumberString, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsNumberString()
  @Min(1)
  page?: string;

  @IsOptional()
  search?: string;
}
