import { CreateOrderDTO } from "@/dto/order.dto";
import { OrderItemEntity } from "@/entity/orderItem.entity";
import { IOrderItemCollect, RawSQL } from "@/interface/global.interface";
import { Authentication } from "@/middleware/authentication.middleware";
import { Authorization } from "@/middleware/authorization.middleware";
import { OrderService } from "@/service/order.service";
import { OrderItemService } from "@/service/orderItem.service";
import { ProductService } from "@/service/product.service";
import { Role } from "@/utils/role.decorator";
import { User } from "@/utils/user.decorator";
import { Controller, Get, Post, Param, Body, UseGuards, HttpStatus, BadRequestException, HttpException, HttpCode } from "@nestjs/common";
import { DataSource } from "typeorm";

@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly dataSource: DataSource,
    private readonly orderItemService: OrderItemService) { }
  @Post('')
  @Role('Buyer')
  @UseGuards(Authentication, Authorization)
  async createOrder(@Body() data: CreateOrderDTO, @User('sub') buyerId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const orderItemCollect:IOrderItemCollect[] = [];
      const productIDCollect:string[]=[]
      const stockUpdateCaseQuery:string[]=[]
      let total = 0
      for (const item of data.items) {
        const product = await this.productService.findProductByID(item.productId, queryRunner);
        if (!product) {
          throw new BadRequestException(`Product with ID ${item.productId} not found`);
        }


        if (product.stock < item.quantity) {

          throw new BadRequestException(`Insufficient stock for product ID ${item.productId}`);
        }


        orderItemCollect.push({
          product: item.productId,
          priceAtPurchase: product.price,
          quantity: item.quantity,
        });
        productIDCollect.push(`'${item.productId}'`)
        stockUpdateCaseQuery.push(
          `WHEN id = '${item.productId}' THEN ${Math.max(product.stock - item.quantity,0)}`
        )
        // updateStockList.push({
        //   id:item.productId,
        //   stock:
        // })
        total += product.price * item.quantity


      }

      const saveOrder = await this.orderService.createOrder(buyerId, total, queryRunner)
      // const ids = orderItemCollect.map(item => `'${item.product}'`).join(',');
      
      orderItemCollect.map((element) => {
        element['order'] = saveOrder.identifiers[0].id
        return element
      })
      await this.orderItemService.createOrderItem(queryRunner, orderItemCollect as [OrderItemEntity])
      // const cases = orderItemCollect
      //   .map(item => `WHEN id = '${item.product}' THEN ${item.quantity}`)
      //   .join(' ');
      const sql = `
        UPDATE product
        SET stock = CASE ${stockUpdateCaseQuery} ELSE stock END
        WHERE id IN (${productIDCollect});
      `;
      await this.productService.updateStock(queryRunner,sql as RawSQL)
      await queryRunner.commitTransaction();
      return {
        success:true,
        statusCode:HttpStatus.CREATED,
        message:"Order Placed Successfully"
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
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
