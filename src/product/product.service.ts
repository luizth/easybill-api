import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import products from './mock/products.mock.json';

import { PrismaService } from '../prisma/prisma.service';

import { Product } from './entities/product.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}
    
    async getProducts() {
        return this.prisma.product.findMany();
    }

    async getProduct(id: number) {
        return this.prisma.product.findFirst({ where: { id: id, deleted: false } });
    }

    async getProductByCode(code: string) {
        return this.prisma.product.findFirst({ where: { code: code, deleted: false } });
    }

    async createProduct(createProductDto: CreateProductDto) {
        var product = new Product();
        
        product.code = createProductDto.code;
        product.title = createProductDto.title;
        product.price = createProductDto.price;
        product.category = createProductDto.category;
        return this.prisma.product.create({ data: product });
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto) {
        var product = await this.getProduct(id);
        if (product == null) {
            throw new HttpException({ 
                status: HttpStatus.NOT_FOUND, 
                error: 'Product not found.' 
            }, HttpStatus.NOT_FOUND);  
        }
        return this.prisma.product.update({ where: { id: id }, data: updateProductDto });
    }

    async deleteProduct(id: number) {
        return this.prisma.product.update({ where: { id: id }, data: {'deleted': true} });
    }
}