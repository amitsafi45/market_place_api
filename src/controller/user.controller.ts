import { UserRegisterDTO } from "@/dto/user.dto";
import { UserService } from "@/service/user.service";
import * as bcrypt from 'bcrypt';
import { Controller, Get, Post, Param, Body, HttpStatus } from "@nestjs/common";

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  @Post('/register')
  async register(@Body()data:UserRegisterDTO) {
    const checkIsUserExist=await this.userService.getUserByEmail(data.email)
    if(checkIsUserExist){
      return {
        success: false,
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        message: 'Account with this email already exists.',
      };
    }
     const hashedPassword = await bcrypt.hash(data.password, 10);
     data.password=hashedPassword
    await this.userService.createUser(data)
    return {
      success:true,
      statusCode:HttpStatus.CREATED,
      message:"Account created Successfully",
    }
  }

  @Post('/login')
  async login() {
  }

  
}
