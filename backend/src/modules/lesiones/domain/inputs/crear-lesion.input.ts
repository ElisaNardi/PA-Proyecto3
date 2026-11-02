import { Gravedad } from "../enums/gravedad.enum";

export interface CrearLesionInput {
    idBoxeador: number;
    zona: string;
    descripcion: string;
    gravedad: Gravedad;
    fecha: Date;
}
