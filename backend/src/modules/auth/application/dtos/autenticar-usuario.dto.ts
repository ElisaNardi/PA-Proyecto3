import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AutenticarUsuarioDto {
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}
