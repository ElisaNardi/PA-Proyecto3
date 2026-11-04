import { useState } from 'react';

import { getApiErrorMessage } from '../../../core/api';
import { EstadoLesion } from '../../../core/types';
import { Button, Card, Cargando, Empty } from '../../../shared/ui';

import { useLesiones } from '../hooks/useLesiones';

import { TarjetaLesion } from './TarjetaLesion';

interface ListaLesionesProps {
  idBoxeador: number;
  /** Sin botones de cambio de estado (vista del entrenador). */
  soloLectura?: boolean;
}

type Filtro = 'TODAS' | EstadoLesion.ACTIVA;

export function ListaLesiones({ idBoxeador, soloLectura = false }: ListaLesionesProps) {
  const [filtro, setFiltro] = useState<Filtro>('TODAS');
  const { data, isPending, isError, error, refetch, isFetching } = useLesiones(
    idBoxeador,
    filtro === 'TODAS' ? undefined : filtro,
  );

  const opciones: [Filtro, string][] = [
    ['TODAS', 'Todas'],
    [EstadoLesion.ACTIVA, 'Activas'],
  ];

  let contenido;
  if (isPending) {
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
            {getApiErrorMessage(error)}
          </p>
          <div className="actions" style={{ justifyContent: 'center', marginTop: 12 }}>
            <Button variant="secondary" size="sm" disabled={isFetching} onClick={() => void refetch()}>
              Reintentar
            </Button>
          </div>
        </div>
      </Card>
    );
  } else if (data.length === 0) {
    contenido =
      filtro === 'TODAS' ? (
        <Empty
          titulo={soloLectura ? 'Sin lesiones registradas' : 'Todavía no registraste lesiones'}
          descripcion={
            soloLectura
              ? 'Buenas noticias: este boxeador no tiene lesiones en su historial.'
              : 'Si algo te molesta, registralo abajo: tu entrenador lo va a ver antes de asignarte trabajo.'
          }
        />
      ) : (
        <Empty titulo="Sin lesiones activas" />
      );
  } else {
    contenido = data.map((lesion) => (
      <TarjetaLesion key={lesion.idLesion} lesion={lesion} soloLectura={soloLectura} />
    ));
  }

  return (
    <section aria-label="Lesiones">
      <div className="seg" style={{ maxWidth: 260 }} role="group" aria-label="Filtrar lesiones">
        {opciones.map(([valor, etiqueta]) => (
          <button
            key={valor}
            type="button"
            className={filtro === valor ? 'on' : undefined}
            aria-pressed={filtro === valor}
            onClick={() => setFiltro(valor)}
          >
            {etiqueta}
          </button>
        ))}
      </div>
      {contenido}
    </section>
  );
}
