// Cuentas chicas para mostrar los datos. La API manda los números base; acá se arma lo que se ve.

/** 67.2 → '67,2'. Hasta 2 decimales, formato argentino. */
export function formatearNumero(valor: number): string {
  return valor.toLocaleString('es-AR', { maximumFractionDigits: 2 });
}

/** 2.8 → '+2,8'; -2.8 → '−2,8'; 0 → '0'. */
export function formatearConSigno(valor: number): string {
  if (valor === 0) return '0';
  return `${valor > 0 ? '+' : '−'}${formatearNumero(Math.abs(valor))}`;
}

/** Cuánto cambió el peso desde el inicio (negativo = bajó). null si falta algún dato. */
export function variacionPeso(inicial: number | null, actual: number | null): number | null {
  if (inicial === null || actual === null) return null;
  return Math.round((actual - inicial) * 100) / 100;
}

/**
 * Porcentaje del camino recorrido hacia el peso objetivo (0 a 100).
 * Sirve igual para bajar que para subir. null si falta algún dato.
 */
export function progresoPeso(inicial: number | null, actual: number | null, objetivo: number | null): number | null {
  if (inicial === null || actual === null || objetivo === null) return null;
  const distanciaTotal = inicial - objetivo;
  if (distanciaTotal === 0) return actual === objetivo ? 100 : 0;
  const porcentaje = Math.round(((inicial - actual) / distanciaTotal) * 100);
  return Math.min(100, Math.max(0, porcentaje));
}

/** Qué porcentaje de la meta consume en promedio. Puede pasar de 100. null si falta algún dato. */
export function porcentajeDeLaMeta(promedio: number | null, meta: number | null): number | null {
  if (promedio === null || meta === null || meta === 0) return null;
  return Math.round((promedio / meta) * 100);
}
