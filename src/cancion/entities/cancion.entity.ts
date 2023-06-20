/* eslint-disable prettier/prettier */
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Playlist } from 'src/playlist/entities/playlist.entity';
@Entity()
export class Cancion {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    titulo: string;
    @Column()
    artista: string;
    @Column()
    genero: string;
    @Column()
    duracion: number;
    
    @ManyToMany(() => Playlist, playlist => playlist.canciones , { cascade: true } )
    @JoinTable()
    playlists: Playlist[]; 
}
