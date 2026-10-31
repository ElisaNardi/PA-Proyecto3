import { EstadoLesion } from "../enums/estado-lesion.enum";

export interface ReconstruirCambioEstado {
    id: number;
    estadoAnterior: EstadoLesion | null;
    estadoActual: EstadoLesion;
    fecha: Date;
}
