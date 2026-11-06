import { useAuth } from '../../../core/auth';
import { ViewHeader } from '../../../shared/ui';

import { ListaLesiones } from '../components/ListaLesiones';
import { RegistrarLesionForm } from '../components/RegistrarLesionForm';

export default function MisLesionesPage() {
  const { usuario } = useAuth();
  if (!usuario) return null;

  return (
    <>
      <ViewHeader titulo="Mis lesiones" subtitulo="Tu entrenador las ve antes de asignarte trabajo." />
      <ListaLesiones idBoxeador={usuario.idUsuario} />
      <RegistrarLesionForm idBoxeador={usuario.idUsuario} />
    </>
  );
}
