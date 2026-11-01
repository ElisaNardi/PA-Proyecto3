import { ForbiddenException, Inject, Injectable } from "@nestjs/common";

import { type IUnitOfWork, UNIT_OF_WORK_TOKEN } from "../../../../shared/application/unit-of-work/unit-of-work.port";
import { type IUsuariosRepository, USUARIOS_REPOSITORY_TOKEN } from "../../domain/ports/usuarios-repository.port";
import { VincularBoxeadorDto } from "../dtos/vincular-boxeador.dto";
import { VincularBoxeadorResponse } from "../responses/vincular-boxeador.response";
import { Boxeador } from "../../domain/entities/boxeador.entity";
import { BoxeadorNoEncontradoException } from "../exceptions/boxeador-no-encontrado.exception";
import { BoxeadorYaVinculadoException } from "../exceptions/boxeador-ya-vinculado.exception";
import { UsuariosResponseMapper } from "../mappers/usuarios-response.mapper";

@Injectable()
export class VincularBoxeadorAEntrenadorUseCase {
    constructor(
        @Inject(UNIT_OF_WORK_TOKEN)
        private readonly uow: IUnitOfWork,
        @Inject(USUARIOS_REPOSITORY_TOKEN)
        private readonly usuarios: IUsuariosRepository,
    ) {}

    async execute(idEntrenadorRuta: number, idEntrenadorAutenticado: number, dto: VincularBoxeadorDto): Promise<VincularBoxeadorResponse> {
        if (idEntrenadorRuta !== idEntrenadorAutenticado) {
            throw new ForbiddenException();
        }

        const usuario = await this.usuarios.findById(dto.idBoxeador);
        if (!usuario || !(usuario instanceof Boxeador)) {
            throw new BoxeadorNoEncontradoException();
        }

        if (usuario.getEntrenadorId() !== null) {
            throw new BoxeadorYaVinculadoException();
        }

        usuario.vincularA(idEntrenadorRuta);

        return this.uow.runInTransaction(async () => {
            await this.usuarios.save(usuario);
            return UsuariosResponseMapper.toVincularBoxeadorResponse(idEntrenadorRuta, dto.idBoxeador);
        });
    }
}
