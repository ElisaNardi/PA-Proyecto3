import { Module } from '@nestjs/common';
import { EvolucionController } from './infrastructure/presentation/evolucion.controller';

@Module({
  controllers: [EvolucionController],
  providers: []
})
export class EvolucionModule {}
