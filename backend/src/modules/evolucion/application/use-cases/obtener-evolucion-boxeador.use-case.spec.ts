import { ForbiddenException } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums";

import { type IUsuariosRepository } from "../../../usuarios/domain/ports";
import { UsuariosFactory } from "../../../usuarios/domain/factories";
import { Sexo } from "../../../usuarios/domain/enums";
import { BoxeadorFinder } from "../../../usuarios/application/services";
import { BoxeadorNoEncontradoException } from "../../../usuarios/application/exceptions";

import { type IMedicionesLector, type IConsumosLector, type IEntrenamientosLector } from "../../domain/ports";

import { PeriodoInvalidoException } from "../exceptions";
import { AccesoEvolucionValidator } from "../services";

import { ObtenerEvolucionBoxeadorUseCase } from "./obtener-evolucion-boxeador.use-case";

const ID_BOXEADOR = 7;
const ID_ENTRENADOR = 3;

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

const rutinas = (completadas: number, asignadas: number) =>
    Array.from({ length: asignadas }, (_, i) => ({ completada: i < completadas }));

describe('ObtenerEvolucionBoxeadorUseCase', () => {
    let findUsuarioById: jest.MockedFunction<IUsuariosRepository['findById']>;
    let findPesosEntre: jest.MockedFunction<IMedicionesLector['findPesosEntre']>;
    let findConsumosEntre: jest.MockedFunction<IConsumosLector['findConsumosEntre']>;
    let findMetaDiariaVigente: jest.MockedFunction<IConsumosLector['findMetaDiariaVigente']>;
    let findRutinasEntre: jest.MockedFunction<IEntrenamientosLector['findRutinasEntre']>;
    let findPesoObjetivoVigente: jest.MockedFunction<IEntrenamientosLector['findPesoObjetivoVigente']>;
    let useCase: ObtenerEvolucionBoxeadorUseCase;

    beforeEach(() => {
        findUsuarioById = jest.fn().mockResolvedValue(boxeador);
        findPesosEntre = jest.fn().mockResolvedValue([
            { fecha: new Date('2026-09-01'), peso: 70 },
            { fecha: new Date('2026-10-01'), peso: 68.5 },
            { fecha: new Date('2026-10-26'), peso: 67.2 }
        ]);
        findConsumosEntre = jest.fn().mockResolvedValue([
            { fecha: new Date('2026-10-24'), calorias: 2000 },
            { fecha: new Date('2026-10-25'), calorias: 2100 },
            { fecha: new Date('2026-10-26'), calorias: 2350 }
        ]);
        findMetaDiariaVigente = jest.fn().mockResolvedValue(2200);
        findRutinasEntre = jest.fn().mockResolvedValue(rutinas(17, 20));
        findPesoObjetivoVigente = jest.fn().mockResolvedValue(66.7);

        const usuariosRepo: IUsuariosRepository = {
            save: jest.fn(),
            findByEmail: jest.fn(),
            findById: findUsuarioById,
            findBoxeadoresByEntrenador: jest.fn()
        };
        const mediciones: IMedicionesLector = { findPesosEntre };
        const consumos: IConsumosLector = { findConsumosEntre, findMetaDiariaVigente };
        const entrenamientos: IEntrenamientosLector = { findRutinasEntre, findPesoObjetivoVigente };

        const acceso = new AccesoEvolucionValidator(new BoxeadorFinder(usuariosRepo));
        useCase = new ObtenerEvolucionBoxeadorUseCase(mediciones, consumos, entrenamientos, acceso);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const query = { desde: '2026-09-01', hasta: '2026-10-26' };

    const respuestaDelContrato = {
        periodo: { desde: '2026-09-01', hasta: '2026-10-26' },
        cumplimientoRutinas: { asignadas: 20, completadas: 17, porcentaje: 85 },
        peso: { inicial: 70, actual: 67.2, objetivo: 66.7 },
        nutricion: { promedioCaloriasDiarias: 2150, metaCaloriasDiarias: 2200 }
    };

    describe('acceso', () => {
        it('devuelve la evolución al propio boxeador con el shape del contrato', async () => {
            await expect(useCase.execute(ID_BOXEADOR, ID_BOXEADOR, Rol.BOXEADOR, query)).resolves.toEqual(respuestaDelContrato);
        });

        it('devuelve la evolución al entrenador vinculado', async () => {
            await expect(useCase.execute(ID_BOXEADOR, ID_ENTRENADOR, Rol.ENTRENADOR, query)).resolves.toEqual(respuestaDelContrato);
        });

        it('lanza 404 si el boxeador no existe y no consulta datos', async () => {
            findUsuarioById.mockResolvedValue(null);

            await expect(useCase.execute(99, 99, Rol.BOXEADOR, query)).rejects.toBeInstanceOf(BoxeadorNoEncontradoException);
            expect(findPesosEntre).not.toHaveBeenCalled();
        });

        it('lanza 403 a otro boxeador', async () => {
            await expect(useCase.execute(ID_BOXEADOR, 8, Rol.BOXEADOR, query)).rejects.toBeInstanceOf(ForbiddenException);
            expect(findPesosEntre).not.toHaveBeenCalled();
        });

        it('lanza 403 a un entrenador no vinculado', async () => {
            await expect(useCase.execute(ID_BOXEADOR, 4, Rol.ENTRENADOR, query)).rejects.toBeInstanceOf(ForbiddenException);
        });

        it('lanza 403 si el id coincide pero con otro rol', async () => {
            await expect(useCase.execute(ID_BOXEADOR, ID_BOXEADOR, Rol.ENTRENADOR, query)).rejects.toBeInstanceOf(ForbiddenException);
        });
    });

    describe('período', () => {
        it('consulta cada fuente con el período pedido', async () => {
            await useCase.execute(ID_BOXEADOR, ID_BOXEADOR, Rol.BOXEADOR, query);

            const desde = new Date('2026-09-01');
            const hasta = new Date('2026-10-26');
            expect(findPesosEntre).toHaveBeenCalledWith(ID_BOXEADOR, desde, hasta);
            expect(findConsumosEntre).toHaveBeenCalledWith(ID_BOXEADOR, desde, hasta);
            expect(findRutinasEntre).toHaveBeenCalledWith(ID_BOXEADOR, desde, hasta);
            expect(findMetaDiariaVigente).toHaveBeenCalledWith(ID_BOXEADOR, hasta);
        });

        it('si no pide desde, arranca en la primera medición', async () => {
            const respuesta = await useCase.execute(ID_BOXEADOR, ID_BOXEADOR, Rol.BOXEADOR, { hasta: '2026-10-26' });

            expect(respuesta.periodo).toEqual({ desde: '2026-09-01', hasta: '2026-10-26' });
            expect(findPesosEntre).toHaveBeenCalledWith(ID_BOXEADOR, null, new Date('2026-10-26'));
            expect(findRutinasEntre).toHaveBeenCalledWith(ID_BOXEADOR, new Date('2026-09-01'), new Date('2026-10-26'));
        });

        it('si no pide hasta, termina hoy', async () => {
            jest.useFakeTimers().setSystemTime(new Date('2026-11-20T15:30:00Z'));

            const respuesta = await useCase.execute(ID_BOXEADOR, ID_BOXEADOR, Rol.BOXEADOR, { desde: '2026-09-01' });

            expect(respuesta.periodo).toEqual({ desde: '2026-09-01', hasta: '2026-11-20' });
        });

        it('lanza 400 si desde es posterior a hasta y no consulta datos', async () => {
            await expect(
                useCase.execute(ID_BOXEADOR, ID_BOXEADOR, Rol.BOXEADOR, { desde: '2026-10-27', hasta: '2026-10-26' })
            ).rejects.toBeInstanceOf(PeriodoInvalidoException);
            expect(findPesosEntre).not.toHaveBeenCalled();
        });

        it('acepta desde igual a hasta', async () => {
            const respuesta = await useCase.execute(ID_BOXEADOR, ID_BOXEADOR, Rol.BOXEADOR, { desde: '2026-10-26', hasta: '2026-10-26' });

            expect(respuesta.periodo).toEqual({ desde: '2026-10-26', hasta: '2026-10-26' });
        });
    });

    describe('datos faltantes', () => {
        it('sin ningún dato devuelve ceros y null, sin fallar', async () => {
            findPesosEntre.mockResolvedValue([]);
            findConsumosEntre.mockResolvedValue([]);
            findMetaDiariaVigente.mockResolvedValue(null);
            findRutinasEntre.mockResolvedValue([]);
            findPesoObjetivoVigente.mockResolvedValue(null);

            const respuesta = await useCase.execute(ID_BOXEADOR, ID_BOXEADOR, Rol.BOXEADOR, { hasta: '2026-10-26' });

            expect(respuesta).toEqual({
                periodo: { desde: '2026-10-26', hasta: '2026-10-26' },
                cumplimientoRutinas: { asignadas: 0, completadas: 0, porcentaje: 0 },
                peso: { inicial: null, actual: null, objetivo: null },
                nutricion: { promedioCaloriasDiarias: null, metaCaloriasDiarias: null }
            });
        });

        it('con una sola medición, inicial y actual son el mismo peso', async () => {
            findPesosEntre.mockResolvedValue([{ fecha: new Date('2026-10-01'), peso: 68.5 }]);

            const respuesta = await useCase.execute(ID_BOXEADOR, ID_BOXEADOR, Rol.BOXEADOR, query);

            expect(respuesta.peso).toEqual({ inicial: 68.5, actual: 68.5, objetivo: 66.7 });
        });

        it('sin objetivo informa el peso objetivo en null', async () => {
            findPesoObjetivoVigente.mockResolvedValue(null);

            const respuesta = await useCase.execute(ID_BOXEADOR, ID_BOXEADOR, Rol.BOXEADOR, query);

            expect(respuesta.peso).toEqual({ inicial: 70, actual: 67.2, objetivo: null });
        });

        it('sin referencia nutricional informa la meta en null pero mantiene el promedio', async () => {
            findMetaDiariaVigente.mockResolvedValue(null);

            const respuesta = await useCase.execute(ID_BOXEADOR, ID_BOXEADOR, Rol.BOXEADOR, query);

            expect(respuesta.nutricion).toEqual({ promedioCaloriasDiarias: 2150, metaCaloriasDiarias: null });
        });
    });
});
