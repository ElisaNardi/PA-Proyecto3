import { EstadoLesion, Gravedad } from "../enums";
import { LesionesFactory } from "../factories";

describe('Lesion', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    it('creada con fecha pasada y marcada como recuperada queda RECUPERADA con un cambio en el momento actual', () => {
        const fechaLesion = new Date('2026-10-20');
        const ahora = new Date('2026-11-04T15:00:00Z');
        jest.useFakeTimers({ now: ahora });

        const lesion = LesionesFactory.crear({
            boxeadorId: 7,
            zona: 'HOMBRO',
            descripcion: 'Molestia al levantar el brazo',
            gravedad: Gravedad.MODERADA,
            fecha: fechaLesion
        });

        lesion.marcarRecuperada();

        expect(lesion.getEstadoActual()).toBe(EstadoLesion.RECUPERADA);
        const cambios = lesion.getCambiosEstado();
        expect(cambios).toHaveLength(2);
        expect(cambios[1].getEstadoAnterior()).toBe(EstadoLesion.ACTIVA);
        expect(cambios[1].getEstadoActual()).toBe(EstadoLesion.RECUPERADA);
        expect(cambios[1].getFecha()).not.toEqual(fechaLesion);
        expect(cambios[1].getFecha()).toEqual(ahora);
    });
});
