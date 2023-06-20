/* eslint-disable prettier/prettier */
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany } from 'typeorm';
import { Cancion } from 'src/cancion/entities/cancion.entity';

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: string;

    @ManyToMany(() => Cancion, cancion => cancion.playlists)
    canciones: Cancion[];

} 
