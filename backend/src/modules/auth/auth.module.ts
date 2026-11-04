import { Module } from '@nestjs/common';

import { UsuariosPersistenceModule } from '../usuarios/infrastructure/persistence/usuarios-persistence.module';

import { HASHER_TOKEN } from './application/ports';
import { AuthFacade } from './application/facades';
import { AutenticarUsuarioUseCase, RegistrarUsuarioUseCase } from './application/use-cases';

import { AuthController } from './infrastructure/presentation';
import { BcryptHasher } from './infrastructure/adapters';

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
