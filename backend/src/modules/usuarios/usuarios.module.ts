import { Module } from '@nestjs/common';

import { UsuariosPersistenceModule } from './infrastructure/persistence/usuarios-persistence.module';
import { UsuariosController } from './infrastructure/presentation/controllers/usuarios.controller';

import { VincularBoxeadorAEntrenadorUseCase, ObtenerBoxeadoresDeEntrenadorUseCase, ObtenerPerfilBoxeadorUseCase } from './application/use-cases';
import { UsuariosFacade } from './application/facades/usuarios.facade';
import { BoxeadorFinder } from './application/services/boxeador.finder';

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
    ObtenerPerfilBoxeadorUseCase,
    BoxeadorFinder,
    UsuariosFacade
  ],
  exports: [
    UsuariosPersistenceModule
  ]
})
export class UsuariosModule {}
