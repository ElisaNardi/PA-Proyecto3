# EVOBOX · Frontend

React 19 + Vite + TypeScript. Usa `react-router` para las rutas, `@tanstack/react-query` para los datos del servidor y `axios` como cliente HTTP.

La referencia visual es `../prototipo/`. Los enums y contratos salen de `../backend/src`.

## Cómo levantarlo

Requisitos: Node 24 o superior y el backend corriendo (por defecto en `http://localhost:3000`, con CORS habilitado para `http://localhost:5173`).

```bash
cd frontend
cp .env.example .env   # VITE_API_URL=http://localhost:3000/api
npm install
npm run dev            # http://localhost:5173
```

Otros scripts:

| Script | Qué hace |
|---|---|
| `npm run build` | Chequea tipos (`tsc -b`) y genera `dist/`. |
| `npm run lint` | Corre ESLint. Tiene que quedar sin errores ni advertencias. |
| `npm run preview` | Sirve el build de `dist/`. |

No hay proxy en Vite: el frontend le habla directo a `VITE_API_URL`.

## Estructura

```text
src/
├── app/            App.tsx, router.tsx (todas las rutas), providers.tsx (QueryClient, Auth, Toast)
├── core/
│   ├── api/        instancia de axios, interceptores y getApiErrorMessage()
│   ├── auth/       AuthProvider, useAuth, RequireRole, persistencia de la sesión
│   └── types/      enums del backend (Rol, Sexo, CategoriaPeso…) y tipos compartidos
├── features/       una carpeta por épica:
│   └── <feature>/  landing, auth, vinculos, entrenamientos, sugerencias,
│       ├── api/        lesiones, mediciones, nutricion, evolucion
│       ├── components/
│       ├── hooks/
│       └── pages/
├── shared/
│   ├── ui/         Button, Card, Tag, Bar, Table, Field, Empty, ViewHeader, Toast, icons…
│   ├── layout/     AppShell, Sidebar, BottomTabs, navegación por rol, 404
│   └── utils/      fechas, IMC, texto (etiquetaEnum, iniciales)
├── styles/         tokens.css (variables :root del prototipo) y global.css (resto de clases)
├── assets/         imágenes del prototipo
└── main.tsx
```

### Reglas

- **Dependencias entre carpetas:** una feature puede importar de `core/` y `shared/`, pero no de otra feature. Si dos features necesitan lo mismo, va a `shared/` o a `core/`.
- **Estilos:** usá las clases del prototipo (`card`, `btn secondary sm`, `tag ok`, `field-row`…). No las renombres. Los colores y tipografías salen de las variables de `tokens.css`.
- **Fechas:**
  - La API manda fechas como `YYYY-MM-DD`. Mostralas con `formatearFecha()`, nunca con `new Date(fecha)`: en Argentina eso corre la fecha un día para atrás.
  - Para "hoy", usá `hoyISO()`.
- **Etiquetas de enums:** para mostrar un enum en pantalla, usá `etiquetaEnum()` (por ejemplo, `PRE_PELEA` → `Pre pelea`).
- **Tags:** `Tag` recibe el tono de forma explícita (`neutro`, `peligro`, `ok` o `aviso`). Cada feature decide qué tono le corresponde a cada estado.
- **Errores:** `getApiErrorMessage(error)` devuelve el `message` que manda el backend. Usalo para los toasts y los mensajes de los formularios.
- **Categoría de peso:** la calcula el backend. No la calcules en el frontend.

### Sesión y autenticación

- **Datos de la sesión:** se guardan en `localStorage` (clave `evobox.sesion`) con la forma de la respuesta del login: `{ accessToken, usuario: { idUsuario, nombre, rol } }`.
- **`useAuth()`:** expone `usuario`, `isAuthenticated`, `iniciarSesion(respuesta)` y `cerrarSesion()`.
  - Para salir desde una ruta protegida, usá `cerrarSesion({ redirigirA: '/' })`. Así primero se navega y después se borra la sesión.
- **Token:** el cliente de axios le agrega `Authorization: Bearer <token>` a cada pedido.
- **Sesión vencida:** si el backend responde 401 con sesión iniciada, se cierra la sesión y se vuelve a `/login`. La excepción es `POST /auth/login`, donde un 401 significa credenciales inválidas.
- **`RequireRole`:** sin sesión, manda a `/login`. Con otro rol, manda al inicio de ese rol (`/boxeador/entrenamiento` o `/entrenador/boxeadores`).

## Sumar una pantalla a una feature

Ejemplo: el detalle de una lesión en `lesiones`.

1. **Llamada a la API**, en `features/lesiones/api/lesiones.api.ts`:

   ```ts
   import { api } from '../../../core/api';
   import type { EstadoLesion, Gravedad } from '../../../core/types';

   export interface LesionDetalle {
     idLesion: number;
     zona: string;
     gravedad: Gravedad;
     estado: EstadoLesion;
     fecha: string;
     /* … */
   }

   export async function obtenerLesion(idLesion: number): Promise<LesionDetalle> {
     const { data } = await api.get<LesionDetalle>(`/lesiones/${idLesion}`);
     return data;
   }
   ```

   Copiá los tipos del contrato del backend (`backend/src/modules/<módulo>/application/responses`).

2. **Hook**, en `features/lesiones/hooks/useLesion.ts`:

   ```ts
   import { useQuery } from '@tanstack/react-query';

   import { obtenerLesion } from '../api/lesiones.api';

   export function useLesion(idLesion: number) {
     return useQuery({
       queryKey: ['lesiones', idLesion],
       queryFn: () => obtenerLesion(idLesion),
     });
   }
   ```

   Para escrituras, usá `useMutation`. En `onSuccess`, invalidá las queries afectadas con `queryClient.invalidateQueries`, y mostrá el resultado con `useToast().mostrar(...)`.

3. **Página**, en `features/lesiones/pages/DetalleLesionPage.tsx`, con `export default`:

   ```tsx
   export default function DetalleLesionPage() {
     /* ViewHeader + Card/Table/Tag de shared/ui */
   }
   ```

   Los componentes que use solo esa feature van en `features/lesiones/components/`.

4. **Ruta**, en `app/router.tsx`, dentro del bloque de su rol:

   ```ts
   { path: 'lesiones/:idLesion', lazy: pagina(() => import('../features/lesiones/pages/DetalleLesionPage')) },
   ```

   Si la pantalla tiene que aparecer en el menú, agregala también en `shared/layout/navegacion.ts`.

5. **Verificación:** `npm run build` y `npm run lint` tienen que quedar sin errores.

Cada página que hoy dice "En construcción" se reemplaza en su propio archivo, sin tocar las de los demás.
