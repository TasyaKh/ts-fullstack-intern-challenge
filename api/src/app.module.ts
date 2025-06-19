import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavoriteCatsModule } from './favorite-cats/favorite-cats.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import CONNECTION from 'db.connection';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...CONNECTION,
      synchronize: true,
      autoLoadEntities: true,
    }),
    FavoriteCatsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
