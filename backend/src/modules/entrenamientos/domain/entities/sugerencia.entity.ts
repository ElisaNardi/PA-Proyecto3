import { EstadoSugerencia } from "../enums/estado-sugerencia.enum";

export class Sugerencia {
    constructor(
        private readonly id: number | null,
        private readonly entrenadorId: number,
        private readonly boxeadorId: number,
        private texto: string,
        private estado: EstadoSugerencia
    ) {}

    public getId(): number | null {
        return this.id;
    }

    public getEntrenadorId(): number {
        return this.entrenadorId;
    }

    public getBoxeadorId(): number {
        return this.boxeadorId;
    }

    public getTexto(): string {
        return this.texto;
    }

    public getEstado(): EstadoSugerencia {
        return this.estado;
    }
}
