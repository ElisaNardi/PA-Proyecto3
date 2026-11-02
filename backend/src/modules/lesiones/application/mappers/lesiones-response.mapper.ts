import { Lesion } from "../../domain/entities";

import { LesionResponse, ActualizarEstadoLesionResponse } from "../responses";

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

    static toActualizarEstadoResponse(lesion: Lesion): ActualizarEstadoLesionResponse {
        return {
            idLesion: lesion.getId()!,
            estado: lesion.getEstadoActual(),
            cambios: lesion.getCambiosEstado().map(c => ({
                idCambioEstadoLesion: c.getId()!,
                estadoAnterior: c.getEstadoAnterior(),
                estadoActual: c.getEstadoActual(),
                fecha: c.getFecha().toISOString().slice(0, 10)
            }))
        };
    }
}
