import { Rol } from '../types';

/** Pantalla de inicio de cada rol. */
export function inicioDeRol(rol: Rol): string {
  return rol === Rol.BOXEADOR ? '/boxeador/entrenamiento' : '/entrenador/boxeadores';
}
