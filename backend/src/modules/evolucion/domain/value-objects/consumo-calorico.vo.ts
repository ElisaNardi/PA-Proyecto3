import { ValorNegativoException } from "../../../../shared/domain/exceptions";
import { Medida } from "../../../../shared/domain/value-objects";

export class ConsumoCalorico {
    private constructor(
        private readonly diasRegistrados: number,
        private readonly promedioDiario: number | null,
        private readonly metaDiaria: number | null
    ) {}

    // caloriasPorDia: las calorías de cada día con registro de consumo dentro del período.
    // metaDiaria: la meta de la referencia nutricional vigente (null si todavía no tiene una).
    public static calcular(caloriasPorDia: number[], metaDiaria: number | null): ConsumoCalorico {
        this.validar(caloriasPorDia, metaDiaria);

        const diasRegistrados = caloriasPorDia.length;
        const promedioDiario = diasRegistrados === 0
            ? null
            : Math.round(caloriasPorDia.reduce((total, calorias) => total + calorias, 0) / diasRegistrados);

        return new ConsumoCalorico(diasRegistrados, promedioDiario, metaDiaria);
    }

    private static validar(caloriasPorDia: number[], metaDiaria: number | null): void {
        if (caloriasPorDia.some(calorias => calorias < 0)) {
            throw new ValorNegativoException();
        }
        if (metaDiaria !== null) {
            Medida.crear(metaDiaria);
        }
    }

    // Qué porcentaje de la meta consume en promedio. Puede superar 100: significa que come más de lo recomendado.
    public getPorcentajeDeLaMeta(): number | null {
        if (this.promedioDiario === null || this.metaDiaria === null) {
            return null;
        }
        return Math.round((this.promedioDiario / this.metaDiaria) * 100);
    }

    public getPromedioDiario(): number | null {
        return this.promedioDiario;
    }

    public getMetaDiaria(): number | null {
        return this.metaDiaria;
    }

    public getDiasRegistrados(): number {
        return this.diasRegistrados;
    }
}