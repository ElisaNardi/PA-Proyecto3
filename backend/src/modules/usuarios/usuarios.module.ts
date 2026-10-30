import { Module } from '@nestjs/common';
import { UsuariosPersistenceModule } from './infrastructure/persistence/usuarios-persistence.module';

@Module({
  imports: [UsuariosPersistenceModule],
  controllers: [],
  providers: []
})
export class UsuariosModule {}
