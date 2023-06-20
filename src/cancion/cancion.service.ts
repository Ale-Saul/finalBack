/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCancionDto } from './dto/create-cancion.dto';
import { UpdateCancionDto } from './dto/update-cancion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancion } from './entities/cancion.entity';

@Injectable()
export class CancionService {
  constructor(@InjectRepository(Cancion) private cancionRepository: Repository<Cancion>) {}

  create(createCancionDto: CreateCancionDto) {
    return this.cancionRepository.save(createCancionDto);
  }

  findAll() {
    return this.cancionRepository.find();
  }

  findOne(id: number) {
    const cancion = this.cancionRepository.findOneById(id);
    if (!cancion) {
      return `No se encontro la cancion con id ${id}`;
    }
    else {
      return cancion;
    }
  }
  findGenero(genero: string) {
    const cancion = this.cancionRepository.find({where: {genero}});
    if (!cancion) {
      return `No se encontro la cancion con genero ${genero}`;
    }
    else {
      return cancion;
    }
  }
  update(id: number, updateCancionDto: UpdateCancionDto) {
    return this.cancionRepository.update(id, updateCancionDto);
  }

  async remove(id: number): Promise<void> {
    const cancion = await this.cancionRepository.findOneById(id);
    await this.cancionRepository.remove(cancion);
  }

  async buscar(titulo: string) {
    const canciones = await this.cancionRepository
    .createQueryBuilder('cancion')
    .where('cancion.titulo LIKE :palabraClave', { palabraClave: `%${titulo}%` })
    .getMany();
  
  if (canciones.length === 0) {
    return `No se encontraron canciones con la palabra clave ${titulo}`;
    } else {
    return canciones;
    }
  }
  async findAllByIds(cancionIds: number[]): Promise<Cancion[]> {
    return this.cancionRepository.findByIds(cancionIds);
  }
}
