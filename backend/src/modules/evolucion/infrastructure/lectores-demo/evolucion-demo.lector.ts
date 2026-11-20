import { Injectable } from "@nestjs/common";

import {
    type IMedicionesLector, type PesoRegistrado,
    type IConsumosLector, type ConsumoRegistrado,
    type IEntrenamientosLector, type RutinaAsignada
} from "../../domain/ports";

// TEMPORAL: datos de ejemplo (los del contrato de API) para poder probar la pantalla
// mientras Monitoreo y Entrenamientos no tienen sus repositorios.
// Cuando existan, se reemplaza por un adaptador por puerto que use esos repositorios
// y se cambia el provider en evolucion.module.ts. Los casos de uso no se tocan.
@Injectable()
export class EvolucionDemoLector implements IMedicionesLector, IConsumosLector, IEntrenamientosLector {
    private readonly pesos: PesoRegistrado[] = [
        { fecha: new Date('2026-09-01'), peso: 70 },
        { fecha: new Date('2026-10-01'), peso: 68.5 },
        { fecha: new Date('2026-10-26'), peso: 67.2 }
    ];

    private readonly consumos: ConsumoRegistrado[] = [
        { fecha: new Date('2026-10-24'), calorias: 2000 },
        { fecha: new Date('2026-10-25'), calorias: 2100 },
        { fecha: new Date('2026-10-26'), calorias: 2350 }
    ];

    async findPesosEntre(_boxeadorId: number, desde: Date | null, hasta: Date): Promise<PesoRegistrado[]> {
        return this.pesos.filter(p => (desde === null || p.fecha >= desde) && p.fecha <= hasta);
    }

    async findConsumosEntre(_boxeadorId: number, desde: Date, hasta: Date): Promise<ConsumoRegistrado[]> {
        return this.consumos.filter(c => c.fecha >= desde && c.fecha <= hasta);
    }

    async findMetaDiariaVigente(): Promise<number | null> {
        return 2200;
    }

    // 20 rutinas asignadas, 17 completadas (no filtra por fecha: Rutina no tiene fecha propia).
    async findRutinasEntre(): Promise<RutinaAsignada[]> {
        return Array.from({ length: 20 }, (_, i) => ({ completada: i < 17 }));
    }

    async findPesoObjetivoVigente(): Promise<number | null> {
        return 66.7;
    }
}
