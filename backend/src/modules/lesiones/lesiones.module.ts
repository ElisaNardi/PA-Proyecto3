import { Module } from '@nestjs/common';

import { UsuariosModule } from '../usuarios/usuarios.module';

import { LesionesPersistenceModule } from './infrastructure/persistence/lesiones-persistence.module';
import { LesionesController } from './infrastructure/presentation/controllers/lesiones.controller';

import { LesionesFacade } from './application/facades/lesiones.facade';
import { RegistrarLesionUseCase, ActualizarEstadoLesionUseCase, ConsultarLesionesUseCase } from './application/use-cases';


@Module({
  imports: [
    UsuariosModule,
    LesionesPersistenceModule
  ],
  controllers: [
    LesionesController
  ],
  providers: [
    RegistrarLesionUseCase,
    ActualizarEstadoLesionUseCase,
    ConsultarLesionesUseCase,
    LesionesFacade
  ]
})
export class LesionesModule {}
