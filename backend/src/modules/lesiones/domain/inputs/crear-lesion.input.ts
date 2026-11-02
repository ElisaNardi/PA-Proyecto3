import { Gravedad } from "../enums/gravedad.enum";

export interface CrearLesionInput {
    boxeadorId: number;
    zona: string;
    descripcion: string;
    gravedad: Gravedad;
    fecha: Date;
}
