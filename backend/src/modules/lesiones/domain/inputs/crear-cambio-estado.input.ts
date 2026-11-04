import { EstadoLesion } from "../enums";

export interface CrearCambioEstado {
    estadoNuevo: EstadoLesion;
    estadoAnterior?: EstadoLesion;
    fecha?: Date;
}
