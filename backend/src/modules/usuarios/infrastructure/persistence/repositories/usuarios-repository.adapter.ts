import { Injectable } from "@nestjs/common";

import { GestorEntityManager } from "../../../../../shared/infrastructure/unit-of-work";
import { Rol } from "../../../../../shared/domain/enums";

import { Usuario, Boxeador } from "../../../domain/entities";
import { IUsuariosRepository } from "../../../domain/ports";

import { UsuarioOrmEntity, BoxeadorOrmEntity } from "../entities";
import { UsuarioOrmMapper } from "../mappers";

@Injectable()
export class UsuariosRepository implements IUsuariosRepository {
    constructor(
        private readonly gestor: GestorEntityManager
    ) {}

    async save(usuario: Usuario): Promise<Usuario> {
        const usuarioOrm = UsuarioOrmMapper.toOrmUsuario(usuario);
        const usuarioGuardado = await this.gestor.actual.save(usuarioOrm);

        if (usuario instanceof Boxeador) {
            const boxeadorOrm = UsuarioOrmMapper.toOrmBoxeador(usuario, usuarioGuardado.id);
            const boxeadorGuardado = await this.gestor.actual.save(boxeadorOrm);
            return UsuarioOrmMapper.toDomainBoxeador(usuarioGuardado, boxeadorGuardado);
        }

        const entrenadorOrm = UsuarioOrmMapper.toOrmEntrenador(usuarioGuardado.id);
        await this.gestor.actual.save(entrenadorOrm);
        return UsuarioOrmMapper.toDomainEntrenador(usuarioGuardado);
    }

    async findById(id: number): Promise<Usuario | null> {
        const usuarioOrm = await this.gestor.actual.createQueryBuilder(UsuarioOrmEntity, 'usuarios')
                                                   .where('usuarios.id = :id', { id })
                                                   .getOne();
        if (!usuarioOrm) return null;
        return this.reconstruirDesdeOrm(usuarioOrm);
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        const usuarioOrm = await this.gestor.actual.createQueryBuilder(UsuarioOrmEntity, 'usuarios')
                                                   .where('usuarios.email = :email', { email })
                                                   .getOne();
        if (!usuarioOrm) return null;
        return this.reconstruirDesdeOrm(usuarioOrm);
    }

    async findBoxeadoresByEntrenador(entrenadorId: number): Promise<Boxeador[]> {
        const boxeadoresOrm = await this.gestor.actual.createQueryBuilder(BoxeadorOrmEntity, 'boxeadores')
                                                      .innerJoinAndSelect('boxeadores.usuario', 'usuarios')
                                                      .where('boxeadores.entrenadorId = :entrenadorId', { entrenadorId })
                                                      .orderBy('usuarios.nombre', 'ASC')
                                                      .getMany();
        return boxeadoresOrm.map((boxeadorOrm) => UsuarioOrmMapper.toDomainBoxeador(boxeadorOrm.usuario, boxeadorOrm));
    }

    private async reconstruirDesdeOrm(usuarioOrm: UsuarioOrmEntity): Promise<Usuario> {
        if (usuarioOrm.rol === Rol.BOXEADOR) {
            const boxeadorOrm = await this.gestor.actual.createQueryBuilder(BoxeadorOrmEntity, 'boxeadores')
                                                        .where('boxeadores.id = :id', { id: usuarioOrm.id })
                                                        .getOne();
            return UsuarioOrmMapper.toDomainBoxeador(usuarioOrm, boxeadorOrm!);
        }
        return UsuarioOrmMapper.toDomainEntrenador(usuarioOrm);
    }
}
