import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RutinasController } from './infrastructure/presentation/rutinas.controller';
import { RutinasService } from './application/rutinas.service';

import { RutinaOrmEntity } from './infrastructure/persistence/rutina.orm-entity';
import { EjercicioOrmEntity } from './infrastructure/persistence/ejercicio.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RutinaOrmEntity,
      EjercicioOrmEntity,
    ]),
  ],
  controllers: [RutinasController],
  providers: [RutinasService],
})
export class RutinasModule {}