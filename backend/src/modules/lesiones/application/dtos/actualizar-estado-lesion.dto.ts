import { IsEnum } from "class-validator";

import { EstadoLesion } from "../../domain/enums/estado-lesion.enum";

export class ActualizarEstadoLesionDto {
    @IsEnum(EstadoLesion)
    estado!: EstadoLesion
}
