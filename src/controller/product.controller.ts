import { CreateProductDTO } from "@/dto/product.dto";
import { Controller, Get, Post, Param, Body } from "@nestjs/common";

@Controller('/products')
export class ProductController {


  @Get('/')
  async listOfProduct() {
  }

  @Get('/:productId')
  async productDetail(@Param('productId') productId: string) {
  }

  @Post('/')
  async createProduct(@Body()data:CreateProductDTO){
   
  }

  
}
