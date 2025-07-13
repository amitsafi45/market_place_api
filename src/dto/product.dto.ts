import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 150, { message: 'Product name must be between 2 and 150 characters' })
  name: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price is required' })
  price: number;

  @IsNumber({}, { message: 'Stock must be a number' })
  @IsNotEmpty({ message: 'Stock is required' })
  stock: number;

  @IsOptional()
  @IsString()
  @Length(0, 200, { message: 'Description can be up to 200 characters long' })
  description: string;
}
