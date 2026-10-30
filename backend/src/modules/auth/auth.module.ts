import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/presentation/auth.controller';

@Module({
  controllers: [AuthController],
  providers: []
})
export class AuthModule {}
