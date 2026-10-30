import { Rol } from "../enums/rol.enum";
import { Email } from "../value-objects/email.vo";

export class Usuario {
    constructor(
        private readonly id: number | null,
        private nombre: string,
        private email: Email,
        private passwordHash: string,
        private readonly rol: Rol
    ) {}

    public getId(): number | null {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getEmail(): string {
        return this.email.getDireccion();
    }

    public getPasswordHash(): string {
        return this.passwordHash;
    }

    public getRol(): Rol {
        return this.rol;
    }
}
