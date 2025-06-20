import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FavoriteCat } from './entities/favorite-cat.entity';

@Injectable()
export class FavoriteCatsService {
  constructor(
    @InjectRepository(FavoriteCat)
    private favoriteCatsRepository: Repository<FavoriteCat>,
  ) {}

  async findAll(): Promise<FavoriteCat[]> {
    return this.favoriteCatsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(catId: string): Promise<FavoriteCat> {
    const favoriteCat = this.favoriteCatsRepository.create({
      catId,
    });
    return this.favoriteCatsRepository.save(favoriteCat);
  }

  async remove(catId: string): Promise<DeleteResult> {
    return await this.favoriteCatsRepository.delete({ catId });
  }
}
