import axios from 'axios';

// Instancia única de axios para hablar con el backend.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface ManejadoresAuth {
  obtenerToken: () => string | null;
  alNoAutorizado: () => void;
}

// Los registra AuthProvider. Así el cliente no depende de React ni del router.
let manejadores: ManejadoresAuth | null = null;

export function registrarManejadoresAuth(nuevos: ManejadoresAuth): () => void {
  manejadores = nuevos;
  return () => {
    if (manejadores === nuevos) manejadores = null;
  };
}

function esLogin(url?: string, method?: string): boolean {
  return method?.toLowerCase() === 'post' && /(^|\/)auth\/login\/?$/.test(url ?? '');
}

api.interceptors.request.use((config) => {
  const token = manejadores?.obtenerToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const { url, method } = error.config ?? {};
      // En el login, 401 significa credenciales inválidas, no sesión vencida.
      if (!esLogin(url, method) && manejadores?.obtenerToken()) {
        manejadores.alNoAutorizado();
      }
    }
    return Promise.reject(error);
  },
);
