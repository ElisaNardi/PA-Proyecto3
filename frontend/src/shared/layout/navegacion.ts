import type { ComponentType, SVGProps } from 'react';

import { Rol } from '../../core/types';
import { IconApple, IconBandage, IconChart, IconChat, IconHome, IconScale, IconUsers } from '../ui';

export interface ItemNavegacion {
  ruta: string;
  etiqueta: string;
  Icono: ComponentType<SVGProps<SVGSVGElement>>;
}

export const NAVEGACION: Record<Rol, ItemNavegacion[]> = {
  [Rol.BOXEADOR]: [
    { ruta: '/boxeador/entrenamiento', etiqueta: 'Mi entrenamiento', Icono: IconHome },
    { ruta: '/boxeador/lesiones', etiqueta: 'Lesiones', Icono: IconBandage },
    { ruta: '/boxeador/mediciones', etiqueta: 'Mediciones', Icono: IconScale },
    { ruta: '/boxeador/nutricion', etiqueta: 'Nutrición', Icono: IconApple },
    { ruta: '/boxeador/sugerencias', etiqueta: 'Sugerencias', Icono: IconChat },
    { ruta: '/boxeador/evolucion', etiqueta: 'Mi evolución', Icono: IconChart },
  ],
  [Rol.ENTRENADOR]: [
    { ruta: '/entrenador/boxeadores', etiqueta: 'Boxeadores', Icono: IconUsers },
    { ruta: '/entrenador/sugerencias', etiqueta: 'Sugerencias', Icono: IconChat },
    { ruta: '/entrenador/evolucion', etiqueta: 'Evolución', Icono: IconChart },
  ],
};

/** Activo si la ruta actual es el ítem o una subruta (p. ej. el perfil de un boxeador). */
export function estaActivo(pathname: string, ruta: string): boolean {
  return pathname === ruta || pathname.startsWith(`${ruta}/`);
}
