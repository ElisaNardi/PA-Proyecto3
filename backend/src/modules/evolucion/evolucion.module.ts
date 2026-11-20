import { Module } from '@nestjs/common';

import { UsuariosModule } from '../usuarios/usuarios.module';

import { EvolucionController } from './infrastructure/presentation/evolucion.controller';
import { EvolucionDemoLector } from './infrastructure/lectores-demo';

import { MEDICIONES_LECTOR_TOKEN, CONSUMOS_LECTOR_TOKEN, ENTRENAMIENTOS_LECTOR_TOKEN } from './domain/ports';

import { EvolucionFacade } from './application/facades';
import { ObtenerEvolucionBoxeadorUseCase } from './application/use-cases';
import { AccesoEvolucionValidator } from './application/services';

@Module({
  imports: [
    UsuariosModule
  ],
  controllers: [
    EvolucionController
  ],
  providers: [
    ObtenerEvolucionBoxeadorUseCase,
    AccesoEvolucionValidator,
    EvolucionFacade,
    // TEMPORAL: reemplazar por los repositorios reales de Monitoreo y Entrenamientos.
    EvolucionDemoLector,
    { provide: MEDICIONES_LECTOR_TOKEN, useExisting: EvolucionDemoLector },
    { provide: CONSUMOS_LECTOR_TOKEN, useExisting: EvolucionDemoLector },
    { provide: ENTRENAMIENTOS_LECTOR_TOKEN, useExisting: EvolucionDemoLector }
  ]
})
export class EvolucionModule {}
