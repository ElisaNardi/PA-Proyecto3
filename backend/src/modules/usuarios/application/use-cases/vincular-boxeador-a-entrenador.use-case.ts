import { Inject, Injectable } from "@nestjs/common";

import { type IUnitOfWork, UNIT_OF_WORK_TOKEN } from "../../../../shared/application/unit-of-work";

import { type IUsuariosRepository, USUARIOS_REPOSITORY_TOKEN } from "../../domain/ports";

import { VincularBoxeadorDto } from "../dtos";
import { VincularBoxeadorResponse } from "../responses";
import { UsuariosResponseMapper } from "../mappers";

import { BoxeadorYaVinculadoException } from "../exceptions";
import { AutorizacionValidator, BoxeadorFinder } from "../services";

@Injectable()
export class VincularBoxeadorAEntrenadorUseCase {
    constructor(
        @Inject(UNIT_OF_WORK_TOKEN)
        private readonly uow: IUnitOfWork,
        @Inject(USUARIOS_REPOSITORY_TOKEN)
        private readonly repo: IUsuariosRepository,
        private readonly finder: BoxeadorFinder
    ) {}

    async execute(idEntrenadorRuta: number, idEntrenadorAutenticado: number, dto: VincularBoxeadorDto): Promise<VincularBoxeadorResponse> {
        AutorizacionValidator.validar(idEntrenadorRuta, idEntrenadorAutenticado);

        const usuario = await this.finder.findOrFail(dto.idBoxeador);

        if (usuario.getEntrenadorId() !== null) {
            throw new BoxeadorYaVinculadoException();
        }

        usuario.vincularA(idEntrenadorRuta);

        return this.uow.runInTransaction(async () => {
            await this.repo.save(usuario);
            return UsuariosResponseMapper.toVincularBoxeadorResponse(idEntrenadorRuta, dto.idBoxeador);
        });
    }
}
