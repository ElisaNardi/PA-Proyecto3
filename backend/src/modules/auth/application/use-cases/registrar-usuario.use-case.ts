import { Inject, Injectable } from "@nestjs/common";

import { type IUnitOfWork, UNIT_OF_WORK_TOKEN } from "../../../../shared/application/unit-of-work/unit-of-work.port";

import { Rol } from "../../../../shared/domain/enums/rol.enum";
import { UsuariosFactory } from "../../../usuarios/domain/factories/usuarios.factory";
import { type IUsuariosRepository, USUARIOS_REPOSITORY_TOKEN } from "../../../usuarios/domain/ports/usuarios-repository.port";

import { UsuarioResponse } from "../responses/usuario.response";
import { RegistrarUsuarioDto } from "../dtos/registrar-usuario.dto";
import { UsuarioResponseMapper } from "../mappers/usuarios-response.mapper";
import { EmailYaRegistradoException } from "../exceptions/email-ya-registrado.exception";
import { type IHasher, HASHER_TOKEN } from "../ports/hasher.port";

@Injectable()
export class RegistrarUsuarioUseCase {
    constructor(
        @Inject(UNIT_OF_WORK_TOKEN)
        private readonly uow: IUnitOfWork,
        @Inject(USUARIOS_REPOSITORY_TOKEN)
        private readonly repo: IUsuariosRepository,
        @Inject(HASHER_TOKEN)
        private readonly hasher: IHasher
    ) {}

    async execute(dto: RegistrarUsuarioDto): Promise<UsuarioResponse> {
        const existente = await this.repo.findByEmail(dto.email);
        if (existente) {
            throw new EmailYaRegistradoException();
        }

        const passwordHash = await this.hasher.hashearPassword(dto.password);

        const usuario = dto.rol === Rol.BOXEADOR
                        ? UsuariosFactory.crearBoxeador({
                            nombre: dto.nombre,
                            email: dto.email,
                            passwordHash,
                            sexo: dto.sexo!
                        })
                        : UsuariosFactory.crearEntrenador({
                            nombre: dto.nombre,
                            email: dto.email,
                            passwordHash
                        });
        
        return this.uow.runInTransaction(async () => {
            const guardado = await this.repo.save(usuario);
            return UsuarioResponseMapper.toUsuarioResponse(guardado);
        });
    }
}
