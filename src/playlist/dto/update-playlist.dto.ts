/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-playlist.dto';
import { Cancion } from 'src/cancion/entities/cancion.entity';
import { IsString,  } from 'class-validator';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @IsString()
  nombre?: string;
  canciones?: Cancion[];
}
