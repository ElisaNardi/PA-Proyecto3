import { EstadoLesion, Gravedad } from "../enums";
import { FechaLesionFuturaException } from "../exceptions";
import { CrearLesionInput } from "../inputs";

import { LesionesFactory } from "./lesiones.factory";

const AHORA = new Date('2026-11-04T15:00:00Z');

const crearInput = (fecha: Date): CrearLesionInput => ({
    boxeadorId: 7,
    zona: 'HOMBRO',
    descripcion: 'Molestia al levantar el brazo',
    gravedad: Gravedad.MODERADA,
    fecha
});

describe('LesionesFactory', () => {
    beforeEach(() => {
        jest.useFakeTimers({ now: AHORA });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('crear', () => {
        it('el primer cambio lleva la fecha de la lesión, sin estado anterior y ACTIVA', () => {
            const fecha = new Date('2026-10-20');

            const lesion = LesionesFactory.crear(crearInput(fecha));

            const cambios = lesion.getCambiosEstado();
            expect(cambios).toHaveLength(1);
            expect(cambios[0].getFecha()).toEqual(fecha);
            expect(cambios[0].getEstadoAnterior()).toBeNull();
            expect(cambios[0].getEstadoActual()).toBe(EstadoLesion.ACTIVA);
            expect(lesion.getEstadoActual()).toBe(EstadoLesion.ACTIVA);
        });

        it('rechaza una fecha futura', () => {
            const manana = new Date('2026-11-05');

            expect(() => LesionesFactory.crear(crearInput(manana))).toThrow(FechaLesionFuturaException);
            expect(() => LesionesFactory.crear(crearInput(manana))).toThrow('La fecha de la lesión no puede ser futura');
        });

        it('acepta la fecha de hoy y el momento actual', () => {
            expect(() => LesionesFactory.crear(crearInput(new Date('2026-11-04')))).not.toThrow();
            expect(() => LesionesFactory.crear(crearInput(new Date(AHORA)))).not.toThrow();
        });
    });

    describe('reconstruir', () => {
        it('acepta una fecha futura', () => {
            const futura = new Date('2027-01-01');

            const lesion = LesionesFactory.reconstruir({
                id: 5,
                boxeadorId: 7,
                zona: 'HOMBRO',
                descripcion: 'Molestia al levantar el brazo',
                gravedad: Gravedad.MODERADA,
                fecha: futura,
                cambiosEstado: [{ id: 1, estadoAnterior: null, estadoActual: EstadoLesion.ACTIVA, fecha: futura }]
            });

            expect(lesion.getFecha()).toEqual(futura);
            expect(lesion.getCambiosEstado()[0].getFecha()).toEqual(futura);
        });
    });
});
