import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { listarBoxeadores, vincularBoxeador, type VincularBoxeadorRequest } from '../api/vinculos.api';

const claveBoxeadores = (idEntrenador: number) => ['vinculos', 'boxeadores', idEntrenador] as const;

export function useBoxeadoresDelEntrenador(idEntrenador: number) {
  return useQuery({
    queryKey: claveBoxeadores(idEntrenador),
    queryFn: () => listarBoxeadores(idEntrenador),
  });
}

export function useVincularBoxeador(idEntrenador: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (datos: VincularBoxeadorRequest) => vincularBoxeador(idEntrenador, datos),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: claveBoxeadores(idEntrenador) }),
  });
}
