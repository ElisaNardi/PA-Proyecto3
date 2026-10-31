import { EstadoSugerencia } from "../enums/estado-sugerencia.enum";

export class Sugerencia {
    constructor(
        private readonly id: number | null,
        private readonly entrenadorId: number,
        private readonly boxeadorId: number,
        private texto: string,
        private estado: EstadoSugerencia
    ) {}

    public marcarTomadaEnCuenta(): void {
        this.estado = EstadoSugerencia.TOMADA_EN_CUENTA;
    }

    public marcarNoTomadaEnCuenta(): void {
        this.estado = EstadoSugerencia.NO_TOMADA_EN_CUENTA
    }

    public estaPendiente(): boolean {
        return this.estado === EstadoSugerencia.PENDIENTE;
    }

    public tomadaEnCuenta(): boolean {
        return this.estado === EstadoSugerencia.TOMADA_EN_CUENTA;
    }

    public noTomadaEnCuenta(): boolean {
        return this.estado === EstadoSugerencia.NO_TOMADA_EN_CUENTA;
    }

    public getId(): number | null {
        return this.id;
    }

    public getEntrenadorId(): number {
        return this.entrenadorId;
    }

    public getBoxeadorId(): number {
        return this.boxeadorId;
    }

    public getTexto(): string {
        return this.texto;
    }

    public getEstado(): EstadoSugerencia {
        return this.estado;
    }
}
