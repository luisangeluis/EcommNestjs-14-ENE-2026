import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, Min } from 'class-validator';

export class FindProductsQueryDto {
  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
  })
  @IsOptional()
  @IsNumberString() // only allow numbers
  @Min(1)
  page?: string;

  @ApiPropertyOptional({
    description: 'Product to search',
    example: 'phone',
    default: '',
  })
  @IsOptional()
  search?: string;
}
