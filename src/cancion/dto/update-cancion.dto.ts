/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCancionDto } from './create-cancion.dto';
import { IsString, IsNumber } from 'class-validator';

export class UpdateCancionDto extends PartialType(CreateCancionDto) {
    @IsString()
    titulo: string;
    @IsString()
    artista: string;
    @IsString()
    genero: string;
    @IsNumber()
    duracion: number;
}
