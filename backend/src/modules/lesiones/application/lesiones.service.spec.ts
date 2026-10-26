import { Test, TestingModule } from '@nestjs/testing';
import { LesionesService } from './lesiones.service';

describe('LesionesService', () => {
  let service: LesionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LesionesService],
    }).compile();

    service = module.get<LesionesService>(LesionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
