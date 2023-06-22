/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

  constructor(@InjectRepository(Usuario) private usuarioRepository : Repository<Usuario>) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioRepository.save(createUsuarioDto);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOneById(id);
    const obj = JSON.parse(JSON.stringify(usuario));
    if (!usuario) {
      return `No se encontro el usuario con id ${id}`;
    }
    else {
      return obj;
    }
  }
  findByCorreo(correo: string) {
    const usuario = this.usuarioRepository.find({where: {correo}});
    if (!usuario) {
      return `No se encontro el usuario con correo ${correo}`;
    }
    else {
      return usuario;
    }
  }
  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioRepository.update(id, updateUsuarioDto);
  }
  async remove(id: number): Promise<void> {
    const cancion = await this.usuarioRepository.findOneById(id);
    await this.usuarioRepository.remove(cancion);
  }
}
