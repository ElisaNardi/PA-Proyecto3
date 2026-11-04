import { createContext } from 'react';

export type ToastTipo = 'ok' | 'info';

export interface ToastContextValue {
  /** Muestra un aviso breve. `ok` agrega el punto verde del prototipo. */
  mostrar: (mensaje: string, tipo?: ToastTipo) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
