import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from '@entity/user.entity';
import { BaseEntity } from '@entity/base.entity';
import { OrderItemEntity } from '@entity/orderItem.entity';

@Entity()
export class ProductEntity extends BaseEntity {
  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  stock: number;

  @ManyToOne(() => UserEntity, (user) => user.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seller_id' })
  seller: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];
}
