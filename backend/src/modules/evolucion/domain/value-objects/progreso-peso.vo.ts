import { Medida } from "../../../../shared/domain/value-objects";

export class ProgresoPeso {
    private constructor(
        private readonly inicial: number | null,
        private readonly actual: number | null,
        private readonly objetivo: number | null
    ) {}

    // Cada peso puede ser null: el boxeador todavía no tiene mediciones o el entrenador no definió un peso objetivo.
    public static calcular(inicial: number | null, actual: number | null, objetivo: number | null): ProgresoPeso {
        this.validar(inicial, actual, objetivo);
        return new ProgresoPeso(inicial, actual, objetivo);
    }

    private static validar(inicial: number | null, actual: number | null, objetivo: number | null): void {
        for (const peso of [inicial, actual, objetivo]) {
            if (peso !== null) {
                Medida.crear(peso);
            }
        }
    }

    // Cuánto cambió el peso desde el inicio. Negativo = bajó, positivo = subió.
    public getVariacionKg(): number | null {
        if (this.inicial === null || this.actual === null) {
            return null;
        }
        return this.redondear(this.actual - this.inicial);
    }

    // Cuánto le falta para llegar a la meta. Negativo = tiene que bajar, positivo = tiene que subir.
    public getFaltanteKg(): number | null {
        if (this.actual === null || this.objetivo === null) {
            return null;
        }
        return this.redondear(this.objetivo - this.actual);
    }

    // Porcentaje del camino recorrido hacia el peso objetivo (0 a 100).
    // Sirve igual para bajar que para subir de peso.
    public getPorcentajeProgreso(): number | null {
        if (this.inicial === null || this.actual === null || this.objetivo === null) {
            return null;
        }

        const distanciaTotal = this.inicial - this.objetivo;
        if (distanciaTotal === 0) {
            return this.actual === this.objetivo ? 100 : 0;
        }

        const porcentaje = Math.round(((this.inicial - this.actual) / distanciaTotal) * 100);
        return Math.min(100, Math.max(0, porcentaje));
    }

    public getInicial(): number | null {
        return this.inicial;
    }

    public getActual(): number | null {
        return this.actual;
    }

    public getObjetivo(): number | null {
        return this.objetivo;
    }

    private redondear(valor: number): number {
        return Math.round(valor * 100) / 100;
    }
}