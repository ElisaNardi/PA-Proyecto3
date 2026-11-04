import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosFacade } from '../../../application/facades';
import { JwtAuthGuard, RolesGuard } from '../../../../../shared/infrastructure/security/guards';

describe('UsuariosController', () => {
  let controller: UsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosFacade,
          useValue: { vincular: jest.fn(), obtenerBoxeadores: jest.fn(), obtenerPerfilDeBoxeador: jest.fn() },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard).useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard).useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsuariosController>(UsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
