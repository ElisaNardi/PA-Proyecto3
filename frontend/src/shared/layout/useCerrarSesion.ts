import { useAuth } from '../../core/auth';

/** "Salir" del prototipo: cierra la sesión y vuelve a la landing. */
export function useCerrarSesion(): () => void {
  const { cerrarSesion } = useAuth();
  return () => cerrarSesion({ redirigirA: '/' });
}
