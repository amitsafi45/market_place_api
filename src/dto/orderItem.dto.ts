import { IsNotEmpty, IsString, IsUUID, IsNumber, Min } from 'class-validator';

export class CreateOrderItemDTO {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
  stock: any;
}
