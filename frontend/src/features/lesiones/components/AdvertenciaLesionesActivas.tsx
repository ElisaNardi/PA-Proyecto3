import { IconWarn } from '../../../shared/ui';

import { useLesionesActivas } from '../hooks/useLesiones';

interface AdvertenciaLesionesActivasProps {
  idBoxeador: number;
  /** Texto final. Por defecto, "Tenela(s) en cuenta al planificar." */
  mensaje?: string;
}

/** Aviso informativo: no bloquea ninguna acción. No muestra nada si no hay lesiones activas. */
export function AdvertenciaLesionesActivas({ idBoxeador, mensaje }: AdvertenciaLesionesActivasProps) {
  const { data, isError } = useLesionesActivas(idBoxeador);

  if (isError) {
    return (
      <div className="warn-box" role="status">
        <IconWarn />
        <div>No se pudo verificar si tiene lesiones activas.</div>
      </div>
    );
  }
  if (!data || data.length === 0) return null;

  const una = data.length === 1;
  const detalle = data.map((l) => `${l.zona} (${l.gravedad.toLowerCase()})`).join(', ');
  const cierre = mensaje ?? (una ? 'Tenela en cuenta al planificar.' : 'Tenelas en cuenta al planificar.');

  return (
    <div className="warn-box" role="status">
      <IconWarn />
      <div>
        <b>{una ? 'Lesión activa:' : `${data.length} lesiones activas:`}</b> {detalle}. {cierre}
      </div>
    </div>
  );
}
