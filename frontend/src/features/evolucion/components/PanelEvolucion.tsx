import { useState } from 'react';
import axios from 'axios';

import { getApiErrorMessage } from '../../../core/api';
import { Button, Card, Cargando, Field } from '../../../shared/ui';
import { hoyISO } from '../../../shared/utils';

import { useEvolucion } from '../hooks/useEvolucion';

import { ResultadoEvolucion } from './ResultadoEvolucion';

interface PanelEvolucionProps {
  idBoxeador: number;
  /** Vista del entrenador: suma la tabla "Plan vs. real". */
  comparar?: boolean;
}

/** 404 y 403 traen mensajes técnicos: se reemplazan por uno claro. */
function mensajeError(error: unknown): string {
  const status = axios.isAxiosError(error) ? error.response?.status : undefined;
  if (status === 404) return 'Ese boxeador no existe.';
  if (status === 403) return 'No tenés permiso para ver la evolución de este boxeador.';
  return getApiErrorMessage(error);
}

export function PanelEvolucion({ idBoxeador, comparar = false }: PanelEvolucionProps) {
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  const periodoInvalido = desde !== '' && hasta !== '' && desde > hasta;
  const { data, isPending, isError, error, refetch, isFetching } = useEvolucion(
    idBoxeador,
    { desde: desde || undefined, hasta: hasta || undefined },
    !periodoInvalido,
  );

  let contenido;
  if (periodoInvalido) {
    contenido = (
      <Card>
        <p className="error-text" role="alert">
          La fecha "desde" no puede ser posterior a la fecha "hasta".
        </p>
      </Card>
    );
  } else if (isPending) {
    contenido = (
      <Card>
        <Cargando />
      </Card>
    );
  } else if (isError) {
    contenido = (
      <Card>
        <div className="empty">
          <p className="error-text" role="alert">
            {mensajeError(error)}
          </p>
          <div className="actions" style={{ justifyContent: 'center', marginTop: 12 }}>
            <Button variant="secondary" size="sm" disabled={isFetching} onClick={() => void refetch()}>
              Reintentar
            </Button>
          </div>
        </div>
      </Card>
    );
  } else {
    contenido = <ResultadoEvolucion evolucion={data} comparar={comparar} />;
  }

  return (
    <section aria-label="Evolución">
      <Card>
        <div className="field-row">
          <Field label="Desde" htmlFor={`evolucion-desde-${idBoxeador}`} hint="Vacío: desde la primera medición">
            <input
              id={`evolucion-desde-${idBoxeador}`}
              type="date"
              max={hasta || hoyISO()}
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
            />
          </Field>
          <Field label="Hasta" htmlFor={`evolucion-hasta-${idBoxeador}`} hint="Vacío: hasta hoy">
            <input
              id={`evolucion-hasta-${idBoxeador}`}
              type="date"
              max={hoyISO()}
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
            />
          </Field>
        </div>
        {(desde || hasta) && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setDesde('');
              setHasta('');
            }}
          >
            Quitar fechas
          </Button>
        )}
      </Card>
      {contenido}
    </section>
  );
}
