import { Module } from '@nestjs/common';
import { UsuariosController } from './infraestructure/presentation/usuarios.controller';
import { UsuariosService } from './application/usuarios.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService]
})
export class UsuariosModule {}
