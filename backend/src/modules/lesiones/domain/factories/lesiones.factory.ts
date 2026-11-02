import { CambioEstadoLesion, Lesion } from "../entities";
import { EstadoLesion } from "../enums/estado-lesion.enum";
import { CrearLesionInput, ReconstruirLesionInput } from "../inputs";

export class LesionesFactory {
    static crear(input: CrearLesionInput): Lesion {
        const cambioEstado = CambioEstadoLesion.crear({ estadoNuevo: EstadoLesion.ACTIVA });
        return new Lesion(
            null,
            input.idBoxeador,
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
