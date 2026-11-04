import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { JwtPayload } from "../../../../shared/infrastructure/security/interfaces";

import { type IUsuariosRepository, USUARIOS_REPOSITORY_TOKEN } from "../../../usuarios/domain/ports";

import { type IHasher, HASHER_TOKEN } from "../ports";
import { AutenticarUsuarioDto } from "../dtos";
import { AutenticarUsuarioResponse } from "../responses";
import { UsuarioAuthResponseMapper } from "../mappers";

@Injectable()
export class AutenticarUsuarioUseCase {
    constructor(
        @Inject(USUARIOS_REPOSITORY_TOKEN)
        private readonly repo: IUsuariosRepository,
        @Inject(HASHER_TOKEN)
        private readonly hasher: IHasher,
        private readonly jwtService: JwtService
    ) {}

    async execute(dto: AutenticarUsuarioDto): Promise<AutenticarUsuarioResponse> {
        const usuario = await this.repo.findByEmail(dto.email);
        if (!usuario) {
            throw new UnauthorizedException();
        }

        const passwordValida = await this.hasher.compararPassword(dto.password, usuario.getPasswordHash());
        if (!passwordValida) {
            throw new UnauthorizedException();
        }

        const payload: JwtPayload = {
            sub: usuario.getId()!,
            rol: usuario.getRol()
        }
        const accessToken = this.jwtService.sign(payload);

        return UsuarioAuthResponseMapper.toAutenticarUsuarioResponse(usuario, accessToken);
    }
}
