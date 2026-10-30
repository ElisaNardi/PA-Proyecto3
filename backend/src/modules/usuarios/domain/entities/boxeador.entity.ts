import { NotImplementedException } from "@nestjs/common";
import { CategoriaPeso } from "../../../../shared/domain/enums/categoria-peso.enum";
import { Medida } from "../../../../shared/domain/value-objects/medida.vo";

import { Rol } from "../enums/rol.enum";
import { Sexo } from "../enums/sexo.enum";
import { Email } from "../value-objects/email.vo";

import { Usuario } from "./usuario.entity";

export class Boxeador extends Usuario {
    constructor(
        id: number | null,
        nombre: string,
        email: Email,
        passwordHash: string,
        private entrenadorId: number | null,
        private readonly pesoInicial: Medida | null,
        private readonly alturaInicial: Medida | null,
        private readonly sexo: Sexo,
        private categoria: CategoriaPeso | null
    ) {
        super(id, nombre, email, passwordHash, Rol.BOXEADOR);
    }

    // TODO: implementar calculo de categoría de peso
    public calcularCategoria(): CategoriaPeso {
        throw new NotImplementedException();
    }

    public getEntrenadorId(): number | null {
        return this.entrenadorId;
    }

    public getPesoInicial(): number | null {
        return this.pesoInicial ? this.pesoInicial.getMedida() : null;
    }

    public getAlturaInicial(): number | null {
        return this.alturaInicial ? this.alturaInicial.getMedida() : null;
    }

    public getSexo(): Sexo {
        return this.sexo;
    }

    public getCategoria(): CategoriaPeso | null {
        return this.categoria;
    }
}
