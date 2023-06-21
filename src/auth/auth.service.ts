/* eslint-disable prettier/prettier */
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService { 
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService
    ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = { ...userObject, password: plainToHash };
    return this.usuarioRepository.save(userObject);
  }

  async login ( userOjectLogin:LoginAuthDto ) {
    const  { correo, password } = userOjectLogin;
    const findUser = await this.usuarioRepository.findOne({ where: { correo } });
    if (!findUser) throw new HttpException('Usuario no encontrado', 404);

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) throw new HttpException('Contraseña incorrecta', 403);

    const payload = {id: findUser.id, nombre: findUser.nombre};
    const token = await this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    }

    return data;
  }
}
