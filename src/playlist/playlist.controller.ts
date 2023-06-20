/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Cancion } from 'src/cancion/entities/cancion.entity';
import { AddSongDto } from './dto/add-song.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylistDto);
  }
  @Post('/cancion/:id')
  addCancion(@Param('id', ParseIntPipe) id: number, @Body() addSongDto: AddSongDto) {
    return this.playlistService.addCancion(id, addSongDto);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.findOne(id);
  }

  @Get('canciones/:id')
  async findSongs(@Param('id') id: number): Promise<Cancion[]> {
    return this.playlistService.findSongs(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.remove(id);
  }
  @Delete(':id/cancion/:idCancion')
  removeCancion(@Param('id', ParseIntPipe) id: number, @Param('idCancion', ParseIntPipe) idCancion: number) {
    return this.playlistService.removeCancion(id, idCancion);
  }
}