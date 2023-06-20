/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CancionService } from './cancion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancionController } from './cancion.controller';
import { Cancion } from './entities/cancion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cancion])],
  controllers: [CancionController],
  providers: [CancionService],
  exports: [CancionService]
})
export class CancionModule {}
