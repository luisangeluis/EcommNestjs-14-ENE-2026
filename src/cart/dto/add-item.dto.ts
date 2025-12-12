import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from 'class-validator';

export class AddItemDto {
  @IsUUID()
  @IsNotEmpty()
  productId!: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  quantity!: number;
}
