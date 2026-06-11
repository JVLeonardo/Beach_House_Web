# Backend Spring Boot - Guia Inicial

## 1. Ubicacion del Proyecto

El backend vive como proyecto separado dentro del repositorio:

```text
beachhouse-api-backend
```

La web estatica actual vive en:

```text
beachhouse-app
```

El frontend sera rehecho en una fase posterior. Por ahora se conserva como app estatica separada del backend.

## 2. Configuracion Recomendada en Spring Initializr

Al crear o regenerar el proyecto desde Spring Initializr, usar:

- Project: Maven
- Language: Java
- Spring Boot: 4.0.6
- Group: com.beachhouse
- Artifact: beachhouse-api
- Name: beachhouse-api
- Package name: com.beachhouse.api
- Packaging: Jar
- Java: 21

## 3. Dependencias a Seleccionar

- Spring Web
- Spring Data JPA
- PostgreSQL Driver
- Validation
- Spring Security
- Spring Boot Actuator
- Lombok
- Spring Boot DevTools
- Flyway Migration

## 4. Modulos Iniciales

La API debe crecer con estos modulos:

- `availability`: disponibilidad, fechas pasadas, fechas bloqueadas y rangos reservados.
- `booking`: solicitudes de reserva, estados y datos del cliente.
- `package`: paquetes base como full day, 2D/1N y 3D/2N.
- `promotion`: promociones activables con precio, fecha objetivo y tema visual.
- `admin`: endpoints protegidos para gestion interna.
- `whatsapp`: generacion de mensajes prellenados para redireccionar al cliente.

## 5. Endpoints Iniciales

```text
GET    /api/public/packages
GET    /api/public/promotions/active
GET    /api/public/availability?from=YYYY-MM-DD&to=YYYY-MM-DD
POST   /api/public/booking-intents
GET    /api/admin/bookings
PATCH  /api/admin/bookings/{id}/status
POST   /api/admin/blocked-dates
POST   /api/admin/promotions
PATCH  /api/admin/promotions/{id}/toggle
```

## 6. Regla Central de Disponibilidad

Los lunes son reservables. La disponibilidad debe rechazar fechas pasadas y fechas bloqueadas manualmente, sin aplicar cierres automaticos por dia de la semana.

## 7. Base de Datos

Se usara PostgreSQL desde el inicio para evitar migraciones innecesarias desde una base temporal.

Flyway se encargara de versionar cambios de esquema con archivos en:

```text
beachhouse-api-backend/src/main/resources/db/migration
```

## 8. Docker y Variables de Entorno

El proyecto usa Docker para evitar que cada programador instale PostgreSQL localmente.

Los secretos y datos configurables viven en `.env`, que no debe subirse a Git. El archivo `.env.example` queda como plantilla segura para nuevos integrantes.

Variables principales:

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_PORT`
- `API_PORT`
- `SPRING_PROFILES_ACTIVE`
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_URL_LOCAL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`

## 9. Flujo con IntelliJ

Para programar como de costumbre en IntelliJ, levantar solo PostgreSQL:

```bash
docker compose up -d postgres
```

Luego ejecutar `BeachhouseApiApplication` desde IntelliJ con el perfil `dev`. La API usara:

```text
jdbc:postgresql://localhost:5432/beachhouse_db
```

## 10. Flujo Full Docker

Para levantar PostgreSQL y API juntos:

```bash
docker compose up --build
```

La API usara el perfil `docker` y se conectara internamente a:

```text
jdbc:postgresql://postgres:5432/beachhouse_db
```

Healthcheck:

```text
http://localhost:8080/actuator/health
```

## 11. Siguiente Paso Tecnico

Antes de implementar entidades y endpoints, definir el primer modelo de datos:

- Paquetes.
- Promociones.
- Reservas.
- Fechas bloqueadas.
- Estados de reserva.
- Usuarios administradores.
