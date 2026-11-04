import { useMutation } from '@tanstack/react-query';

import type { Sesion } from '../../../core/types';

import { login, registrar, type RegistrarUsuarioRequest } from '../api/auth.api';

export type ResultadoRegistro =
  | { estado: 'con-sesion'; sesion: Sesion }
  /** La cuenta se creó, pero el login posterior falló. */
  | { estado: 'sin-sesion'; errorLogin: unknown };

/**
 * POST /auth/registro no devuelve token: si el registro sale bien, se hace el login
 * con los mismos datos. Solo un error del registro hace fallar la mutación.
 */
export function useRegistro() {
  return useMutation({
    mutationFn: async (datos: RegistrarUsuarioRequest): Promise<ResultadoRegistro> => {
      await registrar(datos);
      try {
        const sesion = await login({ email: datos.email, password: datos.password });
        return { estado: 'con-sesion', sesion };
      } catch (errorLogin) {
        return { estado: 'sin-sesion', errorLogin };
      }
    },
  });
}
