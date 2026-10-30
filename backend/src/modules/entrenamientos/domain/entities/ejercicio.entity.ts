import { Medida } from "../../../../shared/domain/value-objects/medida.vo";

export class Ejercicio {
    constructor(
        private readonly id: number | null,
        private nombre: string,
        private descripcion: string,
        private repeticiones: number,
        private series: number,
        private peso: Medida
    ) {}

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

    public getSeries(): number {
        return this.series;
    }

    public getPeso(): number {
        return this.peso.getMedida();
    }
}
