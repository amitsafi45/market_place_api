import { UserRegisterDTO } from "@/dto/user.dto";
import { Controller, Get, Post, Param, Body } from "@nestjs/common";

@Controller('/users')
export class UserController {
  @Post('/register')
  async register(@Body('data')data:UserRegisterDTO) {
    return {
      success:true,
      message:"Data recevied",
      data:data 
    }
  }

  @Post('/login')
  async login() {
  }

  
}
