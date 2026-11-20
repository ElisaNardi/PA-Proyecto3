import { useQuery } from '@tanstack/react-query';

import { obtenerEvolucion, type PeriodoEvolucion } from '../api/evolucion.api';

export function useEvolucion(idBoxeador: number, periodo: PeriodoEvolucion, habilitada = true) {
  return useQuery({
    queryKey: ['evolucion', idBoxeador, periodo.desde ?? null, periodo.hasta ?? null],
    queryFn: () => obtenerEvolucion(idBoxeador, periodo),
    enabled: habilitada && Number.isInteger(idBoxeador) && idBoxeador > 0,
  });
}
