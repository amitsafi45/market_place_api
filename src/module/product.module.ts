import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@entity/product.entity';
import { ProductController } from '@controller/product.controller';
import { ProductService } from '@service/product.service';
import { UserEntity } from '@entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
