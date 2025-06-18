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
    try {
      return await this.favoriteCatsService.create(body.cat_id);
    } catch (error) {
      throw new HttpException('Invalid input', HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  @Delete(':cat_id')
  async remove(@Param('cat_id') catId: string) {
    try {
      await this.favoriteCatsService.remove(catId);
      return;
    } catch (error) {
      throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
    }
  }
}
