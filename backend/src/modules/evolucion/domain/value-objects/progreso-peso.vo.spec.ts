import { MedidaInvalidaException } from "../../../../shared/domain/exceptions";

import { ProgresoPeso } from "./progreso-peso.vo";

describe('ProgresoPeso', () => {
    describe('getPorcentajeProgreso', () => {
        it('calcula el avance cuando el boxeador tiene que bajar de peso (70 -> 67,2 con meta 66,7 = 85)', () => {
            const progreso = ProgresoPeso.calcular(70, 67.2, 66.7);

            expect(progreso.getPorcentajeProgreso()).toBe(85);
        });

        it('calcula el avance cuando el boxeador tiene que subir de peso (60 -> 62 con meta 65 = 40)', () => {
            const progreso = ProgresoPeso.calcular(60, 62, 65);

            expect(progreso.getPorcentajeProgreso()).toBe(40);
        });

        it('devuelve 0 cuando todavía no se movió del peso inicial', () => {
            const progreso = ProgresoPeso.calcular(70, 70, 66);

            expect(progreso.getPorcentajeProgreso()).toBe(0);
        });

        it('devuelve 100 cuando llegó justo al peso objetivo', () => {
            const progreso = ProgresoPeso.calcular(70, 66, 66);

            expect(progreso.getPorcentajeProgreso()).toBe(100);
        });

        it('devuelve 100 y no más cuando se pasó del peso objetivo', () => {
            const progreso = ProgresoPeso.calcular(70, 65, 66);

            expect(progreso.getPorcentajeProgreso()).toBe(100);
        });

        it('devuelve 0 y no negativo cuando se alejó de la meta', () => {
            const progreso = ProgresoPeso.calcular(70, 71, 66);

            expect(progreso.getPorcentajeProgreso()).toBe(0);
        });

        it('cuando el peso inicial ya era el objetivo, devuelve 100 si lo mantiene y 0 si se alejó', () => {
            expect(ProgresoPeso.calcular(66, 66, 66).getPorcentajeProgreso()).toBe(100);
            expect(ProgresoPeso.calcular(66, 68, 66).getPorcentajeProgreso()).toBe(0);
        });

        it('devuelve null cuando no hay peso objetivo', () => {
            const progreso = ProgresoPeso.calcular(70, 67.2, null);

            expect(progreso.getPorcentajeProgreso()).toBeNull();
        });

        it('devuelve null cuando todavía no hay mediciones', () => {
            const progreso = ProgresoPeso.calcular(null, null, 66);

            expect(progreso.getPorcentajeProgreso()).toBeNull();
        });
    });

    describe('getVariacionKg', () => {
        it('es negativa cuando bajó de peso', () => {
            const progreso = ProgresoPeso.calcular(70, 67.2, 66.7);

            expect(progreso.getVariacionKg()).toBe(-2.8);
        });

        it('es positiva cuando subió de peso', () => {
            const progreso = ProgresoPeso.calcular(60, 62.5, 65);

            expect(progreso.getVariacionKg()).toBe(2.5);
        });

        it('devuelve null cuando todavía no hay mediciones, aunque haya peso objetivo', () => {
            const progreso = ProgresoPeso.calcular(null, null, 66);

            expect(progreso.getVariacionKg()).toBeNull();
        });

        it('se calcula igual aunque no haya peso objetivo', () => {
            const progreso = ProgresoPeso.calcular(70, 67.2, null);

            expect(progreso.getVariacionKg()).toBe(-2.8);
        });
    });

    describe('getFaltanteKg', () => {
        it('es negativo cuando todavía tiene que bajar (67,2 con meta 66,7 = -0,5)', () => {
            const progreso = ProgresoPeso.calcular(70, 67.2, 66.7);

            expect(progreso.getFaltanteKg()).toBe(-0.5);
        });

        it('es positivo cuando todavía tiene que subir (62 con meta 65 = 3)', () => {
            const progreso = ProgresoPeso.calcular(60, 62, 65);

            expect(progreso.getFaltanteKg()).toBe(3);
        });

        it('devuelve null cuando no hay peso objetivo', () => {
            const progreso = ProgresoPeso.calcular(70, 67.2, null);

            expect(progreso.getFaltanteKg()).toBeNull();
        });
    });

    describe('getters', () => {
        it('conserva los pesos recibidos', () => {
            const progreso = ProgresoPeso.calcular(70, 67.2, 66.7);

            expect(progreso.getInicial()).toBe(70);
            expect(progreso.getActual()).toBe(67.2);
            expect(progreso.getObjetivo()).toBe(66.7);
        });
    });

    describe('validaciones', () => {
        it('rechaza pesos en cero o negativos', () => {
            expect(() => ProgresoPeso.calcular(0, 67, 66)).toThrow(MedidaInvalidaException);
            expect(() => ProgresoPeso.calcular(70, -1, 66)).toThrow(MedidaInvalidaException);
            expect(() => ProgresoPeso.calcular(70, 67, 0)).toThrow(MedidaInvalidaException);
        });
    });
});