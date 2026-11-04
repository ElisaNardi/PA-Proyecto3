import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router';
import axios from 'axios';

import { AuthProvider } from '../core/auth';
import { ToastProvider } from '../shared/ui';

function crearQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // Reintentar solo fallos de red o 5xx: un 4xx no se arregla reintentando.
        retry: (intentos, error) => {
          const status = axios.isAxiosError(error) ? error.response?.status : undefined;
          return intentos < 2 && (status === undefined || status >= 500);
        },
      },
    },
  });
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(crearQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

/** Ruta raíz: los providers quedan dentro del router para que AuthProvider pueda navegar. */
export function RootLayout() {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  );
}
