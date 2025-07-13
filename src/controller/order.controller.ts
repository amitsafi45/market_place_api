import { Controller, Get, Post, Param } from "@nestjs/common";

@Controller('/orders')
export class ProductController {

  @Post('')
  async createOrder() {
  }

  @Get('/')
  async orderList() {
  }

  @Get('/:orderId')
  async orderDetail(@Param('orderId') orderId: string) {
  }
}
