import { OrderItemEntity } from "@/entity/orderItem.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class OrderItemService {
   constructor(
      @InjectRepository(OrderItemEntity)
      private readonly orderItemRepository: Repository<OrderItemEntity>,
   ) { }

    async createOrderItem(iet,transaction: EntityManager){
       return  transaction.getRepository(OrderItemEntity).insert([]) 
    }
   
}