import { UserRegisterDTO } from "@/dto/user.dto";
import { Controller, Get, Post, Param, Body, HttpStatus } from "@nestjs/common";

@Controller('/users')
export class UserController {
  @Post('/register')
  async register(@Body()data:UserRegisterDTO) {
    console.log("herhehrehr")
    return {
      success:true,
      statusCode:HttpStatus.CREATED,
      message:"Data recevied",
      data:data 
    }
  }

  @Post('/login')
  async login() {
  }

  
}
