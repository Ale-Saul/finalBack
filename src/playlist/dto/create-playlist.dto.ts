/* eslint-disable prettier/prettier */

import { Cancion } from "src/cancion/entities/cancion.entity";

export class CreatePlaylistDto {
    nombre: string;
    canciones: Cancion[]; // Array de identificadores de canciones
    usuarioId: number;
}
