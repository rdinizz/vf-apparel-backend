import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { HttpService } from '@nestjs/axios';
import productsMock from '../../mocks/productsMock';
import productsFinalMock from '../../mocks/productsFinalMock';
import { of } from 'rxjs';
import { ProductOrder } from './product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: HttpService, useValue: { get: jest.fn() } },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(httpService).toBeDefined();
  });
  describe('getProducts', () => {
    it('should return product list', async () => {
      const finalResult = productsFinalMock;
      const returnedProducts = productsMock;
      const response: any = {
        headers: {},
        config: {},
        status: 200,
        data: returnedProducts,
        statusText: 'OK',
      };
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(response));
      const result = await service.getProducts({
        order: ProductOrder.ascendant,
      });
      expect(result).toEqual(finalResult);
    });
  });
});
