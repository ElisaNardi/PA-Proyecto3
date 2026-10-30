import { Medida } from "../../../../shared/domain/value-objects/medida.vo";

export class Ejercicio {
    constructor(
        private readonly id: number | null,
        private nombre: string,
        private descripcion: string,
        private repeticiones: number,
        private series: string,
        private peso: Medida | null,
        private completado: boolean,
        private pesoRealizado: Medida | null,
        private repeticionesRealizadas: number | null
    ) {}

    public completar(pesoRealizado: Medida | null, repeticionesRealizadas: number | null): void {
        this.completado = true;
        this.pesoRealizado = pesoRealizado;
        this.repeticionesRealizadas = repeticionesRealizadas;
    }

    public fueCompletado(): boolean {
        return this.completado;
    }

    public getId(): number | null {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getRepeticiones(): number {
        return this.repeticiones;
    }

    public getSeries(): string {
        return this.series;
    }

    public getPeso(): number | null {
        return this.peso ? this.peso.getMedida() : null;
    }

    public getPesoRealizado(): number | null {
        return this.pesoRealizado ? this.pesoRealizado.getMedida() : null;
    }

    public getRepeticionesRealizadas(): number | null {
        return this.repeticionesRealizadas;
    }
}
