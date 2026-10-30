import { Rol } from "../enums/rol.enum";
import { Email } from "../value-objects/email.vo";
import { Boxeador } from "./boxeador.entity";
import { Usuario } from "./usuario.entity";

export class Entrenador extends Usuario {
    constructor(
        id: number | null,
        nombre: string,
        email: Email,
        passwordHash: string,
        rol: Rol,
        private readonly boxeadores: Boxeador[]
    ) {
        super(id, nombre, email, passwordHash, rol);
    }

    public getBoxeadores(): Boxeador[] {
        return this.boxeadores;
    }
}
