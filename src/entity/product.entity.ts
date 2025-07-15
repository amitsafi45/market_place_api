import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from '@entity/user.entity';
import { BaseEntity } from '@entity/base.entity';
import { OrderItemEntity } from '@entity/orderItem.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  stock: number;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seller_id' })
  seller: UserEntity | string;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];
}
