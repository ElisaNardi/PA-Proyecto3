import { ForbiddenException } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums";

import { type IUsuariosRepository } from "../../../usuarios/domain/ports";
import { UsuariosFactory } from "../../../usuarios/domain/factories";
import { Sexo } from "../../../usuarios/domain/enums";
import { BoxeadorFinder } from "../../../usuarios/application/services";

import { type ILesionesRepository } from "../../domain/ports";
import { LesionesFactory } from "../../domain/factories";
import { EstadoLesion, Gravedad } from "../../domain/enums";

import { LesionNoEncontradaException } from "../exceptions";
import { AccesoLesionesValidator } from "../services";

import { ObtenerLesionUseCase } from "./obtener-lesion.use-case";

const ID_BOXEADOR = 7;
const ID_ENTRENADOR = 3;

const lesion = LesionesFactory.reconstruir({
    id: 5,
    boxeadorId: ID_BOXEADOR,
    descripcion: 'Molestia al levantar el brazo',
    zona: 'HOMBRO',
    gravedad: Gravedad.MODERADA,
    fecha: new Date('2026-10-20'),
    cambiosEstado: [
        { id: 1, estadoAnterior: null, estadoActual: EstadoLesion.ACTIVA, fecha: new Date('2026-10-20T10:00:00Z') },
        { id: 2, estadoAnterior: EstadoLesion.ACTIVA, estadoActual: EstadoLesion.RECUPERADA, fecha: new Date('2026-10-25T10:00:00Z') }
    ]
});

const boxeador = UsuariosFactory.reconstruirBoxeador({
    id: ID_BOXEADOR,
    nombre: 'Juan',
    email: 'juan@evobox.com',
    passwordHash: 'hash',
    entrenadorId: ID_ENTRENADOR,
    pesoInicial: null,
    alturaInicial: null,
    sexo: Sexo.MASCULINO,
    categoria: null
});

describe('ObtenerLesionUseCase', () => {
    let findLesionById: jest.MockedFunction<ILesionesRepository['findById']>;
    let findUsuarioById: jest.MockedFunction<IUsuariosRepository['findById']>;
    let useCase: ObtenerLesionUseCase;

    beforeEach(() => {
        findLesionById = jest.fn().mockResolvedValue(lesion);
        findUsuarioById = jest.fn().mockResolvedValue(boxeador);
        const lesionesRepo: ILesionesRepository = {
            save: jest.fn(),
            findById: findLesionById,
            findByBoxeadorId: jest.fn()
        };
        const usuariosRepo: IUsuariosRepository = {
            save: jest.fn(),
            findByEmail: jest.fn(),
            findById: findUsuarioById,
            findBoxeadoresByEntrenador: jest.fn()
        };

        const acceso = new AccesoLesionesValidator(new BoxeadorFinder(usuariosRepo));
        useCase = new ObtenerLesionUseCase(lesionesRepo, acceso);
    });

    const detalleEsperado = {
        idLesion: 5,
        zona: 'HOMBRO',
        descripcion: 'Molestia al levantar el brazo',
        gravedad: Gravedad.MODERADA,
        estado: EstadoLesion.RECUPERADA,
        fecha: '2026-10-20',
        cambios: [
            { idCambioEstadoLesion: 1, estadoAnterior: null, estadoActual: EstadoLesion.ACTIVA, fecha: '2026-10-20' },
            { idCambioEstadoLesion: 2, estadoAnterior: EstadoLesion.ACTIVA, estadoActual: EstadoLesion.RECUPERADA, fecha: '2026-10-25' }
        ]
    };

    it('devuelve el detalle con su historial al boxeador dueño', async () => {
        await expect(useCase.execute(5, ID_BOXEADOR, Rol.BOXEADOR)).resolves.toEqual(detalleEsperado);
        expect(findLesionById).toHaveBeenCalledWith(5);
        expect(findUsuarioById).toHaveBeenCalledWith(ID_BOXEADOR);
    });

    it('devuelve el detalle al entrenador vinculado', async () => {
        await expect(useCase.execute(5, ID_ENTRENADOR, Rol.ENTRENADOR)).resolves.toEqual(detalleEsperado);
    });

    it('lanza 404 si la lesión no existe', async () => {
        findLesionById.mockResolvedValue(null);

        await expect(useCase.execute(99, ID_BOXEADOR, Rol.BOXEADOR)).rejects.toBeInstanceOf(LesionNoEncontradaException);
        expect(findUsuarioById).not.toHaveBeenCalled();
    });

    it('lanza 403 a otro boxeador', async () => {
        await expect(useCase.execute(5, 8, Rol.BOXEADOR)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('lanza 403 a un entrenador no vinculado', async () => {
        await expect(useCase.execute(5, 4, Rol.ENTRENADOR)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('lanza 403 si el id coincide pero con otro rol', async () => {
        await expect(useCase.execute(5, ID_BOXEADOR, Rol.ENTRENADOR)).rejects.toBeInstanceOf(ForbiddenException);
    });
});
