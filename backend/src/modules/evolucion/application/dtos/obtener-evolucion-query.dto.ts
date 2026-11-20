import { IsDateString, IsOptional } from "class-validator";

export class ObtenerEvolucionQueryDto {
    @IsOptional()
    @IsDateString()
    desde?: string;

    @IsOptional()
    @IsDateString()
    hasta?: string;
}
