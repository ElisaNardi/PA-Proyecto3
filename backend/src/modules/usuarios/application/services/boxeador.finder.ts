import { Inject, Injectable } from "@nestjs/common";

import { type IUsuariosRepository, USUARIOS_REPOSITORY_TOKEN } from "../../domain/ports";
import { Boxeador } from "../../domain/entities";

import { BoxeadorNoEncontradoException, BoxeadorEmailNoEncontradoException } from "../exceptions";

@Injectable()
export class BoxeadorFinder {
    constructor(
        @Inject(USUARIOS_REPOSITORY_TOKEN)
        private readonly repo: IUsuariosRepository
    ) {}

    async findOrFail(id: number): Promise<Boxeador> {
        const usuario = await this.repo.findById(id);
        if (!usuario || !(usuario instanceof Boxeador)) {
            throw new BoxeadorNoEncontradoException();
        }
        return usuario;
    }

    async findByEmailOrFail(email: string): Promise<Boxeador> {
        const usuario = await this.repo.findByEmail(email);
        if (!usuario || !(usuario instanceof Boxeador)) {
            throw new BoxeadorEmailNoEncontradoException();
        }
        return usuario;
    }
}
