import { EstadoLesion } from "../../domain/enums";

export interface CambioEstadoResponse {
    idCambioEstadoLesion: number;
    estadoAnterior: EstadoLesion | null;
    estadoActual: EstadoLesion;
    fecha: string;
}
