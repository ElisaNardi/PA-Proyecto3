// La API manda fechas como 'YYYY-MM-DD'. No se usa new Date(string): lo toma como
// medianoche UTC y en Argentina (UTC-3) se muestra el día anterior.

const FECHA_ISO = /^(\d{4})-(\d{2})-(\d{2})/;

/** 'YYYY-MM-DD' → 'DD/MM/YYYY'. Si no tiene ese formato, devuelve el texto tal cual. */
export function formatearFecha(iso: string): string {
  const partes = FECHA_ISO.exec(iso);
  if (!partes) return iso;
  const [, anio, mes, dia] = partes;
  return `${dia}/${mes}/${anio}`;
}

/** 'YYYY-MM-DD' → 'DD/MM'. */
export function formatearFechaCorta(iso: string): string {
  const partes = FECHA_ISO.exec(iso);
  if (!partes) return iso;
  const [, , mes, dia] = partes;
  return `${dia}/${mes}`;
}

/** Fecha local de hoy como 'YYYY-MM-DD' (no usa toISOString, que está en UTC). */
export function hoyISO(): string {
  const ahora = new Date();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  return `${ahora.getFullYear()}-${mes}-${dia}`;
}
