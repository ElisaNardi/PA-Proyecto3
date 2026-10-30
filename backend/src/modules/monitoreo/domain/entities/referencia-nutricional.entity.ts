export class ReferenciaNutricional {
    constructor(
        private readonly id: number | null,
        private objetivoId: number,
        private caloriasDiarias: number,
        private proteinas: number,
        private carbohidratos: number,
        private grasas: number,
        private fechaInicio: Date,
        private fechaFin: Date
    ) {}

    public getId(): number | null {
        return this.id;
    }

    public getObjetivoId(): number {
        return this.objetivoId;
    }

    public getCaloriasDiarias(): number {
        return this.caloriasDiarias;
    }

    public getProteinas(): number {
        return this.proteinas;
    }

    public getCarbohidratos(): number {
        return this.carbohidratos;
    }

    public getGrasas(): number {
        return this.grasas;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public getFechaFin(): Date {
        return this.fechaFin;
    }
}
