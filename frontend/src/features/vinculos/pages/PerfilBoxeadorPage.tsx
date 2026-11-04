import { useParams } from 'react-router';

import { Empty, ViewHeader } from '../../../shared/ui';

export default function PerfilBoxeadorPage() {
  const { idBoxeador } = useParams();

  return (
    <>
      <ViewHeader titulo="Perfil del boxeador" subtitulo={`Boxeador #${idBoxeador ?? ''}`} />
      <Empty titulo="En construcción" />
    </>
  );
}
