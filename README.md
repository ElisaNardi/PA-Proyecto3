# EVOBOX 🥊

**Sistema de gestión y seguimiento de entrenamientos de boxeo**
**Materia:** Programación Avanzada — UTN FRVM · **Año:** 2026

Este README cubre solo lo operativo: qué es el proyecto, cómo levantarlo y cómo contribuir. El dominio (entidades, reglas, épicas), las rutas de la API y la arquitectura técnica del backend se documentan aparte — ese es el material de referencia, este archivo no lo reemplaza.

## 1. Descripción

EVOBOX conecta entrenador y boxeador: planificación y seguimiento de entrenamientos, sugerencias, lesiones, mediciones físicas, nutrición y evolución. Detalle completo en el `Análisis orientado a DDD` del equipo.

## 2. Tecnologías

| Componente | Tecnología |
|---|---|
| Backend | NestJS + TypeScript |
| Frontend | React + TypeScript + Vite |
| Base de datos | PostgreSQL (vía Docker Compose) |
| ORM | TypeORM |
| API | REST / JSON |
| Testing | Jest |

## 3. Módulos del backend

| Módulo | Qué resuelve |
|---|---|
| `auth` | Login y registro (no es un bounded context propio: responsabilidad técnica transversal) |
| `usuarios` | Perfil de entrenador/boxeador y su vínculo |
| `entrenamientos` | Entrenamientos, rutinas, ejercicios, objetivos, sugerencias |
| `lesiones` | Lesiones y su historial de estados |
| `monitoreo` | Mediciones físicas y nutrición |
| `evolucion` | Estadísticas de progreso (sin entidades propias) |
| `shared` | Enums/VOs usados por más de un módulo |

Mapeo de entidades, reglas y endpoints de cada módulo: ver `Análisis orientado a DDD` y `Contrato de API`. La arquitectura interna de cada módulo (capas, puertos, casos de uso) se documenta aparte.

## 4. Estructura del repositorio

```text
PA-Proyecto3/
├── backend/
│   ├── src/
│   │   ├── modules/{auth,usuarios,entrenamientos,lesiones,monitoreo,evolucion}/
│   │   ├── shared/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── compose.yaml
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

## 5. Requisitos

Node.js **≥ 24.9** (Jest necesita `require(esm)` nativo; con versiones anteriores los tests fallan), npm, Docker (+ Docker Compose), Git.

## 6. Instalación

```bash
git clone https://github.com/ElisaNardi/PA-Proyecto3.git
cd PA-Proyecto3/backend
npm ci
cp .env.example .env   # completar con los propios valores locales
docker compose up -d   # levanta Postgres con los datos de .env
npm run start:dev
```

El backend corre con prefijo `/api`. `.env` es privado, no se sube a Git.

Para el frontend, desde la raíz:

```bash
cd frontend
npm ci
npm run dev
```

## 7. Base de datos

`docker compose up -d` (desde `backend/`) levanta Postgres con el usuario/contraseña/base definidos en `.env`, persistidos en un volumen — no hace falta crear la base a mano. Migraciones de TypeORM: pendientes de configurar; no asumir que las tablas existen automáticamente, coordinar con el equipo hasta tenerlas. **No usar `synchronize: true` en producción.**

## 8. Testing

Desde `backend/`:

```bash
npm run test       # unitario
npm run test:cov   # cobertura
npm run test:e2e   # end-to-end
npm run build
npm run lint
```

Priorizar tests de reglas de negocio, no solo de endpoints (ver `Análisis orientado a DDD`).

## 9. Trabajo con Git

Rama propia por feature, nunca directo sobre `main`:

```bash
git switch main && git pull origin main
git switch -c feature/nombre-descriptivo
# ... commits ...
git push -u origin feature/nombre-descriptivo
```

Commits: `feat:` `fix:` `test:` `refactor:` `docs:` `chore:`. No subir `.env`, `node_modules` ni `dist`. Avisar cambios que afecten a otro módulo. `npm run build && npm run test` antes de abrir PR.

## 10. Estado actual

Backend y frontend inicializados, sin entidades/persistencia implementadas todavía en ningún módulo. Migraciones, autenticación, vínculo entrenador-boxeador, pantallas de frontend, testing y Docker Compose del backend (esta sección) son trabajo pendiente — no asumir nada implementado por el solo hecho de que exista el módulo o la tabla.

---

**Proyecto académico — Programación Avanzada, UTN FRVM, 2026.**