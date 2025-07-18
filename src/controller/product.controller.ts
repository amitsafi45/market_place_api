import { CreateProductDTO, ProductQueryDTO } from '@/dto/product.dto';
import { Authentication } from '@/middleware/authentication.middleware';
import { Authorization } from '@/middleware/authorization.middleware';
import { ProductService } from '@/service/product.service';
import { Role } from '@/utils/role.decorator';
import { User } from '@/utils/user.decorator';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  HttpStatus,
  Query,
  BadRequestException,
} from '@nestjs/common';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async listOfProduct(@Query() query: ProductQueryDTO) {
    const products = await this.productService.findAllProducts(query);
    return {
      success: true,
      statusCode: 200,
      message: 'Product list fetched successfully',
      data: products,
    };
  }

  @Post('/')
  @Role('Seller')
  @UseGuards(Authentication, Authorization)
  async createProduct(
    @Body() data: CreateProductDTO,
    @User('sub') userId: string,
  ) {
    const isProductExist = await this.productService.findProductByNameForSeller(
      data.name,
      userId,
    );
    if (isProductExist) {
      throw new BadRequestException('Product already exists');
    }
    await this.productService.createProduct(data, userId);
    return {
      success: true,
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
    };
  }
  @Get('/seller-product-list')
  @Role('Seller')
  @UseGuards(Authentication, Authorization)
  async productOfSeller(
    @User('sub') userId: string,
  ) {
     const data=await this.productService.getSellerProducts(userId)
     return {
      success: true,
      statusCode: HttpStatus.ACCEPTED,
      message: 'Product Fetched successfully',
      data:data
    };
  }
}
