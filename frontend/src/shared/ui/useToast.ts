import { useContext } from 'react';

import { ToastContext, type ToastContextValue } from './ToastContext';

export function useToast(): ToastContextValue {
  const contexto = useContext(ToastContext);
  if (!contexto) {
    throw new Error('useToast debe usarse dentro de <ToastProvider>.');
  }
  return contexto;
}
