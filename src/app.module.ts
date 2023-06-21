/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancionModule } from './cancion/cancion.module';
import { PlaylistModule } from './playlist/playlist.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3308,
      username:'root',
      password:'123456789',
      database:'musica',
      synchronize:true,
      autoLoadEntities:true,
    }),
    CancionModule,
    PlaylistModule,
    UsuarioModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
