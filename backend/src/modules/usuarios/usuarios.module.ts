import { Module } from '@nestjs/common';
import { UsuariosController } from './infraestructure/presentation/controllers/usuarios.controller';

@Module({
  controllers: [UsuariosController],
  providers: []
})
export class UsuariosModule {}
