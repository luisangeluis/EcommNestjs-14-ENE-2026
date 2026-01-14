import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumberString, IsOptional, Min } from 'class-validator';

export class FindProductsQueryDto {
  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page: number;

  @ApiPropertyOptional({
    description: 'Product to search',
    example: 'phone',
    default: '',
  })
  @IsOptional()
  search?: string;
}
