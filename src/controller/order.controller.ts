import { CreateOrderDTO } from "@/dto/order.dto";
import { Controller, Get, Post, Param, Body } from "@nestjs/common";

@Controller('/orders')
export class OrderController {

  @Post('')
  async createOrder(@Body()data:CreateOrderDTO) {
    
  }

  @Get('/')
  async orderList() {
  }

  @Get('/:orderId')
  async orderDetail(@Param('orderId') orderId: string) {
  }
}
