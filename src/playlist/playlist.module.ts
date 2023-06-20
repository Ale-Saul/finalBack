/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistController } from './playlist.controller';
import { Playlist } from './entities/playlist.entity';
import { CancionModule } from 'src/cancion/cancion.module';


@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), CancionModule],
  controllers: [PlaylistController],
  providers: [PlaylistService]
})
export class PlaylistModule {}
