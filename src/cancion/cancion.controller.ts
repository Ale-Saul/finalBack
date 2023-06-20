/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CancionService } from './cancion.service';
import { CreateCancionDto } from './dto/create-cancion.dto';
import { UpdateCancionDto } from './dto/update-cancion.dto';

@Controller('cancion')
export class CancionController {
  constructor(private readonly cancionService: CancionService) {}

  @Post()
  create(@Body() createCancionDto: CreateCancionDto) {
    return this.cancionService.create(createCancionDto);
  }

  @Get()
  findAll() {
    return this.cancionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cancionService.findOne(id);
  }

  @Get('genero/:genero')
  findGenero(@Param('genero') genero: string) {
    return this.cancionService.findGenero(genero);
  }

  @Get('buscar/:titulo')
  buscar(@Param('titulo') titulo: string) {
    return this.cancionService.buscar(titulo);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCancionDto: UpdateCancionDto) {
    return this.cancionService.update(id, updateCancionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cancionService.remove(id);
  }
}
