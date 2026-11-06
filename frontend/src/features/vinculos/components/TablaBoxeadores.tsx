import { useNavigate } from 'react-router';

import { getApiErrorMessage } from '../../../core/api';
import { Button, Card, Cargando, Empty, IconChevron, Table } from '../../../shared/ui';
import { etiquetaEnum, iniciales } from '../../../shared/utils';

import { useBoxeadoresDelEntrenador } from '../hooks/useBoxeadores';

export function TablaBoxeadores({ idEntrenador }: { idEntrenador: number }) {
  const navigate = useNavigate();
  const { data, isPending, isError, error, refetch, isFetching } = useBoxeadoresDelEntrenador(idEntrenador);

  if (isPending) {
    return (
      <Card>
        <Cargando />
      </Card>
    );
  }
  if (isError) {
    return (
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
  }
  if (data.length === 0) {
    return (
      <Empty
        titulo="Todavía no tenés boxeadores vinculados"
        descripcion="Vinculá uno con el formulario de arriba para empezar a armarle su plan."
      />
    );
  }

  const verPerfil = (idBoxeador: number) => navigate(`/entrenador/boxeadores/${idBoxeador}`);

  return (
    <Card flush>
      <Table>
        <thead>
          <tr>
            <th>Boxeador</th>
            <th>Categoría</th>
            <th aria-label="Acciones" />
          </tr>
        </thead>
        <tbody>
          {data.map((b) => (
            <tr key={b.idBoxeador} className="clickable" onClick={() => verPerfil(b.idBoxeador)}>
              <td>
                <div className="avatar-row">
                  <div className="avatar" aria-hidden="true">
                    {iniciales(b.nombre)}
                  </div>
                  <div>{b.nombre}</div>
                </div>
              </td>
              <td>{b.categoria ? etiquetaEnum(b.categoria) : '—'}</td>
              <td style={{ textAlign: 'right' }}>
                <button
                  type="button"
                  className="btn-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    verPerfil(b.idBoxeador);
                  }}
                >
                  Ver perfil <IconChevron />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
