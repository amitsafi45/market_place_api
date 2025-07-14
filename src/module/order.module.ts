import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '@entity/order.entity';
import { OrderItemEntity } from '@entity/orderItem.entity';
import { ProductEntity } from '@entity/product.entity';
import { OrderController } from '@controller/order.controller';
import { OrderService } from '@service/order.service';
import { OrderItemService } from '@/service/orderItem.service';
import { JwtService } from '@nestjs/jwt';
import { ProductService } from '@/service/product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, ProductEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService,OrderItemService,JwtService,ProductService],
  exports: [OrderService,OrderItemService],
})
export class OrderModule {}
