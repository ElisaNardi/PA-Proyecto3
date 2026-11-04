import { Sexo } from "../enums";

export interface CrearBoxeadorInput {
    nombre: string;
    email: string;
    passwordHash: string;
    sexo: Sexo;
}
