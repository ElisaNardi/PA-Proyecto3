import { useQuery } from '@tanstack/react-query';

import { obtenerPerfilBoxeador } from '../api/vinculos.api';

export function usePerfilBoxeador(idBoxeador: number) {
  return useQuery({
    queryKey: ['vinculos', 'perfil', idBoxeador],
    queryFn: () => obtenerPerfilBoxeador(idBoxeador),
    enabled: Number.isInteger(idBoxeador) && idBoxeador > 0,
  });
}
