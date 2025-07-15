import { OrderEntity } from '@/entity/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async createOrder(
    buyerId: string,
    totalPrice: number,
    queryRunner: QueryRunner,
  ) {
    return queryRunner.manager.insert(OrderEntity, {
      buyer: buyerId,
      totalPrice: totalPrice,
    });
  }
}
