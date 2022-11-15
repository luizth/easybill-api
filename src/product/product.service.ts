import { Injectable } from '@nestjs/common';
import products from './mock/products.mock.json';

import { Product } from './entities/product.entity';


@Injectable()
export class ProductService {
  
    async getProduct(id: string) {
        const product: Product = products.find(obj => obj.id === id)
        return product;
    }
    async getProducts() {
        return products;
    }
}