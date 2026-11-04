import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { getApiErrorMessage } from '../../../core/api';

import { login, type AutenticarUsuarioRequest } from '../api/auth.api';

export function useLogin() {
  return useMutation({
    mutationFn: (datos: AutenticarUsuarioRequest) => login(datos),
  });
}

/** En el login, el backend responde 401 con "Unauthorized": se traduce para el usuario. */
export function mensajeErrorLogin(error: unknown): string {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    return 'Email o contraseña incorrectos.';
  }
  return getApiErrorMessage(error);
}
