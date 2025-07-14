import { OrderEntity } from "@/entity/order.entity";
import { OrderItemEntity } from "@/entity/orderItem.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, QueryRunner, Repository } from "typeorm";

@Injectable()
export class OrderItemService {
   constructor(
      @InjectRepository(OrderItemEntity)
      private readonly orderItemRepository: Repository<OrderItemEntity>,
   ) { }

    async createOrderItem(queryRunner:QueryRunner,data:OrderItemEntity[]){
       return await queryRunner.manager.insert(OrderItemEntity,data) 
    }
   
}