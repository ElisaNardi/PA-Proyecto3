import { EstadoLesion } from "../enums/estado-lesion.enum";
import { CrearCambioEstado } from "../inputs/crear-cambio-estado.input";
import { ReconstruirCambioEstado } from "../inputs/reconstruir-cambio-estado.input";

export class CambioEstadoLesion {
    private constructor(
        private readonly id: number | null,
        private readonly estadoAnterior: EstadoLesion | null,
        private readonly estadoActual: EstadoLesion,
        private readonly fecha: Date
    ) {}

    public static crear(input: CrearCambioEstado): CambioEstadoLesion {
        return new CambioEstadoLesion(
            null,
            input.estadoAnterior ?? null,
            input.estadoNuevo,
            new Date()
        );
    }

    public static reconstruir(input: ReconstruirCambioEstado): CambioEstadoLesion {
        return new CambioEstadoLesion(
            input.id,
            input.estadoAnterior,
            input.estadoActual,
            input.fecha
        );
    }

    public getId(): number | null {
        return this.id;
    }

    public getEstadoAnterior(): EstadoLesion | null {
        return this.estadoAnterior;
    }

    public getEstadoActual(): EstadoLesion {
        return this.estadoActual;
    }

    public getFecha(): Date {
        return this.fecha;
    }
}
