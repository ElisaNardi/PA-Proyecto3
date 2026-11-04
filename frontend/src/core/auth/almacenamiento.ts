import { Rol, type Sesion } from '../types';

const CLAVE = 'evobox.sesion';

function esSesion(valor: unknown): valor is Sesion {
  if (typeof valor !== 'object' || valor === null) return false;
  const { accessToken, usuario } = valor as Partial<Sesion>;
  return (
    typeof accessToken === 'string' &&
    accessToken.length > 0 &&
    typeof usuario === 'object' &&
    usuario !== null &&
    typeof usuario.idUsuario === 'number' &&
    typeof usuario.nombre === 'string' &&
    Object.values(Rol).includes(usuario.rol)
  );
}

export function leerSesion(): Sesion | null {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return null;
    const valor: unknown = JSON.parse(crudo);
    if (esSesion(valor)) {
      const { accessToken, usuario } = valor;
      return { accessToken, usuario: { idUsuario: usuario.idUsuario, nombre: usuario.nombre, rol: usuario.rol } };
    }
    localStorage.removeItem(CLAVE);
    return null;
  } catch {
    return null;
  }
}

export function guardarSesion(sesion: Sesion): void {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(sesion));
  } catch {
    // Sin almacenamiento (modo privado, cuota llena): la sesión dura lo que dure la pestaña.
  }
}

export function borrarSesion(): void {
  try {
    localStorage.removeItem(CLAVE);
  } catch {
    // Nada que hacer si el almacenamiento no está disponible.
  }
}
