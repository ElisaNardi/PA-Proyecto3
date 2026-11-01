import { Module } from '@nestjs/common';

import { UsuariosPersistenceModule } from './infrastructure/persistence/usuarios-persistence.module';
import { UsuariosController } from './infrastructure/presentation/controllers/usuarios.controller';

import { VincularBoxeadorAEntrenadorUseCase } from './application/use-cases/vincular-boxeador-a-entrenador.use-case';
import { UsuariosFacade } from './application/facades/usuarios.facade';


@Module({
  imports: [
    UsuariosPersistenceModule
  ],
  controllers: [
    UsuariosController
  ],
  providers: [
    VincularBoxeadorAEntrenadorUseCase,
    UsuariosFacade
  ],
  exports: [
    UsuariosPersistenceModule
  ]
})
export class UsuariosModule {}
