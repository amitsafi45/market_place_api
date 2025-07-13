import { Controller, Get, Post, Param } from "@nestjs/common";

@Controller('/products')
export class ProductController {


  @Get('/')
  async listOfProduct() {
  }

  @Get('/:productId')
  async productDetail(@Param('productId') productId: string) {
  }

  @Post('/')
  async createProduct(){
   
  }

  
}
