import { Injectable } from "@nestjs/common";

import { RegistrarUsuarioDto } from "../dtos/registrar-usuario.dto";
import { AutenticarUsuarioDto } from "../dtos/autenticar-usuario.dto";

import { AutenticarUsuarioResponse } from "../responses/autenticar-usuario.response";
import { UsuarioResponse } from "../responses/usuario.response";

import { RegistrarUsuarioUseCase } from "../use-cases/registrar-usuario.use-case";
import { AutenticarUsuarioUseCase } from "../use-cases/autenticar-usuario.use-case";

@Injectable()
export class AuthFacade {
    constructor(
        private readonly registrarUsuario: RegistrarUsuarioUseCase,
        private readonly autenticarUsuario: AutenticarUsuarioUseCase
    ) {}

    async registrar(dto: RegistrarUsuarioDto): Promise<UsuarioResponse> {
        return this.registrarUsuario.execute(dto);
    }

    async login(dto: AutenticarUsuarioDto): Promise<AutenticarUsuarioResponse> {
        return this.autenticarUsuario.execute(dto);
    }
}
