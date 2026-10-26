import { Module } from '@nestjs/common';
import { EvolucionController } from './presentation/evolucion.controller';
import { EvolucionService } from './application/evolucion.service';

@Module({
  controllers: [EvolucionController],
  providers: [EvolucionService]
})
export class EvolucionModule {}
