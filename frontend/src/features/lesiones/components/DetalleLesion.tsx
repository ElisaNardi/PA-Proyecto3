import { getApiErrorMessage } from '../../../core/api';
import { Cargando, Table, Tag } from '../../../shared/ui';
import { etiquetaEnum, formatearFecha } from '../../../shared/utils';

import { useLesion } from '../hooks/useLesion';

import { TONO_ESTADO } from './tonos';

/** Historial de estados de una lesión. Se monta solo cuando la tarjeta está abierta. */
export function DetalleLesion({ idLesion }: { idLesion: number }) {
  const { data, isPending, isError, error } = useLesion(idLesion);

  return (
    <div style={{ marginTop: 14 }}>
      <h3 className="sec">Historial de estado</h3>
      {isPending ? (
        <Cargando />
      ) : isError ? (
        <p className="error-text" role="alert">
          {getApiErrorMessage(error)}
        </p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Estado anterior → actual</th>
            </tr>
          </thead>
          <tbody>
            {data.cambios.map((cambio) => (
              <tr key={cambio.idCambioEstadoLesion}>
                <td style={{ whiteSpace: 'nowrap' }}>{formatearFecha(cambio.fecha)}</td>
                <td>
                  {/* Anterior y actual en una celda: con dos columnas de tags no entra en 375 px. */}
                  <div className="actions" style={{ gap: 6 }}>
                    {cambio.estadoAnterior ? (
                      <Tag tono={TONO_ESTADO[cambio.estadoAnterior]}>{etiquetaEnum(cambio.estadoAnterior)}</Tag>
                    ) : (
                      <span className="mu">Alta</span>
                    )}
                    <span className="mu" aria-label="pasa a">
                      →
                    </span>
                    <Tag tono={TONO_ESTADO[cambio.estadoActual]}>{etiquetaEnum(cambio.estadoActual)}</Tag>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
