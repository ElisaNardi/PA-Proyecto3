import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, ValidateIf } from 'class-validator';

import { Rol } from '../../../../shared/domain/enums/rol.enum';
import { Sexo } from '../../../usuarios/domain/enums/sexo.enum';

export class RegistrarUsuarioDto {
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    password!: string;

    @IsEnum(Rol)
    rol!: Rol;

    @ValidateIf((dto: RegistrarUsuarioDto) => dto.rol === Rol.BOXEADOR)
    @IsEnum(Sexo)
    sexo?: Sexo;
}
