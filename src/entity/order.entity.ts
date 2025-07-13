import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";
import { OrderItemEntity } from "./orderItem.entity";

@Entity()
export class OrderEntity extends BaseEntity {

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({name:'buyer_id'})
  buyer: UserEntity;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];

  @Column('decimal')
  totalPrice: number;

}
