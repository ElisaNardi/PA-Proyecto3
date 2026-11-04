import { IsEnum } from "class-validator";

import { EstadoLesion } from "../../domain/enums";

export class ActualizarEstadoLesionDto {
    @IsEnum(EstadoLesion)
    estado!: EstadoLesion
}
