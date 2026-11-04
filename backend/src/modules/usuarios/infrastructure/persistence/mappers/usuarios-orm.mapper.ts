import { UsuariosFactory } from "../../../domain/factories";
import { Usuario, Boxeador, Entrenador } from "../../../domain/entities";

import { UsuarioOrmEntity, BoxeadorOrmEntity, EntrenadorOrmEntity } from "../entities";

export class UsuarioOrmMapper {
    static toOrmUsuario(usuario: Usuario): UsuarioOrmEntity {
        const orm = new UsuarioOrmEntity();

        if (usuario.getId() !== null) {
            orm.id = usuario.getId()!;
        }
        orm.nombre = usuario.getNombre();
        orm.email = usuario.getEmail();
        orm.passwordHash = usuario.getPasswordHash();
        orm.rol = usuario.getRol();

        return orm;
    }

    static toOrmBoxeador(boxeador: Boxeador, id: number): BoxeadorOrmEntity {
        const orm = new BoxeadorOrmEntity();

        orm.id = id;
        orm.entrenadorId = boxeador.getEntrenadorId();
        orm.pesoInicial = boxeador.getPesoInicial();
        orm.alturaInicial = boxeador.getAlturaInicial();
        orm.categoria = boxeador.getCategoria();
        orm.sexo = boxeador.getSexo();

        return orm;
    }

    static toOrmEntrenador(id: number): EntrenadorOrmEntity {
        const orm = new EntrenadorOrmEntity();
        orm.id = id;
        return orm;
    }

    static toDomainBoxeador(usuarioOrm: UsuarioOrmEntity, boxeadorOrm: BoxeadorOrmEntity): Boxeador {
        return UsuariosFactory.reconstruirBoxeador({
            id: usuarioOrm.id,
            nombre: usuarioOrm.nombre,
            email: usuarioOrm.email,
            passwordHash: usuarioOrm.passwordHash,
            entrenadorId: boxeadorOrm.entrenadorId,
            pesoInicial: boxeadorOrm.pesoInicial,
            alturaInicial: boxeadorOrm.alturaInicial,
            sexo: boxeadorOrm.sexo,
            categoria: boxeadorOrm.categoria
        });
    }

    static toDomainEntrenador(usuarioOrm: UsuarioOrmEntity): Entrenador {
        return UsuariosFactory.reconstruirEntrenador({
            id: usuarioOrm.id,
            nombre: usuarioOrm.nombre,
            email: usuarioOrm.email,
            passwordHash: usuarioOrm.passwordHash
        });
    }
}
