import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteCatsService } from './favorite-cats.service';
import { FavoriteCatsController } from './favorite-cats.controller';
import { FavoriteCat } from './entities/favorite-cat.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteCat])],
  controllers: [FavoriteCatsController],
  providers: [FavoriteCatsService, AuthService],
})
export class FavoriteCatsModule {}
