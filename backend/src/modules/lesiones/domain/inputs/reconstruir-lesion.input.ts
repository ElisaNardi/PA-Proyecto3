import { Gravedad } from "../enums";

import { ReconstruirCambioEstado } from "./reconstruir-cambio-estado.input";

export interface ReconstruirLesionInput {
    id: number;
    boxeadorId: number;
    descripcion: string;
    zona: string;
    gravedad: Gravedad;
    fecha: Date;
    cambiosEstado: ReconstruirCambioEstado[];
}
