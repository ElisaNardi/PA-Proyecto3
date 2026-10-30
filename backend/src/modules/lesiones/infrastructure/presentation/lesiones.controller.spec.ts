import { Test, TestingModule } from '@nestjs/testing';
import { LesionesController } from './lesiones.controller';

describe('LesionesController', () => {
  let controller: LesionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LesionesController],
    }).compile();

    controller = module.get<LesionesController>(LesionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
