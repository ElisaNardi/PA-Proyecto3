import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  actualizarEstadoLesion,
  registrarLesion,
  type ActualizarEstadoLesionRequest,
  type RegistrarLesionRequest,
} from '../api/lesiones.api';

import { clavesLesiones } from './claves';

export function useRegistrarLesion(idBoxeador: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (datos: RegistrarLesionRequest) => registrarLesion(idBoxeador, datos),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: clavesLesiones.todas }),
  });
}

export function useActualizarEstadoLesion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ idLesion, ...datos }: ActualizarEstadoLesionRequest & { idLesion: number }) =>
      actualizarEstadoLesion(idLesion, datos),
    // Invalida listas (Todas y Activas) y el detalle abierto.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: clavesLesiones.todas }),
  });
}
