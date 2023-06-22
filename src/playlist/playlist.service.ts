/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { CancionService } from 'src/cancion/cancion.service';
import { Cancion } from 'src/cancion/entities/cancion.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class PlaylistService {
   constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    private cancionService: CancionService,
    private usuarioService: UsuarioService,
  ) {} 

  async create(createPlaylistDto: CreatePlaylistDto, userId : number): Promise<Playlist> {
    const { nombre, canciones } = createPlaylistDto;
    // Crea una nueva instancia de Playlist
    const playlist = new Playlist();
    playlist.nombre = nombre;
    playlist.canciones = [];
    // Obtiene el usuario por su ID y lo asigna a la playlist
    const user = await this.usuarioService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`No se encontro el usuario con id ${userId}`);
    }
    playlist.usuario = user;
    
    // Obtiene las canciones por sus IDs y las asigna a la playlist
    for (const cancionId of canciones) {
      const obj = JSON.parse(JSON.stringify(cancionId));
      if(obj)
      {
        playlist.canciones.push(obj);
      }
    }
    // Guarda la playlist en la base de datos
    return this.playlistRepository.save(playlist);
  } 

  async addCancion(id: number, addSongDto: any): Promise<Playlist> {
    const playlist = await this.findOne(id);
    playlist.canciones.push(addSongDto);
    return this.playlistRepository.save(playlist);
  }

  findAll() {
    return this.playlistRepository.find({relations: ['canciones']});
  }

  async findOne(id: number) {
    const playlist = await this.playlistRepository.findOne({
      where: { id: id },
      relations: ['canciones'],
    });
    return playlist;
  }

  async findPlaylistsUsuario(userId: number): Promise<Playlist[]> {
    const user = await this.usuarioService.findOne(userId);

    if (!user) {
      throw new NotFoundException(`No se encontro el usuario con id ${userId}`);
    }

    const playlists = await this.playlistRepository.find({ where: { usuario: user }, relations: ['canciones'] });

    return playlists;
  }

  async findSongs(playlistId: number): Promise<Cancion[]> {
    const playlist = await this.findOne(playlistId);
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${playlistId} not found`);
    }
    const obj = JSON.parse(JSON.stringify(playlist));
    console.log(obj);
    return playlist.canciones;
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.findOne(id);
    playlist.nombre = updatePlaylistDto.nombre;
    playlist.canciones = updatePlaylistDto.canciones;
    await this.playlistRepository.save(playlist);
  }

  async remove(id: number): Promise<void> {
    const playlist = await this.findOne(id);
  
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }
  
    await this.playlistRepository.remove(playlist);
  }
  async removeCancion(id: number, idCancion: number): Promise<void> {
    const playlist = await this.findOne(id);
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }
    const cancion = await this.cancionService.findOne(idCancion);
    if (!cancion) {
      throw new NotFoundException(`Cancion with ID ${idCancion} not found`);
    }
    playlist.canciones = playlist.canciones.filter(c => c.id !== idCancion);
    await this.playlistRepository.save(playlist);
  }

  async buscar(nombre: string): Promise<Playlist[]> {
    const playlists = await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.canciones', 'cancion') // Realiza la carga ansiosa de la relación "canciones"
      .where('playlist.nombre LIKE :palabraClave', { palabraClave: `%${nombre}%` })
      .getMany();
    
    if (playlists.length === 0) {
      throw new NotFoundException(`No se encontraron playlists con la palabra clave ${nombre}`);
    }
    
    return playlists;
  }
}