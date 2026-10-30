import { TipoEntrenamiento } from "../enums/tipo-entrenamiento.enum"
;
import { Objetivo } from "./objetivo.entity";
import { Rutina } from "./rutina.entity";

export class Entrenamiento {
    constructor(
        private readonly id: number | null,
        private readonly boxeadorId: number,
        private readonly tipo: TipoEntrenamiento,
        private readonly rutinas: Rutina[],
        private readonly objetivos: Objetivo[],
        private fechaInicio: Date,
        private fechaFin: Date | null,
        private fechaPelea: Date | null
    ) {}

    public getId(): number | null {
        return this.id;
    }

    public getBoxeadorId(): number {
        return this.boxeadorId;
    }

    public getTipo(): TipoEntrenamiento {
        return this.tipo;
    }

    public getRutinas(): Rutina[] {
        return this.rutinas;
    }

    public getObjetivos(): Objetivo[] {
        return this.objetivos;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public getFechaFin(): Date | null {
        return this.fechaFin;
    }

    public getFechaPelea(): Date | null {
        return this.fechaPelea;
    }
}
