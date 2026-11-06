import type { EstadoLesion } from '../../../core/types';

/** Claves de TanStack Query. Invalidar `todas` refresca listas y detalles. */
export const clavesLesiones = {
  todas: ['lesiones'] as const,
  lista: (idBoxeador: number, estado?: EstadoLesion) => ['lesiones', 'lista', idBoxeador, estado ?? 'TODAS'] as const,
  detalle: (idLesion: number) => ['lesiones', 'detalle', idLesion] as const,
};
