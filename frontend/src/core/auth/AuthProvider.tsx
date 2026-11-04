import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

import { registrarManejadoresAuth } from '../api';
import type { Sesion } from '../types';

import { AuthContext, type AuthContextValue } from './AuthContext';
import { borrarSesion, guardarSesion, leerSesion } from './almacenamiento';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sesion, setSesion] = useState<Sesion | null>(leerSesion);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const cierrePendiente = useRef(false);

  // El interceptor lee el token de acá para no esperar un re-render.
  const tokenRef = useRef<string | null>(sesion?.accessToken ?? null);

  const iniciarSesion = useCallback((respuesta: Sesion) => {
    const nueva: Sesion = {
      accessToken: respuesta.accessToken,
      usuario: {
        idUsuario: respuesta.usuario.idUsuario,
        nombre: respuesta.usuario.nombre,
        rol: respuesta.usuario.rol,
      },
    };
    tokenRef.current = nueva.accessToken;
    guardarSesion(nueva);
    setSesion(nueva);
  }, []);

  const limpiarSesion = useCallback(() => {
    cierrePendiente.current = false;
    tokenRef.current = null;
    borrarSesion();
    setSesion(null);
    queryClient.clear();
  }, [queryClient]);

  const cerrarSesion = useCallback(
    (opciones?: { redirigirA?: string }) => {
      if (!opciones?.redirigirA || opciones.redirigirA === location.pathname) {
        limpiarSesion();
        return;
      }
      cierrePendiente.current = true;
      navigate(opciones.redirigirA, { replace: true });
    },
    [limpiarSesion, navigate, location.pathname],
  );

  // Corre después de que la nueva ruta ya se montó: RequireRole ya no está en pantalla.
  useEffect(() => {
    if (cierrePendiente.current) limpiarSesion();
  }, [location, limpiarSesion]);

  useEffect(
    () =>
      registrarManejadoresAuth({
        obtenerToken: () => tokenRef.current,
        alNoAutorizado: () => {
          limpiarSesion();
          navigate('/login', { replace: true });
        },
      }),
    [limpiarSesion, navigate],
  );

  const valor = useMemo<AuthContextValue>(
    () => ({
      usuario: sesion?.usuario ?? null,
      isAuthenticated: sesion !== null,
      iniciarSesion,
      cerrarSesion,
    }),
    [sesion, iniciarSesion, cerrarSesion],
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
