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
import { ApiTags } from '@nestjs/swagger';
import { FindProductsQueryDto } from './dto/find-products-query.dto';
import { Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CategoriesExistPipe } from 'src/categories/pipes/categories-exist.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Body('categoryIds', CategoriesExistPipe) categoryIds: string[],
    @Req() req,
  ) {
    return await this.productsService.create(createProductDto, req.user);
  }

  @Get()
  async findAll(@Query() query: FindProductsQueryDto) {
    const page = query.page ? Number(query.page) : 1;

    return await this.productsService.findAll(Number(page), query.search);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findMeAll(@Req() req) {
    return await this.productsService.findMeAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
