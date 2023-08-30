import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation } from '@nestjs/swagger';
import { ProductDTO } from 'src/product/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('getProducts')
  @ApiOperation({ summary: 'Get products' })
  async getProducts(@Query() query?: ProductDTO) {
    console.log(query);
    return await this.productService.getProducts(query);
  }
}
