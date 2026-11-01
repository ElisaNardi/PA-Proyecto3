import { Sexo } from "../enums/sexo.enum";

export interface CrearBoxeadorInput {
    nombre: string;
    email: string;
    passwordHash: string;
    sexo: Sexo;
}
