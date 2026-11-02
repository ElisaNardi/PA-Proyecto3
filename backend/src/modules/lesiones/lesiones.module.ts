import { Module } from '@nestjs/common';

import { LesionesPersistenceModule } from './infrastructure/persistence/lesiones-persistence.module';
import { LesionesController } from './infrastructure/presentation/controllers/lesiones.controller';

import { LesionesFacade } from './application/facades/lesiones.facade';
import { RegistrarLesionUseCase, ActualizarEstadoLesionUseCase } from './application/use-cases';


@Module({
  imports: [
    LesionesPersistenceModule
  ],
  controllers: [
    LesionesController
  ],
  providers: [
    RegistrarLesionUseCase,
    ActualizarEstadoLesionUseCase,
    LesionesFacade
  ]
})
export class LesionesModule {}
