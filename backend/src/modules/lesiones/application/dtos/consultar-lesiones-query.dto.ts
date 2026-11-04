import { IsEnum, IsOptional } from "class-validator";

import { EstadoLesion } from "../../domain/enums";

export class ConsultarLesionesQueryDto {
    @IsOptional()
    @IsEnum(EstadoLesion)
    estado?: EstadoLesion;
}
