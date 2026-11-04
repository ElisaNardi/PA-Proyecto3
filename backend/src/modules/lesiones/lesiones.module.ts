import { Module } from '@nestjs/common';

import { UsuariosModule } from '../usuarios/usuarios.module';

import { LesionesPersistenceModule } from './infrastructure/persistence/lesiones-persistence.module';
import { LesionesController } from './infrastructure/presentation/controllers';

import { LesionesFacade } from './application/facades';
import { RegistrarLesionUseCase, ActualizarEstadoLesionUseCase, ConsultarLesionesUseCase, ObtenerLesionUseCase } from './application/use-cases';
import { AccesoLesionesValidator } from './application/services';


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
    ObtenerLesionUseCase,
    AccesoLesionesValidator,
    LesionesFacade
  ]
})
export class LesionesModule {}
