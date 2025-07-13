import { Controller, Get, Post } from "@nestjs/common";

@Controller('/users')
export class UserController{
     @Post('/register')
     async  register() {
      
     }

     @Post('/login')
     async login(){

     }

     @Get('/product/list')
     async listOfProduct(){

     }
     
}