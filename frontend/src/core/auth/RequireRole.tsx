import { Navigate, Outlet, useLocation } from 'react-router';

import type { Rol } from '../types';

import { useAuth } from './useAuth';
import { inicioDeRol } from './rutas';

interface RequireRoleProps {
  rol: Rol;
}

/** Protege las rutas hijas: sin sesión va a /login; con otro rol, a su propio inicio. */
export function RequireRole({ rol }: RequireRoleProps) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }
  if (usuario.rol !== rol) {
    return <Navigate to={inicioDeRol(usuario.rol)} replace />;
  }
  return <Outlet />;
}
