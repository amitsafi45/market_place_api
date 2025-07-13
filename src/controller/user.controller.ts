import { Controller, Get, Post, Param } from "@nestjs/common";

@Controller('/users')
export class UserController {
  @Post('/register')
  async register() {
  }

  @Post('/login')
  async login() {
  }

  
}
