import { useId, useState } from 'react';

import { getApiErrorMessage } from '../../../core/api';
import { EstadoLesion } from '../../../core/types';
import { Button, Card, IconChevron, Tag, useToast } from '../../../shared/ui';
import { etiquetaEnum, formatearFecha } from '../../../shared/utils';

import type { LesionResponse } from '../api/lesiones.api';
import { useActualizarEstadoLesion } from '../hooks/useMutacionesLesion';

import { DetalleLesion } from './DetalleLesion';
import { TONO_ESTADO, TONO_GRAVEDAD } from './tonos';

interface TarjetaLesionProps {
  lesion: LesionResponse;
  soloLectura: boolean;
}

export function TarjetaLesion({ lesion, soloLectura }: TarjetaLesionProps) {
  const [abierta, setAbierta] = useState(false);
  const idDetalle = useId();
  const { mostrar } = useToast();
  const cambiarEstado = useActualizarEstadoLesion();

  const activa = lesion.estado === EstadoLesion.ACTIVA;
  const alternar = () => setAbierta((valor) => !valor);

  const cambiar = () => {
    cambiarEstado.mutate(
      { idLesion: lesion.idLesion, estado: activa ? EstadoLesion.RECUPERADA : EstadoLesion.ACTIVA },
      {
        onSuccess: () => mostrar(activa ? 'Lesión marcada como recuperada' : 'Lesión reactivada', 'ok'),
        onError: (error) => mostrar(getApiErrorMessage(error)),
      },
    );
  };

  return (
    <Card style={{ padding: '16px 20px' }}>
      {/* Toda la fila abre o cierra; el título es el botón accesible. */}
      <div className="list-item" style={{ padding: 0, cursor: 'pointer', flexWrap: 'wrap' }} onClick={alternar}>
        <div className="l-main">
          <h4>
            <button
              type="button"
              className="btn-link"
              style={{ font: 'inherit', color: 'var(--ink)', padding: 0, textAlign: 'left' }}
              aria-expanded={abierta}
              aria-controls={idDetalle}
              onClick={(e) => {
                e.stopPropagation();
                alternar();
              }}
            >
              {lesion.zona}
              <IconChevron style={{ transform: abierta ? 'rotate(90deg)' : undefined, transition: 'transform .15s' }} />
            </button>
          </h4>
          <p className="mu">
            {lesion.descripcion} · desde {formatearFecha(lesion.fecha)}
          </p>
        </div>
        <div className="actions">
          <Tag tono={TONO_GRAVEDAD[lesion.gravedad]}>{etiquetaEnum(lesion.gravedad)}</Tag>
          <Tag tono={TONO_ESTADO[lesion.estado]}>{etiquetaEnum(lesion.estado)}</Tag>
          {!soloLectura && (
            <Button
              variant="secondary"
              size="sm"
              disabled={cambiarEstado.isPending}
              onClick={(e) => {
                e.stopPropagation();
                cambiar();
              }}
            >
              {cambiarEstado.isPending ? 'Guardando…' : activa ? 'Marcar recuperada' : 'Reactivar'}
            </Button>
          )}
        </div>
      </div>
      {abierta && (
        <div id={idDetalle}>
          <DetalleLesion idLesion={lesion.idLesion} />
        </div>
      )}
    </Card>
  );
}
