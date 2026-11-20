import { useState } from 'react';

import { getApiErrorMessage } from '../../../core/api';
import { useAuth } from '../../../core/auth';
import { Button, Card, Cargando, Empty, Field, Tag, ViewHeader } from '../../../shared/ui';
import { etiquetaEnum } from '../../../shared/utils';

import { useBoxeadoresDelEntrenador } from '../../vinculos/hooks/useBoxeadores';

import { PanelEvolucion } from '../components/PanelEvolucion';

export default function EvolucionBoxeadoresPage() {
  const { usuario } = useAuth();
  const [elegido, setElegido] = useState<number | null>(null);
  const { data, isPending, isError, error, refetch, isFetching } = useBoxeadoresDelEntrenador(usuario?.idUsuario ?? 0);

  if (!usuario) return null;

  const cabecera = <ViewHeader titulo="Evolución" subtitulo="Antes y después de cada boxeador." />;

  if (isPending) {
    return (
      <>
        {cabecera}
        <Card>
          <Cargando />
        </Card>
      </>
    );
  }
  if (isError) {
    return (
      <>
        {cabecera}
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
      </>
    );
  }
  if (data.length === 0) {
    return (
      <>
        {cabecera}
        <Empty
          titulo="Todavía no tenés boxeadores vinculados"
          descripcion="Vinculá uno desde Boxeadores para poder ver su evolución."
        />
      </>
    );
  }

  const boxeador = data.find((b) => b.idBoxeador === elegido) ?? data[0];

  return (
    <>
      {cabecera}
      <Card>
        <Field label="Boxeador" htmlFor="evolucion-boxeador">
          <select
            id="evolucion-boxeador"
            value={boxeador.idBoxeador}
            onChange={(e) => setElegido(Number(e.target.value))}
          >
            {data.map((b) => (
              <option key={b.idBoxeador} value={b.idBoxeador}>
                {b.nombre}
              </option>
            ))}
          </select>
        </Field>
        <p className="mu">
          Categoría actual: {boxeador.categoria ? <Tag>{etiquetaEnum(boxeador.categoria)}</Tag> : '—'}
        </p>
      </Card>
      <PanelEvolucion key={boxeador.idBoxeador} idBoxeador={boxeador.idBoxeador} comparar />
    </>
  );
}
