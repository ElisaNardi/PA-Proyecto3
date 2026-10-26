import { Test, TestingModule } from '@nestjs/testing';
import { EntrenamientosController } from './entrenamientos.controller';
import { EntrenamientosService } from '../application/entrenamientos.service';

describe('EntrenamientosController', () => {
  let controller: EntrenamientosController;

  const mockEntrenamientosService = {
    obtenerTodos: jest.fn().mockReturnValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntrenamientosController],
      providers: [
        {
          provide: EntrenamientosService,
          useValue: mockEntrenamientosService,
        },
      ],
    }).compile();

    controller = module.get<EntrenamientosController>(
      EntrenamientosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debería obtener los entrenamientos', () => {
    expect(controller.obtenerEntrenamientos()).toEqual([]);
  });
});