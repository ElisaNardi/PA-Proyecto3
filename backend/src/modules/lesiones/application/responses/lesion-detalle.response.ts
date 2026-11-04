import { CambioEstadoResponse } from "./cambio-estado.response";
import { LesionResponse } from "./lesion.response";

export interface LesionDetalleResponse extends LesionResponse {
    cambios: CambioEstadoResponse[];
}
