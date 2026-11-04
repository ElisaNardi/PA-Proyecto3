import { Rol } from "../../../../shared/domain/enums";

import { Email } from "../value-objects";
import { Usuario } from "./usuario.entity";

export class Entrenador extends Usuario {
    constructor(
        id: number | null,
        nombre: string,
        email: Email,
        passwordHash: string
    ) {
        super(id, nombre, email, passwordHash, Rol.ENTRENADOR);
    }
}
