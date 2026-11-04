/** Mensaje de error de un formulario completo (no de un campo). */
export function ErrorFormulario({ mensaje }: { mensaje: string | null }) {
  if (!mensaje) return null;
  return (
    <p className="error-text" role="alert" style={{ marginBottom: 14 }}>
      {mensaje}
    </p>
  );
}
