import { EstadoLesion, Gravedad } from "../enums";
import { LesionYaEnEseEstadoException } from "../exceptions";

import { CambioEstadoLesion } from "./cambio-estado-lesion.entity";

export class Lesion {
    constructor(
        private readonly id: number | null,
        private readonly boxeadorId: number,
        private descripcion: string,
        private zona: string,
        private gravedad: Gravedad,
        private readonly fecha: Date,
        private readonly cambiosEstado: CambioEstadoLesion[]
    ) {}

    public marcarActiva(): void {
        this.cambiarEstado(EstadoLesion.ACTIVA);
    }

    public marcarRecuperada(): void {
        this.cambiarEstado(EstadoLesion.RECUPERADA);
    }

    private cambiarEstado(nuevo: EstadoLesion): void {
        const actual = this.getEstadoActual();
        if (actual === nuevo) {
            throw new LesionYaEnEseEstadoException();
        }

        const nuevoCambio = CambioEstadoLesion.crear({
            estadoAnterior: actual,
            estadoNuevo: nuevo
        });
        this.cambiosEstado.push(nuevoCambio);
    }

    public getEstadoActual(): EstadoLesion {
        if (this.cambiosEstado.length === 0) {
            return EstadoLesion.ACTIVA;
        }

        const masReciente = this.cambiosEstado.reduce((masReciente, actual) =>
            actual.getFecha() > masReciente.getFecha() ? actual : masReciente
        );

        return masReciente.getEstadoActual();
    }

    public getCambiosEstado(): readonly CambioEstadoLesion[] {
        return [...this.cambiosEstado];
    }

    public getId(): number | null {
        return this.id;
    }

    public getBoxeadorId(): number {
        return this.boxeadorId;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public getZona(): string {
        return this.zona;
    }

    public getGravedad(): Gravedad {
        return this.gravedad;
    }

    public getFecha(): Date {
        return this.fecha;
    }
}
