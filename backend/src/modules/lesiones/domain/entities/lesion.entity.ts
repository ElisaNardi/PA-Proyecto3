import { EstadoLesion } from "../enums/estado-lesion.enum";
import { Gravedad } from "../enums/gravedad.enum";
import { CambioEstadoLesion } from "./cambio-estado-lesion.entity";

export class Lesion {
    constructor(
        private readonly id: number | null,
        private readonly boxeadorId: number,
        private descripcion: string,
        private zona: string,
        private gravedad: Gravedad,
        private readonly fecha: Date,
        private readonly cambiosEstado: CambioEstadoLesion[]
    ) {}

    public getEstadoActual(): EstadoLesion {
        const ultimo = this.cambiosEstado.at(-1);
        return ultimo ? ultimo.getEstadoActual() : EstadoLesion.ACTIVA;
    }

    public getId(): number | null {
        return this.id;
    }

    public getBoxeadorId(): number {
        return this.boxeadorId;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getZona(): string {
        return this.zona;
    }

    public getGravedad(): Gravedad {
        return this.gravedad;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public getCambiosEstado(): CambioEstadoLesion[] {
        return this.cambiosEstado;
    }
}
