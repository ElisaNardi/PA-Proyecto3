import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntrenamientosController } from './presentation/entrenamientos.controller';
import { EntrenamientosService } from './application/entrenamientos.service';

import { EntrenamientoOrmEntity } from  './infrastructure/persistence/entrenamientosorm-entity';
import { ObjetivoOrmEntity } from './infrastructure/persistence/objetivo.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EntrenamientoOrmEntity,
      ObjetivoOrmEntity,
    ]),
  ],
  controllers: [EntrenamientosController],
  providers: [EntrenamientosService],
})
export class EntrenamientosModule {}