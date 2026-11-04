import { EstadoLesion } from "../enums";
import { CrearLesionInput, ReconstruirLesionInput } from "../inputs";
import { CambioEstadoLesion, Lesion } from "../entities";
import { FechaLesionFuturaException } from "../exceptions";

export class LesionesFactory {
    static crear(input: CrearLesionInput): Lesion {
        if (input.fecha > new Date()) {
            throw new FechaLesionFuturaException();
        }

        const cambioEstado = CambioEstadoLesion.crear({ estadoNuevo: EstadoLesion.ACTIVA, fecha: input.fecha });
        return new Lesion(
            null,
            input.boxeadorId,
            input.descripcion,
            input.zona,
            input.gravedad,
            input.fecha,
            [cambioEstado]
        );
    }

    static reconstruir(input: ReconstruirLesionInput): Lesion {
        const cambiosEstado = input.cambiosEstado.map(CambioEstadoLesion.reconstruir);
        return new Lesion(
            input.id,
            input.boxeadorId,
            input.descripcion,
            input.zona,
            input.gravedad,
            input.fecha,
            cambiosEstado
        );
    }
}
