import { Injectable } from "@nestjs/common";

import { RegistrarUsuarioDto, AutenticarUsuarioDto } from "../dtos";

import { UsuarioResponse, AutenticarUsuarioResponse } from "../responses";

import { RegistrarUsuarioUseCase, AutenticarUsuarioUseCase } from "../use-cases";

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
