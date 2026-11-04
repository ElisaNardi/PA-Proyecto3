import { IsEmail } from "class-validator";

export class VincularBoxeadorDto {
    @IsEmail()
    email!: string;
}
