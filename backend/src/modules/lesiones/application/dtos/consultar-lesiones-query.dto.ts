import { IsEnum, IsOptional } from "class-validator";

import { EstadoLesion } from "../../domain/enums/estado-lesion.enum";

export class ConsultarLesionesQueryDto {
    @IsOptional()
    @IsEnum(EstadoLesion)
    estado?: EstadoLesion;
}
