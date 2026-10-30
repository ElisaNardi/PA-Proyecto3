import { EstadoLesion } from "../enums/estado-lesion.enum";

export class CambioEstadoLesion {
    constructor(
        private readonly id: number | null,
        private readonly estadoAnterior: EstadoLesion | null,
        private readonly estadoActual: EstadoLesion,
        private readonly fecha: Date
    ) {}

    public getId(): number | null {
        return this.id;
    }

    public getEstadoAnterior(): EstadoLesion | null {
        return this.estadoAnterior;
    }

    public getEstadoActual(): EstadoLesion {
        return this.estadoActual;
    }

    public getFecha(): Date {
        return this.fecha;
    }
}
