import { MedidaInvalidaException, ValorNegativoException } from "../../../../shared/domain/exceptions";

import { ConsumoCalorico } from "./consumo-calorico.vo";

describe('ConsumoCalorico', () => {
    describe('getPromedioDiario', () => {
        it('calcula el promedio de calorías de los días registrados', () => {
            const consumo = ConsumoCalorico.calcular([2000, 2100, 2350], 2200);

            expect(consumo.getPromedioDiario()).toBe(2150);
        });

        it('redondea el promedio al entero más cercano', () => {
            const consumo = ConsumoCalorico.calcular([2000, 2001], 2200);

            expect(consumo.getPromedioDiario()).toBe(2001);
        });

        it('cuenta como día registrado un día con 0 calorías', () => {
            const consumo = ConsumoCalorico.calcular([0, 2000], 2200);

            expect(consumo.getPromedioDiario()).toBe(1000);
            expect(consumo.getDiasRegistrados()).toBe(2);
        });

        it('devuelve null y no falla cuando no hay registros de consumo', () => {
            const consumo = ConsumoCalorico.calcular([], 2200);

            expect(consumo.getPromedioDiario()).toBeNull();
            expect(consumo.getDiasRegistrados()).toBe(0);
        });
    });

    describe('getPorcentajeDeLaMeta', () => {
        it('calcula qué porcentaje de la meta consume en promedio (2150 de 2200 = 98)', () => {
            const consumo = ConsumoCalorico.calcular([2000, 2100, 2350], 2200);

            expect(consumo.getPorcentajeDeLaMeta()).toBe(98);
        });

        it('devuelve 100 cuando consume exactamente la meta', () => {
            const consumo = ConsumoCalorico.calcular([2200], 2200);

            expect(consumo.getPorcentajeDeLaMeta()).toBe(100);
        });

        it('puede superar 100 cuando consume más de lo recomendado (2500 de 2000 = 125)', () => {
            const consumo = ConsumoCalorico.calcular([2500], 2000);

            expect(consumo.getPorcentajeDeLaMeta()).toBe(125);
        });

        it('devuelve null cuando no hay meta calórica', () => {
            const consumo = ConsumoCalorico.calcular([2000, 2100], null);

            expect(consumo.getPromedioDiario()).toBe(2050);
            expect(consumo.getMetaDiaria()).toBeNull();
            expect(consumo.getPorcentajeDeLaMeta()).toBeNull();
        });

        it('devuelve null cuando no hay registros de consumo', () => {
            const consumo = ConsumoCalorico.calcular([], 2200);

            expect(consumo.getPorcentajeDeLaMeta()).toBeNull();
        });
    });

    describe('getters', () => {
        it('conserva la meta diaria recibida', () => {
            const consumo = ConsumoCalorico.calcular([2000], 2200);

            expect(consumo.getMetaDiaria()).toBe(2200);
        });
    });

    describe('validaciones', () => {
        it('rechaza calorías consumidas negativas', () => {
            expect(() => ConsumoCalorico.calcular([2000, -1], 2200))
                .toThrow(ValorNegativoException);
        });

        it('rechaza una meta en cero o negativa', () => {
            expect(() => ConsumoCalorico.calcular([2000], 0)).toThrow(MedidaInvalidaException);
            expect(() => ConsumoCalorico.calcular([2000], -100)).toThrow(MedidaInvalidaException);
        });
    });
});