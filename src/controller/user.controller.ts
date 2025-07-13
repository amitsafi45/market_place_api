import { Controller, Get, Post, Param } from "@nestjs/common";

@Controller()
export class UserController {
  @Post('/users/register')
  async register() {
  }

  @Post('/users/login')
  async login() {
  }

  @Get('/products')
  async listOfProduct() {
  }

  @Get('/products/:productId')
  async productDetail(@Param('productId') productId: string) {
  }

  @Post('/orders')
  async createOrder() {
  }

  @Get('/orders')
  async orderList() {
  }

  @Get('/orders/:orderId')
  async orderDetail(@Param('orderId') orderId: string) {
  }
}
