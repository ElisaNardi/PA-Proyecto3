import { Inject, Injectable } from "@nestjs/common";

import { Rol } from "../../../../shared/domain/enums";

import {
    type IMedicionesLector, MEDICIONES_LECTOR_TOKEN,
    type IConsumosLector, CONSUMOS_LECTOR_TOKEN,
    type IEntrenamientosLector, ENTRENAMIENTOS_LECTOR_TOKEN
} from "../../domain/ports";
import { CumplimientoRutinas, ProgresoPeso, ConsumoCalorico } from "../../domain/value-objects";

import { ObtenerEvolucionQueryDto } from "../dtos";
import { EvolucionResponse } from "../responses";
import { EvolucionResponseMapper } from "../mappers";
import { PeriodoInvalidoException } from "../exceptions";
import { AccesoEvolucionValidator } from "../services";

@Injectable()
export class ObtenerEvolucionBoxeadorUseCase {
    constructor(
        @Inject(MEDICIONES_LECTOR_TOKEN)
        private readonly mediciones: IMedicionesLector,
        @Inject(CONSUMOS_LECTOR_TOKEN)
        private readonly consumos: IConsumosLector,
        @Inject(ENTRENAMIENTOS_LECTOR_TOKEN)
        private readonly entrenamientos: IEntrenamientosLector,
        private readonly acceso: AccesoEvolucionValidator
    ) {}

    async execute(idBoxeador: number, idUsuarioAutenticado: number, rolAutenticado: Rol, query: ObtenerEvolucionQueryDto): Promise<EvolucionResponse> {
        await this.acceso.validar(idBoxeador, idUsuarioAutenticado, rolAutenticado);

        const hasta = query.hasta ? this.soloFecha(new Date(query.hasta)) : this.soloFecha(new Date());
        const desdePedido = query.desde ? this.soloFecha(new Date(query.desde)) : null;

        if (desdePedido && desdePedido > hasta) {
            throw new PeriodoInvalidoException();
        }

        const pesos = await this.mediciones.findPesosEntre(idBoxeador, desdePedido, hasta);

        // Si no pidió "desde", el período arranca en la primera medición (o en "hasta" si todavía no hay ninguna).
        const desde = desdePedido ?? (pesos[0] ? this.soloFecha(pesos[0].fecha) : hasta);

        const [rutinas, registros, metaDiaria, pesoObjetivo] = await Promise.all([
            this.entrenamientos.findRutinasEntre(idBoxeador, desde, hasta),
            this.consumos.findConsumosEntre(idBoxeador, desde, hasta),
            this.consumos.findMetaDiariaVigente(idBoxeador, hasta),
            this.entrenamientos.findPesoObjetivoVigente(idBoxeador)
        ]);

        const cumplimiento = CumplimientoRutinas.calcular(rutinas.length, rutinas.filter(r => r.completada).length);
        const peso = ProgresoPeso.calcular(
            pesos[0]?.peso ?? null,
            pesos[pesos.length - 1]?.peso ?? null,
            pesoObjetivo
        );
        const consumo = ConsumoCalorico.calcular(registros.map(r => r.calorias), metaDiaria);

        return EvolucionResponseMapper.toResponse(desde, hasta, cumplimiento, peso, consumo);
    }

    // Deja solo el día (a las 00:00 UTC) para comparar fechas sin que importe la hora.
    private soloFecha(fecha: Date): Date {
        return new Date(fecha.toISOString().slice(0, 10));
    }
}
