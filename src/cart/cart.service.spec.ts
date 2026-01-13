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
    findOne: jest.fn(),
  };

  const mockCartItemModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
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
        { id: 'cart-id', userId, isActive: false },
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

    it('Should change properity quantity if cartItem exists', async () => {
      const userId = 'user-id';
      const cartId = 'cart-id';
      const productId = 'product-id';
      const dto: AddItemDto = { productId, quantity: 5 };
      const mockCart = { id: 'cart-id', userId, isActive: false };
      const mockCartItem = {
        id: 'cartItem-id',
        cartId,
        productId,
        quantity: 2,
        save: jest.fn(),
      };

      cartModel.findOrCreate.mockResolvedValue([mockCart, false]);

      cartItemModel.findOne.mockResolvedValue(mockCartItem);

      const createSpy = jest.spyOn(cartItemModel, 'create');

      const result = await service.addItem(userId, dto);

      expect(cartModel.findOrCreate).toHaveBeenCalledWith(
        expect.objectContaining({ where: { userId } }),
      );

      expect(cartItemModel.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ where: { cartId, productId } }),
      );

      expect(mockCartItem.quantity).toBe(5);
      expect(mockCartItem.save).toHaveBeenCalled();

      expect(createSpy).not.toHaveBeenCalled();

      expect(result).toBe(mockCartItem);
    });
  });

  describe('clean-cart', () => {
    it('should return the number of deleted records', async () => {
      const userId = 'user-id';
      const cartId = 'cart-id';
      const mockCart = { id: 'cart-id', userId, isActive: false };

      cartModel.findOne.mockResolvedValue(mockCart);

      cartItemModel.destroy.mockResolvedValue(3);

      const result = await service.cleanCart(userId);

      expect(cartModel.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ where: { userId } }),
      );

      expect(cartItemModel.destroy).toHaveBeenCalledWith(
        expect.objectContaining({ where: { cartId } }),
      );

      expect(result).toEqual(3);
    });

    it("should return 0 when cart doesn't exist", async () => {
      const userId = 'user-id';

      cartModel.findOne.mockResolvedValue(null);

      const createSpy = jest.spyOn(cartItemModel, 'destroy');

      const result = await service.cleanCart(userId);

      expect(cartModel.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ where: { userId } }),
      );

      expect(createSpy).not.toHaveBeenCalled();
      expect(result).toEqual(0);
    });
  });
});
