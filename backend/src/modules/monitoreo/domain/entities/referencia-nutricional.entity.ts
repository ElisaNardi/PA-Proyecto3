import { Medida } from "../../../../shared/domain/value-objects/medida.vo";

export class ReferenciaNutricional {
    constructor(
        private readonly id: number | null,
        private objetivoId: number,
        private caloriasDiarias: Medida,
        private proteinas: Medida,
        private carbohidratos: Medida,
        private grasas: Medida,
        private fechaInicio: Date,
        private fechaFin: Date | null
    ) {}

    public getId(): number | null {
        return this.id;
    }

    public getObjetivoId(): number {
        return this.objetivoId;
    }

    public getCaloriasDiarias(): number {
        return this.caloriasDiarias.getMedida();
    }

    public getProteinas(): number {
        return this.proteinas.getMedida();
    }

    public getCarbohidratos(): number {
        return this.carbohidratos.getMedida();
    }

    public getGrasas(): number {
        return this.grasas.getMedida();
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public getFechaFin(): Date | null {
        return this.fechaFin;
    }
}
