import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  stock: number;

  @ManyToOne(() => UserEntity, user => user.products, { onDelete: 'CASCADE' })
  @JoinColumn({name:'seller_id'})
  seller: UserEntity;

 
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
