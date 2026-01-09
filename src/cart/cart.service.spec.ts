import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { getModelToken } from '@nestjs/sequelize';
import Cart from 'src/database/models/cart.model';
import CartItem from 'src/database/models/cartItem.model';
import { AddItemDto } from './dto/add-item.dto';
import { where } from 'sequelize';

describe('CartService', () => {
  let service: CartService;
  let cartModel: any;
  let cartItemModel: any;

  const mockCartModel = {
    findOrCreate: jest.fn(),
  };

  const mockCartItemModel = {
    findOne: jest.fn(),
    create: jest.fn(),
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
    cartModel = module.get(getModelToken(Cart));
    cartItemModel = module.get(getModelToken(CartItem));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('add-to-cart', () => {
    it('Should add a existing product to cart', async () => {
      const userId = 'user-id';
      const addItemDto: AddItemDto = { productId: 'product-id', quantity: 2 };

      cartModel.findOrCreate.mockResolvedValue([
        { cart: { id: 'cart-id', userId: 'user-id', isActive: false } },
        false,
      ]);

      cartItemModel.findOne.mockResolvedValue(null);

      cartItemModel.create.mockResolvedValue({
        cartId: 'cart-id',
        productId: addItemDto.productId,
        quantity: addItemDto.quantity,
      });

      const result = await service.addItem(userId, addItemDto);

      expect(cartModel.findOrCreate).toHaveBeenCalledWith(
        expect.objectContaining({ where: { userId } }),
      );

      expect(cartItemModel.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { cartId: 'cart-id', productId: addItemDto.productId },
        }),
      );

      expect(cartItemModel.create).toHaveBeenCalledWith({
        cartId: 'cart-id',
        productId: addItemDto.productId,
        quantity: addItemDto.quantity,
      });

      expect(result).toEqual({
        cartId: 'cart-id',
        productId: addItemDto.productId,
        quantity: addItemDto.quantity,
      });
    });
  });
});
