import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { type IUsuariosRepository, USUARIOS_REPOSITORY_TOKEN } from "../../../usuarios/domain/ports/usuarios-repository.port";

import { type IHasher, HASHER_TOKEN } from "../ports/hasher.port";
import { AutenticarUsuarioDto } from "../dtos/autenticar-usuario.dto";
import { AutenticarUsuarioResponse } from "../responses/autenticar-usuario.response";
import { Payload } from "../interfaces/payload.interface";
import { UsuarioResponseMapper } from "../mappers/usuarios-response.mapper";

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

        const payload: Payload = {
            sub: usuario.getId()!,
            rol: usuario.getRol()
        }
        const accessToken = this.jwtService.sign(payload);

        return UsuarioResponseMapper.toAutenticarUsuarioResponse(usuario, accessToken);
    }
}
