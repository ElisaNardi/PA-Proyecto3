import { Controller, Get } from '@nestjs/common';
import { EntrenamientosService } from '../../application/services/entrenamientos.service';

@Controller('entrenamientos')
export class EntrenamientosController {
  constructor(
    private readonly entrenamientosService: EntrenamientosService,
  ) {}

  @Get()
  obtenerEntrenamientos() {
    return this.entrenamientosService.obtenerTodos();
  }
}