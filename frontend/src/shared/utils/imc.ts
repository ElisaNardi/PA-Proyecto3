/** IMC = peso (kg) / altura² (m), con un decimal. Igual al prototipo. */
export function calcularImc(peso: number, altura: number): number | null {
  if (!altura) return null;
  return Number((peso / (altura * altura)).toFixed(1));
}
