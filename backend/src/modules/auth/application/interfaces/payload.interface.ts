import { Rol } from "../../../usuarios/domain/enums/rol.enum";

export interface Payload {
    sub: number;
    rol: Rol;
}
