interface BarProps {
  /** Porcentaje 0-100; se recorta a ese rango. */
  porcentaje: number;
  ok?: boolean;
  etiqueta?: string;
}

export function Bar({ porcentaje, ok = false, etiqueta }: BarProps) {
  const valor = Number.isFinite(porcentaje) ? Math.max(0, Math.min(100, porcentaje)) : 0;
  return (
    <div
      className={ok ? 'bar ok' : 'bar'}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(valor)}
      aria-label={etiqueta}
    >
      <i style={{ width: `${valor}%` }} />
    </div>
  );
}
