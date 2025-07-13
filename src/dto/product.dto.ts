import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  ValidateIf,
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






export class ProductQueryDTO {
  @IsNotEmpty()
  @IsNumberString({}, { message: 'Page must be a number string' })
  page: string;

  @IsNotEmpty()
  @IsNumberString({}, { message: 'Limit must be a number string' })
  limit: string;

  @Transform(({ value }) => (value === '' || value === 'undefined' ? undefined : value))
  @ValidateIf((_, value) => value !== undefined)
  @IsNumberString({}, { message: 'minPrice must be a number string' })
  @IsOptional()
  minPrice?: string;

  @Transform(({ value }) => (value === '' || value === 'undefined' ? undefined : value))
  @ValidateIf((_, value) => value !== undefined)
  @IsNumberString({}, { message: 'maxPrice must be a number string' })
  @IsOptional()
  maxPrice?: string;

  @Transform(({ value }) => (value === '' || value === 'undefined' ? undefined : value))
  @ValidateIf((_, value) => value !== undefined)
  @IsUUID('all', { message: 'Invalid sellerId format' })
  @IsOptional()
  sellerId?: string;
}