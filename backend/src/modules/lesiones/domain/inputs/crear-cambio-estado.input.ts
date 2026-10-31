import { EstadoLesion } from "../enums/estado-lesion.enum";

export interface CrearCambioEstado {
    estadoNuevo: EstadoLesion;
    estadoAnterior?: EstadoLesion;
}
