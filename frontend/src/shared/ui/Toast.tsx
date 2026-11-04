import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { ToastContext, type ToastContextValue, type ToastTipo } from './ToastContext';

const DURACION_MS = 2400;

interface ToastItem {
  id: number;
  mensaje: string;
  tipo: ToastTipo;
}

export function Toast({ mensaje, tipo }: Omit<ToastItem, 'id'>) {
  return (
    <div className={tipo === 'ok' ? 'toast ok' : 'toast'}>
      {tipo === 'ok' && <span className="dot" />}
      {mensaje}
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const siguienteId = useRef(0);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pendientes = timers.current;
    return () => pendientes.forEach(clearTimeout);
  }, []);

  const mostrar = useCallback((mensaje: string, tipo: ToastTipo = 'info') => {
    const id = ++siguienteId.current;
    setToasts((actuales) => [...actuales, { id, mensaje, tipo }]);
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      setToasts((actuales) => actuales.filter((t) => t.id !== id));
    }, DURACION_MS);
    timers.current.add(timer);
  }, []);

  const valor = useMemo<ToastContextValue>(() => ({ mostrar }), [mostrar]);

  return (
    <ToastContext.Provider value={valor}>
      {children}
      <div className="toast-wrap" role="status" aria-live="polite">
        {toasts.map((t) => (
          <Toast key={t.id} mensaje={t.mensaje} tipo={t.tipo} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
