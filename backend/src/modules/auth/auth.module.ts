import { Module } from '@nestjs/common';

import { UsuariosPersistenceModule } from '../usuarios/infrastructure/persistence/usuarios-persistence.module';

import { HASHER_TOKEN } from './application/ports/hasher.port';
import { AuthFacade } from './application/facades/auth.facade';
import { RegistrarUsuarioUseCase } from './application/use-cases/registrar-usuario.use-case';

import { AuthController } from './infrastructure/presentation/auth.controller';
import { BcryptHasher } from './infrastructure/adapters/bcrypt-hasher.adapter';
import { AutenticarUsuarioUseCase } from './application/use-cases/autenticar-usuario.use-case';

@Module({
  imports: [
    UsuariosPersistenceModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    RegistrarUsuarioUseCase,
    AutenticarUsuarioUseCase,
    AuthFacade,
    {
      provide: HASHER_TOKEN,
      useClass: BcryptHasher
    }
  ],
  exports: [
    HASHER_TOKEN
  ]
})
export class AuthModule {}
