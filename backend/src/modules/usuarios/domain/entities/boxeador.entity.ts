import { NotImplementedException } from "@nestjs/common";
import { CategoriaPeso } from "../../../../shared/domain/enums/categoria-peso.enum";
import { Medida } from "../../../../shared/domain/value-objects/medida.vo";

import { Rol } from "../enums/rol.enum";
import { Sexo } from "../enums/sexo.enum";
import { Email } from "../value-objects/email.vo";

import { Entrenador } from "./entrenador.entity";
import { Usuario } from "./usuario.entity";

export class Boxeador extends Usuario {
    constructor(
        id: number | null,
        nombre: string,
        email: Email,
        passwordHash: string,
        rol: Rol,
        private entrenador: Entrenador,
        private readonly pesoInicial: Medida,
        private readonly alturaInicial: Medida,
        private readonly sexo: Sexo,
        private categoria: CategoriaPeso
    ) {
        super(id, nombre, email, passwordHash, rol);
    }

    // TODO: implementar calculo de categoría de peso
    public calcularCategoria(): CategoriaPeso {
        throw new NotImplementedException();
    }

    public getEntrenador(): Entrenador {
        return this.entrenador;
    }

    public getPesoInicial(): number {
        return this.pesoInicial.getMedida();
    }

    public getAlturaInicial(): number {
        return this.alturaInicial.getMedida();
    }

    public getSexo(): Sexo {
        return this.sexo;
    }

    public getCategoria(): CategoriaPeso {
        return this.categoria;
    }
}
