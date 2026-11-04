import { Gravedad } from "../enums";

export interface CrearLesionInput {
    boxeadorId: number;
    zona: string;
    descripcion: string;
    gravedad: Gravedad;
    fecha: Date;
}
