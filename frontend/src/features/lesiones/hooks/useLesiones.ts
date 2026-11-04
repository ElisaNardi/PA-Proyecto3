import { useQuery } from '@tanstack/react-query';

import { EstadoLesion } from '../../../core/types';

import { listarLesiones, type LesionResponse } from '../api/lesiones.api';

import { clavesLesiones } from './claves';

/** Más recientes primero; a igual fecha, la última cargada primero. */
function ordenar(lesiones: LesionResponse[]): LesionResponse[] {
  return [...lesiones].sort((a, b) => b.fecha.localeCompare(a.fecha) || b.idLesion - a.idLesion);
}

export function useLesiones(idBoxeador: number, estado?: EstadoLesion) {
  return useQuery({
    queryKey: clavesLesiones.lista(idBoxeador, estado),
    queryFn: () => listarLesiones(idBoxeador, estado),
    select: ordenar,
  });
}

/** Lesiones activas de un boxeador (GET …/lesiones?estado=ACTIVA). */
export function useLesionesActivas(idBoxeador: number) {
  return useLesiones(idBoxeador, EstadoLesion.ACTIVA);
}
