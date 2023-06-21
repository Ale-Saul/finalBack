/* eslint-disable prettier/prettier */
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Cancion } from 'src/cancion/entities/cancion.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: string;

    @ManyToMany(() => Cancion, cancion => cancion.playlists)
    canciones: Cancion[];

    @ManyToOne(() => Usuario, usuario => usuario.playlists)
    usuario: Usuario;
} 
