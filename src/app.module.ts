/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancionModule } from './cancion/cancion.module';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'',
      database:'API_musica',
      synchronize:true,
      autoLoadEntities:true,
    }),
    CancionModule,
    PlaylistModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
