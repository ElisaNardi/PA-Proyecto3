import { IsString, IsNotEmpty, IsEnum, IsDateString } from "class-validator";

import { Gravedad } from "../../domain/enums";

export class RegistrarLesionDto {
    @IsString()
    @IsNotEmpty()
    zona!: string;
    
    @IsString()
    @IsNotEmpty()
    descripcion!: string;

    @IsEnum(Gravedad)
    gravedad!: Gravedad;

    @IsDateString()
    fecha!: string;
}
