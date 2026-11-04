import { EstadoLesion } from "../../domain/enums";

import { CambioEstadoResponse } from "./cambio-estado.response";

export interface ActualizarEstadoLesionResponse {
    idLesion: number;
    estado: EstadoLesion;
    cambios: CambioEstadoResponse[];
}
