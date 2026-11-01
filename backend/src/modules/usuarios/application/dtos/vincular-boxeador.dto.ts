import { IsInt, IsPositive } from "class-validator";

export class VincularBoxeadorDto {
    @IsInt()
    @IsPositive()
    idBoxeador!: number;
}
