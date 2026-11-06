/** Valor de enum a texto legible: 'PRE_PELEA' → 'Pre pelea'. */
export function etiquetaEnum(valor: string): string {
  const texto = valor.replace(/_/g, ' ').toLowerCase();
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** Hasta dos iniciales en mayúscula: 'Lucía Paredes' → 'LP'. */
export function iniciales(nombre: string): string {
  return nombre
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase();
}
