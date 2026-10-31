import { EstadoLesion } from "../enums/estado-lesion.enum";

export interface ReconstruirCambioEstado {
    id: number;
    estadoAnterior?: EstadoLesion;
    estadoActual: EstadoLesion;
    fecha: Date;
}
