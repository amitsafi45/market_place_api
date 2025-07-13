import { Type } from 'class-transformer';
import { ValidateNested, ArrayMinSize } from 'class-validator';
import { CreateOrderItemDTO } from './orderItem.dto';

export class CreateOrderDTO {
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
  @ArrayMinSize(1, { message: 'At least one order item is required' })
  items: CreateOrderItemDTO[];
}
