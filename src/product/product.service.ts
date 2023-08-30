import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ProductDTO, ProductOrder } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly httpService: HttpService) {}

  async getProducts(query?: ProductDTO) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get('https://efuktshirts.com/products.json'),
      );
      console.log(data.products);
      switch (query.order) {
        case ProductOrder.ascendant:
          return data.products.sort((a, b) => (a.title < b.title ? -1 : 1));
        case ProductOrder.descendant:
          return data.products.sort((a, b) => (a.title < b.title ? 1 : -1));
        case ProductOrder.highestToLowest:
          break;
        case ProductOrder.lowestToHighest:
          break;
        default:
          return data.products;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
