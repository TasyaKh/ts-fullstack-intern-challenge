import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoriteCatsService } from './favorite-cats.service';

@Controller('likes')
export class FavoriteCatsController {
  constructor(private readonly favoriteCatsService: FavoriteCatsService) {}

  @Get()
  async findAll() {
    const favorites = await this.favoriteCatsService.findAll();
    return { data: favorites };
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: { cat_id: string }) {
    if (!body.cat_id) {
      throw new HttpException('Invalid input', HttpStatus.METHOD_NOT_ALLOWED);
    }
    return await this.favoriteCatsService.create(body.cat_id);
  }

  @Delete(':cat_id')
  async remove(@Param('cat_id') catId: string) {
    const res = await this.favoriteCatsService.remove(catId);
    if (res.affected === 0) {
      throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
