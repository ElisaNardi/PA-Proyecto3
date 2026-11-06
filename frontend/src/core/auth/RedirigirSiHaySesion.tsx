import { Navigate, Outlet } from 'react-router';

import { useAuth } from './useAuth';
import { inicioDeRol } from './rutas';

/**
 * Para las rutas públicas (landing, login, registro): con sesión iniciada manda al
 * inicio del rol. Durante "Salir" no redirige, para que el usuario termine en la landing.
 */
export function RedirigirSiHaySesion() {
  const { usuario, cerrandoSesion } = useAuth();

  if (usuario && !cerrandoSesion) {
    return <Navigate to={inicioDeRol(usuario.rol)} replace />;
  }
  return <Outlet />;
}
