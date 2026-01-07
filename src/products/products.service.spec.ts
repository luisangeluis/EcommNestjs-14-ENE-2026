import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/sequelize';
import Product from 'src/database/models/product.model';
import { Pagination } from 'src/common/utils/pagination.util';

describe('ProductsService', () => {
  let service: ProductsService;
  let productModel: any;

  const mockProductModel = {
    findAndCountAll: jest.fn(),
  };

  beforeEach(async () => {
    //Mocking to pagination
    (Pagination as jest.Mock).mockImplementation((limit, page) => ({
      options: {
        limit,
        offset: (page - 1) * limit,
      },
      response: jest.fn().mockImplementation((total) => ({
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      })),
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productModel = module.get(getModelToken(Product));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Find all', () => {});
});
