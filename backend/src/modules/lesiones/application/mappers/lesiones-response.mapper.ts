import { Lesion } from "../../domain/entities";
import { LesionResponse } from "../responses/lesion.response";

export class LesionesResponseMapper {
    static toResponse(lesion: Lesion): LesionResponse {
        return {
            idLesion: lesion.getId()!,
            zona: lesion.getZona(),
            descripcion: lesion.getDescripcion(),
            gravedad: lesion.getGravedad(),
            estado: lesion.getEstadoActual(),
            fecha: lesion.getFecha().toISOString().slice(0, 10)
        };
    }
}
