# EVOBOX 🥊

**Sistema de gestión y seguimiento de entrenamientos de boxeo**

**Materia:** Programación Avanzada — UTN FRVM  
**Año:** 2026  
**Arquitectura:** Monolito modular con arquitectura en capas  
---

## 1. Descripción del proyecto

EVOBOX es una aplicación web destinada a entrenadores y boxeadores, cuyo objetivo es facilitar la planificación, asignación y seguimiento de entrenamientos de boxeo.

El sistema permite gestionar entrenamientos, rutinas, ejercicios y objetivos deportivos. También contempla el registro de lesiones, mediciones físicas, seguimiento nutricional y consultas de evolución.

Se distinguen dos roles principales:

- **Entrenador:** planifica entrenamientos, define objetivos, modifica rutinas, administra sugerencias y consulta el progreso de sus boxeadores.
- **Boxeador:** consulta entrenamientos asignados, registra su cumplimiento, informa lesiones y sugerencias, y realiza el seguimiento de sus mediciones y alimentación.

El desarrollo se organiza por funcionalidades, siguiendo el análisis orientado al dominio (DDD).

## 2. Tecnologías utilizadas

| Componente | Tecnología |
|---|---|
| Backend | NestJS 12 + TypeScript |
| Frontend | React + TypeScript + Vite |
| Base de datos | PostgreSQL |
| ORM | TypeORM |
| Arquitectura | Monolito modular en capas |
| API | REST / JSON |
| Configuración | @nestjs/config |
| Validaciones | class-validator y class-transformer |
| Testing backend | Jest |
| Testing frontend | Por configurar |
| Contenedores | Docker Compose (pendiente de configuración) |
| Control de versiones | Git y GitHub |

## 3. Arquitectura del sistema

Se utiliza una **arquitectura de monolito modular**, donde el backend se ejecuta como una única aplicación NestJS, dividida en módulos según sus responsabilidades funcionales.

Dentro de los módulos de negocio se utiliza una arquitectura en cuatro capas:

### Presentation

Responsable de recibir y responder solicitudes HTTP.

Incluye:
- Controllers.
- DTOs.
- Validaciones de entrada.

No debe contener reglas de negocio complejas ni consultas directas a la base de datos.

### Application

Responsable de coordinar las operaciones de la aplicación.

Incluye:
- Application Services.
- Coordinación entre entidades, repositorios y servicios de otros módulos.
- Operaciones de lectura y escritura.

No se utiliza una clase `UseCase` por cada funcionalidad. Las operaciones se implementan mediante métodos en los services de aplicación.

### Domain

Contiene el modelo y las reglas del negocio.

Incluye:
- Entidades del dominio.
- Value Objects.
- Enumeraciones.
- Invariantes y reglas de negocio.
- Contratos de repositorios, cuando corresponda.

El dominio debe mantenerse independiente de NestJS, HTTP y TypeORM.

### Infrastructure

Contiene las implementaciones técnicas necesarias para ejecutar el sistema.

Incluye:
- Entidades de persistencia TypeORM.
- Implementaciones de repositorios.
- Mappers, cuando sean necesarios.
- Integraciones externas.

Se diferencian las entidades del dominio de las entidades utilizadas por TypeORM para persistir los datos.

### Flujo general

Frontend React → Controller → Application Service → Dominio / Repositorio → PostgreSQL.

El Application Service coordina la interacción entre los objetos del dominio y los repositorios. Las interfaces de repositorio permiten evitar que el dominio dependa directamente de TypeORM.

## 4. Módulos del backend

| Módulo | Responsabilidad |
|---|---|
| auth | Autenticación, autorización y gestión de acceso |
| usuarios | Gestión de usuarios, entrenadores y boxeadores |
| entrenamientos | Asignación y modificación de entrenamientos, objetivos y sugerencias |
| rutinas | Gestión de rutinas y ejercicios |
| lesiones | Registro de lesiones y seguimiento de estados |
| monitoreo | Mediciones físicas, categorías de peso y seguimiento nutricional |
| evolucion | Consultas de estadísticas e indicadores de progreso |

Los módulos funcionales de NestJS no necesariamente corresponden de manera individual a Bounded Contexts DDD.

### Distribución de entidades

**Usuarios:** Usuario, Entrenador, Boxeador, Email, Rol.

**Entrenamientos:** Entrenamiento, Objetivo, Sugerencia, TipoEntrenamiento.

**Rutinas:** Rutina, Ejercicio.

**Lesiones:** Lesion, CambioEstadoLesion, EstadoLesion, Gravedad.

**Monitoreo:** MedicionFisica, Medida, CategoriaPeso, ReferenciaNutricional y RegistroConsumo.

**Evolución:** servicios de consulta y cálculo de indicadores. No requiere una entidad de persistencia propia obligatoriamente.

## 5. Estructura del proyecto

```text
PA-Proyecto3/
├── backend/
│   ├── src/
│   │   ├── common/
│   │   │   ├── guards/
│   │   │   ├── filters/
│   │   │   └── decorators/
│   │   ├── config/
│   │   │   └── database.config.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── usuarios/
│   │   │   ├── entrenamientos/
│   │   │   ├── rutinas/
│   │   │   ├── lesiones/
│   │   │   ├── monitoreo/
│   │   │   └── evolucion/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   └── package.json
├── .gitignore
└── README.md
```

### Estructura interna de un módulo de negocio

```text
nombre-modulo/
├── presentation/
│   ├── dto/
│   └── nombre.controller.ts
├── application/
│   └── nombre.service.ts
├── domain/
│   ├── entities/
│   ├── enums/
│   ├── value-objects/
│   └── repositories/
├── infrastructure/
│   ├── persistence/
│   ├── repositories/
│   └── mappers/
└── nombre.module.ts
```

Esta estructura es una referencia. No es necesario crear carpetas vacías ni componentes que no aporten una responsabilidad concreta.

Los tests unitarios pueden ubicarse junto a los archivos que prueban, utilizando la extensión `.spec.ts`.

## 6. Requisitos para ejecutar el proyecto

Para trabajar localmente se requiere:

- Node.js y npm compatibles con la versión de NestJS utilizada.
- PostgreSQL en ejecución.
- Git.
- Un editor como Visual Studio Code.
- pgAdmin 4 (opcional, recomendado para visualizar la base de datos).

Las dependencias de backend y frontend se instalan de manera independiente.

## 7. Instalación del proyecto

### 7.1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
cd PA-Proyecto3
```

Reemplazar `URL_DEL_REPOSITORIO` por la URL real del repositorio de GitHub.

### 7.2. Instalar dependencias del backend

```bash
cd backend
npm ci
```

El comando `npm ci` instala las dependencias registradas en `package-lock.json` para reproducir el entorno del proyecto.

### 7.3. Configurar variables de entorno

Dentro de `backend`, crear un archivo `.env` tomando como referencia `.env.example`.

Ejemplo:

```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=CONTRASENA_LOCAL
DB_NAME=EVOBOX
PORT=3000
```

Cada integrante debe utilizar su propio usuario, contraseña y puerto de PostgreSQL.

**Importante:** en la computadora donde se inició el proyecto se utiliza el puerto `5434`, pero este valor puede variar según la instalación local.

El archivo `.env` contiene datos privados y no debe subirse a Git.

### 7.4. Crear la base de datos

En PostgreSQL, crear una base denominada exactamente:

`EVOBOX`

Desde pgAdmin se puede utilizar **Databases → Create → Database**, o ejecutar la sentencia SQL desde una conexión de administración:

```sql
CREATE DATABASE "EVOBOX";
```

Las comillas permiten conservar el nombre en mayúsculas.

La base `EVOBOX` es independiente de cualquier otra base de datos que tenga el desarrollador.

**Nota:** crear la base de datos no crea automáticamente todas las tablas.

### 7.5. Iniciar el backend

Desde `backend/`:

```bash
npm run start:dev
```

El backend se ejecuta habitualmente en:

`http://localhost:3000`

Las rutas REST utilizarán el prefijo `/api` si está configurado en `main.ts`.

### 7.6. Instalar y ejecutar el frontend

Desde la raíz del repositorio:

```bash
cd frontend
npm ci
npm run dev
```

Vite mostrará la URL local correspondiente, habitualmente:

`http://localhost:5173`

El frontend todavía se encuentra en etapa de configuración e implementación.

## 8. Base de datos y TypeORM

El backend utiliza PostgreSQL junto con TypeORM.

La configuración general se encuentra en:

`backend/src/config/database.config.ts`

Y se integra en:

`backend/src/app.module.ts`

Las clases utilizadas para representar tablas se encuentran en las carpetas:

`modules/<modulo>/infrastructure/persistence/`

Las entidades puras del dominio se encuentran en:

`modules/<modulo>/domain/entities/`

### Convenciones de persistencia

- Cada módulo registra sus entidades TypeORM mediante `TypeOrmModule.forFeature()`.
- La conexión principal se configura mediante `TypeOrmModule.forRootAsync()`.
- Las reglas del dominio no deben depender directamente de PostgreSQL.
- Las relaciones entre tablas deben representar las relaciones definidas en el modelo.
- La modificación del esquema se gestionará mediante migraciones cuando se configure ese mecanismo.

### Estado de las migraciones

Las migraciones de TypeORM están pendientes de configuración.

Durante el desarrollo inicial se utilizó temporalmente `synchronize` para crear tablas en la base local EVOBOX.

No se debe asumir que las tablas existen automáticamente después de clonar el repositorio. Hasta disponer de migraciones, la creación del esquema debe coordinarse entre los integrantes.

**No utilizar `synchronize: true` en producción ni sobre bases que contengan datos que deban conservarse.**

## 9. Épicas del sistema

### Épica 1 — Entrenamientos y rutinas

Incluye:

- HU-01: Asignar entrenamiento.
- HU-02: Definir objetivos.
- HU-03: Consultar entrenamiento.
- HU-04: Registrar cumplimiento de rutinas.
- HU-05: Ajustar entrenamiento.

**Modelo principal:** Entrenamiento, Rutina, Ejercicio y Objetivo.

Reglas relevantes:
- Un entrenamiento debe contener al menos una rutina.
- Una rutina debe contener al menos un ejercicio.
- Los entrenamientos PRE_PELEA deben incluir fecha de pelea.
- Solo el entrenador autorizado puede asignar y modificar entrenamientos.
- Un boxeador solo puede consultar y registrar el cumplimiento de sus entrenamientos.
- El modelo inicial utiliza `completado` en Ejercicio, sin una entidad independiente para el historial de ejecuciones.

### Épica de sugerencias

Permite que los boxeadores propongan modificaciones y que los entrenadores las evalúen. Las sugerencias no modifican automáticamente los entrenamientos.

### Épica de lesiones

Permite registrar lesiones, administrar sus estados y conservar información de recuperación. Las lesiones activas deben poder consultarse durante la planificación.

### Épica de monitoreo físico y nutricional

Incluye registros de peso, categorías deportivas, objetivos físicos, referencias nutricionales y consumo de calorías y macronutrientes.

El cálculo de IMC fue retirado del alcance del sistema.

### Épica de evolución

Contempla estadísticas y comparaciones de mediciones físicas, consumo nutricional y cumplimiento de entrenamientos.

**Nota:** los nombres y límites definitivos de las épicas deberán mantenerse sincronizados con el documento de análisis funcional del equipo.

## 10. Testing

El backend utiliza Jest para pruebas automatizadas.

Desde `backend/`:

```bash
npm run test
```

Para generar cobertura:

```bash
npm run test:cov
```

Para compilar el backend:

```bash
npm run build
```

Para ejecutar el análisis estático:

```bash
npm run lint
```

### Criterios de testing

Se priorizarán pruebas de las reglas de negocio, no solamente de los endpoints.

Ejemplos:
- Impedir entrenamientos sin rutinas.
- Exigir fecha de pelea para PRE_PELEA.
- Validar cantidades y parámetros de ejercicios.
- Verificar que las modificaciones respeten las reglas del dominio.
- Validar las transiciones de estados de las lesiones.

Los controllers podrán probarse con services simulados mediante mocks, evitando depender innecesariamente de PostgreSQL.

El porcentaje de cobertura automatizada será definido y justificado por el grupo.

## 11. Trabajo colaborativo con Git

Cada integrante deberá trabajar en una rama propia, evitando realizar cambios directamente sobre la rama principal sin revisión.

### Crear una rama para una épica

Desde la raíz del repositorio:

```bash
git switch main
git pull origin main
git switch -c feature/epica-entrenamientos
```

Si el repositorio utiliza otra rama principal, reemplazar `main` por su nombre.

### Guardar cambios

```bash
git add .
git commit -m "feat: implementar funcionalidad"
git push -u origin feature/epica-entrenamientos
```

Luego crear un Pull Request en GitHub para integrar el trabajo.

### Convenciones sugeridas para commits

- `feat:` nueva funcionalidad.
- `fix:` corrección de error.
- `test:` incorporación o modificación de pruebas.
- `refactor:` reorganización sin cambio de comportamiento.
- `docs:` documentación.
- `chore:` configuración o mantenimiento.

### Reglas de colaboración

- No subir archivos `.env` con credenciales.
- No subir `node_modules`, `dist` ni carpetas generadas.
- No modificar módulos ajenos sin coordinación.
- Informar cuando se cambien contratos o servicios utilizados por otros módulos.
- Incorporar pruebas automatizadas para reglas de negocio relevantes.
- Comprobar `npm run build` y `npm run test` antes de abrir un Pull Request.
- Mantener actualizado el README cuando cambie la arquitectura o el procedimiento de instalación.

## 12. Estado actual del desarrollo

La estructura inicial del proyecto contempla:

- Backend NestJS inicializado.
- Módulos funcionales creados.
- Separación de responsabilidades mediante arquitectura en capas.
- Configuración inicial de PostgreSQL y TypeORM.
- Base de datos EVOBOX creada para desarrollo local.
- Pruebas iniciales con Jest.
- Proyecto frontend React inicializado.
- Persistencia inicial de lesiones y trabajo en las tablas de Entrenamientos y Rutinas.

### Pendiente de implementación o verificación

- Completar entidades y reglas del dominio.
- Completar repositorios y mappers de infraestructura.
- Implementar operaciones REST de cada módulo.
- Completar la autenticación y autorización.
- Configurar migraciones compartidas para el equipo.
- Desarrollar las pantallas del frontend.
- Configurar Docker Compose.
- Completar testing automatizado y justificar cobertura.
- Resolver decisiones de negocio pendientes, especialmente categorías de peso y recomendaciones nutricionales.

**Importante:** las funcionalidades indicadas como pendientes no deben considerarse implementadas por el hecho de existir sus módulos o tablas.

## 13. Decisiones arquitectónicas

Se adoptó un monolito modular con arquitectura en capas para organizar la aplicación por responsabilidades, mantener el dominio separado de los detalles técnicos y facilitar el desarrollo colaborativo.

Las decisiones principales son:

- Un solo backend NestJS.
- Una base de datos PostgreSQL.
- Módulos organizados por funcionalidades.
- Separación entre Presentation, Application, Domain e Infrastructure.
- Application Services en lugar de una clase UseCase por cada funcionalidad.
- Entidades de dominio independientes de TypeORM.
- Tests automatizados con énfasis en reglas de negocio.
- Frontend React independiente que consume la API REST del backend.

Estas decisiones siguen los conceptos de arquitectura en capas y diseño orientado al dominio trabajados en Programación Avanzada.

---

**Proyecto académico — Programación Avanzada, UTN FRVM, 2026.**