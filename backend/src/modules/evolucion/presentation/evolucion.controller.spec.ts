import { Test, TestingModule } from '@nestjs/testing';
import { EvolucionController } from './evolucion.controller';

describe('EvolucionController', () => {
  let controller: EvolucionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvolucionController],
    }).compile();

    controller = module.get<EvolucionController>(EvolucionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
