import axios from 'axios';

import type { ApiError } from '../types';

function esApiError(data: unknown): data is ApiError {
  return typeof data === 'object' && data !== null && 'message' in data && 'statusCode' in data;
}

/** Mensaje legible para mostrar al usuario a partir de cualquier error. */
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'No se pudo conectar con el servidor.';
    }
    const data: unknown = error.response.data;
    if (esApiError(data)) {
      const { message } = data as { message: unknown };
      if (Array.isArray(message)) return message.join('; ');
      if (typeof message === 'string' && message) return message;
    }
    return `Error ${error.response.status} del servidor.`;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Ocurrió un error inesperado.';
}
