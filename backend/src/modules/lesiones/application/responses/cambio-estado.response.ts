import { EstadoLesion } from "../../domain/enums/estado-lesion.enum";

export interface CambioEstadoResponse {
    idCambioEstadoLesion: number;
    estadoAnterior: EstadoLesion | null;
    estadoActual: EstadoLesion;
    fecha: string;
}
