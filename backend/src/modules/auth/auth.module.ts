import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsuariosPersistenceModule } from '../usuarios/infrastructure/persistence/usuarios-persistence.module';

import { HASHER_TOKEN } from './application/ports/hasher.port';
import { AuthFacade } from './application/facades/auth.facade';
import { RegistrarUsuarioUseCase } from './application/use-cases/registrar-usuario.use-case';

import { AuthController } from './infrastructure/presentation/auth.controller';
import { BcryptHasher } from './infrastructure/adapters/bcrypt-hasher.adapter';

@Module({
  imports: [
    UsuariosPersistenceModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<number>('jwt.expiresIn')
        }
      })
    })
  ],
  controllers: [
    AuthController
  ],
  providers: [
    RegistrarUsuarioUseCase,
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
