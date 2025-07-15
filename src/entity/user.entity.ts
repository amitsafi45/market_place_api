import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@entity/base.entity';
import { UserRole } from '@/constant/enum';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({
    unique: true,
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
    select: false,
  })
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @OneToMany(() => ProductEntity, (product) => product.seller)
  products: ProductEntity[];

  @OneToMany(() => OrderEntity, (order) => order.buyer)
  orders: OrderEntity[];
}
