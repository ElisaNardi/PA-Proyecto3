import { api } from '../../../core/api';

// Tipos de backend/src/modules/evolucion/application/{dtos,responses}.

/** EvolucionResponse (GET /boxeadores/:id/evolucion). Lo que no tiene datos viene en null. */
export interface EvolucionResponse {
  periodo: {
    /** 'YYYY-MM-DD' */
    desde: string;
    hasta: string;
  };
  cumplimientoRutinas: {
    asignadas: number;
    completadas: number;
    /** 0-100; 0 si no hay rutinas asignadas. */
    porcentaje: number;
  };
  peso: {
    inicial: number | null;
    actual: number | null;
    objetivo: number | null;
  };
  nutricion: {
    promedioCaloriasDiarias: number | null;
    metaCaloriasDiarias: number | null;
  };
}

/** ObtenerEvolucionQueryDto: sin `desde` arranca en la primera medición; sin `hasta` termina hoy. */
export interface PeriodoEvolucion {
  /** 'YYYY-MM-DD' */
  desde?: string;
  hasta?: string;
}

export async function obtenerEvolucion(idBoxeador: number, periodo: PeriodoEvolucion): Promise<EvolucionResponse> {
  const { data } = await api.get<EvolucionResponse>(`/boxeadores/${idBoxeador}/evolucion`, {
    params: { desde: periodo.desde, hasta: periodo.hasta },
  });
  return data;
}
