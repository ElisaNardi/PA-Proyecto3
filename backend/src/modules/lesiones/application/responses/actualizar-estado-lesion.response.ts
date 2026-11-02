import { EstadoLesion } from "../../domain/enums/estado-lesion.enum";
import { CambioEstadoResponse } from "./cambio-estado.response";

export interface ActualizarEstadoLesionResponse {
    idLesion: number;
    estado: EstadoLesion;
    cambios: CambioEstadoResponse[];
}
