import { createContext } from 'react';

import type { Sesion, UsuarioSesion } from '../types';

export interface AuthContextValue {
  usuario: UsuarioSesion | null;
  isAuthenticated: boolean;
  /**
   * `true` mientras corre `cerrarSesion({ redirigirA })`: la sesión todavía existe pero
   * ya se está saliendo. Los guards no deben redirigir por sesión iniciada en ese lapso.
   */
  cerrandoSesion: boolean;
  iniciarSesion: (respuesta: Sesion) => void;
  /**
   * Borra la sesión. Con `redirigirA`, primero navega ahí y borra la sesión recién
   * cuando esa ruta ya se renderizó (si no, RequireRole mandaría a /login).
   */
  cerrarSesion: (opciones?: { redirigirA?: string }) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
