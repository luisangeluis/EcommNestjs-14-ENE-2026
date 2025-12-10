import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindProductsQueryDto } from './dto/find-products-query.dto';
import { Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CategoriesExistPipe } from 'src/categories/pipes/categories-exist.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Body('categoryIds', CategoriesExistPipe) categoryIds: string[],
    @Req() req,
  ) {
    const userId = req.user.id;

    return await this.productsService.create(createProductDto, userId);
  }

  @Get()
  async findAll(@Query() query: FindProductsQueryDto) {
    const page = query.page ? Number(query.page) : 1;
    const limit = 20;
    return await this.productsService.findAll(
      Number(page),
      query.search,
      limit,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findMyProducts(@Req() req) {
    const userId = req.user.id;
    return await this.productsService.findMyProducts(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.productsService.update(id, updateProductDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    //TODO Custom response
    return this.productsService.remove(userId, id);
  }
}
