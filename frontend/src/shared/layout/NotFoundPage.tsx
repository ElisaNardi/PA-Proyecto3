import { useNavigate } from 'react-router';

import { inicioDeRol, useAuth } from '../../core/auth';
import { Button, Empty, ViewHeader } from '../ui';

export default function NotFoundPage() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="container">
      <ViewHeader titulo="Página no encontrada" subtitulo="La dirección no existe o fue movida." />
      <Empty titulo="Error 404" descripcion="Revisá el enlace o volvé al inicio." />
      <Button onClick={() => navigate(usuario ? inicioDeRol(usuario.rol) : '/')}>Volver al inicio</Button>
    </main>
  );
}
