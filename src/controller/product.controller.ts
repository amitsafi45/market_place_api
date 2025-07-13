import { CreateProductDTO } from "@/dto/product.dto";
import { Authentication } from "@/middleware/authentication.middleware";
import { Authorization } from "@/middleware/authorization.middleware";
import { ProductService } from "@/service/product.service";
import { Role } from "@/utils/role.decorator";
import { User } from "@/utils/user.decorator";
import { Controller, Get, Post, Param, Body, UseGuards, HttpStatus } from "@nestjs/common";

@Controller('/products')
export class ProductController {
   constructor(private readonly productService:ProductService){}

  @Get('/')
  async listOfProduct() {
  }

  @Get('/:productId')
  async productDetail(@Param('productId') productId: string) {
  }

  @Post('/')
  @Role('Seller')
  @UseGuards(Authentication,Authorization)
  async createProduct(@Body()data:CreateProductDTO, @User('sub') userId: string){
        const isProductExist=await this.productService.findProductByNameForSeller(data.name,userId)
         if(isProductExist){
           return {
               success:false,
               statusCode:HttpStatus.BAD_REQUEST,
               message:"Product already exist"
           }
         }
         await this.productService.createProduct(data,userId)
         return{
              success:true,
               statusCode:HttpStatus.CREATED,
               message:"Product created successfully"
         }
      }

  
}
