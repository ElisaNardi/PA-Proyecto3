import { useQuery } from '@tanstack/react-query';

import { obtenerLesion, type LesionDetalleResponse } from '../api/lesiones.api';

import { clavesLesiones } from './claves';

/** Historial por fecha; a igual fecha, por orden de alta. */
function ordenarCambios(detalle: LesionDetalleResponse): LesionDetalleResponse {
  const cambios = [...detalle.cambios].sort(
    (a, b) => a.fecha.localeCompare(b.fecha) || a.idCambioEstadoLesion - b.idCambioEstadoLesion,
  );
  return { ...detalle, cambios };
}

/** Detalle con historial. `enabled` permite pedirlo solo cuando se abre. */
export function useLesion(idLesion: number, enabled = true) {
  return useQuery({
    queryKey: clavesLesiones.detalle(idLesion),
    queryFn: () => obtenerLesion(idLesion),
    select: ordenarCambios,
    enabled,
  });
}
