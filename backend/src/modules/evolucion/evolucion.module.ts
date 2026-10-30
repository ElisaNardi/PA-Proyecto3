import { Module } from '@nestjs/common';
import { EvolucionController } from './infraestructure/presentation/evolucion.controller';

@Module({
  controllers: [EvolucionController],
  providers: []
})
export class EvolucionModule {}
