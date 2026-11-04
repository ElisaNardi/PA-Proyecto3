import { EstadoLesion, Gravedad } from "../../domain/enums";

export interface LesionResponse {
    idLesion: number;
    zona: string;
    descripcion: string;
    gravedad: Gravedad;
    estado: EstadoLesion;
    fecha: string;
}
