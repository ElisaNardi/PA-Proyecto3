import { Test, TestingModule } from '@nestjs/testing';
import { EntrenamientosService } from './entrenamientos.service';

describe('EntrenamientosService', () => {
  let service: EntrenamientosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntrenamientosService],
    }).compile();

    service = module.get<EntrenamientosService>(EntrenamientosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
