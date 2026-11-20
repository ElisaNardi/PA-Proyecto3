import { Rol } from '../../../../shared/domain/enums';

import { EvolucionFacade } from '../../application/facades';

import { EvolucionController } from './evolucion.controller';

describe('EvolucionController', () => {
  const obtenerEvolucion = jest.fn();
  const controller = new EvolucionController({ obtenerEvolucion } as unknown as EvolucionFacade);

  beforeEach(() => {
    obtenerEvolucion.mockReset();
  });

  it('delega en la fachada con el usuario autenticado y el período', async () => {
    const respuesta = { periodo: { desde: '2026-09-01', hasta: '2026-10-26' } };
    obtenerEvolucion.mockResolvedValue(respuesta);
    const query = { desde: '2026-09-01', hasta: '2026-10-26' };

    const resultado = await controller.obtenerEvolucion(7, { sub: 3, rol: Rol.ENTRENADOR } as never, query);

    expect(obtenerEvolucion).toHaveBeenCalledWith(7, 3, Rol.ENTRENADOR, query);
    expect(resultado).toBe(respuesta);
  });
});
