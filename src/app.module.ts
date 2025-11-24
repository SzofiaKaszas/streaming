import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SongsModule } from './songs/songs.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), SongsModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
