import { Module } from '@nestjs/common';
import { AuthController } from './infraestructure/presentation/auth.controller';

@Module({
  controllers: [AuthController],
  providers: []
})
export class AuthModule {}
