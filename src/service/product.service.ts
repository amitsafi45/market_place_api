import { CreateProductDTO, ProductQueryDTO } from '@/dto/product.dto';
import { ProductEntity } from '@/entity/product.entity';
import { RawSQL } from '@/interface/global.interface';
import { buildPaginationMeta } from '@/utils/paginate';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(data: CreateProductDTO, sellerId: string) {
    await this.productRepository.insert({
      seller: sellerId,
      ...data,
    });
  }

  async findProductByNameForSeller(name: string, sellerId: string) {
    return await this.productRepository.findOne({
      where: {
        name: name,
        seller: {
          id: sellerId,
        },
      },
    });
  }

  async findAllProducts(query: ProductQueryDTO) {
    const { page, limit, minPrice, maxPrice, sellerId } = query;

    const qb = this.productRepository.createQueryBuilder('product');

    if (minPrice) {
      qb.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (sellerId) {
      qb.andWhere('product.seller = :sellerId', { sellerId });
    }
    const parsePage = parseInt(page, 10);
    const parseLimit = parseInt(limit, 10);

    qb.skip((parsePage - 1) * parseLimit).take(parseLimit);

    const [items, total] = await qb.getManyAndCount();

    return {
      success: true,
      statusCode: 200,
      message: 'Products fetched successfully',
      meta: buildPaginationMeta(total, parsePage, parseLimit),
      items,
    };
  }
  async findProductByID(id: string, queryRunner: QueryRunner) {
    return await queryRunner.manager.findOne(ProductEntity, {
      where: {
        id: id,
      },
      select: {
        id: true,
        price: true,
        stock: true,
      },
    });
  }
  async updateStock(queryRunner: QueryRunner, stockUpdateSQLAuery: RawSQL) {
    await queryRunner.manager.query(stockUpdateSQLAuery);
  }
}
