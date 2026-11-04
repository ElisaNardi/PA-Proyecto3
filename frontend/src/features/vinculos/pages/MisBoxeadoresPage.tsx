import { useAuth } from '../../../core/auth';
import { ViewHeader } from '../../../shared/ui';

import { TablaBoxeadores } from '../components/TablaBoxeadores';
import { VincularBoxeadorForm } from '../components/VincularBoxeadorForm';

export default function MisBoxeadoresPage() {
  const { usuario } = useAuth();
  if (!usuario) return null;

  return (
    <>
      <ViewHeader titulo="Mis boxeadores" subtitulo="Orden alfabético." />
      <VincularBoxeadorForm idEntrenador={usuario.idUsuario} />
      <TablaBoxeadores idEntrenador={usuario.idUsuario} />
    </>
  );
}
