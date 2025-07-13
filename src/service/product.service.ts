import { CreateProductDTO } from "@/dto/product.dto";
import { ProductEntity } from "@/entity/product.entity";
import { UserEntity } from "@/entity/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductService{
      constructor(
         @InjectRepository(ProductEntity)
         private readonly productRepository: Repository<ProductEntity>,
       ) {}

       async createProduct(data:CreateProductDTO,sellerId:string){
           await this.productRepository.insert({
            seller:sellerId,...data
          })
       }

       async findProductByNameForSeller(name:string,sellerId:string){
         return await this.productRepository.findOne({
            where:{
              name:name,
              seller:{
               id:sellerId
              }
            }
         }) 
       }

}