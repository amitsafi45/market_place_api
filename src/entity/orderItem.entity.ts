import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "@entity/order.entity";
import { ProductEntity } from "@entity/product.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class OrderItemEntity extends BaseEntity{

  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({name:'order_id'})
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn({name:'product_id'})
  product: ProductEntity;

  @Column('int')
  quantity: number;

  @Column('decimal')
  priceAtPurchase: number;
}
