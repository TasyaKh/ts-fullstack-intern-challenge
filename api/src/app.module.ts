import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoriteCatsModule } from './favorite-cats/favorite-cats.module';
import CONNECTION from 'db.connection';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: true,
      autoLoadEntities: true,
    }),
    FavoriteCatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
