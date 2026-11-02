import { EstadoLesion } from "../../domain/enums/estado-lesion.enum";
import { Gravedad } from "../../domain/enums/gravedad.enum";

export interface LesionResponse {
    idLesion: number;
    zona: string;
    descripcion: string;
    gravedad: Gravedad;
    estado: EstadoLesion;
    fecha: string;
}
