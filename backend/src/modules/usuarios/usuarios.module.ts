import { Module } from '@nestjs/common';

import { UsuariosPersistenceModule } from './infrastructure/persistence/usuarios-persistence.module';
import { UsuariosController } from './infrastructure/presentation/controllers/usuarios.controller';

import { VincularBoxeadorAEntrenadorUseCase } from './application/use-cases/vincular-boxeador-a-entrenador.use-case';
import { UsuariosFacade } from './application/facades/usuarios.facade';
import { ObtenerBoxeadoresDeEntrenadorUseCase } from './application/use-cases/obtener-boxeadores-de-entrenador.use-case';


@Module({
  imports: [
    UsuariosPersistenceModule
  ],
  controllers: [
    UsuariosController
  ],
  providers: [
    VincularBoxeadorAEntrenadorUseCase,
    ObtenerBoxeadoresDeEntrenadorUseCase,
    UsuariosFacade
  ],
  exports: [
    UsuariosPersistenceModule
  ]
})
export class UsuariosModule {}
