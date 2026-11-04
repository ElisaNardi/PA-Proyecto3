import { EstadoLesion } from "../enums";

export interface ReconstruirCambioEstado {
    id: number;
    estadoAnterior: EstadoLesion | null;
    estadoActual: EstadoLesion;
    fecha: Date;
}
