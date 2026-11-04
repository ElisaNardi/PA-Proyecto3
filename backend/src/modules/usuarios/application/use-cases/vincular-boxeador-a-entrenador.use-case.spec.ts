import { ForbiddenException } from "@nestjs/common";

import { type IUnitOfWork } from "../../../../shared/application/unit-of-work";

import { type IUsuariosRepository } from "../../domain/ports";
import { UsuariosFactory } from "../../domain/factories";
import { Boxeador } from "../../domain/entities";
import { Sexo } from "../../domain/enums";

import { BoxeadorEmailNoEncontradoException, BoxeadorYaVinculadoException } from "../exceptions";
import { BoxeadorFinder } from "../services";

import { VincularBoxeadorAEntrenadorUseCase } from "./vincular-boxeador-a-entrenador.use-case";

const crearBoxeador = (entrenadorId: number | null): Boxeador => UsuariosFactory.reconstruirBoxeador({
    id: 7,
    nombre: 'Juan',
    email: 'juan@evobox.com',
    passwordHash: 'hash',
    entrenadorId,
    pesoInicial: null,
    alturaInicial: null,
    sexo: Sexo.MASCULINO,
    categoria: null
});

describe('VincularBoxeadorAEntrenadorUseCase', () => {
    let save: jest.MockedFunction<IUsuariosRepository['save']>;
    let findByEmail: jest.MockedFunction<IUsuariosRepository['findByEmail']>;
    let uow: IUnitOfWork;
    let useCase: VincularBoxeadorAEntrenadorUseCase;

    beforeEach(() => {
        save = jest.fn(async (usuario) => usuario);
        findByEmail = jest.fn();
        const repo: IUsuariosRepository = {
            save,
            findByEmail,
            findById: jest.fn(),
            findBoxeadoresByEntrenador: jest.fn()
        };
        uow = { runInTransaction: (work) => work() };
        useCase = new VincularBoxeadorAEntrenadorUseCase(uow, repo, new BoxeadorFinder(repo));
    });

    it('vincula al boxeador encontrado por email', async () => {
        const boxeador = crearBoxeador(null);
        findByEmail.mockResolvedValue(boxeador);

        const respuesta = await useCase.execute(3, 3, { email: 'juan@evobox.com' });

        expect(findByEmail).toHaveBeenCalledWith('juan@evobox.com');
        expect(save).toHaveBeenCalledWith(boxeador);
        expect(boxeador.getEntrenadorId()).toBe(3);
        expect(respuesta).toEqual({
            idEntrenador: 3,
            idBoxeador: 7,
            vinculadoEl: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
        });
    });

    it('lanza 404 si el email no existe', async () => {
        findByEmail.mockResolvedValue(null);

        const ejecucion = useCase.execute(3, 3, { email: 'nadie@evobox.com' });

        await expect(ejecucion).rejects.toBeInstanceOf(BoxeadorEmailNoEncontradoException);
        await expect(ejecucion).rejects.toThrow('No existe un boxeador con ese email');
        expect(save).not.toHaveBeenCalled();
    });

    it('lanza 404 si el email es de un entrenador', async () => {
        findByEmail.mockResolvedValue(UsuariosFactory.reconstruirEntrenador({
            id: 4,
            nombre: 'Pedro',
            email: 'pedro@evobox.com',
            passwordHash: 'hash'
        }));

        const ejecucion = useCase.execute(3, 3, { email: 'pedro@evobox.com' });

        await expect(ejecucion).rejects.toBeInstanceOf(BoxeadorEmailNoEncontradoException);
        await expect(ejecucion).rejects.toThrow('No existe un boxeador con ese email');
        expect(save).not.toHaveBeenCalled();
    });

    it('lanza 409 si el boxeador ya tiene entrenador', async () => {
        findByEmail.mockResolvedValue(crearBoxeador(5));

        await expect(useCase.execute(3, 3, { email: 'juan@evobox.com' })).rejects.toBeInstanceOf(BoxeadorYaVinculadoException);
        expect(save).not.toHaveBeenCalled();
    });

    it('lanza 403 si el entrenador de la ruta no es el autenticado', async () => {
        await expect(useCase.execute(3, 9, { email: 'juan@evobox.com' })).rejects.toBeInstanceOf(ForbiddenException);
        expect(findByEmail).not.toHaveBeenCalled();
        expect(save).not.toHaveBeenCalled();
    });
});
