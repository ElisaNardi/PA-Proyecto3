import { useAuth } from '../../../core/auth';
import { ViewHeader } from '../../../shared/ui';

import { PanelEvolucion } from '../components/PanelEvolucion';

export default function MiEvolucionPage() {
  const { usuario } = useAuth();
  if (!usuario) return null;

  return (
    <>
      <ViewHeader titulo="Mi evolución" subtitulo="Cómo venís hacia tus objetivos." />
      <PanelEvolucion idBoxeador={usuario.idUsuario} />
    </>
  );
}
