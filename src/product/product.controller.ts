import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { ProductService } from './product.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productService.getProduct(+id);
  }

  @Get(':code')
  getProductByCode(@Param('code') code: string) {
    return this.productService.getProductByCode(code);
  }

  @Put(':id')
  updateProduct(@Param('id') id: number, updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(+id, updateProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(+id);
  }
}
