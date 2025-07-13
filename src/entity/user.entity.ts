import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '@entity/base.entity';


@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar'})
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
  
  
}
