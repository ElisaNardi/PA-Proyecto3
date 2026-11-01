import { Rol } from "../../../domain/enums/rol.enum";

export interface JwtPayload {
    sub: number;
    rol: Rol;
}
