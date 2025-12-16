import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddItemDto } from './dto/add-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ProductExistsPipe } from 'src/products/pipes/product-exists.pipe';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add-item')
  async addItem(
    @Body() addItemDto: AddItemDto,
    @Body('productId', ProductExistsPipe) productId: string,
    @Request() req,
  ) {
    const userId = req.user.id;
    return await this.cartService.addItem(userId, addItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findOne(@Request() req) {
    const userId = req.user.id;
    return this.cartService.findOneByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove-item')
  removeItem(@Param('cartItemId') cartItemId: string, @Request() req) {
    const userId = req.user.id;
    return this.cartService.removeItem(userId, cartItemId);
  }
}
