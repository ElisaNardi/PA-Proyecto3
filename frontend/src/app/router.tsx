import type { ComponentType } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import { RedirigirSiHaySesion, RequireRole } from '../core/auth';
import { Rol } from '../core/types';
import { AppShell } from '../shared/layout';
import { Cargando } from '../shared/ui';

import { RootLayout } from './providers';

// Cada página se descarga recién cuando se navega a ella (lazy de react-router).
const pagina = (cargar: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await cargar()).default,
});

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    hydrateFallbackElement: <Cargando />,
    children: [
      {
        element: <RedirigirSiHaySesion />,
        children: [
          { path: '/', lazy: pagina(() => import('../features/landing/pages/LandingPage')) },
          { path: '/login', lazy: pagina(() => import('../features/auth/pages/LoginPage')) },
          { path: '/registro', lazy: pagina(() => import('../features/auth/pages/RegistroPage')) },
        ],
      },
      {
        path: '/boxeador',
        element: <RequireRole rol={Rol.BOXEADOR} />,
        children: [
          {
            element: <AppShell />,
            children: [
              { index: true, element: <Navigate to="entrenamiento" replace /> },
              { path: 'entrenamiento', lazy: pagina(() => import('../features/entrenamientos/pages/MiEntrenamientoPage')) },
              { path: 'lesiones', lazy: pagina(() => import('../features/lesiones/pages/MisLesionesPage')) },
              { path: 'mediciones', lazy: pagina(() => import('../features/mediciones/pages/MisMedicionesPage')) },
              { path: 'nutricion', lazy: pagina(() => import('../features/nutricion/pages/MiNutricionPage')) },
              { path: 'sugerencias', lazy: pagina(() => import('../features/sugerencias/pages/MisSugerenciasPage')) },
              { path: 'evolucion', lazy: pagina(() => import('../features/evolucion/pages/MiEvolucionPage')) },
            ],
          },
        ],
      },
      {
        path: '/entrenador',
        element: <RequireRole rol={Rol.ENTRENADOR} />,
        children: [
          {
            element: <AppShell />,
            children: [
              { index: true, element: <Navigate to="boxeadores" replace /> },
              { path: 'boxeadores', lazy: pagina(() => import('../features/vinculos/pages/MisBoxeadoresPage')) },
              { path: 'boxeadores/:idBoxeador', lazy: pagina(() => import('../features/vinculos/pages/PerfilBoxeadorPage')) },
              { path: 'sugerencias', lazy: pagina(() => import('../features/sugerencias/pages/SugerenciasRecibidasPage')) },
              { path: 'evolucion', lazy: pagina(() => import('../features/evolucion/pages/EvolucionBoxeadoresPage')) },
            ],
          },
        ],
      },
      { path: '*', lazy: pagina(() => import('../shared/layout/NotFoundPage')) },
    ],
  },
]);
