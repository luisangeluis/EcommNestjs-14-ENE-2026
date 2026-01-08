import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { getModelToken } from '@nestjs/sequelize';
import Cart from 'src/database/models/cart.model';
import CartItem from 'src/database/models/cartItem.model';

describe('CartService', () => {
  let service: CartService;

  const mockCartModel = {
    findOrCreate: jest.fn(),
  };

  const mockCartItemModel = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getModelToken(Cart),
          useValue: mockCartModel,
        },
        {
          provide: getModelToken(CartItem),
          useValue: mockCartItemModel,
        },
      ],
    }).compile();
    service = module.get<CartService>(CartService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('add-to-cart', () => {
    it('Should add a existing product to cart', () => {});
  });
});
