import { CumplimientoRutinasInvalidoException } from "../exceptions";

import { CumplimientoRutinas } from "./cumplimiento-rutinas.vo";

describe('CumplimientoRutinas', () => {
    describe('getPorcentaje', () => {
        it('calcula el porcentaje de rutinas completadas (17 de 20 = 85)', () => {
            const cumplimiento = CumplimientoRutinas.calcular(20, 17);

            expect(cumplimiento.getPorcentaje()).toBe(85);
        });

        it('devuelve 0 cuando no completó ninguna rutina', () => {
            const cumplimiento = CumplimientoRutinas.calcular(20, 0);

            expect(cumplimiento.getPorcentaje()).toBe(0);
        });

        it('devuelve 100 cuando completó todas las rutinas', () => {
            const cumplimiento = CumplimientoRutinas.calcular(20, 20);

            expect(cumplimiento.getPorcentaje()).toBe(100);
        });

        it('devuelve 0 y no falla cuando no hay rutinas asignadas', () => {
            const cumplimiento = CumplimientoRutinas.calcular(0, 0);

            expect(cumplimiento.getPorcentaje()).toBe(0);
        });

        it('redondea al entero más cercano (1 de 3 = 33, 2 de 3 = 67)', () => {
            expect(CumplimientoRutinas.calcular(3, 1).getPorcentaje()).toBe(33);
            expect(CumplimientoRutinas.calcular(3, 2).getPorcentaje()).toBe(67);
        });
    });

    describe('getters', () => {
        it('conserva las cantidades asignadas y completadas', () => {
            const cumplimiento = CumplimientoRutinas.calcular(20, 17);

            expect(cumplimiento.getAsignadas()).toBe(20);
            expect(cumplimiento.getCompletadas()).toBe(17);
        });
    });

    describe('validaciones', () => {
        it('rechaza más rutinas completadas que asignadas', () => {
            expect(() => CumplimientoRutinas.calcular(5, 6))
                .toThrow(CumplimientoRutinasInvalidoException);
        });

        it('rechaza cantidades negativas', () => {
            expect(() => CumplimientoRutinas.calcular(-1, 0))
                .toThrow(CumplimientoRutinasInvalidoException);
            expect(() => CumplimientoRutinas.calcular(5, -1))
                .toThrow(CumplimientoRutinasInvalidoException);
        });

        it('rechaza cantidades que no son enteras', () => {
            expect(() => CumplimientoRutinas.calcular(5, 2.5))
                .toThrow(CumplimientoRutinasInvalidoException);
        });
    });
});
