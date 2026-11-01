import { Medida } from "../../../../shared/domain/value-objects/medida.vo";

import { CrearBoxeadorInput } from "../inputs/crear-boxeador.input";
import { CrearEntrenadorInput } from "../inputs/crear-entrenador.input";
import { ReconstruirBoxeadorInput } from "../inputs/reconstruir-boxeador.input";
import { ReconstruirEntrenadorInput } from "../inputs/reconstruir-entrenador.input";

import { Email } from "../value-objects/email.vo";

import { Boxeador } from "../entities/boxeador.entity";
import { Entrenador } from "../entities/entrenador.entity";

export class UsuariosFactory {
    static crearBoxeador(input: CrearBoxeadorInput): Boxeador {
        const email = Email.crear(input.email);
        return new Boxeador(
            null,
            input.nombre,
            email,
            input.passwordHash,
            null,
            null,
            null,
            input.sexo,
            null
        );
    }

    static crearEntrenador(input: CrearEntrenadorInput): Entrenador {
        const email = Email.crear(input.email);
        return new Entrenador(
            null,
            input.nombre,
            email,
            input.passwordHash
        );
    }

    static reconstruirBoxeador(input: ReconstruirBoxeadorInput): Boxeador {
        const email = Email.crear(input.email);
        const pesoInicial = input.pesoInicial ? Medida.crear(input.pesoInicial) : null;
        const alturaInicial = input.alturaInicial ? Medida.crear(input.alturaInicial) : null;
        return new Boxeador(
            input.id,
            input.nombre,
            email,
            input.passwordHash,
            input.entrenadorId,
            pesoInicial,
            alturaInicial,
            input.sexo,
            input.categoria
        );
    }

    static reconstruirEntrenador(input: ReconstruirEntrenadorInput): Entrenador {
        const email = Email.crear(input.email);
        return new Entrenador(
            input.id,
            input.nombre,
            email,
            input.passwordHash
        );
    }
}
