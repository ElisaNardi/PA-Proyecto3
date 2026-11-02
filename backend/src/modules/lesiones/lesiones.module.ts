import { Module } from '@nestjs/common';

import { LesionesPersistenceModule } from './infrastructure/persistence/lesiones-persistence.module';
import { LesionesController } from './infrastructure/presentation/controllers/lesiones.controller';
import { RegistrarLesionUseCase } from './application/use-cases/registrar-lesion.use-case';
import { LesionesFacade } from './application/facades/lesiones.facade';


@Module({
  imports: [
    LesionesPersistenceModule
  ],
  controllers: [
    LesionesController
  ],
  providers: [
    RegistrarLesionUseCase,
    LesionesFacade
  ]
})
export class LesionesModule {}
