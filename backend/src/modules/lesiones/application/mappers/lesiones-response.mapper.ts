import { CambioEstadoLesion, Lesion } from "../../domain/entities";

import { LesionResponse, ActualizarEstadoLesionResponse, LesionDetalleResponse, CambioEstadoResponse } from "../responses";

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
            cambios: lesion.getCambiosEstado().map(c => LesionesResponseMapper.toCambioEstadoResponse(c))
        };
    }

    static toDetalleResponse(lesion: Lesion): LesionDetalleResponse {
        return {
            ...LesionesResponseMapper.toResponse(lesion),
            cambios: lesion.getCambiosEstado().map(c => LesionesResponseMapper.toCambioEstadoResponse(c))
        };
    }

    private static toCambioEstadoResponse(cambio: CambioEstadoLesion): CambioEstadoResponse {
        return {
            idCambioEstadoLesion: cambio.getId()!,
            estadoAnterior: cambio.getEstadoAnterior(),
            estadoActual: cambio.getEstadoActual(),
            fecha: cambio.getFecha().toISOString().slice(0, 10)
        };
    }
}
