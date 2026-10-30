import { Medida } from "../../../../shared/domain/value-objects/medida.vo";

export class RegistroConsumo {
    constructor(
        private readonly id: number | null,
        private readonly boxeadorId: number,
        private readonly fecha: Date,
        private readonly caloriasConsumidas: Medida,
        private readonly proteinasConsumidas: Medida,
        private readonly carbohidratosConsumidos: Medida,
        private readonly grasasConsumidas: Medida
    ) {}

    public getId(): number | null {
        return this.id;
    }

    public getBoxeadorId(): number {
        return this.boxeadorId;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public getCaloriasConsumidas(): number {
        return this.caloriasConsumidas.getMedida();
    }

    public getProteinasConsumidas(): number {
        return this.proteinasConsumidas.getMedida();
    }

    public getCarbohidratosConsumidas(): number {
        return this.carbohidratosConsumidos.getMedida();
    }

    public getGrasasConsumidas(): number {
        return this.grasasConsumidas.getMedida();
    }
}
