/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Playlist } from 'src/playlist/entities/playlist.entity';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    correo: string;

    @Column()
    password: string;

    @Column({ type: 'boolean', default: false })
    rol: boolean;

    @OneToMany(() => Playlist, playlist => playlist.usuario)
    @JoinColumn()
    playlists: Playlist[];
}
