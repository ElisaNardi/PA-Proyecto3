import { Medida } from "../../../../shared/domain/value-objects/medida.vo";

export class Objetivo {
    constructor(
        private readonly id: number | null,
        private descripcion: string,
        private pesoObjetivo: Medida
    ) {}

    public getId(): number | null {
        return this.id;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getPesoObjetivo(): number {
        return this.pesoObjetivo.getMedida();
    }
}
