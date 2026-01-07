import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/sequelize';
import Product from 'src/database/models/product.model';
import { Pagination } from 'src/common/utils/pagination.util';
import Category from 'src/database/models/category.model';

jest.mock('src/common/utils/pagination.util', () => ({
  Pagination: jest.fn(),
}));

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

  describe('findAll', () => {
    it('should return paginated products without search', async () => {
      productModel.findAndCountAll.mockResolvedValue({
        rows: [{ id: 1, title: 'Product 1' }],
        count: 1,
      });

      const result = await service.findAll();

      expect(productModel.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 20,
          offset: 0,
          where: {},
          order: [['createdAt', 'DESC']],
          include: ['categories'],
        }),
      );

      expect(result).toEqual({
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
        rows: [{ id: 1, title: 'Product 1' }],
      });
    });

    // it('should apply search filter when search is provided', async () => {
    //   productModel.findAndCountAll.mockResolvedValue({
    //     rows: [],
    //     count: 0,
    //   });

    //   const search = 'phone';
    //   await service.findAll(1, search);

    //   expect(productModel.findAndCountAll).toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       where: {
    //         [Op.or]: [
    //           { title: { [Op.like]: `%${search}%` } },
    //           { description: { [Op.like]: `%${search}%` } },
    //         ],
    //       },
    //     }),
    //   );
    // });

    // it('should ignore empty search string', async () => {
    //   productModel.findAndCountAll.mockResolvedValue({
    //     rows: [],
    //     count: 0,
    //   });

    //   await service.findAll(1, '   ');

    //   expect(productModel.findAndCountAll).toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       where: {},
    //     }),
    //   );
    // });

    // it('should use custom page and limit', async () => {
    //   productModel.findAndCountAll.mockResolvedValue({
    //     rows: [],
    //     count: 50,
    //   });

    //   const result = await service.findAll(2, undefined, 10);

    //   expect(productModel.findAndCountAll).toHaveBeenCalledWith(
    //     expect.objectContaining({
    //       limit: 10,
    //       offset: 10,
    //     }),
    //   );

    //   expect(result.page).toBe(2);
    //   expect(result.limit).toBe(10);
    //   expect(result.totalPages).toBe(5);
    // });
  });
});
