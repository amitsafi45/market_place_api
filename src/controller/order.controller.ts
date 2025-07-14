import { CreateOrderDTO } from "@/dto/order.dto";
import { Authentication } from "@/middleware/authentication.middleware";
import { Authorization } from "@/middleware/authorization.middleware";
import { OrderService } from "@/service/order.service";
import { ProductService } from "@/service/product.service";
import { Role } from "@/utils/role.decorator";
import { User } from "@/utils/user.decorator";
import { Controller, Get, Post, Param, Body, UseGuards, HttpStatus, BadRequestException, HttpException, HttpCode } from "@nestjs/common";

@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly productService: ProductService) { }
  @Post('')
  @Role('Buyer')
  @UseGuards(Authentication, Authorization)
  async createOrder(@Body() data: CreateOrderDTO, @User('sub') buyerId: string) {
    try {
      const orderItemCollect: {}[] = [];
      let total = 0
      for (const item of data.items) {
        const product = await this.productService.findProductByID(item.product_id,);
        if (!product) {
          throw new BadRequestException(`Product with ID ${item.product_id} not found`);
        }


        if (product.stock < item.quantity) {

          throw new BadRequestException(`Insufficient stock for product ID ${item.product_id}`);
        }


        orderItemCollect.push({
          product: item.product_id,
          priceAtPurchase: product.price,
          quantity: item.quantity,
        });
        total += product.price * item.quantity

      }
      
      return total
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('/')
  async orderList() {
  }

  @Get('/:orderId')
  async orderDetail(@Param('orderId') orderId: string) {
  }
}
