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
      // the price of the items are on a variants array only, for demonstration purposes, i get the first variant(position === 1)
      // and i extract the variable outside to make it easier to sort.
      for (const product of data.products) {
        const firstVariant = product.variants.filter(
          (variant) => variant.position === 1,
        )[0];
        product.price = firstVariant.price;
      }
      switch (query.order) {
        case ProductOrder.ascendant:
          return data.products.sort((a, b) => (a.title < b.title ? -1 : 1));
        case ProductOrder.descendant:
          return data.products.sort((a, b) => (a.title < b.title ? 1 : -1));
        case ProductOrder.highestToLowest:
          return data.products.sort((a, b) =>
            parseFloat(a.price) < parseFloat(b.price) ? 1 : -1,
          );
        case ProductOrder.lowestToHighest:
          return data.products.sort((a, b) =>
            parseFloat(a.price) < parseFloat(b.price) ? -1 : 1,
          );
        default:
          return data.products;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
