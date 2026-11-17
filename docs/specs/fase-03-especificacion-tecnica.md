---
slug: "fase-03-especificacion-tecnica"
title: "Fase 3 · Especificación técnica de MODO"
description: "Borrador de especificación técnica de Fase 3 de MODO derivado de la especificación funcional aprobada de Fase 2, que registra TD-01 (arquitectura: frontend React + Vite existente, API propia y base de datos relacional como componentes futuros), TD-02 (API con Express 5.x), TD-03 (base de datos PostgreSQL), TD-04 (acceso a datos con Drizzle ORM y drizzle-kit), TD-05 (disponibilidad calculada con bloqueo breve de la sesión), TD-06 (React Router en modo declarativo, sin loaders, actions ni framework), TD-07 (reparto de estado del frontend: TanStack Query para los datos de la API, URL para los filtros del catálogo, Zustand solo para lo que fije TD-12 y Mantine Form para los formularios), TD-08 (validación de formularios: esquemas Zod importados desde zod/v4 conectados a Mantine Form mediante su schemaResolver integrado, con nueva validación en la futura API Express), TD-09 (Modal de @mantine/core solo para confirmaciones y avisos breves; la consigna exige Mantine Core con Modal y no obliga a usar @mantine/hooks; useState para los modales locales como elección técnica del proyecto; flujo de reserva y pago en páginas propias con URL y sin @mantine/modals), TD-10 (mapa de rutas por zonas pública, de participante y de organizador con layouts compartidos, rutas anidadas y URL propias con identificador del servidor para la reserva y el pago; nombres de ruta ilustrativos aceptados provisionalmente), TD-11 (sesiones administradas por la futura API Express mediante cookies httpOnly, sin tokens gestionados por JavaScript en el navegador; express-session solo como candidato no adoptado y detalles de sesión pendientes) y TD-12 (Zustand solo para el aviso de acceso activo, iniciar sesión o verificar el correo, sin persist; sustituye el borrador de reserva en Zustand; la fecha o sesión, las plazas y el teléfono de la reserva van en Mantine Form), documenta los apartados de entrega 21-24 (stack, arquitectura, navegación y propiedad del estado), 25-27 (datos e integración con la API bloqueada por no existir, formulario de registro y modales, y recorridos con TanStack Query) y 28-30 (estrategia de verificación sin pruebas ejecutadas, plan de construcción por etapas con datos simulados temporales durante el desarrollo sin valor como evidencia de integración, y trazabilidad técnica con los cambios respecto de la Fase 2), incorpora las confirmaciones de revisión del usuario (2026-11-10) y deja las demás decisiones técnicas abiertas."
spec_kind: spec-tech
status: approved
created_at: "2026-11-10T03:07:09.275Z"
last_updated: "2026-11-10T20:01:29.864Z"
source_spec: fase-02-especificacion-funcional
---
## Source and current evidence

- Fuente funcional: `fase-02-especificacion-funcional` (aprobada; RF2-01 a RF2-18) y los casos de uso CU-01 a CU-08 (aprobados). Esta especificación técnica no los modifica.
- Estado real del repositorio (2026-11-09): React 19.2.8, react-dom 19.2.8, Vite 8.2.2, TypeScript 6.0.3 y oxlint. `src/` contiene la plantilla de Vite. No existe backend, API ni base de datos. La comprobación de salud (health) es `pnpm build`.
- Evidencia de documentación (Context7, `/vitejs/vite/v8.0.10`, la versión más cercana a la instalada 8.2.2). Es evidencia consultada, **no configuración aplicada**:
  - `server.proxy` permite reenviar rutas como `/api` a un servidor separado durante el desarrollo (`docs/config/server-options.md`).
  - Solo las variables con prefijo `VITE_` se exponen al cliente mediante `import.meta.env` y quedan incluidas en el bundle; por tanto, los secretos deben residir en un backend (`docs/guide/env-and-mode.md`).
- Evidencia de documentación (Context7, `/expressjs/express/v5.2.0`, consultada el 2026-11-09). Es evidencia consultada, **no aplicada**: Express no está instalado ni existe código de la API.
  - En Express 5, las promesas rechazadas de los manejadores `async` pasan automáticamente al middleware de manejo de errores.
  - El manejador de errores general se define al final, después de las rutas, y tiene 4 parámetros (`err`, `req`, `res`, `next`).
  - `req.body` solo está disponible si antes de las rutas se aplica un middleware de parseo: `express.json`, `express.urlencoded`, `express.raw` o `express.text`.
- Evidencia de documentación (Context7, `/websites/postgresql/18`, postgresql.org/docs/18, consultada el 2026-11-09). Es evidencia consultada, **no aplicada**: PostgreSQL no está instalado ni existe base de datos ni código de acceso a datos.
  - `SELECT ... FOR UPDATE` bloquea las filas seleccionadas frente a `UPDATE`, `DELETE` o `SELECT FOR UPDATE` de otras transacciones hasta que termina la transacción actual (`explicit-locking.html`, §13.3.2).
  - Una transacción espera indefinidamente a que se liberen los bloqueos en conflicto; es mala idea mantener transacciones abiertas durante periodos largos (p. ej., esperando la entrada del usuario). Los deadlocks se detectan y PostgreSQL aborta una de las transacciones implicadas (`explicit-locking.html`, §13.3.4).
  - `SELECT FOR UPDATE` solo bloquea temporalmente; para impedir cambios concurrentes hay que actualizar realmente la fila mientras se tiene el bloqueo (`applevel-consistency.html`, §13.4.2).
  - `timestamp with time zone` se almacena internamente en UTC y no conserva la zona horaria original (`datatype-datetime.html`, §8.5.1.3); `AT TIME ZONE` convierte a una zona nombrada, aplicable a America/Guayaquil (RF2-12) (`functions-datetime.html`, §9.9.4).
  - No deben usarse números de coma flotante para manejar dinero por los errores de redondeo (`datatype-money.html`, §8.2); relacionado con RF2-13 y RF2-18. El tipo exacto concreto queda para el modelado de datos.
- Evidencia de documentación (Context7, `/drizzle-team/drizzle-orm-docs`, repositorio github.com/drizzle-team/drizzle-orm-docs, `src/content/docs/...`, consultada el 2026-11-09). Es evidencia consultada, **no aplicada**: Drizzle no está instalado ni existen esquemas, migraciones ni código de acceso a datos.
  - `db.transaction(async (tx) => …)` ejecuta las sentencias en una transacción que se confirma o se revierte en bloque; `tx.rollback()` lanza una excepción que revierte la transacción. Un segundo argumento `PgTransactionConfig` admite `isolationLevel` (`'read uncommitted'`, `'read committed'`, `'repeatable read'`, `'serializable'`), `accessMode` (`'read only'`, `'read write'`) y `deferrable` (`pg/transactions.mdx`).
  - Flujo de migraciones *codebase-first*: `drizzle-kit generate` lee las migraciones previas, calcula la diferencia con el esquema TypeScript, pide confirmar los renombrados y genera `migration.sql` y `snapshot.json`; `drizzle-kit migrate` lee los `.sql`, consulta el historial en la base de datos y aplica solo los pendientes (`pg/migrations.mdx`).
  - `numeric({ precision, scale, mode })` admite los modos `'number'` y `'bigint'`; `timestamp` con o sin zona horaria admite los modos `'date'` (se mapea a `Date` de JavaScript) y `'string'` (sin mapeo); para `timestamp with time zone`, el valor se devuelve convertido a la zona configurada en la instancia de PostgreSQL (`pg/column-types.mdx`).
  - **Ausencia documentada:** la documentación indexada en Context7 no contiene material sobre `SELECT ... FOR UPDATE` ni sobre bloqueo de filas en Drizzle. El soporte de bloqueo de filas en Drizzle queda **pendiente de verificar** (mediante la API de Drizzle o con SQL explícito dentro de la transacción); no se afirma como hecho. *(Actualización 2026-11-10: el changelog oficial de drizzle-orm documenta `.for('update')` para PostgreSQL; el uso dentro de una transacción sigue pendiente de confirmar al implementar. Ver la evidencia del 2026-11-10.)*
  - Versiones indexadas en Context7 (`/drizzle-team/drizzle-orm`): drizzle-orm 0.45.x y drizzle-kit 0.31.5. Son referencia de la documentación consultada, no versiones elegidas.
- Evidencia de documentación (Context7, `/drizzle-team/drizzle-orm/0.45.4`, repositorio oficial github.com/drizzle-team/drizzle-orm, consultada el 2026-11-10). Es evidencia consultada, **no aplicada**: Drizzle no está instalado ni existe código de acceso a datos.
  - El changelog oficial `changelogs/drizzle-orm/0.20.3.md` documenta el bloqueo de filas en consultas de PostgreSQL: `db.select().from(users).for('update')`, y las variantes y opciones `.for('no key update', { of: users })`, `{ skipLocked: true }` y `.for('share', { of: users, noWait: true })`.
  - La guía principal (`/drizzle-team/drizzle-orm-docs`; `/websites/orm_drizzle_team` sin resultados) no contiene material sobre bloqueo de filas; la fuente es el changelog, no la guía.
  - Uso dentro de una transacción: el README del repositorio (0.45.4) muestra que `tx` expone los mismos métodos que `db` solo con un ejemplo de SQLite; no hay ejemplo explícito de `.for('update')` dentro de `tx` en PostgreSQL. **Pendiente de confirmar en la implementación.**
  - SQL parametrizado: solo se halló un ejemplo para SQLite (`` db.run(sql`…${userId}`) ``, `sqlite-core/README.md`, con parametrización automática). La vía equivalente en PostgreSQL **no está verificada**.
- Evidencia de documentación (Context7, `/websites/reactrouter/7.13.0`, reactrouter.com/7.13.0/start/modes, consultada el 2026-11-10). Es evidencia consultada, **no aplicada**: React Router no está instalado ni existen rutas en el frontend.
  - React Router tiene tres modos (declarativo, de datos y framework) y el modo depende de la API de router de nivel superior que se utilice. Los modos son aditivos: «The features available in each mode are additive, so moving from Declarative to Data to Framework simply adds more features at the cost of architectural control.»
  - Modo declarativo: `BrowserRouter` es el router de nivel superior; ofrece el emparejamiento de URL con componentes, la navegación y los estados activos mediante `<Link>`, `useNavigate` y `useLocation`.
  - Modo de datos (descartado en TD-06, descrito solo como referencia): `createBrowserRouter` y `RouterProvider` sacan la configuración de rutas del renderizado y añaden carga de datos, *actions* y estados pendientes.
- Evidencia de documentación para TD-07 (Context7, consultada el 2026-11-10). Es evidencia consultada, **no aplicada**: ni React Router, ni Zustand, ni TanStack Query están instalados; no existe código de estado en el frontend.
  - React Router (`/websites/reactrouter/7.13.0`):
    - La guía https://reactrouter.com/7.13.0/start/declarative/url-values documenta `useSearchParams` dentro del recorrido del modo declarativo (TD-06).
    - https://reactrouter.com/7.13.0/api/hooks/useSearchParams: devuelve `[URLSearchParams, setSearchParams]`; «Setting the search params causes a navigation»; el callback de `setSearchParams` «does not support the queueing logic» de `setState`; `searchParams` es una referencia estable pero mutable.
    - El ejemplo con `<Form>` de la explicación sobre gestión de estado (`explanation/state-management`) no aplica a MODO, porque no se usan *actions* (TD-06).
  - Zustand (`/pmndrs/zustand/v5.0.14`):
    - En TypeScript, el almacén se crea con la forma `create<State>()(...)`.
    - El middleware `persist` (por defecto `localStorage`, o `sessionStorage` con `createJSONStorage`, y selección parcial con `partialize`) es opcional; sin él, el estado no sobrevive a la recarga de la página. El uso de `persist` **no está decidido**. *(Actualización TD-12: no se usa `persist`; el aviso de acceso se cierra al recargar.)*
  - TanStack Query (v5.90.3, guía *does-this-replace-client-state*):
    - Distingue el estado del servidor (*server state*) del estado del cliente (*client state*); una vez que TanStack Query gestiona los datos remotos, el estado global de cliente restante suele ser «very tiny».
    - `staleTime` es 0 por defecto; su configuración concreta queda pendiente (pregunta abierta 9).
  - **Limitación de versión:** el usuario indicó una «versión 8.3.1» exigida por la cohorte. *(Corregido en TD-08: la versión 8.3.1 corresponde a React Router, según la consigna oficial 03-diseno-tecnico.pdf, sección 5, indicada por el usuario.)* Context7 indexa React Router hasta 7.13.0 y Zustand hasta v5.0.14. **No se afirma compatibilidad con las versiones exactas exigidas**: queda pendiente verificar la API utilizada con React Router 8.3.1 y con las demás versiones exigidas antes de implementar (pregunta abierta 13).
- Evidencia de documentación para TD-08 (Context7, consultada el 2026-11-10). Es evidencia consultada, **no aplicada**: ni Zod, ni Mantine Form, ni Mantine Core están instalados; no existe código de formularios.
  - Mantine (`/mantinedev/mantine/9.0.0`):
    - Changelog 9-0-0: Mantine Form incorpora soporte integrado de Standard Schema: «built-in support for Standard Schema… schemaResolver… without needing a separate resolver package».
    - `schemaResolver(schema, { sync: true })`: la opción `sync: true` hace síncronas las funciones `validate`, `validateField` e `isValid`.
    - Ejemplo documentado: `import { z } from 'zod/v4';` junto con `import { useForm, schemaResolver } from '@mantine/form';`.
    - `form/schema-validation`: los errores se asignan por campo, también en listas (p. ej., `list.0.name`).
    - `guides/8x-to-9x`: «zodResolver is not exported from @mantine/form».
  - Zod (`/colinhacks/zod/v4.3.6`): están documentados los subpaths `zod/v4` y `zod/v4/core`.
  - **Limitación de versión:** Context7 indexa Mantine hasta 9.0.0 (no 9.4.1), Zod v4.3.6 y v4.6.x (no 4.4.3), Zustand hasta v5.0.14 (no 5.0.15) y React Router hasta 7.13.0 (no 8.3.1). **No se afirma compatibilidad con las versiones exactas exigidas**; queda pendiente de verificar (pregunta abierta 13).
- Evidencia de documentación para TD-09 (Context7, `/mantinedev/mantine/9.0.0`, consultada el 2026-11-10). Es evidencia consultada, **no aplicada**: Mantine Core no está instalado y no existe código de modales.
  - `core/modal.mdx`:
    - `Modal` es un componente controlado mediante las props `opened` y `onClose`.
    - «follows WAI-ARIA recommendations».
    - La prop `title` añade `aria-labelledby` al modal.
    - `closeButtonProps` permite definir el `aria-label` del botón de cierre.
    - «Control behavior»: se puede configurar atrapar el foco dentro del modal, cerrarlo con Escape, cerrarlo al pulsar fuera y devolver el foco al cerrar; desactivar estos comportamientos «is generally not recommended as it may impact accessibility».
    - `withCloseButton={false}` oculta el título y el botón de cierre.
  - `core/drawer.mdx` (9.0.0) nombra explícitamente las props `trapFocus`, `closeOnEscape`, `closeOnClickOutside` y `returnFocus`. Para `Modal`, la página `core/modal.mdx` describe las mismas capacidades sin que el fragmento consultado muestre esos nombres; se registran con esa salvedad.
  - `useDisclosure` (llms.txt) proviene de `@mantine/hooks`. *(Actualización, corregida el 2026-11-10: la consigna exige Mantine Core con `Modal` y no obliga a usar `@mantine/hooks` ni `useDisclosure`; el proyecto elige `useState` de React para los modales locales, como elección técnica. No se usa `useDisclosure`. Pregunta abierta 15 resuelta por elección técnica.)*
  - El README de `@mantine/core` 9.0.0 indica instalar «@mantine/core @mantine/hooks». No se afirma que `@mantine/hooks` sea una dependencia obligatoria de `@mantine/core` más allá de lo que dice ese README.
  - **Limitaciones:** Context7 indexa Mantine hasta 9.0.0, no la 9.4.1 exigida; `@mantine/hooks` no figura en la lista de versiones exigidas por la consigna y no se usa (pregunta abierta 15, resuelta por elección técnica: los modales locales se controlan con `useState`). No se instala nada.
- Evidencia de documentación para TD-10 (Context7, `/websites/reactrouter/7.13.0`, consultada el 2026-11-10). Es evidencia consultada, **no aplicada**: React Router no está instalado y no existen rutas, layouts ni pantallas.
  - `start/declarative/routing`: las rutas de layout sin `path` anidan rutas hijas sin añadir segmentos a la URL; las rutas índice (*index routes*) se renderizan en el `Outlet` de la ruta padre y no admiten hijos; las rutas hijas se renderizan mediante `<Outlet/>` en la ruta padre.
  - `api/components/Navigate`: `Navigate` admite las props `to`, `replace`, `state` y `relative`.
  - `api/hooks/useNavigate`: las opciones `replace`, `state` y `relative` «work in all modes (Framework, Data, and Declarative)»; `flushSync`, `preventScrollReset` y `viewTransition` solo están disponibles en los modos framework y de datos.
  - `api/components/Link`: la prop `state` de `Link` se lee en la pantalla de destino mediante `location.state`.
  - **Limitaciones:** la documentación corresponde a React Router 7.13.0, no a la 8.3.1 exigida (pregunta abierta 13). La ruta comodín `path="*"` no apareció en los fragmentos consultados y queda **pendiente de verificar**. No se usan la utilidad `replace()` ni los *loaders*, propios de los modos framework y de datos (TD-06).
- Evidencia de documentación para TD-11 (Context7, consultada el 2026-11-10). Es evidencia consultada, **no aplicada**: ni Express ni express-session están instalados y no existe código de autenticación ni de sesiones.
  - Express (`/expressjs/express/v5.3.0`, `History.md`):
    - Existen `res.cookie()` y `res.clearCookie()`.
    - En 5.0.0: «res.clearCookie will ignore user provided maxAge and expires options».
  - express-session (`/expressjs/session/v1.19.0`, README). Se documenta solo como **candidato, no adoptado** (el mecanismo de almacenamiento de sesiones queda pendiente, pregunta abierta 16):
    - `cookie.httpOnly`: impide el acceso a la cookie desde `document.cookie` y mitiga XSS.
    - `cookie.secure`: la cookie solo se envía por HTTPS; detrás de un proxy hay que configurar `trust proxy`; admite el valor `'auto'`.
    - `cookie.sameSite`: `true` (Strict), `false` (sin definir), `'lax'`, `'none'`, `'strict'` o `'auto'` (None en conexiones seguras y Lax en las no seguras). Se recomienda Secure cuando se usa `'none'`.
    - «The default MemoryStore … is not suitable for production».
    - `req.session.destroy()` cierra (destruye) la sesión.
  - **Limitaciones:** no se verificó la regeneración de la sesión al iniciar sesión ni ningún mecanismo de protección CSRF. No se afirman valores por defecto que no se consultaron. La documentación corresponde a Express v5.3.0 y express-session v1.19.0; no se elige ninguna versión.
- Evidencia de documentación para TD-12 (Context7, `/pmndrs/zustand/v5.0.14`, consultada el 2026-11-10). Es evidencia consultada, **no aplicada**: Zustand no está instalado y no existe código de estado.
  - En TypeScript, el almacén se crea con la forma *curried* `create<T>()((set) => ({ ... }))`.
  - Los consumidores leen un solo valor con un selector (`useStore((s) => s.campo)`) para evitar renderizados innecesarios.
  - Los valores derivados se calculan en el selector; no se guardan en el almacén.
  - **Limitación de versión:** Context7 indexa Zustand v4.3.3, 4.5.7, v5.0.10, v5.0.12 y v5.0.14; **la 5.0.15 exigida no está indexada**. No se afirma compatibilidad con la versión exacta exigida (pregunta abierta 13).
- Evidencia de documentación para los apartados 25-27 (Context7, consultada el 2026-11-10; 3 consultas). Es evidencia consultada, **no aplicada**: ni TanStack Query ni Zod están instalados y no existe código.
  - TanStack Query (`/tanstack/query/v5.90.3`; versiones v5 indexadas: v5.60.5, v5.71.10, v5_84_1, v5.74.3 y v5.90.3; **la 5.102.8 exigida no está indexada**):
    - `docs/framework/react/guides/queries.md`: una consulta está en un único estado a la vez: `isPending` o `status === 'pending'` (aún sin datos), `isError` o `status === 'error'` (con `error`) e `isSuccess` o `status === 'success'` (con `data`). `isFetching` es `true` durante cualquier petición, incluido el refresco en segundo plano. Patrón recomendado: comprobar `isPending`, después `isError` y, por último, usar `data`.
    - `guides/invalidations-from-mutations.md` y `quick-start.md`: `useMutation({ mutationFn, onSuccess })`; en `onSuccess` se llama a `queryClient.invalidateQueries({ queryKey: [...] })`, con `queryClient` obtenido de `useQueryClient()`. Si se devuelve la promesa (`await`, o `Promise.all` para varias keys), los datos se actualizan antes de que termine la mutación.
    - **No verificado en los fragmentos consultados:** el estado `isPending` de `useMutation` y que un cambio de `queryKey` dispare una nueva consulta. Se usan como diseño previsto, pendientes de verificar (pregunta abierta 13).
  - Zod (`/colinhacks/zod/v4.3.6`, `packages/docs/content/error-customization.mdx`):
    - Casi todas las funciones y métodos aceptan un mensaje propio, como texto o con un objeto `{ error: '…' }` (p. ej., `z.string().min(5, { error: '…' })`). En Zod 4, `message` y `errorMap` se unifican en `error`.
    - **No verificado:** la API concreta para validar el formato de un correo y para exigir que un booleano sea `true`; los fragmentos consultados no la mostraron (pregunta abierta 13).
  - **Limitación de versión:** no se afirma compatibilidad con TanStack Query 5.102.8 ni con Zod 4.4.3 (pregunta abierta 13).
- Versiones exigidas por la consigna oficial 03-diseno-tecnico.pdf, sección 5 (según el usuario; el PDF no está en el repositorio y no se ha leído). Salvo React y react-dom, ya instalados, están **exigidas y no instaladas**: `package.json` no cambia.

  | Biblioteca | Versión exigida | Estado | Documentación consultada (Context7) |
  |------------|-----------------|--------|-------------------------------------|
  | React / react-dom | 19.2.8 | Instalada | — |
  | React Router | 8.3.1 | Exigida; no instalada | 7.13.0 |
  | TanStack Query (`@tanstack/react-query`) | 5.102.8 | Exigida; no instalada | v5.90.3 |
  | Zustand | 5.0.15 | Exigida; no instalada | v5.0.14 |
  | Zod | 4.4.3 | Exigida; no instalada | v4.3.6 (también v4.6.x) |
  | Mantine Form (`@mantine/form`) | 9.4.1 | Exigida; no instalada | 9.0.0 |
  | Mantine Core (`@mantine/core`) | 9.4.1 | Exigida; no instalada | 9.0.0 |

- Restricciones de la consigna oficial 03-diseno-tecnico.pdf, sección 5 (según el usuario; el PDF no está en el repositorio):
  - No se usa `useEffect` para obtener datos, calcular filtros derivados ni responder a eventos.
  - No se usa ninguna librería de notificaciones.
  - Todos los paquetes de Mantine usan la misma versión.
  - No se usa `mantine-form-zod-resolver` (TD-08).
  - No se usa `@mantine/modals` (TD-09).
  - Se usa Mantine Core con `Modal` (TD-09). La consigna no obliga a usar `@mantine/hooks` ni `useDisclosure`. *(Corregido el 2026-11-10: la consigna no exige `useState`; controlar los modales locales con `useState` de React es una elección técnica del proyecto, no una restricción de la consigna. El aviso de acceso compartido se controla mediante Zustand según TD-12. Ver TD-09 y pregunta abierta 15.)*

### Recorrido funcional de referencia (Paso 1 de la Fase 3)

Explicado por el usuario el 2026-11-09. Se resume aquí como referencia; el recorrido **no modifica las fuentes** funcionales.

1. Un visitante explora el catálogo de experiencias en Quito con búsqueda y filtros (categoría, ubicación, fecha, precio) y abre el detalle de una experiencia gastronómica en Cumbayá.
2. Al reservar, se registra: proporciona nombre completo, correo electrónico y contraseña, acepta los términos y condiciones y recibe la información sobre el tratamiento de sus datos personales (CU-02 R1, R2, F2).
3. Queda con la sesión iniciada (RF2-06) y verifica su correo electrónico antes de reservar (CU-02).
4. Elige una fecha y 3 plazas a 20 USD cada una: total 60 USD (RF2-18, RF2-13).
5. Si la cuenta no tiene teléfono registrado, MODO lo solicita obligatoriamente antes de completar la reserva (CU-05 R3; CU-06 paso 2; CU-06 F4 y CA8).
6. Ve las condiciones de cancelación.
7. Paga con tarjeta de crédito o débito (RF2-14). MODO retiene las 3 plazas durante un máximo de 10 minutos (RF2-08).
8. Si el pago es correcto, la reserva se confirma automáticamente; si el pago falla o la retención vence, la reserva no se confirma y las plazas se liberan (CU-06 F2/F3).
9. El participante consulta su reserva en «Mis reservas» (nombre ilustrativo, no definido en las fuentes).
10. Si cancela con 24 horas o más de anticipación (RF2-01, RF2-12), se cancela la reserva completa (CU-07 R7), las plazas se liberan y se reembolsa el 100 % al método de pago original (RF2-10); el reembolso se inicia en un plazo máximo de 24 horas (RF2-11) y su acreditación depende de la entidad financiera.
11. Con menos de 24 horas de anticipación, MODO informa que la reserva no puede cancelarse directamente.

Contraste: el recorrido se contrastó con CU-01, CU-02, CU-05, CU-06, CU-07 y RF2-01 a RF2-18 y resultó coherente tras dos correcciones confirmadas por el usuario:

- Palabras del usuario (2026-11-09): «Si el participante no tiene teléfono registrado, MODO debe solicitarlo obligatoriamente antes de completar la reserva.»
- Palabras del usuario (2026-11-09): «Para crear la cuenta, debe proporcionar su nombre completo, correo electrónico y contraseña, aceptar los términos y condiciones y recibir la información sobre el tratamiento de sus datos personales.»

## Boundaries, contracts, and design

### TD-01 — Arquitectura general

| Componente | Descripción | Estado |
|------------|-------------|--------|
| 1. Frontend | SPA React + TypeScript con Vite (plantilla existente) | Existe |
| 2. API propia | API propia con Express 5.x sobre Node.js y TypeScript (TD-02) | Componente futuro; no implementado |
| 3. Base de datos relacional | Base de datos relacional PostgreSQL (TD-03; componente futuro, no disponible) | Componente futuro; no disponible |

### Límite de responsabilidades

- Las reglas de disponibilidad de plazas, reservas, retención de pago, pagos, cancelaciones y reembolsos se comprueban de forma centralizada en la API.
- El frontend presenta y recoge datos; no es la fuente de verdad.
- PostgreSQL no resuelve automáticamente las reglas de negocio: la API coordina las retenciones de 10 minutos, las confirmaciones de pago, las cancelaciones y los reembolsos (TD-03).

Reglas funcionales que motivan este límite:

- RF2-08: la retención de plazas durante el pago es compartida entre usuarios, por lo que no puede resolverse en un solo navegador.
- RF2-09: la confirmación del pago no llega desde el navegador del participante.
- CU-02: el envío del correo de verificación requiere un servidor.
- RF2-11: el reembolso debe iniciarse aunque el participante no esté conectado.
- RF2-12 / RF2-16: los plazos se calculan en la zona horaria America/Guayaquil sin depender del reloj del dispositivo.

### TD-04 — Capa de acceso a datos

- La capa de acceso a datos será Drizzle ORM, con drizzle-kit para las migraciones (TD-04). Es un componente futuro; no implementado.
- Se sitúa entre la API Express (TD-02) y PostgreSQL (TD-03): la API accede a la base de datos a través de Drizzle.
- Esta especificación no define tablas, esquemas ni código; quedan para el modelado de datos (ver preguntas abiertas).

### Restricción de concurrencia (TD-03)

- Los bloqueos transaccionales deben ser breves.
- La retención de 10 minutos (RF2-08) **no** se implementa como una transacción o un bloqueo abierto durante el pago; deberá representarse de otra forma. El mecanismo concreto queda pendiente (ver preguntas abiertas).
- Restricción reconocida por el usuario (TD-04): Drizzle no garantiza por sí solo que las plazas no se vendan dos veces. La futura API deberá definir las transacciones, el bloqueo o la actualización de la disponibilidad y el vencimiento de las retenciones.

### TD-05 — Protección de la disponibilidad de plazas

- La disponibilidad de una sesión se **calcula**; no se guarda como un contador aparte:
  - disponibilidad = cupo de la sesión − plazas de las reservas confirmadas − plazas de las retenciones vigentes.
  - Única fuente de verdad: el cupo, las reservas confirmadas y las retenciones vigentes.
- Bloqueo breve de la sesión: las operaciones que modifican la disponibilidad bloquean la fila de la sesión dentro de una transacción solo durante lo necesario para consultar la disponibilidad y registrar la operación.
  - Nunca se mantiene durante los 10 minutos de la retención de pago (RF2-08); la retención queda registrada y la transacción termina.
  - El bloqueo previsto es `SELECT ... FOR UPDATE` (TD-03). Su uso desde Drizzle dentro de una transacción queda pendiente de confirmar (ver evidencia del 2026-11-10 y preguntas abiertas).
- Misma estrategia transaccional para todas las operaciones que cambian la ocupación o el cupo de una sesión:
  - Retener plazas al iniciar el pago (RF2-08).
  - Confirmar la reserva tras el pago correcto (CU-05, CU-06, RF2-09).
  - Liberar plazas por pago fallido o por vencimiento de la retención (CU-06 F2/F3, RF2-08).
  - Cancelar la reserva y liberar sus plazas (CU-07, RF2-17).
  - Cambios de cupo realizados por el organizador (CU-04 R2).
- Esta especificación no define tablas, columnas, índices ni código; quedan para el modelado de datos.

### TD-06 — Enrutamiento del frontend

- El frontend usará React Router en **modo declarativo** (TD-06). Es un componente futuro; no instalado ni implementado.
  - Sin *loaders*, sin *actions* y sin usar React Router como framework.
- Separación de responsabilidades en el frontend:
  - React Router: rutas y navegación entre pantallas.
  - TanStack Query: consulta y sincronización de los datos de la futura API. Es una biblioteca exigida; no está instalada y su configuración se decidirá más adelante.
- Controles de acceso de interfaz, planteados desde los componentes de React, para las pantallas que requieren:
  - Sesión iniciada (RF2-06).
  - Correo verificado (CU-02 A1).
  - Permisos de organizador (CU-03, CU-04, CU-08).
- Estos controles son solo de interfaz: la futura API verifica los permisos de forma independiente (p. ej., CU-07 R6 y CU-08 R1).
- Esta especificación no define el mapa de rutas ni los nombres de componentes o pantallas; quedan pendientes (ver preguntas abiertas). *(Actualización TD-10: la estructura del mapa de rutas por zonas queda definida en «TD-10 — Mapa de rutas por zonas»; los nombres de ruta siguen siendo ilustrativos y pendientes, pregunta abierta 12.)*

### TD-07 — Reparto de estado en el frontend

Cada tipo de estado tiene un único responsable; ningún dato se duplica entre ellos. Son componentes futuros: ninguna de estas bibliotecas está instalada y no existe código.

| Responsable | Qué gestiona | Qué no gestiona |
|-------------|--------------|-----------------|
| TanStack Query | Datos de la futura API: experiencias, sesiones, disponibilidad, reservas y participante autenticado (incluidos el estado de verificación del correo y los permisos). | No se copian en Zustand ni en otro almacén. |
| URL (React Router, `useSearchParams`) | Filtros, búsqueda y orden del catálogo (CU-01): p. ej., categoría, ubicación, fecha y precio. Permiten compartir búsquedas y conservarlas con los botones Atrás y Adelante del navegador. | No guarda datos de la API ni datos personales. |
| Zustand | Aviso de acceso activo (ver TD-12). | No guarda datos de la API (experiencias, disponibilidad, reservas ni participante) ni datos del usuario. Tampoco la selección de la reserva. |
| Mantine Form | Valores y errores de los formularios (p. ej., registro; formulario de reserva con la fecha o sesión, las plazas y el teléfono obligatorio). | No sustituye la validación de la API. |

*(Actualización TD-12: la responsabilidad provisional de Zustand de esta tabla, el borrador temporal de reserva, queda sustituida por el aviso de acceso activo de TD-12.)*

Reglas complementarias:

- La disponibilidad mostrada procede siempre de la API (TD-05). La selección de sesión y plazas del participante no se guarda en Zustand (TD-12). Su representación, confirmada por el usuario el 2026-11-10, está en el apartado 24: el `experienciaId` procede de la URL y la fecha o sesión, las plazas y el teléfono obligatorio se administran con Mantine Form mientras se prepara la reserva.
- Cuenta atrás de la retención (RF2-08): la cuenta atrás que se muestre parte de la hora de vencimiento devuelta por la API. El reloj del navegador no es la autoridad del vencimiento; la API decide si la retención sigue vigente.
- Los parámetros de URL son entrada no confiable: deben validarse antes de usarse (validación con Zod, pendiente de su propia decisión técnica; TD-08 decide Zod solo para los formularios).
- Esta especificación no define nombres de parámetros, almacenes, claves de consulta ni código; quedan pendientes (ver preguntas abiertas 9 y 12).

### TD-08 — Validación de formularios

Componentes futuros: ni Zod, ni Mantine Form, ni Mantine Core están instalados y no existe código de formularios.

| Responsable | Qué gestiona | Qué no gestiona |
|-------------|--------------|-----------------|
| Esquemas Zod en el frontend | Reglas de validación de los formularios, expresadas con Zod importado desde `zod/v4`. | No garantizan la seguridad de los datos. |
| Mantine Form (`@mantine/form`) | Valores, errores y envío del formulario, usando el esquema Zod mediante el `schemaResolver` integrado de `@mantine/form`. | No sustituye la validación de la API. |
| Futura API Express (TD-02) | Vuelve a validar cada solicitud con sus propias validaciones. | No depende de la validación del frontend. |

- Formularios a los que aplica:
  - Registro (CU-02): nombre completo, correo electrónico y contraseña, aceptación de los términos y condiciones (CU-02 R1, R2).
  - Teléfono obligatorio en la primera reserva si la cuenta no lo tiene (CU-05 R3, F3; CU-06 paso 2, F4).
- Integración: se usa el `schemaResolver` integrado de `@mantine/form`; **no** se usa `mantine-form-zod-resolver` ni ningún otro paquete de resolver aparte.
- La validación del frontend no es una medida de seguridad: mejora la experiencia de uso, pero la futura API Express valida de nuevo cada solicitud.
- Sin código compartido entre frontend y API: no hay monorepo ni paquete compartido en esta fase; las reglas del frontend y de la API se definen por separado.
- **Requisitos no definidos:** esta especificación no fija requisitos de la contraseña (pregunta abierta de CU-02) ni el formato del teléfono (no definido en las fuentes). Quedan pendientes y no se inventan (pregunta abierta 14).
- Esta especificación no define esquemas, nombres de campos ni código; quedan para la implementación.

### TD-09 — Uso de Mantine Modal

Componente futuro: Mantine Core no está instalado y no existe código de modales. Se usa el componente `Modal` de `@mantine/core`; **no** se usa `@mantine/modals`.

| Interacción | Dónde se presenta | Trazabilidad |
|-------------|-------------------|--------------|
| Confirmar la cancelación de una reserva | Modal de `@mantine/core` | CU-07 pasos 3-4, CA6 y F1; RF2-01, RF2-17 |
| Aviso de inicio de sesión al intentar reservar | Modal de `@mantine/core` (aviso de acceso de TD-12) | CU-01 A6; RF2-06. Referencia principal: CU-01 A6 / CU-02 A3 (y disparador de CU-02) (RF2-06 trata del inicio de sesión automático tras el registro) |
| Aviso de verificación del correo al intentar reservar | Modal de `@mantine/core` (aviso de acceso de TD-12) | CU-02 A1, CA9 |
| Confirmación de cambios importantes del organizador | Modal de `@mantine/core` | CU-04 (sin reglas funcionales nuevas) |
| Flujo de reserva y pago (incluidos el teléfono obligatorio, la retención de 10 minutos y el pago) | Páginas propias con URL (TD-06) | CU-05, CU-06; RF2-08 |

- El modal se usa solo para confirmaciones y avisos breves, siempre respetando las reglas funcionales aprobadas; no se crean reglas nuevas.
- El proceso de reserva y pago no depende de mantener abierto un modal: cada paso importante (reservar y pagar) tiene su propia pantalla y URL dentro del enrutamiento declarativo (TD-06). El mapa de rutas concreto sigue pendiente (pregunta abierta 12). *(Actualización TD-10: la estructura de esas rutas queda definida en «TD-10 — Mapa de rutas por zonas»; los nombres siguen pendientes.)*
- Los avisos de inicio de sesión y de verificación del correo complementan los controles de acceso de interfaz de TD-06; no los sustituyen y no son una medida de seguridad.
- Control de apertura: la consigna exige Mantine Core con `Modal` y no obliga a usar `@mantine/hooks` ni `useDisclosure`. El proyecto elige `useState` de React para los modales locales (elección técnica del usuario; pregunta abierta 15, resuelta; corregido el 2026-11-10). Los modales locales, como el de cancelación (CU-07) o el de cambios importantes del organizador (CU-04), usan su propio `useState`; los avisos de inicio de sesión y de verificación del correo se abren desde el estado de Zustand de TD-12.

Comportamiento del modal de cancelación (CU-07):

- Antes de confirmar, el modal muestra las consecuencias de la acción (política de cancelación aplicable y, si la reserva se pagó en línea, el reembolso completo; CU-07 paso 3, CA6).
- Si el participante cierra el modal o pulsa volver, la reserva permanece intacta.
- Si confirma, la futura API verifica nuevamente el plazo y las condiciones antes de cancelar (CU-07 paso 5, F1; RF2-01). El frontend no decide si la cancelación procede.
- Durante la solicitud se evitan envíos duplicados.
- Ante un error, se muestra una respuesta clara sin asumir que la reserva fue cancelada.
- Tras una confirmación exitosa, se actualizan los datos remotos correspondientes: se invalidan o se vuelven a pedir las consultas de TanStack Query (TD-07). El mecanismo concreto queda pendiente (pregunta abierta 9).

Accesibilidad (evidencia de Mantine 9.0.0): se mantienen los comportamientos por defecto del modal (atrapar el foco, cerrar con Escape, cerrar al pulsar fuera y devolver el foco al cerrar), se usa `title` para que el modal tenga `aria-labelledby` y `closeButtonProps` para el `aria-label` del botón de cierre.

- Esta especificación no define componentes, textos de los modales ni código; quedan para la implementación.

### TD-10 — Mapa de rutas por zonas

Componente futuro: React Router no está instalado y no existen rutas, layouts ni pantallas. **Los nombres de ruta de esta sección son ilustrativos**, no definitivos; el idioma y los nombres finales quedan pendientes (pregunta abierta 12).

- Las rutas de MODO se organizan en tres zonas: pública, de participante y de organizador. Cada zona tiene un layout compartido (ruta de layout sin `path`, que no añade segmentos a la URL) y usa rutas anidadas cuando aportan claridad; las pantallas hijas se renderizan en el `<Outlet/>` del layout (evidencia de TD-10).
- Los controles de acceso de interfaz de TD-06 se centralizan en la ruta padre de cada zona, en lugar de repetirse en cada pantalla.

| Zona | Layout y control de interfaz | Pantallas (rutas ilustrativas) | Trazabilidad |
|------|------------------------------|--------------------------------|--------------|
| Pública | Layout público; sin control de sesión | Catálogo `/` con filtros, búsqueda y orden en la URL (TD-07); detalle `/experiencias/:experienciaId`; registro `/registro`; inicio de sesión `/iniciar-sesion`; verificación del correo `/verificar-correo`; ruta comodín «página no encontrada» | CU-01, CU-02 |
| Participante | Layout con control de sesión iniciada en la ruta padre | «Mis reservas» `/cuenta/reservas` (nombre ilustrativo, no definido en las fuentes); detalle de una reserva `/cuenta/reservas/:reservaId`; pago `/cuenta/reservas/:reservaId/pago` | CU-05, CU-06, CU-07; RF2-08 |
| Organizador | Layout con control de perfil de organizador en la ruta padre | Mis experiencias `/organizador/experiencias`; nueva experiencia `/organizador/experiencias/nueva`; administración de una experiencia `/organizador/experiencias/:experienciaId` | CU-03, CU-04, CU-08 |

Inicio de la reserva:

- Ruta ilustrativa `/experiencias/:experienciaId/reservar`: elección de fecha y plazas, teléfono obligatorio si la cuenta no lo tiene (CU-05 R3; CU-06 paso 2, F4) y resumen.
- Datos de la reserva (confirmado por el usuario el 2026-11-10; detalle en el apartado 24): el `experienciaId` procede de la URL; la fecha o sesión elegida, el número de plazas y el teléfono obligatorio se administran con Mantine Form mientras se prepara la reserva; la API valida de nuevo la disponibilidad; tras crear la retención, la etapa de pago usa el identificador devuelto por el servidor.
- Exige sesión iniciada y correo verificado (CU-02 R5, RF2-06), con los avisos modales de inicio de sesión y de verificación del correo de TD-09 (estado del aviso en TD-12).
- **Opción sin decidir:** situar esta ruta bajo el detalle de la experiencia (con su propio control de interfaz) o dentro de la zona del participante, que según el usuario incluye «sus reservas y los pasos de pago». La estructura exacta queda para la implementación.

URL propias para las etapas de reserva y pago:

- Las URL de la etapa de pago y de su resultado incluyen un identificador generado por el servidor (p. ej., `:reservaId`).
- Al recargar la página o al volver de una redirección del proveedor de pago, la pantalla consulta con TanStack Query (TD-07) el estado real de la reserva o de la retención vigente en la API, en lugar de depender de un estado guardado en el navegador. *(Actualización TD-12: la selección de sesión y plazas no se guarda en Zustand; se sustituye la mención anterior al borrador de Zustand.)*
- La cuenta atrás de la retención parte de la hora de vencimiento devuelta por la API (RF2-08; TD-07).
- La URL de retorno del proveedor de pago no está definida (preguntas abiertas 6 y 12).

Reglas de acceso:

- Los controles de acceso de React Router son solo de interfaz: la futura API comprueba la identidad, los permisos y la propiedad de cada recurso (p. ej., que una reserva pertenezca al participante; CU-07 R6, CU-08 R1). Un identificador en la URL no es una credencial.
- El correo verificado es obligatorio **solo antes de reservar** (CU-02 R5, RF2-06). No se exige verificación para el resto de las pantallas de la cuenta: un correo sin verificar no impide iniciar sesión ni explorar experiencias (CU-02 R5).
- Cualquier usuario registrado puede activar su perfil de organizador, sin aprobación manual de un administrador (CU-03 paso 1, R1 y CA1). Un participante puede ser también organizador. La ruta concreta de activación no está decidida.
- Las redirecciones de interfaz pueden hacerse con `Navigate` (p. ej., con `replace`) o con `useNavigate`, y pasar la ubicación de origen con `state`; estas opciones funcionan en modo declarativo según la evidencia de 7.13.0, pendiente de verificar en 8.3.1 (pregunta abierta 13). La vuelta automática a la experiencia tras registrarse desde un intento de reserva no queda aprobada: es una propuesta pendiente de decisión funcional (confirmado por el usuario el 2026-11-10; pregunta abierta de CU-02 en la especificación funcional); no se decide aquí.
- La ruta comodín (`path="*"`) para «página no encontrada» queda pendiente de verificar en la documentación (evidencia de TD-10).

- Esta especificación no define componentes, nombres definitivos de rutas ni código; quedan para la implementación.

### TD-11 — Sesión en el servidor con cookie httpOnly

Componente futuro: la API Express no existe y no hay código de autenticación ni de sesiones. No se instala nada.

| Responsable | Qué gestiona | Qué no gestiona |
|-------------|--------------|-----------------|
| Futura API Express (TD-02) | Mantiene la sesión en el servidor; emite la cookie httpOnly; comprueba la identidad, los permisos y la propiedad de cada recurso; cierra la sesión de forma segura. | No delega en el navegador la custodia de tokens de acceso. |
| Navegador | Solo recibe y envía la cookie httpOnly, que no es accesible desde JavaScript. | No almacena ni administra tokens de acceso mediante JavaScript (ni en `localStorage` ni en otro almacén). |
| Frontend (TanStack Query, TD-07) | Obtiene el usuario actual (identidad, verificación del correo y permisos) consultando la API. | No duplica los datos del usuario en Zustand ni guarda tokens. |

- La futura API Express mantiene la sesión; el navegador solo recibe una cookie httpOnly.
- El frontend no almacena ni administra tokens: TanStack Query obtiene el usuario actual desde la API (TD-07), sin duplicarlo en Zustand.
- Sesión iniciada tras el registro (RF2-06, especificación funcional `fase-02-especificacion-funcional`): tras completar correctamente el registro, el usuario queda con la sesión iniciada; con TD-11, esa sesión la crea y la mantiene la API. TD-11 no añade reglas funcionales nuevas: mientras no verifique su correo, el usuario no puede reservar (RF2-06; CU-02 R5).
- Relación con TD-10: los controles de acceso por zona siguen siendo solo de interfaz; la API verifica la sesión, los permisos y la propiedad de cada recurso (CU-07 R6, CU-08 R1).

Obligaciones de la futura API (reconocidas por el usuario; las cookies httpOnly no eliminan por sí solas los riesgos):

- Protección CSRF. El mecanismo concreto **no está decidido** (pregunta abierta 16).
- Configuración adecuada de SameSite y Secure; los valores concretos dependen de la configuración de dominios, pendiente (pregunta abierta 16).
- Validación de permisos y de la propiedad de cada recurso (CU-07 R6, CU-08 R1).
- Mecanismo seguro de cierre de sesión.

Pendientes explícitos, sin decidir (pregunta abierta 16):

- Duración de las sesiones.
- Mecanismo y almacén de sesiones. express-session (v1.19.0) queda documentado solo como **candidato, no adoptado**; su almacén por defecto (MemoryStore) no es apto para producción según su README.
- Tratamiento de contraseñas.
- Configuración definitiva de dominios del frontend y de la API, y su relación con SameSite, con el atributo Secure detrás de un proxy y con el proxy de desarrollo de Vite (`server.proxy`).
- Mecanismo concreto de protección CSRF.

- Esta especificación no define endpoints, nombres de cookies, valores de configuración ni código; quedan para la implementación.

### TD-12 — Zustand para los avisos de acceso

Componente futuro: Zustand no está instalado y no existe código de estado. No se instala nada. TD-12 precisa la responsabilidad de Zustand en el reparto de estado de TD-07 y sustituye la responsabilidad provisional (borrador temporal de reserva) registrada allí.

| Responsable | Qué gestiona | Qué no gestiona |
|-------------|--------------|-----------------|
| Zustand | Únicamente el aviso de acceso activo (iniciar sesión, verificar el correo o ninguno) y las acciones para mostrarlo y cerrarlo. | Credenciales, permisos, datos del usuario, sesión ni estado de verificación del correo (TanStack Query y la API; TD-07, TD-11). Tampoco la selección de sesión y plazas ni la disponibilidad. |
| `ReserveButton` (nombre ilustrativo) | Solicita el aviso que corresponda según el usuario actual que obtiene TanStack Query (TD-07, TD-11). | No decide la identidad ni los permisos: la futura API los verifica (TD-11). |
| `AccessNoticeModal` (nombre ilustrativo) | Un único `Modal` de `@mantine/core`, situado en un layout compartido (TD-10), que lee el aviso y se abre o se cierra. | No consulta datos de la API ni guarda el aviso fuera de Zustand. |

Forma del estado (ilustrativa):

- Dato: `aviso: 'iniciar-sesion' | 'verificar-correo' | null`.
- Acciones: `mostrarAviso(tipo)` y `cerrarAviso()`.

Reglas:

- Sin `persist`: al recargar la página, el aviso se cierra y el usuario puede repetir la acción.
- Los consumidores leen el aviso con un selector de un solo valor; los valores derivados se calculan en el selector y no se guardan (evidencia de TD-12).
- Los avisos complementan los controles de acceso de interfaz de TD-06 y TD-10; no los sustituyen y no son una medida de seguridad.
- Los modales locales, como el de cancelación de CU-07, siguen controlados con `useState` (TD-09; elección técnica del proyecto, no exigencia de la consigna).
- La selección de sesión y plazas queda fuera de Zustand; su representación, confirmada por el usuario el 2026-11-10, está en el apartado 24 (Mantine Form del formulario de reserva; `experienciaId` en la URL). La disponibilidad sigue viniendo de la API (TD-05, TD-07).

Fuera de alcance:

- Abrir el aviso desde fuera de React (p. ej., ante una respuesta 401 de la API). Depende del contrato de errores (pregunta abierta 9) y de verificar `getState` en Zustand 5.0.15 (pregunta abierta 13).
- Volver automáticamente a la experiencia tras registrarse desde un intento de reserva: no queda aprobado; es una propuesta pendiente de decisión funcional (confirmado por el usuario el 2026-11-10; pregunta abierta de CU-02 en la especificación funcional), no una regla. TD-12 no lo resuelve.

Trazabilidad:

- Aviso de iniciar sesión: CU-01 A6 / CU-02 A3.
- Aviso de verificar el correo: CU-02 A1, CA9, R5.
- Relación con TD-09 (Modal) y TD-11 (sesión en el servidor).

- Esta especificación no define nombres definitivos de componentes ni del almacén, textos de los avisos ni código; quedan para la implementación.

### Contratos

- Aún no definidos: no hay endpoints ni esquema de datos. Quedan para decisiones posteriores.

### Apartados de entrega 21-24

Apartados de entrega 21-24 de la consigna 03-diseno-tecnico.pdf (según el usuario), derivados de TD-01 a TD-12. Los nombres de componentes, carpetas, archivos y rutas son **ilustrativos** y coinciden con TD-10 y TD-12; el usuario los aceptó provisionalmente el 2026-11-10, sin convertirlos en contratos definitivos. No se crea ningún archivo ni se instala nada. Las referencias «P*n*» remiten a las preguntas abiertas de esta especificación.

### Apartado 21 — Stack y matriz de herramientas obligatorias

Fuentes: `package.json` (leído el 2026-11-10) y la tabla de versiones exigidas por la consigna, sección 5 (según el usuario; ver «Source and current evidence»). `package.json` no cambia en esta entrega.

| Paquete | Versión | Estado | Compatibilidad y evidencia | Origen funcional | Responsabilidad | Consumidor | Comprobación prevista |
|---------|---------|--------|----------------------------|------------------|-----------------|------------|-----------------------|
| `react` / `react-dom` | 19.2.8 | Instalada | Versión exacta en `package.json` | CU-01 a CU-08 (interfaz) | Interfaz de la SPA | Todas las capas del apartado 22 | `pnpm build` (health actual) |
| `vite` | 8.2.2 | Instalada (desarrollo) | Evidencia de `/vitejs/vite/v8.0.10`, la más cercana; no aplicada | — (herramienta) | Servidor de desarrollo y build | Proyecto | `pnpm build` |
| `typescript` | 6.0.3 | Instalada (desarrollo) | Versión exacta en `package.json` | — (herramienta) | Tipado; `tsc -b` dentro del build | Proyecto | `pnpm build` (`tsc -b && vite build`) |
| `oxlint` | `^1.79.0` (rango) | Instalada (desarrollo) | Rango en `package.json`, sin versión exacta | — (herramienta) | Lint | Proyecto | `pnpm lint` disponible; no forma parte del health |
| pnpm | 11.17.0 (`packageManager`) | Declarado | — | — (herramienta) | Instalación de dependencias y scripts | Proyecto | El lockfile fija las versiones instaladas |
| `react-router` | 8.3.1 | Exigida; no instalada | Evidencia de 7.13.0; sin verificar en 8.3.1 (P13) | CU-01, CU-02, CU-05 a CU-08 (TD-06, TD-10) | Rutas, navegación y filtros en la URL, en modo declarativo | `App.tsx`, layouts y páginas (apartados 22 y 23) | Regla común |
| `@tanstack/react-query` | 5.102.8 | Exigida; no instalada | Evidencia de v5.90.3; sin verificar (P13) | CU-01 a CU-08 (TD-07, TD-11) | Datos de la futura API y usuario actual | Hooks del apartado 22 | Regla común |
| `zustand` | 5.0.15 | Exigida; no instalada | Evidencia de v5.0.14; la 5.0.15 no está indexada (P13) | CU-01 A6; CU-02 A1, A3 (TD-12) | Aviso de acceso activo | `ReserveButton`, `AccessNoticeModal` | Regla común |
| `zod` | 4.4.3 | Exigida; no instalada | Evidencia de v4.3.6; imports desde `zod/v4` (P13) | CU-02 R1, R2; CU-05 R3; CU-06 F4 (TD-08); filtros de CU-01 (TD-07) | Esquemas de formularios y de parámetros de URL | Esquemas del apartado 22 | Regla común |
| `@mantine/form` | 9.4.1 | Exigida; no instalada | Evidencia de 9.0.0; `schemaResolver` integrado (P13) | CU-02 a CU-06 (TD-07, TD-08) | Valores, errores y envío de los formularios | `RegistrationForm` y formularios de reserva y de experiencia | Regla común |
| `@mantine/core` | 9.4.1 | Exigida; no instalada | Evidencia de 9.0.0 (P13) | CU-01 A6; CU-02 A1; CU-04; CU-07 (TD-09) | `Modal` y componentes de interfaz | `AccessNoticeModal`, `CancelReservationModal` y componentes del apartado 22 | Regla común |
| `@mantine/hooks` | Sin decidir (9.4.1 si se instala) | Posible requisito de instalación, no decidido | El README de `@mantine/core` 9.0.0 lo instala junto con core; no se usan sus hooks (P15, resuelta por elección técnica: `useState` para los modales locales; la consigna no lo exige) | — | Ninguna en el código de MODO | Ninguno | Al instalar, verificar si `@mantine/core` 9.4.1 lo exige; en ese caso, con la misma versión 9.4.1 (sección 5; P13) |

- **Regla común de comprobación prevista** para los paquetes exigidos (ninguna se ha ejecutado): al instalarlos, comprobar que `package.json` y el lockfile fijan la versión exacta exigida, que todos los paquetes de Mantine tienen la misma versión y que `pnpm build` sigue pasando. La prueba prevista se describe en el apartado 28.
- Propuestas del backend, componentes futuros fuera del frontend de esta entrega (no instaladas y sin versión exacta): Express 5.x (TD-02; evidencia de v5.2.0 y v5.3.0), PostgreSQL (TD-03; documentación de la versión 18, versión mayor pendiente) y drizzle-orm con drizzle-kit (TD-04; documentación de 0.45.x y 0.31.5). El driver de PostgreSQL sigue sin elegir.
- Vitest: herramienta de la cohorte para pruebas de funciones puras (apartado 28). No está instalada; la sección 5 no fija su versión (según lo informado por el usuario).
- Restricciones de la consigna: ver la lista de la sección 5 en «Source and current evidence»; aplican a todas las capas del apartado 22.

### Apartado 22 — Arquitectura y responsabilidades

Arquitectura del frontend dentro de TD-01: la SPA presenta y recoge datos; la futura API es la fuente de verdad. Capas, árbol y nombres son ilustrativos y no se crean en esta fase. Nombres ilustrativos aceptados provisionalmente por el usuario (2026-11-10); no son contratos definitivos.

| Capa | Responsabilidad | Ejemplos ilustrativos | Regla |
|------|-----------------|-----------------------|-------|
| Entrada | Montar la app con `BrowserRouter` y los proveedores de TanStack Query y de Mantine | `src/main.tsx` y `src/App.tsx` (existentes en la plantilla) | Sin lógica de negocio; nombres de los proveedores por verificar con las versiones exigidas (P13) |
| Layouts | Estructura compartida de cada zona, `<Outlet/>` y control de interfaz en la ruta padre | `PublicLayout`, `ParticipantLayout`, `OrganizerLayout` | Control solo de interfaz (TD-10); `AccessNoticeModal` en un layout compartido (TD-12) |
| Páginas | Una por ruta del apartado 23; componen componentes y hooks | `CatalogPage`, `ExperienceDetailPage`, `ReservePage`, `PaymentPage`, `NotFoundPage` | No llaman a los servicios directamente; leen datos mediante hooks |
| Componentes | Piezas de interfaz reutilizables | `ExperienceCard`, `CatalogFilters`, `SessionList`, `ReserveButton`, `AccessNoticeModal`, `CancelReservationModal`, `RegistrationForm` | PascalCase; sin `useEffect` para obtener datos, filtros derivados ni eventos |
| Hooks | Envolver las consultas y mutaciones de TanStack Query y leer los filtros validados de la URL | `useCurrentUser`, `useExperiences`, `useExperience`, `useMyReservations`, `useCancelReservation`, `useCatalogFilters` | Cada dato tiene un único propietario (apartado 24) |
| Servicios | Un cliente por recurso de la futura API: experiencias, reservas, y cuenta y sesión | `experiences-service.ts`, `reservations-service.ts`, `account-service.ts` | Sin rutas HTTP ni endpoints: contratos pendientes (P9); la API no existe |
| Validaciones | Esquemas Zod importados desde `zod/v4` | Registro, inicio de sesión, teléfono, filtros de la URL y experiencia del organizador | Sin requisitos inventados de contraseña ni de teléfono (P14); la API valida de nuevo (TD-08) |
| Stores | Solo el aviso de acceso de TD-12 | `access-notice-store.ts` | Sin `persist`; ningún otro store |

Árbol propuesto (no creado):

```
src/
├── main.tsx                  # existente
├── App.tsx                   # existente; router y proveedores
├── layouts/                  # PublicLayout.tsx, ParticipantLayout.tsx, OrganizerLayout.tsx
├── pages/
│   ├── publica/              # CatalogPage, ExperienceDetailPage, ReservePage, RegisterPage, LoginPage, VerifyEmailPage, NotFoundPage
│   ├── participante/         # MyReservationsPage, ReservationDetailPage, PaymentPage
│   └── organizador/          # OrganizerExperiencesPage, NewExperiencePage, ManageExperiencePage
├── components/               # ExperienceCard.tsx, CatalogFilters.tsx, SessionList.tsx, ReserveButton.tsx, ...
├── hooks/                    # use-current-user.ts, use-experiences.ts, use-catalog-filters.ts, ...
├── services/                 # experiences-service.ts, reservations-service.ts, account-service.ts
├── schemas/                  # registration-schema.ts, login-schema.ts, phone-schema.ts, catalog-filters-schema.ts, experience-schema.ts
└── stores/                   # access-notice-store.ts
```

- Dependencias entre capas: páginas → componentes y hooks → servicios. Los esquemas los usan los formularios y el hook de filtros; el store, solo `ReserveButton` y `AccessNoticeModal`.
- Convención de nombres (propuesta revisable): componentes en `PascalCase.tsx`; carpetas y demás archivos en kebab-case (`.ts`).
- Idioma: el árbol mezcla nombres en inglés (componentes, como en TD-12) y en español (carpetas de zona, como las rutas de TD-10); el idioma final está pendiente (P12).
- `ReservePage` se sitúa provisionalmente en `publica/` porque su ubicación es la opción sin decidir de TD-10.
- No se crean archivos innecesarios: se reutilizan `main.tsx` y `App.tsx` de la plantilla.

### Apartado 23 — Navegación con React Router

React Router (exigido 8.3.1) en modo declarativo (TD-06): `BrowserRouter`, `Routes`, `Route`, rutas de layout sin `path` y `<Outlet/>`; sin *loaders*, *actions* ni modo framework. Las rutas son las de TD-10, ilustrativas y aceptadas provisionalmente por el usuario (2026-11-10), sin ser contratos definitivos; su idioma y sus nombres definitivos están pendientes (P12).

| Ruta (ilustrativa) | Pantalla | Propósito | Parámetros de ruta / de búsqueda | Zona y control | CU |
|--------------------|----------|-----------|----------------------------------|----------------|----|
| `/` (ruta índice) | `CatalogPage` | Listado, búsqueda y filtros del catálogo | Búsqueda: texto, categoría, ubicación (zona y sector), fecha, rango de precios, plazas disponibles, modalidad de pago y orden; nombres pendientes (P9, P12) | Pública; sin control | CU-01 |
| `/experiencias/:experienciaId` | `ExperienceDetailPage` | Detalle y botón de reservar | `experienciaId` | Pública; sin control | CU-01 (A6) |
| `/experiencias/:experienciaId/reservar` | `ReservePage` | Fecha, plazas, teléfono si falta y resumen | `experienciaId` | Sesión iniciada y correo verificado; ubicación sin decidir (TD-10) | CU-05, CU-06; CU-02 R5 |
| `/registro` | `RegisterPage` | Crear la cuenta | — | Pública | CU-02 |
| `/iniciar-sesion` | `LoginPage` | Iniciar sesión | — | Pública | CU-02 (CA6) |
| `/verificar-correo` | `VerifyEmailPage` | Verificar el correo | Formato del enlace pendiente (P5, P12) | Pública | CU-02 |
| `/cuenta/reservas` | `MyReservationsPage` | «Mis reservas» | — | Participante; sesión iniciada | CU-05, CU-06, CU-07 |
| `/cuenta/reservas/:reservaId` | `ReservationDetailPage` | Detalle y cancelación (modal) | `reservaId` | Participante; sesión iniciada | CU-07 |
| `/cuenta/reservas/:reservaId/pago` | `PaymentPage` | Pago y cuenta atrás de la retención | `reservaId`; URL de retorno del proveedor pendiente (P6, P12) | Participante; sesión iniciada | CU-06; RF2-08 |
| `/organizador/experiencias` | `OrganizerExperiencesPage` | Mis experiencias | — | Organizador; perfil de organizador | CU-03, CU-04, CU-08 |
| `/organizador/experiencias/nueva` | `NewExperiencePage` | Publicar una experiencia | — | Organizador | CU-03 |
| `/organizador/experiencias/:experienciaId` | `ManageExperiencePage` | Fechas, cupos, precios y pagos presenciales | `experienciaId` | Organizador | CU-04, CU-08 |
| `*` | `NotFoundPage` | Página no encontrada | — | Pública | — |

Estructura ilustrativa (pendiente de verificar en 8.3.1, P13; se omite la ruta de reserva porque su ubicación no está decidida):

```tsx
<BrowserRouter>
  <Routes>
    <Route element={<PublicLayout />}>
      <Route index element={<CatalogPage />} />
      <Route path="experiencias/:experienciaId" element={<ExperienceDetailPage />} />
      <Route path="registro" element={<RegisterPage />} />
      <Route path="iniciar-sesion" element={<LoginPage />} />
      <Route path="verificar-correo" element={<VerifyEmailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
    <Route element={<ParticipantLayout />}>
      <Route path="cuenta/reservas" element={<MyReservationsPage />} />
      <Route path="cuenta/reservas/:reservaId" element={<ReservationDetailPage />} />
      <Route path="cuenta/reservas/:reservaId/pago" element={<PaymentPage />} />
    </Route>
    <Route element={<OrganizerLayout />}>
      <Route path="organizador/experiencias" element={<OrganizerExperiencesPage />} />
      <Route path="organizador/experiencias/nueva" element={<NewExperiencePage />} />
      <Route path="organizador/experiencias/:experienciaId" element={<ManageExperiencePage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

- **Enlaces:** `Link` para navegar dentro de la app, sin recargar la página; `NavLink` para el estado activo de los menús, pendiente de verificar (P13).
- **Navegación Atrás:** se usa el historial del navegador. Los filtros en la URL se conservan con Atrás y Adelante (TD-07); los cambios de filtros se agrupan en una sola llamada a `setSearchParams`. Las redirecciones de control usan `replace` para no dejar entradas inútiles en el historial.
- **Rutas desconocidas:** `path="*"` muestra `NotFoundPage`; pendiente de verificar (P13).
- **Recarga directa:** cada pantalla reconstruye su estado desde la URL (parámetros de ruta y de búsqueda) y TanStack Query (TD-10); no depende de Zustand. El servidor que sirva la SPA en producción tendrá que devolver `index.html` para las rutas de la app; su configuración depende del alojamiento (P10) y no se verifica aquí.
- **Accesos restringidos:** `ParticipantLayout` y `OrganizerLayout` comprueban el usuario actual (TanStack Query) y, si no cumple, redirigen con `Navigate` y `replace`, pasando el origen en `state` (TD-10). En el detalle, `ReserveButton` abre el aviso de TD-12 en lugar de navegar. Son controles de interfaz; la API es la autoridad (TD-10, TD-11). La vuelta automática a la experiencia tras el registro no queda aprobada: sigue como propuesta pendiente de decisión funcional (pregunta abierta de CU-02; confirmado por el usuario el 2026-11-10).
- **Limitación:** toda la evidencia corresponde a React Router 7.13.0; la versión exigida es 8.3.1 (P13).

### Apartado 24 — Propiedad del estado y uso de Zustand

Cada dato tiene un único propietario (TD-07, TD-12).

| Dato | Propietario | Justificación | Consumidores | No duplicar con |
|------|-------------|---------------|--------------|-----------------|
| Filtros, búsqueda y orden del catálogo | URL (`useSearchParams`) | Compartir búsquedas y conservarlas con Atrás (TD-07); se validan con Zod antes de usarse | `useCatalogFilters`, `CatalogFilters`, `CatalogPage` | Zustand, `useState`, Mantine Form |
| Identificadores de ruta (`experienciaId`, `reservaId`) | URL (parámetros de ruta) | Recarga directa y URL propias (TD-10); se validan antes de usarse; no son credenciales. En la reserva, el `experienciaId` procede de la URL y el `reservaId` de la etapa de pago es el identificador devuelto por el servidor al crear la retención (confirmado por el usuario el 2026-11-10) | Páginas de detalle, reserva y pago | Zustand, estado local |
| Experiencias (listado y detalle), fechas con disponibilidad, precio y modalidad de pago | TanStack Query | Datos de la API; la disponibilidad la calcula la API (TD-05) | `useExperiences`, `useExperience`, `ExperienceCard`, `SessionList`, `ReservePage` | Zustand, Mantine Form |
| Usuario actual: identidad, verificación del correo, perfil de organizador y si la cuenta tiene teléfono (CU-05 R3) | TanStack Query | La API lo devuelve con la sesión de la cookie httpOnly (TD-11) | `useCurrentUser`, layouts, `ReserveButton`, `ReservePage` | Zustand (TD-07, TD-12) |
| Mis reservas; estado de una reserva o retención y su hora de vencimiento | TanStack Query | La API decide el vencimiento (RF2-08; TD-07) | `useMyReservations`, `ReservationDetailPage`, `PaymentPage` | Zustand; el reloj del navegador no es la autoridad |
| Experiencias del organizador, reservas de una sesión y estado del pago presencial | TanStack Query | Datos de la API (CU-03, CU-04, CU-08) | Páginas del organizador | Mantine Form (solo guarda los valores en edición) |
| Registro (nombre completo, correo, contraseña y aceptación de términos; CU-02 R1, R2) e inicio de sesión | Mantine Form | Valores, errores y envío (TD-08) | `RegistrationForm`, `LoginPage` | Zustand |
| Teléfono cuando la cuenta no lo tiene (CU-05 R3; CU-06 F4) | Mantine Form (formulario de reserva) | TD-08; confirmado por el usuario (2026-11-10) | `ReservePage` | Zustand |
| Fecha o sesión y plazas elegidas para la reserva | Mantine Form (formulario de reserva, junto con el teléfono). **Confirmado por el usuario (2026-11-10)** | Se administran mientras se prepara la reserva; precisa la representación que TD-07 y TD-12 dejaban pendiente. La API valida de nuevo la disponibilidad (TD-05) | `ReservePage`, `SessionList` | Zustand (TD-12), URL |
| Formulario de experiencia y cambios de fechas, cupos y precios | Mantine Form | Parte de los datos de la consulta y guarda solo los valores en edición hasta enviarlos (CU-03, CU-04) | `NewExperiencePage`, `ManageExperiencePage` | TanStack Query (datos guardados) |
| Aviso de acceso activo (`'iniciar-sesion' \| 'verificar-correo' \| null`), con `mostrarAviso` y `cerrarAviso` | Zustand, sin `persist` | Varios componentes solicitan un mismo `Modal` (TD-12) | `ReserveButton`, `AccessNoticeModal` | TanStack Query (no guarda datos del usuario) |
| Apertura de los modales locales (cancelación de CU-07, cambios importantes de CU-04) y otros estados de interfaz locales | `useState` de React | TD-09; elección técnica del proyecto, no exigencia de la consigna (P15 resuelta) | `CancelReservationModal`, `ManageExperiencePage` | Zustand |
| Total de la reserva (precio × plazas; p. ej., 3 × 20 USD = 60 USD, RF2-18), listas derivadas y tiempo restante de la retención | Ninguno: se calculan en el render | Valores derivados del precio (Query), las plazas (formulario) y la hora de vencimiento (Query); el importe lo confirma la API (TD-01) | `ReservePage`, `PaymentPage`, `CatalogPage` | Cualquier almacén |

Reglas:

- Ningún dato tiene dos propietarios; los valores derivados no se guardan.
- Reserva (palabras del usuario, 2026-11-10): «el identificador de experiencia procede de la URL. La fecha o sesión elegida, el número de plazas y el teléfono obligatorio se administrarán mediante Mantine Form mientras se prepara la reserva. La API validará de nuevo la disponibilidad. Tras crear la retención, la etapa de pago utilizará el identificador devuelto por el servidor.»
- Sin persistencia en Zustand ni en `localStorage`; no se guardan tokens (TD-11).
- Sin `useEffect` para obtener datos, calcular filtros derivados ni responder a eventos: los datos llegan por TanStack Query, los derivados se calculan en el render y los eventos se tratan en sus manejadores.
- El mecanismo de refresco visual de la cuenta atrás queda para la implementación; no pide datos con `useEffect`.
- Tras una mutación (reservar, cancelar o registrar un pago), se invalidan o se vuelven a pedir las consultas afectadas; el mecanismo concreto está pendiente (P9).

### Apartados de entrega 25-27

Apartados de entrega 25-27 de la consigna 03-diseno-tecnico.pdf (según el usuario), derivados de TD-01 a TD-12, de los apartados 21-24 y de los F*, R* y CA* de CU-01 a CU-08. Los nombres de componentes, hooks, query keys y campos son **ilustrativos**, aceptados provisionalmente por el usuario (2026-11-10) sin ser contratos definitivos. No se crea ningún archivo, no se instala nada y no se ha ejecutado ninguna prueba. «P*n*» remite a las preguntas abiertas.

### Apartado 25 — Datos, servicios y límites de integración

> **Bloqueo declarado:** la futura API Express (TD-02), la base de datos (TD-03), el proveedor de pago (P6) y el servicio de correo (P5) no existen o no están elegidos. **Ningún contrato está verificado:** no hay endpoints, rutas HTTP, formatos de respuesta ni nombres de campo definitivos (P9).

- Fuente remota del frontend: solo la API propia, a través de los servicios del apartado 22 (`experiences-service.ts`, `reservations-service.ts`, `account-service.ts`).
- Fuente de datos durante el desarrollo (P17, resuelta por el usuario el 2026-11-10): datos simulados temporales para desarrollar primero la interfaz, identificados como tales; no son datos remotos reales. Cuando exista la API Express, las consultas reales se integran mediante TanStack Query. Una consulta simulada no se presenta como cumplimiento ni como prueba de la integración remota. El mecanismo de simulación no se decide aquí; queda para la implementación, sin `useEffect` para obtener datos.
- El pago (P6) y el envío de correos (P5) son integraciones de la API, no del frontend. La redirección al proveedor de pago y su URL de retorno siguen pendientes (P6, P12).
- Entradas y salidas: datos conceptuales, sin nombres de campo ni formatos.

| Operación prevista | CU / RF | Entradas | Salidas | Errores previstos | Autorización (interfaz + API) | Contrato |
|--------------------|---------|----------|---------|-------------------|-------------------------------|----------|
| Consultar el catálogo con filtros | CU-01; RF2-07, RF2-16 | Búsqueda, filtros y orden validados desde la URL | Experiencias con fechas futuras, «Agotado» y orden (CU-01 R2, R3, R6) | Sin resultados (CU-01 F1, CA14) | Pública | No verificado: API inexistente (P9) |
| Consultar el detalle con sesiones y disponibilidad | CU-01 R5, CA9; RF2-07 | Identificador de la experiencia | Datos de R5 y sesiones futuras con la disponibilidad calculada por la API (TD-05) | No definidos en los CU | Pública | No verificado: API inexistente (P9) |
| Registrar la cuenta | CU-02 registro; RF2-06 | Nombre completo, correo, contraseña y aceptación de términos (R1, R2) | Cuenta creada, sesión iniciada (RF2-06) y correo de verificación enviado (paso 4) | F1 datos incompletos o no válidos; F2 términos no aceptados; F3 correo ya registrado (R6) | Pública; la API valida de nuevo (TD-08) y crea la sesión (TD-11) | No verificado: API inexistente (P9) |
| Iniciar sesión | CU-02 inicio de sesión; CA6, CA8 | Correo y contraseña | Sesión iniciada con cookie httpOnly (TD-11) | F4 credenciales incorrectas (CA7) | Pública | No verificado: API inexistente (P9) |
| Cerrar sesión | TD-11 | — | Sesión cerrada | No definidos | Sesión iniciada | No verificado: API inexistente (P9). **Conducta funcional abierta** (pregunta abierta de CU-02; RF2-06 no la resuelve); TD-11 solo exige un mecanismo seguro |
| Obtener el usuario actual | TD-11; CU-02 R5; CU-03 R1; CU-05 R3 | Cookie de sesión (sin datos en JavaScript) | Identidad, verificación del correo, perfil de organizador y si la cuenta tiene teléfono (apartado 24) | Sin sesión: respuesta no definida (P9) | Cookie httpOnly | No verificado: API inexistente (P9) |
| Confirmar el correo | CU-02 verificación del correo | Dato del enlace de verificación (formato y caducidad abiertos en CU-02; P5, P12) | Correo marcado como verificado | No definidos en los CU | Pública (`/verificar-correo`) | No verificado: API inexistente (P9) |
| Reenviar la verificación | CU-02 A1, A2, CA9; RF2-06 | Cuenta de la sesión | Nuevo correo de verificación (P5) | No definidos | Sesión iniciada | No verificado: API inexistente (P9) |
| Guardar el teléfono | CU-05 R3, F3, CA4; CU-06 paso 2, F4, CA8 | Teléfono (formato no definido, P14) | Teléfono guardado en la cuenta | F3/F4 teléfono no indicado | Sesión iniciada; la API valida. Junto con la reserva o por separado: sin decidir (P9) | No verificado: API inexistente (P9) |
| Crear una reserva con pago presencial | CU-05; RF2-03, RF2-16, RF2-18 | Sesión elegida y número de plazas | Reserva confirmada, pago «Pendiente» (CU-08) e importe total (RF2-18) | F1 plazas insuficientes (CA3); F2 fecha agotada; F3 teléfono no indicado | Sesión iniciada y correo verificado (CU-02 R5); disponibilidad con bloqueo breve en la API (TD-05) | No verificado: API inexistente (P9) |
| Iniciar el pago en línea (retención) | CU-06 pasos 4-5; RF2-08, RF2-14 | Sesión elegida y número de plazas | Retención con identificador y hora de vencimiento; continuación con el proveedor (P6) | F1 plazas insuficientes: no se inicia el pago (CA6); F4 teléfono no indicado | Sesión iniciada y correo verificado; bloqueo breve (TD-05) | No verificado: API inexistente (P9) |
| Consultar el estado de una reserva o retención | CU-06 F2, F3; RF2-08, RF2-09 | Identificador de la reserva (URL, TD-10) | Estado de la retención o de la reserva y hora de vencimiento | F2 pago fallido; F3 pago abandonado o retención vencida; pago confirmado fuera de plazo (RF2-09) | Sesión iniciada; propiedad comprobada en la API | No verificado: API inexistente (P9) |
| Listar mis reservas | CU-07 paso 1 | Cuenta de la sesión | Reservas del participante | No definidos | Sesión iniciada; solo las propias (CU-07 R6) | No verificado: API inexistente (P9) |
| Cancelar una reserva | CU-07; RF2-01, RF2-10, RF2-11, RF2-17 | Identificador de la reserva | Reserva cancelada completa (R7), plazas liberadas y reembolso completo si se pagó en línea | F1 fuera de plazo (CA5); F2 ya cancelada o fecha pasada; reserva ajena (R6, CA7) | Sesión iniciada; la API reverifica plazo y propiedad (TD-09) | No verificado: API inexistente (P9) |
| Activar el perfil de organizador | CU-03 paso 1, R1, CA1 | Cuenta de la sesión | Perfil de organizador activo | No definidos | Sesión iniciada; sin aprobación manual | No verificado: API inexistente (P9) |
| Publicar una experiencia | CU-03; RF2-05, RF2-13 | Datos de CU-03 paso 3 y al menos una fecha futura con horario, cupos y precio | Experiencia publicada en el catálogo (CA3) | F1 información incompleta; F2 ubicación fuera del área; F3 fecha pasada; sesiones duplicadas (RF2-05) | Perfil de organizador | No verificado: API inexistente (P9) |
| Administrar fechas, horarios, cupos y precios | CU-04; RF2-02, RF2-04 | Fecha, horario, cupos y precio, o eliminación de una fecha | Fecha guardada, modificada o eliminada | F1 fecha con reservas activas; F2 cupo por debajo de las plazas reservadas; F3 fecha pasada o datos incompletos; sesión duplicada (RF2-04) | Organizador propietario (CU-04 R5, CA9); bloqueo breve para el cupo (TD-05) | No verificado: API inexistente (P9) |
| Consultar las reservas de una sesión | CU-08 pasos 1-4 | Experiencia y sesión | Reservas con nombre, plazas, importe total en USD, modalidad y estado del pago (CA-08-01) | Sesión sin reservas (A4, CA-08-16); reserva ajena (F2, CA-08-08) | Organizador propietario (CU-08 R1) | No verificado: API inexistente (P9) |
| Registrar o corregir un pago presencial | CU-08; RF2-03, RF2-15 | Reserva y estado nuevo del pago | Estado del pago e historial (R5) | F1 corrección fuera de plazo (CA-08-07, CA-08-10); F2 reserva ajena; sin opción en pagos en línea (A1, CA-08-04) | Organizador propietario (CU-08 R1) | No verificado: API inexistente (P9) |

- Dependencias abiertas: P3 (modelado), P5 (correo), P6 (pago), P7 (vencimiento de la retención), P8 (reembolsos), P9 (contratos y configuración de TanStack Query), P10 (alojamiento) y P16 (detalles de la sesión).
- Seguridad:
  - Cookie httpOnly; el frontend no guarda tokens en JavaScript (TD-11).
  - CSRF, SameSite y Secure: mecanismo y valores pendientes (P16).
  - La API comprueba la identidad, los permisos y la propiedad de cada recurso (CU-07 R6, CU-08 R1); los controles del frontend son solo de interfaz (TD-10).
  - La API valida de nuevo cada solicitud (TD-08).
  - Los parámetros de URL son entrada no confiable y se validan antes de usarse (TD-07).
  - El frontend no muestra datos que la API no haya autorizado.
- El envío de la cookie entre dominios distintos depende del alojamiento y de la configuración de dominios (P10, P16). No se afirma ninguna configuración.

### Apartado 26 — Formularios, Zod y Mantine Modal

**Formulario elegido: registro (CU-02).** `RegistrationForm` en `RegisterPage`, con Mantine Form y un esquema Zod importado desde `zod/v4` (`schemas/registration-schema.ts`, apartado 22).

| Campo (ilustrativo) | Valor inicial | Regla del esquema | Fuente |
|---------------------|---------------|-------------------|--------|
| `nombreCompleto` | `''` | Obligatorio: texto no vacío | CU-02 R1, F1, CA4 |
| `correo` | `''` | Obligatorio y con formato de correo (validación técnica del formato) | CU-02 R1, F1, CA4 |
| `contrasena` | `''` | Obligatoria: no vacía. Sin longitud ni complejidad | CU-02 R1; requisitos abiertos (P14) |
| `aceptaTerminos` | `false` | Debe ser `true` | CU-02 R2, F2, CA2 |

- Fuera del esquema: cédula, pasaporte y teléfono (CU-02 R3, R4, CA3). La información sobre el tratamiento de datos personales se muestra en la pantalla (R2); no es un campo.
- API de Zod: los textos obligatorios pueden expresarse con `z.string().min(1, { error: '…' })` (evidencia de 25-27). La API para el formato del correo y para exigir `true` no está verificada (P13).
- Mensajes: ilustrativos, aceptados provisionalmente por el usuario (2026-11-10) sin ser definitivos; se definen en la implementación con el parámetro `error` de Zod.
- Conexión: `useForm` con `validate: schemaResolver(registrationSchema)` (evidencia de Mantine 9.0.0, TD-08). La opción de valores iniciales no consta en la evidencia registrada y se verifica al implementar (P13).

| Caso | Entrada | Resultado | Fuente |
|------|---------|-----------|--------|
| Válido | Campos completos, correo con formato válido y términos aceptados | Se envía | CA1 |
| Inválido | Términos sin aceptar | No se envía; error en el campo | F2, CA2 |
| Inválido | Algún campo obligatorio vacío | No se envía; se indica qué corregir | F1, CA4 |
| Inválido | Correo con formato no válido | No se envía; error en el campo | F1, CA4 |
| Inválido (solo en el servidor) | Correo ya registrado | La API lo rechaza; se informa y se ofrece iniciar sesión | F3, CA5, R6 |
| Inválido (solo en el servidor) | Otros datos rechazados por la API | Se muestra el error; la cuenta no se da por creada | F1; TD-08 |

**Mensajes de ejemplo (ilustrativos, no definitivos).** Textos de ejemplo para los casos inválidos anteriores, aceptados provisionalmente por el usuario (2026-11-10) sin convertirlos en contratos definitivos. No introducen reglas nuevas: el texto final se define al implementar. No se incluye ningún mensaje sobre requisitos de la contraseña (P14).

| Caso | Mensaje de ejemplo (no definitivo) | Fuente |
|------|------------------------------------|--------|
| Términos sin aceptar | «Para crear la cuenta, acepta los términos y condiciones.» | F2, CA2 |
| Campo obligatorio vacío | «Completa este campo.» | F1, CA4 |
| Correo con formato no válido | «Introduce un correo electrónico válido.» | F1, CA4 |
| Correo ya registrado | «Ya existe una cuenta con este correo. ¿Quieres iniciar sesión?», con un enlace para iniciar sesión | F3, CA5, R6 |

Envío:

- `onSubmit` de Mantine Form (solo con datos válidos) llama a una mutación de TanStack Query (`useRegister`, ilustrativo) que usa `account-service.ts`.
- Mientras la mutación está pendiente, el botón de enviar queda en carga o deshabilitado: evita el doble envío. (`isPending` de `useMutation`: pendiente de verificar, P13.)
- Éxito: se crea la cuenta y la sesión queda iniciada (RF2-06). `onSuccess` invalida la consulta del usuario actual y la página informa de que la cuenta se creó y de que hay que verificar el correo antes de reservar (CU-02 paso 5; RF2-06). Sin librería de notificaciones: el mensaje va en la página.
- **Abierto:** la pantalla de destino tras el registro. La vuelta automática a la experiencia cuando el registro empezó en un intento de reserva no queda aprobada: es una propuesta pendiente de decisión funcional (confirmado por el usuario el 2026-11-10; CU-02 A3; pregunta abierta de CU-02, no resuelta por RF2-06). No se decide aquí.
- Error: se muestra el error de la API y, si los hay, los errores por campo; su formato depende del contrato (P9). La cuenta no se da por creada.

**Modal de cancelación (CU-07; TD-09).** `CancelReservationModal` en `ReservationDetailPage`.

| Momento | Comportamiento | Fuente |
|---------|----------------|--------|
| Apertura | Botón de cancelar en el detalle de la reserva; `useState` local (elección técnica). Solo se ofrece si los datos de la API indican que la reserva es cancelable | CU-07 F2; TD-09 |
| Contenido | Política de cancelación: se puede cancelar si faltan 24 horas o más para el inicio de la experiencia (RF2-01). Si se pagó en línea, reembolso completo al método de pago original; si es presencial, sin reembolso. Datos de la reserva desde TanStack Query | CU-07 paso 3, A1, A2, CA6; RF2-01, RF2-10, RF2-17 |
| Cerrar o volver | Escape, clic fuera, botón de cierre o «Volver»: `onClose` cierra el modal; no se envía nada y la reserva queda intacta | TD-09 |
| Confirmar | Mutación de cancelación (`useCancelReservation`); mientras está pendiente, el botón de confirmar queda en carga o deshabilitado | TD-09 |
| Éxito | Se cierra el modal; se invalidan mis reservas, el detalle de la reserva y la disponibilidad de la experiencia; la página muestra la confirmación | CU-07 paso 8, CA2 |
| Error | El modal sigue abierto con el error; no se supone la cancelación. Fuera de plazo: mensaje claro de que ya no es posible cancelar directamente | CU-07 F1, CA5; RF2-01 |
| Accesibilidad | Comportamientos por defecto (foco atrapado, Escape, clic fuera, devolución del foco); `title` (`aria-labelledby`) y `closeButtonProps` (`aria-label`) | TD-09 |

**Aviso de acceso (TD-12).** `AccessNoticeModal`, en un layout compartido, se abre cuando `aviso` no es `null` (`mostrarAviso` desde `ReserveButton`) y se cierra con `cerrarAviso` en `onClose`. Lleva a iniciar sesión o registrarse (CU-01 A6, CU-02 A3) o a verificar el correo y reenviarlo (CU-02 A1, A2, CA9). Sin `persist`.

### Apartado 27 — Recorridos técnicos y sincronización con TanStack Query

| Acción | Pantalla | Validación | Consulta o mutación (keys ilustrativas) | Estados | Resultado |
|--------|----------|------------|-----------------------------------------|---------|-----------|
| Explorar y filtrar | `CatalogPage` | Filtros de la URL con Zod (TD-07) | Query `['experiencias', filtros]` | Carga, error, vacío, éxito | Listado (CU-01 CA2-CA13); sin resultados (F1, CA14) |
| Ver el detalle | `ExperienceDetailPage` | `experienciaId` de la URL | Query `['experiencia', experienciaId]` | Carga, error, éxito | Datos de R5 (CA9); `ReserveButton` abre el aviso de TD-12 si falta sesión o verificación |
| Registrarse | `RegisterPage` | Zod y Mantine Form (apartado 26) | Mutación de registro; invalida el usuario actual | Pendiente, error, éxito | Cuenta y sesión (RF2-06); destino abierto; la vuelta automática a la experiencia es una propuesta pendiente de decisión funcional (CU-02) |
| Iniciar sesión | `LoginPage` | Correo y contraseña obligatorios | Mutación de inicio de sesión; invalida el usuario actual | Pendiente, error (F4, CA7), éxito | Sesión iniciada; el usuario puede explorar y, si su correo está verificado, reservar (CU-02 flujo de inicio de sesión, paso 4; CA6) |
| Reservar con pago presencial | `ReservePage` | `experienciaId` de la URL; Mantine Form: fecha o sesión, plazas y teléfono si falta (formato P14) | Queries del detalle y del usuario actual; mutación de reserva que invalida el detalle, mis reservas y el usuario actual; la API valida de nuevo la disponibilidad | Pendiente, error (F1, F3), éxito | Reserva confirmada (CA2); el resumen previo muestra el total (RF2-18) y la política de cancelación (R6, CA5) |
| Pagar en línea y seguir la retención | `ReservePage` → `PaymentPage` | Igual que la anterior; `reservaId` de la URL | Mutación que crea la retención (la API valida de nuevo la disponibilidad) y navega a la URL de pago con el `reservaId` devuelto por el servidor; query `['reserva', reservaId]` | Pendiente; retención vigente con cuenta atrás; confirmada; no confirmada (F2, F3, RF2-09); error | Confirmación (CU-06 paso 8) o mensaje de no confirmación |
| Cancelar | `ReservationDetailPage` | Confirmación en el Modal | Query `['reserva', reservaId]`; mutación de cancelación | Apartado 26 | CU-07 CA1-CA5 |
| Publicar una experiencia | `NewExperiencePage` | Mantine Form y Zod con las reglas de CU-03 (límites secundarios no definidos) | Mutación de publicación; invalida las experiencias del organizador y el catálogo | Pendiente, error (F1, F2, F3; RF2-05), éxito | Experiencia publicada (CA3) |
| Administrar sesiones | `ManageExperiencePage` | Mantine Form; Modal en cambios importantes (TD-09) | Query de la experiencia del organizador; mutaciones que la invalidan junto con el detalle público y el catálogo | Pendiente, error (CU-04 F1-F3; RF2-04), éxito | CU-04 CA1-CA9 |
| Registrar el pago presencial | `ManageExperiencePage` | — | Query de las reservas de la sesión; mutación que invalida esa lista | Carga, vacío (A4), error (F1, F2), éxito | CA-08-01, CA-08-02, CA-08-05, CA-08-07 |

> **Nota sobre el destino tras iniciar sesión.** Propuesta técnica revisable, no regla funcional aprobada: volver a la ubicación de origen pasada en `state` (apartado 23). La vuelta automática a la experiencia tras el registro no queda aprobada: es una propuesta pendiente de decisión funcional (confirmado por el usuario el 2026-11-10; CU-02; RF2-06 no la resuelve).

**Consulta detallada: catálogo filtrado (CU-01).**

- Entradas: `useCatalogFilters` lee `useSearchParams` y valida los filtros con Zod (TD-07). Un valor no válido no se envía a la API; el tratamiento concreto se define al implementar.
- Hook: `useExperiences(filtros)` llama a `useQuery` con la key `['experiencias', filtros]` y una `queryFn` que usa `experiences-service.ts` (apartado 22; endpoint pendiente, P9).
- Al cambiar los filtros cambia la key y TanStack Query hace una nueva consulta, sin `useEffect`. Es el diseño previsto; está pendiente de verificar (ver la evidencia de 25-27).

| Estado | Condición (evidencia v5.90.3) | Interfaz |
|--------|-------------------------------|----------|
| Carga | `isPending` | Indicador de carga |
| Error | `isError` (con `error`) | Mensaje y opción de reintentar |
| Vacío | Éxito con lista vacía | Aviso de que no hay experiencias que coincidan y opción de modificar o limpiar los filtros (CU-01 F1, CA14) |
| Éxito | `data` disponible | Listado con orden y «Agotado» (CU-01 R3, R6; RF2-07) |

- `staleTime` y la demás configuración: pendientes (P9).

**Mutaciones y sincronización:**

- Las mutaciones nacen de una acción explícita, con confirmación previa cuando la piden las fuentes: Modal de CU-07, resumen de CU-05 y CU-06 (R6) y cambios importantes de CU-04 (TD-09).
- Tras el éxito, `onSuccess` llama a `queryClient.invalidateQueries({ queryKey })` para las keys afectadas (evidencia de 25-27).
- Sin actualización optimista de la disponibilidad: la decide la API (TD-05).
- Si la mutación falla, no se supone el éxito: se muestra el error y los datos siguen siendo los de la API.
- La cuenta atrás de la retención parte de la hora de vencimiento devuelta por la API (TD-07).
- La estrategia para refrescar el estado de la retención y la vuelta desde el proveedor de pago siguen pendientes (P6, P7, P9). No se fija ningún intervalo.

### Apartados de entrega 28-30

Apartados de entrega 28-30 de la consigna 03-diseno-tecnico.pdf (según el usuario), derivados de TD-01 a TD-12 y de los apartados 21-27. **No se ha ejecutado ninguna prueba de MODO:** lo que sigue es un plan. Los nombres de piezas son ilustrativos (apartado 22). «P*n*» remite a las preguntas abiertas.

### Apartado 28 — Estrategia de verificación y límites de evidencia

Evidencia actual:

- Única comprobación vigente: el health `pnpm build` (`tsc -b && vite build`) sobre la plantilla de Vite. `pnpm lint` (oxlint) está disponible, pero no forma parte del health (apartado 21).
- **No se ha ejecutado ninguna prueba de MODO. Vitest no está instalado** (herramienta de la cohorte para funciones puras; la sección 5 no fija su versión; apartado 21).
- Las herramientas para pruebas de componentes, integración, E2E y de la API siguen sin decidir (P11).

Matriz de verificación prevista (ninguna fila se ha ejecutado):

| Criterio (CA / RF) | Prueba prevista | Resultado esperado | Herramienta | Límite de evidencia |
|--------------------|-----------------|--------------------|-------------|---------------------|
| CU-02 CA1, CA2, CA3, CA4; R1, R2 | Esquema de registro con los casos válidos e inválidos del apartado 26 | Caso válido aceptado; términos sin aceptar, campo vacío o correo con formato no válido: error en el campo; el esquema no incluye cédula, pasaporte ni teléfono (CA3) | Vitest (no instalado) | Prueba pura; no prueba la API. API de Zod para el correo y para exigir `true` sin verificar (P13); requisitos de la contraseña abiertos (P14) |
| CU-01 CA3; TD-07 | Validación y normalización de los filtros de la URL | Valores válidos aceptados; un valor no válido no llega a la API | Vitest (no instalado) | Nombres de parámetros pendientes (P9, P12); el tratamiento de un valor no válido se define al implementar (apartado 27) |
| RF2-18; CU-05 CA5; CU-06 CA7 | Total de la reserva a partir del precio y las plazas | 3 × 20 USD = 60 USD | Vitest (no instalado) | El importe lo confirma la API (TD-01); redondeo y formato no definidos (RF2-13) |
| RF2-08; TD-07 | Tiempo restante a partir de la hora de vencimiento devuelta por la API (`expiresAt`, nombre ilustrativo) | Tiempo restante coherente con la hora de vencimiento | Vitest (no instalado) | Solo presentación: la API decide si la retención sigue vigente; mecanismo de vencimiento pendiente (P7) |
| TD-12 | Acciones del store: `mostrarAviso(tipo)` y `cerrarAviso()` | `aviso` pasa al tipo indicado y vuelve a `null` | Vitest (no instalado) | API de Zustand 5.0.15 sin verificar (P13) |
| CU-01 A6; CU-02 A1, A3, CA9; CU-05 A2, CA7 | Elección del aviso según el usuario actual, si se diseña como función pura | Sin sesión → `'iniciar-sesion'`; correo sin verificar → `'verificar-correo'`; correo verificado → sin aviso | Vitest (no instalado) | Control de interfaz; la API es la autoridad (TD-11) |
| CU-06 CA2, CA6; CU-05 CA3, F1; TD-05 | Concurrencia y retención: solicitudes simultáneas por las últimas plazas | Sin sobreventa; retención con hora de vencimiento | Pendiente (P11) | **Bloqueado:** la API no existe; `.for('update')` dentro de una transacción por confirmar (P3); vencimiento sin decidir (P7) |
| CU-02 CA5; R6 | Correo ya registrado | La API no crea una segunda cuenta | Pendiente (P11) | **Bloqueado:** la API no existe |
| CU-07 CA1, CA5; RF2-01, RF2-12 | Cancelación dentro y fuera de plazo | Dentro del plazo: cancelada; fuera: rechazada con mensaje | Pendiente (P11) | **Bloqueado:** la API no existe; reembolso sin decidir (P8) |
| CU-07 R6, CA7; CU-08 R1, CA-08-08; CU-04 R5, CA9 | Propiedad de los recursos | Acceso a un recurso ajeno rechazado | Pendiente (P11) | **Bloqueado:** la API no existe; un identificador en la URL no es una credencial (TD-10) |
| TD-11 | Sesión con cookie httpOnly y protección CSRF | Según el mecanismo que se decida | Pendiente (P11) | **Bloqueado:** la API no existe; CSRF, SameSite y Secure sin decidir (P16) |
| Apartado 23 | Navegación: ruta desconocida, recarga directa y accesos de interfaz | `NotFoundPage`; la pantalla se reconstruye desde la URL y TanStack Query; redirección con `replace` | Componente o manual; herramienta pendiente (P11) | `path="*"` sin verificar (P13); recarga en producción según el alojamiento (P10) |
| CU-07 CA6; TD-09 (apartado 26) | Modal de cancelación: abrir, cerrar sin cambios, confirmar, error y accesibilidad | Comportamiento de la tabla del apartado 26 | Componente o manual; herramienta pendiente (P11) | La cancelación real depende de la API |
| Apartado 21 | Versiones exactas exigidas | `package.json` y lockfile con la versión exigida; Mantine con una sola versión; `pnpm build` pasa | Inspección al instalar | Requiere instalar (etapa E0, apartado 29); P13 |

Límites:

- No se declaran pruebas futuras como ejecutadas; un resultado solo se registra cuando la prueba se haya ejecutado.
- Las pruebas del frontend no prueban la seguridad: identidad, permisos, propiedad, plazos y disponibilidad los decide la API (TD-01, TD-11).
- Las pruebas o comprobaciones realizadas con datos simulados temporales (P17) no son evidencia de la integración remota: ninguna consulta simulada se presenta como cumplimiento ni como prueba de la integración con la API.
- El rendimiento de las consultas de disponibilidad calculada (TD-05) sigue sin comprobar (P11).

### Apartado 29 — Plan de construcción, dependencias y riesgos

Plan, no ejecutado: ninguna etapa ha empezado. Instalar dependencias requiere autorización del usuario y queda fuera de esta fase. Los criterios de cierre son futuros, no resultados.

| Etapa | Requisitos previos | Módulos previstos (apartado 22) | Criterio observable de cierre | Bloqueos | Riesgos |
|-------|--------------------|---------------------------------|-------------------------------|----------|---------|
| E0 — Instalación y verificación de versiones | Autorización del usuario | `package.json` y lockfile | Versiones exactas del apartado 21 fijadas; Mantine con una sola versión; verificado si `@mantine/core` 9.4.1 exige `@mantine/hooks`; `pnpm build` pasa | Autorización; P13; versión de Vitest no fijada | Divergencias entre la documentación consultada y las versiones exigidas (P13) |
| E1 — Base | E0 | `main.tsx`, `App.tsx`, proveedores, layouts y `NotFoundPage` | Las rutas del apartado 23 renderizan su layout; una ruta desconocida muestra `NotFoundPage`; `pnpm build` pasa | `path="*"` por verificar (P13) | Idioma y nombres de rutas pendientes (P12) |
| E2 — Catálogo y detalle (CU-01) | E1; interfaz con datos simulados temporales identificados (P17, resuelta); integración real: API (TD-02 a TD-05) | `CatalogPage`, `ExperienceDetailPage`, `CatalogFilters`, `useCatalogFilters`, `useExperiences`, `useExperience`, `experiences-service.ts`, `catalog-filters-schema.ts` | Los filtros se reflejan en la URL y se conservan con Atrás; estados de carga, error, vacío y éxito (apartado 27), con datos simulados identificados; la integración real queda pendiente de la API | Integración real: API inexistente; P9 | Contratos no definidos (P9) |
| E3 — Registro, inicio de sesión y verificación (CU-02), con el aviso de TD-12 | E1; interfaz con datos simulados temporales identificados (P17, resuelta); integración real: API de cuenta y sesión (TD-11) | `RegisterPage`, `RegistrationForm`, `LoginPage`, `VerifyEmailPage`, `useCurrentUser`, `account-service.ts`, esquemas de registro e inicio de sesión, `access-notice-store.ts`, `ReserveButton`, `AccessNoticeModal` | Pruebas puras del esquema y del aviso (apartado 28) ejecutadas; envío protegido contra el doble envío | Integración real: API inexistente; P5; P14; P16 | Seguridad de la sesión (P16) |
| E4 — Reserva con pago presencial (CU-05) | E2, E3; interfaz con datos simulados temporales identificados (P17) | `ReservePage`, `SessionList`, `reservations-service.ts`, `phone-schema.ts` | El resumen muestra el total (RF2-18) y la política de cancelación antes de confirmar | Integración real: API inexistente; formato del teléfono (P14); ubicación de la ruta (TD-10) | Concurrencia resuelta solo en la API (TD-05) |
| E5 — Pago en línea y retención (CU-06) | E4; interfaz con datos simulados temporales identificados (P17) | `PaymentPage` | La pantalla de pago muestra el estado consultado a la API y la cuenta atrás desde su hora de vencimiento | Integración real: API inexistente; P6, P7 | Proveedor y vencimiento sin decidir |
| E6 — Mis reservas y cancelación (CU-07) | E3; interfaz con datos simulados temporales identificados (P17) | `MyReservationsPage`, `ReservationDetailPage`, `CancelReservationModal`, `useMyReservations`, `useCancelReservation` | El modal se comporta como en el apartado 26 | Integración real: API inexistente; reembolso (P8) | Envío duplicado y estado tras un error (TD-09) |
| E7 — Organizador (CU-03, CU-04, CU-08) | E1, E3; interfaz con datos simulados temporales identificados (P17) | `OrganizerLayout`, `OrganizerExperiencesPage`, `NewExperiencePage`, `ManageExperiencePage`, `experience-schema.ts` | Publicar, administrar sesiones y registrar pagos según el apartado 27 | Integración real: API inexistente; P3; ruta de activación del perfil (P12) | Propiedad comprobada solo en la API |
| E8 — Publicación (solo plan) | E1 a E7 | — | No se despliega en esta fase | P10 | Devolución de `index.html` para las rutas (apartado 23); dominios y cookies (P10, P16) |

Dependencias del backend:

- La API Express (TD-02), PostgreSQL (TD-03) y Drizzle (TD-04), con la disponibilidad de TD-05 y la sesión de TD-11, son requisitos previos de la integración real de E2 en adelante; la interfaz puede desarrollarse antes con datos simulados temporales identificados (P17). Ninguno existe; el modelado de datos sigue abierto (P3).

> **Fuente de datos sin API (P17, resuelta por el usuario el 2026-11-10).** La API no existe. Durante la futura construcción se usarán datos simulados temporales para desarrollar primero la interfaz, dejando claro que no son datos remotos reales. Cuando exista la API Express, las consultas reales se integrarán mediante TanStack Query. Ninguna consulta simulada se presentará como cumplimiento o prueba de la integración remota. Se desbloquea el desarrollo de la interfaz de E2 en adelante; la integración real sigue bloqueada hasta que exista la API. El mecanismo de simulación no se decide aquí (queda para la implementación) y no usa `useEffect` para obtener datos. No contradice TD-01: TD-01 descartó como arquitectura final la alternativa «solo frontend con datos simulados»; P17 trata solo de una fuente temporal durante el desarrollo.

Riesgos (registrados en «Dependencies, rollout, risks, and validation»; no se duplican):

- Divergencias de versión (P13; riesgos de TD-07 a TD-12).
- Contratos no definidos (P9; apartado 25).
- Alcance del backend en un bootcamp: mayor esfuerzo que un backend gestionado; autenticación, correo, seguridad y despliegue de dos piezas por construir.
- Seguridad de la sesión (P16; riesgos de TD-11).

### Apartado 30 — Trazabilidad técnica y cambios respecto de la segunda entrega

| CU / regla | Spec funcional (RF2) | Spec técnica (TD / apartado) | Pieza responsable (ilustrativa, apartado 22) | Herramienta | Comprobación futura (apartado 28) |
|------------|----------------------|------------------------------|----------------------------------------------|-------------|-----------------------------------|
| CU-01 catálogo, búsqueda, filtros y orden (R2, R3, R6, R7, R8; CA2-CA14) | RF2-07, RF2-16 | TD-07, TD-10; apartados 23, 25, 27 | `CatalogPage`, `CatalogFilters`, `useCatalogFilters`, `useExperiences` | React Router, Zod, TanStack Query | Vitest: filtros de la URL (CA3). Visibilidad, «Agotado» y orden: API (bloqueado) |
| CU-01 detalle e intención de reservar (R5, CA9, A6) | RF2-07 | TD-09, TD-12; apartados 23, 25, 26 | `ExperienceDetailPage`, `ReserveButton`, `AccessNoticeModal` | TanStack Query, Zustand, Mantine Core | Vitest: elección del aviso y store |
| CU-02 registro (R1-R4, R6; CA1-CA5) | RF2-06 | TD-08, TD-11; apartados 25, 26 | `RegisterPage`, `RegistrationForm`, `registration-schema.ts` | Zod, Mantine Form, TanStack Query | Vitest: esquema (CA1-CA4). CA5: API (bloqueado) |
| CU-02 inicio de sesión y verificación (R5; A1, A2; CA6-CA10) | RF2-06 | TD-10, TD-11, TD-12; apartados 23, 25, 27 | `LoginPage`, `VerifyEmailPage`, `useCurrentUser` | TanStack Query, React Router | Vitest: aviso de verificar el correo. Sesión: API (bloqueado; P16) |
| CU-03 publicar (R1, R4, R5; CA1, CA3-CA5) | RF2-05, RF2-13 | TD-08, TD-10; apartados 22, 25, 27 | `NewExperiencePage`, `experience-schema.ts` | Mantine Form, Zod, TanStack Query | Sin prueba pura definida; reglas de publicación: API (bloqueado; P11) |
| CU-04 fechas, cupos y precios (R1-R6; CA1-CA9) | RF2-02, RF2-04, RF2-18 | TD-05, TD-09; apartados 25, 27 | `ManageExperiencePage` | Mantine Form, Mantine Core, TanStack Query | Cupo y propiedad: API (bloqueado); modal: componente o manual (P11) |
| CU-05 reserva con pago presencial (R1, R3, R6; CA1-CA5, CA7) | RF2-03, RF2-16, RF2-18 | TD-05, TD-08, TD-10; apartados 24, 25, 27 | `ReservePage`, `SessionList`, `phone-schema.ts` | Mantine Form, Zod, TanStack Query | Vitest: total (RF2-18) y aviso (CA7). CA3: API (bloqueado) |
| CU-06 reserva con pago en línea (R2-R4; CA2-CA7) | RF2-08, RF2-09, RF2-14, RF2-18 | TD-05, TD-07, TD-10; apartados 24, 25, 27 | `ReservePage`, `PaymentPage` | TanStack Query, React Router | Vitest: total (CA7) y tiempo restante (RF2-08). Retención: API (bloqueado; P6, P7) |
| CU-07 cancelación (R2, R3, R6, R7; CA1-CA7) | RF2-01, RF2-10, RF2-11, RF2-12, RF2-17 | TD-09, TD-11; apartados 25, 26 | `ReservationDetailPage`, `CancelReservationModal`, `useCancelReservation` | Mantine Core, TanStack Query | Modal: componente o manual (P11). Plazo y propiedad: API (bloqueado). Reembolso: P8 |
| CU-08 pago presencial (R1-R10; CA-08-01 a CA-08-16, salvo CA-08-11, retirado) | RF2-03, RF2-15, RF2-17 | TD-10, TD-11; apartados 25, 27 | `ManageExperiencePage` | TanStack Query | Propiedad, plazo de corrección e historial: API (bloqueado) |
| Transversal: zona horaria e importes | RF2-12, RF2-13 | TD-03, TD-04 (riesgos de fechas e importes) | Futura API | — | API y modelado (bloqueado; P3) |

#### Cambios respecto de la segunda entrega (Fase 2)

- No se modificó ninguna fuente funcional aprobada: `fase-02-especificacion-funcional` y CU-01 a CU-08 siguen intactos.
- La Fase 3 añade la capa técnica: TD-01 a TD-12 y los apartados 21-30.
- Concreciones técnicas de reglas existentes, sin cambio funcional:
  - Retención de 10 minutos (RF2-08): disponibilidad calculada con bloqueo breve (TD-05) y cuenta atrás desde la hora de vencimiento de la API (TD-07).
  - Correo verificado solo para reservar (CU-02 R5; RF2-06): controles de interfaz (TD-10, TD-12) y comprobación en la API (TD-11).
  - Sesión iniciada tras el registro (RF2-06): la crea y la mantiene la API con cookie httpOnly (TD-11).
  - Zona horaria (RF2-12) e importes en USD (RF2-13, RF2-18): fechas con zona horaria y sin coma flotante para los importes (riesgos de TD-03 y TD-04).
  - Filtros del catálogo (CU-01): en la URL (TD-07).
- **Selección** de los puntos funcionales abiertos más relevantes que la Fase 3 no resuelve. La lista completa está en «Preguntas abiertas» de `fase-02-especificacion-funcional` y de cada caso de uso:
  - Cierre de sesión y vuelta a la experiencia tras registrarse desde un intento de reserva (CU-02); la vuelta automática es una propuesta pendiente de decisión funcional, no aprobada.
  - Requisitos de la contraseña y caducidad y formato del correo de verificación (CU-02).
  - Filtros del catálogo (zonas y sectores o parroquias, categorías, forma del filtro de rango de precios y «este fin de semana»), dirección exacta y requisitos de participación (CU-01).
  - «Agotado» combinado con un filtro de fecha (pregunta derivada de RF2-07).
  - Correo verificado para publicar y edición posterior de la información general de la experiencia (CU-03).
  - Cancelación por parte del organizador (CU-04, CU-07).
  - Límite máximo de plazas por reserva.
  - Método de pago original no disponible al reembolsar y plazo de acreditación del reembolso.
  - Pago en línea completado después del inicio de la sesión y cambio de precio entre el resumen y la confirmación.
  - Impago e inasistencias en el pago presencial; etiqueta del estado de pago de las reservas en línea en CU-08.
  - Fechas recurrentes, tarifas y experiencias gratuitas, notificaciones y lista de espera (fase-02).
- Pregunta técnica de la Fase 3, no funcional: formato del teléfono, no definido en las fuentes (P14).
- Ninguno de estos puntos se presenta como cambio funcional.

## Dependencies, rollout, risks, and validation

- Dependencias futuras de la API (TD-02), **no instaladas y no añadidas a `package.json`**:
  - Express 5.x; la versión menor exacta queda pendiente hasta la instalación.
  - Tipos TypeScript de Express: pendientes de verificar al instalar.
- Dependencia futura de base de datos (TD-03), **no instalada y sin cambios en `package.json`**:
  - PostgreSQL; la versión mayor queda pendiente (la documentación consultada corresponde a la versión 18).
- Dependencias futuras de acceso a datos (TD-04), **no instaladas y sin cambios en `package.json`**:
  - drizzle-orm y drizzle-kit; las versiones exactas quedan pendientes hasta la instalación (la documentación indexada en Context7 corresponde a drizzle-orm 0.45.x y drizzle-kit 0.31.5).
- Dependencia futura del frontend (TD-06), **no instalada y sin cambios en `package.json`**:
  - react-router; la consigna exige la versión 8.3.1 (ver TD-08, tabla de versiones exigidas); la documentación consultada corresponde a la versión 7.13.0.
- Dependencias futuras del frontend (TD-07), **no instaladas y sin cambios en `package.json`**:
  - TanStack Query, Zustand y Mantine Form; la documentación consultada corresponde a TanStack Query v5.90.3 y Zustand v5.0.14. La consigna exige Zustand 5.0.15 y Mantine Form 9.4.1 (ver TD-08); TanStack Query (`@tanstack/react-query`) exigida 5.102.8 (no instalada).
  - La «versión 8.3.1» exigida por la cohorte corresponde a React Router (corregido en TD-08); su compatibilidad no está verificada (ver pregunta abierta 13).
- Dependencias futuras del frontend (TD-08), **exigidas por la consigna, no instaladas y sin cambios en `package.json`**:
  - Zod 4.4.3 (imports desde `zod/v4`), `@mantine/form` 9.4.1 y `@mantine/core` 9.4.1. No se añade `mantine-form-zod-resolver`.
- Dependencias futuras del frontend (TD-09), **no instaladas y sin cambios en `package.json`**:
  - `Modal` forma parte de `@mantine/core` 9.4.1, ya exigido (TD-08); no se añade `@mantine/modals`.
  - `@mantine/hooks`: no se usa. La consigna exige Mantine Core con `Modal` y no obliga a usar `@mantine/hooks` ni `useDisclosure`; el proyecto elige `useState` de React para los modales locales (elección técnica; pregunta abierta 15, resuelta). El aviso de acceso compartido se controla mediante Zustand (TD-12). No se instala; si `@mantine/core` 9.4.1 lo exigiera como requisito de instalación, se verifica en la etapa E0 (apartado 21).
- TD-10 no añade dependencias: usa React Router (TD-06) y TanStack Query (TD-07), ya registrados; **sin cambios en `package.json`** y sin instalar nada.
- TD-11 no añade dependencias: la sesión la mantendrá la futura API Express (TD-02). express-session es solo un candidato documentado, **no adoptado y no instalado**; el mecanismo y el almacén de sesiones quedan pendientes (pregunta abierta 16). **Sin cambios en `package.json`** y sin instalar nada.
- TD-12 no añade dependencias: usa Zustand (exigido 5.0.15, ya registrado en TD-07) sin el middleware `persist`, y el `Modal` de `@mantine/core` (TD-09). **Sin cambios en `package.json`** y sin instalar nada.
- Restricciones de la consigna (sección 5, según el usuario; ver la lista junto a la tabla de versiones exigidas): sin `useEffect` para obtener datos, filtros derivados ni eventos; sin librería de notificaciones; todos los paquetes de Mantine con la misma versión; sin `mantine-form-zod-resolver`; sin `@mantine/modals`; Mantine Core con `Modal`, sin obligación de usar `@mantine/hooks` ni `useDisclosure`. Controlar los modales locales con `useState` es una elección técnica del proyecto, no una restricción de la consigna.
- Dependencias pendientes (sin elegir): driver de PostgreSQL. Esta especificación no añade dependencias.
- Despliegue: no definido.
- Riesgos:
  - Mayor esfuerzo que un backend gestionado (reconocido por el usuario).
  - La autenticación, el envío de correos, la seguridad y el despliegue de dos piezas (frontend y API) quedan por construir.
  - Riesgo de exponer secretos si se usan variables `VITE_`. Mitigación: los secretos residen solo en la API.
  - Express no resuelve por sí solo (reconocido por el usuario) y quedan pendientes para decisiones posteriores:
    - Validación de entradas.
    - Seguridad.
    - Reservas simultáneas: a resolver con transacciones de la base de datos en decisiones posteriores.
  - Riesgos asociados a PostgreSQL (TD-03):
    - Transacciones largas y deadlocks: una transacción abierta bloquea a otras y, ante un deadlock, PostgreSQL aborta una de ellas. Mitigación: bloqueos breves y retención de 10 minutos fuera de una transacción abierta.
    - Conversión de zonas horarias: `timestamp with time zone` se guarda en UTC sin conservar la zona original; los plazos deben convertirse a America/Guayaquil (RF2-12).
    - Precisión de importes: no usar coma flotante para importes en USD (RF2-13, RF2-18).
  - Riesgos asociados a Drizzle ORM (TD-04); los modos concretos no se deciden aquí:
    - Importes: el modo `'number'` de `numeric` entrega valores de coma flotante de JavaScript, lo que contradice la evidencia de TD-03 sobre dinero (`datatype-money.html`, §8.2; RF2-13, RF2-18).
    - Fechas: el mapeo de `timestamp with time zone` depende de la zona horaria configurada en la instancia de PostgreSQL; los plazos deben calcularse en America/Guayaquil (RF2-12).
    - Bloqueo de filas: el soporte de `SELECT ... FOR UPDATE` en Drizzle no está verificado (ausente en la documentación indexada). *(Actualización 2026-11-10: documentado en el changelog oficial de drizzle-orm con `.for('update')` para PostgreSQL; el uso dentro de una transacción sigue pendiente de confirmar al implementar.)*
  - Riesgos asociados a la disponibilidad calculada (TD-05), reconocidos por el usuario:
    - Consultas de disponibilidad más costosas: cada consulta suma reservas confirmadas y retenciones vigentes, lo que afecta al catálogo, a la consulta de disponibilidad (RF2-07) y al filtro por plazas (CU-01 A5). El rendimiento queda por comprobar.
    - Vencimiento de las retenciones: aún no existe mecanismo para liberar las retenciones vencidas (ver preguntas abiertas).
    - Uso de `.for('update')` dentro de una transacción de Drizzle: por confirmar en la implementación.
  - Riesgos asociados al enrutamiento del frontend (TD-06):
    - Los controles de acceso en los componentes no son una medida de seguridad: pueden eludirse en el navegador. Mitigación: la API verifica los permisos de forma independiente (CU-07 R6, CU-08 R1).
    - Posible visualización momentánea de una pantalla protegida antes de redirigir, mientras se comprueba la sesión o los permisos.
  - Riesgos asociados al reparto de estado del frontend (TD-07), reconocidos por el usuario:
    - Parámetros de URL: cualquiera puede editarlos o compartir valores inválidos; necesitan validación (con Zod, pendiente de su propia decisión técnica) antes de usarse en el catálogo.
    - Cada cambio con `setSearchParams` provoca una navegación y su callback no encola actualizaciones como `setState`; los cambios de filtros deben agruparse en una sola llamada.
    - Estado en Zustand: no persiste tras recargar la página. *(Actualización TD-12: Zustand solo guarda el aviso de acceso activo, sin `persist`; al recargar, el aviso se cierra y el usuario puede repetir la acción. No guarda datos de la API ni datos sensibles.)*
    - Reloj del navegador: no es la autoridad del vencimiento de la retención (RF2-08); la cuenta atrás parte de la hora de vencimiento de la API y la API decide.
    - Versión 8.3.1 de React Router (corregido en TD-08): la compatibilidad de la API usada (modo declarativo, `BrowserRouter`, `useSearchParams`) con esa versión no está verificada (pregunta abierta 13).
  - Riesgos asociados a la validación de formularios (TD-08):
    - Reglas duplicadas: las reglas del frontend (Zod) y las de la API se definen por separado y pueden divergir; la API es la autoridad.
    - La validación del frontend puede eludirse en el navegador; no es una medida de seguridad (reconocido por el usuario). Mitigación: la API valida de nuevo cada solicitud.
    - Versiones exactas sin verificar: la documentación consultada corresponde a Mantine 9.0.0 y Zod v4.3.6, no a Mantine 9.4.1 ni a Zod 4.4.3 (pregunta abierta 13).
    - Requisitos de la contraseña y formato del teléfono pendientes: no pueden expresarse en los esquemas hasta que se aprueben (pregunta abierta 14).
  - Riesgos asociados al uso de Mantine Modal (TD-09):
    - Versión sin verificar: la evidencia corresponde a Mantine 9.0.0, no a la 9.4.1 exigida; los nombres de las props de control de comportamiento de `Modal` se infieren de la documentación de `Drawer` 9.0.0 (pregunta abierta 13).
    - Control de apertura: el proyecto elige `useState` de React para los modales locales (elección técnica; la consigna exige Mantine Core con `Modal` y no obliga a usar `@mantine/hooks` ni `useDisclosure`; pregunta abierta 15, resuelta). El aviso de acceso compartido se controla mediante Zustand (TD-12).
    - Accesibilidad: desactivar atrapar el foco, cerrar con Escape, cerrar al pulsar fuera o devolver el foco «is generally not recommended as it may impact accessibility»; ocultar el título con `withCloseButton={false}` elimina también el botón de cierre.
    - Envío duplicado: una doble pulsación al confirmar la cancelación podría enviar dos solicitudes. Mitigación: evitar envíos duplicados durante la solicitud; la API sigue siendo la autoridad.
    - Estado tras un error: no debe asumirse que la reserva fue cancelada; los datos mostrados proceden de la API (TD-07).
  - Riesgos asociados al mapa de rutas por zonas (TD-10):
    - Los controles en la ruta padre de cada zona son solo de interfaz y pueden eludirse en el navegador. Mitigación: la API comprueba la identidad, los permisos y la propiedad de cada recurso.
    - Las URL con identificador pueden editarse o compartirse: la API debe rechazar el acceso a reservas o experiencias ajenas; el identificador no es una credencial.
    - La recuperación de la reserva o de la retención tras una recarga o una redirección depende de que la futura API devuelva su estado real; no puede comprobarse hasta que la API exista.
    - Exigir el correo verificado en más pantallas de las debidas contradiría CU-02 R5: la verificación solo se exige antes de reservar.
    - Versión sin verificar: la evidencia de rutas anidadas, `Outlet`, `Navigate`, `useNavigate` y `Link` corresponde a React Router 7.13.0, no a la 8.3.1 exigida; la ruta comodín `path="*"` no está verificada (pregunta abierta 13).
  - Riesgos asociados a la sesión en el servidor con cookie httpOnly (TD-11), reconocidos por el usuario:
    - Las cookies httpOnly no eliminan por sí solas los riesgos de seguridad: la cookie se envía automáticamente en cada solicitud, por lo que la API necesita protección CSRF (mecanismo pendiente, pregunta abierta 16).
    - Dominios: si el frontend y la API se alojan en dominios distintos, cambian la configuración de SameSite y el envío de credenciales desde el navegador; depende del alojamiento, todavía pendiente (preguntas abiertas 10 y 16).
    - Secure detrás de un proxy: según la evidencia de express-session, una cookie Secure detrás de un proxy requiere configurar `trust proxy`; la configuración definitiva depende del despliegue (pregunta abierta 10).
    - Almacén de sesiones: el MemoryStore por defecto de express-session no es apto para producción; el almacén queda pendiente (pregunta abierta 16).
    - Cierre de sesión: en Express 5, `res.clearCookie` ignora las opciones `maxAge` y `expires` indicadas por el usuario; el mecanismo seguro de cierre de sesión queda para la implementación.
    - Sin verificar: la regeneración de la sesión al iniciar sesión y cualquier mecanismo de CSRF no se consultaron en la documentación.
  - Riesgos asociados a Zustand para los avisos de acceso (TD-12):
    - Versión sin verificar: la evidencia corresponde a Zustand v5.0.14; la 5.0.15 exigida no está indexada en Context7 (pregunta abierta 13).
    - Los avisos son solo de interfaz y pueden eludirse en el navegador. Mitigación: la API verifica la sesión, la verificación del correo y los permisos (TD-11).
    - El aviso no sobrevive a una recarga (sin `persist`); el usuario debe repetir la acción para volver a verlo.
- Validación: no existen pruebas de la API ni de la base de datos porque estos componentes no existen; no se declaran pruebas. La única comprobación vigente es el health (`pnpm build`) del frontend. La estrategia prevista y sus límites están en el apartado 28.

## Decisions and open questions

### Decisiones

**Decisión confirmada por el usuario (2026-11-09) — TD-01: arquitectura con API propia y base de datos relacional**

- Palabras del usuario (2026-11-09): «elijo la alternativa B: mantener React con Vite para el frontend y planificar una API propia con una base de datos relacional.»
- Palabras del usuario (2026-11-09): «La elijo porque MODO necesita que las reglas importantes, como la disponibilidad de plazas, las reservas, los pagos y las cancelaciones, se comprueben de forma centralizada y no dependan únicamente del navegador.»
- Palabras del usuario (2026-11-09): «También considero que esta alternativa me permite aplicar y aprender mejor los conocimientos de desarrollo Full Stack del bootcamp, manteniendo la plantilla React existente.»
- Palabras del usuario (2026-11-09): «Reconozco que requiere más trabajo que utilizar un backend gestionado. Por ahora es una decisión de diseño: no existe una API implementada ni una base de datos disponible. Deben registrarse como componentes futuros y dependencias pendientes, sin inventar servicios ni pruebas.»
- Palabras del usuario (2026-11-09): «No estoy eligiendo todavía Express, PostgreSQL u otras tecnologías concretas; quiero analizar esas decisiones cuando corresponda.»

Alternativas consideradas y descartadas:

- A — Solo frontend con datos simulados: las reglas de negocio quedarían solo simuladas en el navegador. *(Nota 2026-11-10: el uso de datos simulados temporales durante el desarrollo de la interfaz, resuelto en P17, no es esta alternativa: no sustituye a la API como arquitectura final.)*
- C — Backend gestionado (p. ej., Supabase o Firebase): dependencia de un proveedor y menos backend propio para aprender.
- D — Framework full stack de React (p. ej., Next.js o React Router en modo framework): obliga a migrar la plantilla Vite existente.

**Decisión confirmada por el usuario (2026-11-09) — TD-02: framework de la API**

- Palabras del usuario (2026-11-09): «Para la decisión técnica TD-02, elijo la alternativa A: Express 5.x con Node.js y TypeScript para la futura API de MODO.»
- Palabras del usuario (2026-11-09): «Mi principal motivo es que quiero una solución que pueda comprender y desarrollar progresivamente durante mi formación Full Stack. Express me permite aprender cómo funcionan las rutas, las solicitudes HTTP y la organización de la lógica del servidor sin añadir demasiados conceptos nuevos desde el principio.»
- Palabras del usuario (2026-11-09): «Consideré Fastify por su validación integrada, NestJS por su estructura y Hono por su ligereza, pero para esta etapa prefiero Express por su sencillez y su documentación.»
- Palabras del usuario (2026-11-09): «Entiendo que Express no resuelve por sí solo la validación, la seguridad ni las reservas simultáneas. Estas responsabilidades tendrán que contemplarse en el diseño posterior, especialmente las transacciones de la base de datos.»

Motivo de la elección (en palabras del usuario): una solución que pueda comprender y desarrollar progresivamente durante su formación Full Stack, por su sencillez y su documentación.

Alternativas consideradas y descartadas:

- B — Fastify 5.x: validación por esquemas integrada; curva de aprendizaje de su modelo de plugins.
- C — Hono 4.x: ligero y tipado; menos material didáctico.
- D — NestJS 11/12: estructura modular e inyección de dependencias; curva de aprendizaje más pronunciada.

**Decisión confirmada por el usuario (2026-11-09) — TD-03: motor de base de datos**

- Palabras del usuario (2026-11-09): «Para la decisión técnica TD-03, elijo la alternativa A: PostgreSQL como base de datos relacional de MODO.»
- Palabras del usuario (2026-11-09): «La elijo porque nuestro proyecto necesita relacionar participantes, experiencias, sesiones y reservas, y controlar la disponibilidad de plazas cuando varias personas intentan reservar al mismo tiempo.»
- Palabras del usuario (2026-11-09): «Me interesa especialmente que PostgreSQL permita trabajar con transacciones y bloqueos de filas para evitar sobreventas. También ofrece tipos adecuados para manejar fechas y horas de las experiencias, así como importes exactos en dólares.»
- Palabras del usuario (2026-11-09): «Consideré MySQL porque también permite transacciones y SQLite por su facilidad de instalación. Sin embargo, prefiero PostgreSQL porque ofrece una solución sólida para construir y ampliar MODO sin tener que planificar una migración temprana.»
- Palabras del usuario (2026-11-09): «Entiendo que PostgreSQL no resuelve automáticamente las reglas de negocio: la futura API deberá coordinar las retenciones de 10 minutos, las confirmaciones de pago, las cancelaciones y los reembolsos. Los bloqueos transaccionales deben ser breves; no deben mantenerse abiertos durante los 10 minutos de pago.»

Alternativas consideradas y descartadas:

- B — MySQL/MariaDB: InnoDB ofrece transacciones, bloqueo de filas y `DECIMAL` exacto; el manejo de zonas horarias y algunos comportamientos por defecto requieren más cuidado.
- C — SQLite: archivo único sin servidor, ideal para prototipos; un solo escritor a la vez, sin decimal exacto ni tipo de fecha propio, encaja mal con discos no persistentes; probable migración posterior.

**Decisión confirmada por el usuario (2026-11-09) — TD-04: acceso a datos**

- Palabras del usuario (2026-11-09): «Para la decisión técnica TD-04, elijo la alternativa D: Drizzle ORM como herramienta de acceso a PostgreSQL desde la futura API Express.»
- Palabras del usuario (2026-11-09): «La elijo porque quiero trabajar con TypeScript y mantener una relación clara con SQL, sin tener que escribir manualmente todas las consultas ni gestionar los tipos de resultados por mi cuenta.»
- Palabras del usuario (2026-11-09): «Me parece una buena opción para MODO porque tendremos varias entidades relacionadas, como participantes, experiencias, sesiones y reservas. También me interesa que permita definir tablas, gestionar migraciones y trabajar con transacciones.»
- Palabras del usuario (2026-11-09): «Consideré usar SQL directo con pg para aprender más SQL, Kysely por su tipado y Prisma por su facilidad de uso. Sin embargo, prefiero Drizzle porque ofrece un equilibrio entre control, aprendizaje y organización.»
- Palabras del usuario (2026-11-09): «Entiendo que Drizzle no garantiza por sí solo que las plazas no se vendan dos veces. La futura API deberá definir correctamente las transacciones, el bloqueo o actualización de disponibilidad y el vencimiento de las retenciones.»

Alternativas consideradas y descartadas:

- A — SQL directo con `pg`: máximo control y aprendizaje de SQL; sin tipos automáticos ni migraciones, y con más código repetitivo.
- B — Kysely: *query builder* tipado y cercano a SQL; obliga a mantener los tipos de la base de datos y dispone de menos material didáctico.
- C — Prisma: popular y con migraciones automáticas; aleja de SQL. La observación de que `SELECT ... FOR UPDATE` queda fuera de su API habitual procede de la presentación de alternativas y no se verificó en la documentación.

**Decisión confirmada por el usuario (2026-11-10) — TD-05: protección de la disponibilidad**

- Palabras del usuario (2026-11-10): «Para la decisión técnica TD-05, elijo la alternativa B: disponibilidad calculada a partir del cupo de cada sesión, las reservas confirmadas y las retenciones vigentes, utilizando un bloqueo breve de la sesión durante las operaciones que modifican su disponibilidad.»
- Palabras del usuario (2026-11-10): «La elijo porque prefiero mantener una única fuente de verdad y evitar que un contador adicional de plazas disponibles pueda desincronizarse cuando ocurran cancelaciones, pagos fallidos o vencimientos de retenciones.»
- Palabras del usuario (2026-11-10): «Consideré la opción A por su simplicidad y rapidez de consulta, pero requiere mantener actualizado el contador en todos los procesos. También consideré la opción C por sus garantías de concurrencia, aunque implica gestionar reintentos de transacciones que considero más complejos para esta etapa del proyecto.»
- Palabras del usuario (2026-11-10): «Entiendo que las consultas de disponibilidad pueden ser más costosas y que necesitaremos comprobar su rendimiento. También entiendo que el bloqueo de la sesión debe durar solamente lo necesario para consultar y registrar la operación, nunca los diez minutos del pago.»
- Palabras del usuario (2026-11-10): «Quiero que todas las operaciones que cambien la ocupación o el cupo de una sesión respeten la misma estrategia transaccional, incluidos los cambios realizados por organizadores.»
- Palabras del usuario (2026-11-10): «Antes de registrar TD-05, comprueba con documentación oficial si Drizzle permite ejecutar SELECT FOR UPDATE en PostgreSQL dentro de una transacción, directamente o mediante SQL parametrizado. Si no puedes comprobarlo, deja explícita esa dependencia como pendiente, sin afirmar que está resuelta.»

Resultado de la comprobación solicitada: la API `.for('update')` para PostgreSQL está documentada en el changelog oficial de drizzle-orm; su uso dentro de una transacción y la vía de SQL parametrizado en PostgreSQL **quedan pendientes de confirmar** (ver evidencia del 2026-11-10).

Alternativas consideradas y descartadas:

- A — Contador de plazas libres con descuento atómico condicional: simple y con consultas rápidas, pero es un dato duplicado que debe mantenerse actualizado en todos los procesos y puede desincronizarse.
- C — Cálculo con transacciones `SERIALIZABLE` y reintentos: buenas garantías de concurrencia, pero exige detectar fallos de serialización y gestionar reintentos, más complejos para esta etapa del proyecto.

**Decisión confirmada por el usuario (2026-11-10) — TD-06: modo de React Router**

- Palabras del usuario (2026-11-10): «Para la decisión técnica TD-06, elijo la alternativa A: React Router en modo declarativo.»
- Palabras del usuario (2026-11-10): «La razón principal es que la consigna oficial del Avance 3 exige expresamente este modo y establece que no debemos introducir loaders, actions ni utilizar React Router como framework.»
- Palabras del usuario (2026-11-10): «También me parece adecuado para MODO porque quiero mantener una separación clara de responsabilidades: React Router administrará las rutas y la navegación entre las pantallas, mientras que TanStack Query se encargará de consultar y sincronizar los datos de la futura API.»
- Palabras del usuario (2026-11-10): «Consideré el modo de datos y el modo framework, pero ambos añaden mecanismos y complejidad que no necesitamos para esta entrega y que no corresponden al enfoque solicitado.»
- Palabras del usuario (2026-11-10): «Para las pantallas que requieren una sesión iniciada, correo verificado o permisos de organizador, plantearemos controles de acceso desde los componentes de React. Entiendo que esos controles son de interfaz y que la futura API deberá verificar los permisos de manera independiente.»

Motivo de la elección (en palabras del usuario): la consigna oficial del Avance 3 exige expresamente el modo declarativo, sin *loaders*, *actions* ni uso como framework.

Alternativas consideradas y descartadas:

- B — Modo de datos (`createBrowserRouter` y `RouterProvider`): añade *loaders*, *actions*, estados de carga y errores por ruta; no corresponde a la consigna del Avance 3 (según el usuario) y duplicaría con TanStack Query el mecanismo de obtención de datos.
- C — Modo framework (plugin de Vite, rutas basadas en archivos y generación de tipos): no corresponde a la consigna del Avance 3 (según el usuario), añade mecanismos innecesarios para esta entrega, sustituye la entrada de la plantilla y se acerca a la alternativa D descartada en TD-01.

**Decisión confirmada por el usuario (2026-11-10) — TD-07: reparto de estado en el frontend**

- Palabras del usuario (2026-11-10): «elijo la alternativa C: TanStack Query para los datos remotos, React Router para los filtros del catálogo mediante parámetros de URL y Zustand para el estado compartido del cliente durante el flujo de reserva.» *(La parte relativa a Zustand en el flujo de reserva: sustituido por TD-12.)*
- Palabras del usuario (2026-11-10): «quiero que el catálogo de MODO permita compartir búsquedas y conservar los filtros al utilizar la navegación del navegador. Por ejemplo, un visitante podría filtrar experiencias gastronómicas en Cumbayá y compartir esa búsqueda con otra persona.»
- Palabras del usuario (2026-11-10): «No quiero duplicar esos datos en Zustand.»
- Palabras del usuario (2026-11-10): «Los valores y errores de formularios corresponderán a Mantine Form.»
- Palabras del usuario (2026-11-10): «Consideré la alternativa A por su simplicidad, pero prefiero que los filtros se reflejen en la URL. Descarto la B porque copiar la información del participante en Zustand podría provocar datos desactualizados, especialmente después de verificar el correo o cambiar sus permisos.»
- Palabras del usuario (2026-11-10): «los parámetros de URL necesitarán validación y que el borrador en Zustand no garantiza persistencia tras recargar la página. Tampoco debe utilizarse el reloj del navegador como autoridad para el vencimiento de una retención.» *(La mención al borrador en Zustand: sustituido por TD-12.)*

Motivo de la elección (en palabras del usuario): que el catálogo permita compartir búsquedas y conservar los filtros con la navegación del navegador (botón Atrás), por ejemplo, al filtrar experiencias gastronómicas en Cumbayá y compartir esa búsqueda, sin duplicar en Zustand los datos de la API.

Reparto resultante (detallado en «TD-07 — Reparto de estado en el frontend»):

- TanStack Query: datos de la API (experiencias, sesiones, disponibilidad, reservas y participante autenticado), sin duplicarlos en Zustand.
- URL mediante `useSearchParams`: filtros, búsqueda y orden del catálogo (CU-01).
- Zustand: borrador temporal de reserva (sesión elegida, plazas y paso), solo si se comparte entre componentes. *(Sustituido por TD-12: Zustand solo guarda el aviso de acceso activo.)*
- Mantine Form: valores y errores de los formularios.
- La cuenta atrás de la retención (RF2-08) parte de la hora de vencimiento de la API.

Consecuencias reconocidas por el usuario: los parámetros de URL requieren validación (Zod, pendiente de su propia decisión técnica); el borrador en Zustand no persiste tras recargar (el middleware `persist` es opcional y no está decidido) *(sustituido por TD-12)*; el reloj del navegador no es la autoridad del vencimiento de la retención.

Nota (2026-11-10): TD-12 sustituye la responsabilidad provisional de Zustand registrada en TD-07. Zustand guarda únicamente el aviso de acceso activo, sin `persist`; la selección de sesión y plazas queda fuera de Zustand y se administra con Mantine Form (apartado 24, confirmado por el usuario el 2026-11-10).

Limitación de versión: el usuario indicó una «versión 8.3.1» exigida por la cohorte. *(Corregido en TD-08: la versión 8.3.1 corresponde a React Router.)* Context7 solo indexa React Router hasta 7.13.0 y Zustand hasta v5.0.14. No se afirma compatibilidad con las versiones exactas exigidas; queda como verificación pendiente (pregunta abierta 13).

Alternativas consideradas y descartadas:

- A — Alternativa más simple, sin reflejar los filtros del catálogo en la URL: descartada porque el usuario prefiere que los filtros se reflejen en la URL para compartir búsquedas y conservarlas con la navegación del navegador.
- B — Copiar en Zustand la información del participante: descartada porque, según el usuario, podría provocar datos desactualizados, especialmente después de verificar el correo o cambiar sus permisos.

**Decisión confirmada por el usuario (2026-11-10) — TD-08: validación de formularios**

- Palabras del usuario (2026-11-10): «elijo la alternativa A: utilizar esquemas Zod en el frontend conectados a Mantine Form, mientras que la futura API Express realizará sus propias validaciones.»
- Palabras del usuario (2026-11-10): «quiero mantener una estructura sencilla y comprensible para esta fase del bootcamp, sin introducir todavía un monorepo o un paquete compartido entre frontend y backend.»
- Palabras del usuario (2026-11-10): «Zod servirá para expresar las reglas de validación de formularios como el registro y el teléfono obligatorio durante la primera reserva. Mantine Form administrará los valores, los errores y el envío del formulario, utilizando el schema de Zod.»
- Palabras del usuario (2026-11-10): «Consideré la alternativa B porque permitiría compartir reglas entre frontend y API, pero requiere decisiones adicionales sobre la estructura del repositorio. Podría evaluarse posteriormente. Descarto la opción C porque la consigna exige utilizar Zod junto con Mantine Form.»
- Palabras del usuario (2026-11-10): «validar en el frontend no garantiza la seguridad de los datos y que la futura API deberá volver a comprobar las solicitudes. No debemos inventar requisitos para contraseñas o teléfonos que todavía no estén aprobados.»
- Palabras del usuario (2026-11-10): «La misma consigna exige imports desde zod/v4 y el schemaResolver integrado de @mantine/form. No debemos añadir mantine-form-zod-resolver.»

Motivo de la elección (en palabras del usuario): mantener una estructura sencilla y comprensible para esta fase del bootcamp, sin monorepo ni paquete compartido entre frontend y backend.

Resultado (detallado en «TD-08 — Validación de formularios»):

- Esquemas Zod en el frontend, importados desde `zod/v4`, para el registro (CU-02) y el teléfono obligatorio en la primera reserva (CU-05, CU-06).
- Mantine Form gestiona los valores, los errores y el envío con el `schemaResolver` integrado de `@mantine/form`; no se usa `mantine-form-zod-resolver`.
- La futura API Express valida de nuevo cada solicitud; la validación del frontend no es seguridad.
- Los requisitos de la contraseña y el formato del teléfono no se inventan: quedan pendientes (pregunta abierta 14).
- Versiones exigidas por la consigna 03-diseno-tecnico.pdf, sección 5 (según el usuario): React Router 8.3.1, Zustand 5.0.15, Zod 4.4.3, Mantine Form 9.4.1 y Mantine Core 9.4.1; registradas como exigidas y no instaladas. Corrección: la versión 8.3.1 corresponde a React Router, no a Mantine (ver pregunta abierta 13).

Alternativas consideradas:

- B — Esquemas Zod compartidos entre frontend y API: considerada; permitiría compartir reglas, pero requiere decisiones adicionales sobre la estructura del repositorio. Podría evaluarse más adelante.
- C — Mantine Form sin Zod (validación propia de Mantine Form): descartada porque la consigna exige utilizar Zod junto con Mantine Form (según el usuario).

**Decisión confirmada por el usuario (2026-11-10) — TD-09: uso de Mantine Modal**

- Palabras del usuario (2026-11-10): «elijo la alternativa A: utilizar Mantine Modal para confirmaciones y avisos breves, mientras que el proceso completo de reserva se realizará en páginas independientes.»
- Palabras del usuario (2026-11-10): «quiero que MODO mantenga una navegación clara y que las acciones importantes, como reservar y pagar, tengan su propia pantalla y URL. Esto encaja con React Router en modo declarativo y evita que el proceso dependa de mantener abierto un modal.»
- Palabras del usuario (2026-11-10): «Utilizaría Mantine Modal para confirmar la cancelación de una reserva, mostrar avisos de inicio de sesión o verificación del correo y solicitar confirmación ante cambios importantes del organizador, siempre respetando las reglas funcionales aprobadas.»
- Palabras del usuario (2026-11-10): «En la cancelación, el modal mostrará las consecuencias de la acción antes de confirmarla. Si el participante cierra el modal o pulsa volver, la reserva permanece intacta. Si confirma, la futura API deberá verificar nuevamente el plazo y las condiciones antes de cancelar. Durante la solicitud se evitarán envíos duplicados; ante un error, se mostrará una respuesta clara sin asumir que la reserva fue cancelada. Después de una confirmación exitosa, se actualizarán los datos remotos correspondientes.»
- Palabras del usuario (2026-11-10): «Consideré la alternativa B porque permite realizar la reserva sin abandonar el detalle de la experiencia, pero el flujo de pago y la retención de 10 minutos hacen más apropiada una página propia. Descarto la opción C porque introduce @mantine/modals, una dependencia adicional que no necesitamos para cumplir la consigna.»

Motivo de la elección (en palabras del usuario): mantener una navegación clara en la que las acciones importantes, como reservar y pagar, tengan su propia pantalla y URL, coherente con React Router en modo declarativo (TD-06) y sin depender de mantener abierto un modal.

Resultado (detallado en «TD-09 — Uso de Mantine Modal»):

- `Modal` de `@mantine/core` solo para confirmaciones y avisos breves: confirmar la cancelación (CU-07), avisos de inicio de sesión (CU-01 A6) y de verificación del correo (CU-02 A1) y confirmaciones de cambios importantes del organizador (CU-04).
- El flujo de reserva y pago se realiza en páginas propias con URL (TD-06).
- El modal de cancelación muestra las consecuencias antes de confirmar; cerrar o volver deja la reserva intacta; la API reverifica el plazo y las condiciones; se evitan envíos duplicados; ante un error no se asume la cancelación; tras el éxito se actualizan los datos remotos (TanStack Query, TD-07).
- No se usa `@mantine/modals`. ~~El uso de `@mantine/hooks` queda pendiente (pregunta abierta 15).~~ *(Actualización, corregida el 2026-11-10: pregunta abierta 15 resuelta por elección técnica del usuario, no por la consigna. La consigna exige Mantine Core con `Modal` y no obliga a usar `@mantine/hooks` ni `useDisclosure`; el proyecto elige `useState` de React para los modales locales. El aviso de acceso compartido se controla mediante Zustand según TD-12.)*

Alternativas consideradas:

- B — Flujo de reserva dentro de un modal sobre el detalle de la experiencia: considerada porque permite reservar sin abandonar el detalle, pero el flujo de pago y la retención de 10 minutos (RF2-08) requieren una página propia (según el usuario).
- C — Gestor de modales `@mantine/modals`: descartada porque es una dependencia adicional no necesaria para cumplir la consigna (según el usuario).

**Decisión confirmada por el usuario (2026-11-10) — TD-10: mapa de rutas por zonas**

- Palabras del usuario (2026-11-10): «elijo la alternativa C: organizar las rutas de MODO por zonas públicas, de participante y de organizador, utilizando layouts compartidos y rutas anidadas cuando aporten claridad.»
- Palabras del usuario (2026-11-10): «quiero mantener una navegación organizada según las responsabilidades de los usuarios y evitar repetir los mismos controles de acceso en cada pantalla.»
- Palabras del usuario (2026-11-10): «También quiero conservar URLs propias para las etapas importantes de la reserva y el pago. Así, cuando exista la API, el participante podrá recuperar una reserva o retención vigente después de recargar la página, consultando su estado real en el servidor en lugar de depender únicamente de Zustand.» *(La mención a Zustand para el estado de la reserva: sustituido por TD-12.)*
- Palabras del usuario (2026-11-10): «Consideré la alternativa A por su sencillez, pero prefiero centralizar los controles de acceso de cada zona. Descarto la B porque guardar todo el flujo en una sola ruta con pasos internos haría más difícil recuperar una operación de pago después de una recarga o redirección.»
- Palabras del usuario (2026-11-10): «La zona pública incluirá el catálogo, el detalle de experiencias y las pantallas de acceso. La zona del participante incluirá sus reservas y los pasos de pago. La zona del organizador incluirá la publicación y administración de sus experiencias.»
- Palabras del usuario (2026-11-10): «Los controles de acceso de React Router serán solamente controles de interfaz; la futura API deberá comprobar la identidad, los permisos y la propiedad de cada recurso.»
- Palabras del usuario (2026-11-10): «el correo verificado es obligatorio antes de reservar, pero no debemos inventar que todas las pantallas de la cuenta requieren verificación. Asimismo, un participante puede ser organizador sin un proceso de aprobación manual.»

Motivo de la elección (en palabras del usuario): mantener una navegación organizada según las responsabilidades de los usuarios, sin repetir los mismos controles de acceso en cada pantalla, y conservar URL propias para las etapas importantes de la reserva y el pago.

Resultado (detallado en «TD-10 — Mapa de rutas por zonas»):

- Zona pública (catálogo, detalle de experiencias y pantallas de acceso), zona del participante (sus reservas y los pasos de pago) y zona del organizador (publicación y administración de sus experiencias), cada una con un layout compartido y rutas anidadas cuando aporten claridad.
- Los controles de acceso de interfaz se centralizan en la ruta padre de cada zona; la API comprueba la identidad, los permisos y la propiedad de cada recurso.
- URL propias con un identificador del servidor para las etapas de reserva y pago, que permiten recuperar la reserva o la retención tras recargar o volver de una redirección (TanStack Query, TD-07).
- El correo verificado solo es obligatorio antes de reservar (CU-02 R5, RF2-06); el perfil de organizador se activa sin aprobación manual (CU-03 R1, CA1).
- Los nombres de ruta son ilustrativos, aceptados provisionalmente por el usuario (2026-11-10) sin ser contratos definitivos; su idioma y sus nombres definitivos quedan pendientes (pregunta abierta 12).

Alternativas consideradas:

- A — Alternativa más sencilla, sin zonas con controles de acceso centralizados: considerada por su sencillez; el usuario prefiere centralizar los controles de acceso de cada zona.
- B — Todo el flujo de reserva y pago en una sola ruta con pasos internos: descartada porque, según el usuario, haría más difícil recuperar una operación de pago después de una recarga o redirección.

**Decisión confirmada por el usuario (2026-11-10) — TD-11: sesión en el servidor con cookie httpOnly**

- Palabras del usuario (2026-11-10): «elijo la alternativa A: sesiones administradas por la futura API Express mediante cookies httpOnly.»
- Palabras del usuario (2026-11-10): «MODO necesita controlar de forma segura la identidad y los permisos de participantes y organizadores, especialmente durante las reservas, cancelaciones y administración de experiencias.»
- Palabras del usuario (2026-11-10): «Prefiero que el servidor mantenga la sesión y que el navegador no tenga que almacenar ni administrar tokens de acceso mediante JavaScript.»
- Palabras del usuario (2026-11-10): «Esta alternativa también encaja con TD-07, porque TanStack Query podrá consultar la información actual del usuario desde la API, sin duplicar sus datos en Zustand.»
- Palabras del usuario (2026-11-10): «Consideré la alternativa B porque los JWT pueden resultar útiles para varios tipos de clientes, pero no necesitamos introducir ahora la complejidad de renovación y revocación de tokens. Descarto la opción C porque almacenar JWT en localStorage aumenta el riesgo de exposición ante una vulnerabilidad XSS.»
- Palabras del usuario (2026-11-10): «las cookies httpOnly no eliminan por sí solas los riesgos de seguridad. La futura API deberá aplicar protección CSRF, una configuración adecuada de SameSite y Secure, validación de permisos y un mecanismo seguro de cierre de sesión.»
- Palabras del usuario (2026-11-10): «La duración de las sesiones, el mecanismo de almacenamiento, el tratamiento de contraseñas y la configuración definitiva de dominios quedan pendientes de decisiones posteriores.»

Motivo de la elección (en palabras del usuario): controlar de forma segura la identidad y los permisos de participantes y organizadores, con el servidor manteniendo la sesión y sin que el navegador almacene ni administre tokens de acceso mediante JavaScript; encaja con TD-07.

Resultado (detallado en «TD-11 — Sesión en el servidor con cookie httpOnly»):

- La futura API Express mantiene la sesión; el navegador solo recibe una cookie httpOnly; el frontend no almacena ni administra tokens.
- TanStack Query obtiene el usuario actual desde la API (TD-07), sin duplicarlo en Zustand.
- La sesión iniciada tras el registro (RF2-06) la crea y la mantiene la API; no se añaden reglas funcionales.
- Obligaciones de la futura API: protección CSRF, configuración adecuada de SameSite y Secure, validación de permisos y de la propiedad de cada recurso, y cierre de sesión seguro.
- express-session queda documentado solo como candidato, **no adoptado**. Quedan pendientes la duración de las sesiones, el mecanismo y almacén de sesiones, el tratamiento de contraseñas, la configuración definitiva de dominios y el mecanismo concreto de CSRF (pregunta abierta 16).

Alternativas consideradas:

- B — Tokens JWT de acceso y renovación: considerada porque los JWT pueden resultar útiles para varios tipos de clientes; no se necesita ahora la complejidad de renovación y revocación de tokens (según el usuario).
- C — JWT almacenado en `localStorage`: descartada porque aumenta el riesgo de exposición ante una vulnerabilidad XSS (según el usuario).

**Decisión confirmada por el usuario (2026-11-10) — TD-12: Zustand para los avisos de acceso**

- Elección del usuario (2026-11-10): alternativa B. Zustand guarda únicamente el aviso de acceso activo (iniciar sesión o verificar el correo).

Motivo de la elección (resumen de las razones del usuario; no son citas literales):

- Zustand tiene una responsabilidad concreta, sin duplicar los datos de la API, la URL ni los formularios.
- Varios componentes solicitan un mismo `Modal`.

Resultado (detallado en «TD-12 — Zustand para los avisos de acceso»):

- Zustand guarda solo `aviso: 'iniciar-sesion' | 'verificar-correo' | null`, con las acciones `mostrarAviso(tipo)` y `cerrarAviso()`; consumidores ilustrativos: `ReserveButton` y `AccessNoticeModal` (un único `Modal` de `@mantine/core` en un layout compartido).
- Sin `persist`: al recargar, el aviso se cierra y el usuario puede repetir la acción.
- Zustand no guarda credenciales, permisos, datos del usuario, sesión ni verificación del correo (TanStack Query y la API; TD-07, TD-11).
- La selección de sesión y plazas queda fuera de Zustand; su representación (estado local o URL) se precisará en la documentación de apartados. *(Precisado en el apartado 24 y confirmado por el usuario el 2026-11-10: Mantine Form del formulario de reserva; `experienciaId` en la URL.)*
- Los modales locales, como el de cancelación de CU-07, siguen controlados con `useState` (TD-09; pregunta abierta 15, resuelta por elección técnica, no por la consigna).
- TD-12 sustituye la responsabilidad provisional de Zustand registrada en TD-07 (borrador temporal de reserva).
- Fuera de alcance: abrir el aviso desde fuera de React (depende del contrato de errores, pregunta abierta 9, y de verificar `getState` en Zustand 5.0.15, pregunta abierta 13) y la vuelta a la experiencia tras registrarse desde un intento de reserva (punto funcional abierto de CU-02; propuesta pendiente de decisión funcional, confirmado por el usuario el 2026-11-10).

Alternativas consideradas:

- A — Zustand para la selección de sesión y plazas del flujo de reserva: considerada; según el usuario, esa selección podría representarse en la URL, por lo que un estado global es difícil de justificar (precisado en el apartado 24).
- C — Dos almacenes de Zustand: descartada porque, según el usuario, añaden complejidad sin necesidad.

**Confirmaciones del usuario tras la revisión del borrador (2026-11-10)**

1. Palabras del usuario (2026-11-10): «P17: durante la futura construcción utilizaremos datos simulados temporales para desarrollar primero la interfaz, dejando claro que no son datos remotos reales. Cuando exista la API Express, integraremos las consultas reales mediante TanStack Query. No presentaremos una consulta simulada como cumplimiento o prueba de la integración remota.»
   - Se refleja en: apartado 25 (fuente de datos durante el desarrollo), apartado 28 (límites), apartado 29 (etapas E2 y E3, dependencias del backend y nota de la fuente de datos), alternativa A de TD-01 (nota) y pregunta abierta 17.
2. Palabras del usuario (2026-11-10): «Reserva: el identificador de experiencia procede de la URL. La fecha o sesión elegida, el número de plazas y el teléfono obligatorio se administrarán mediante Mantine Form mientras se prepara la reserva. La API validará de nuevo la disponibilidad. Tras crear la retención, la etapa de pago utilizará el identificador devuelto por el servidor.»
   - Se refleja en: TD-07 (tabla y reglas complementarias), TD-10 (inicio de la reserva), TD-12 (reglas y resultado), apartado 24 y apartado 27. La ubicación de la ruta de reserva sigue sin decidir (TD-10).
3. Palabras del usuario (2026-11-10): «La vuelta automática a la experiencia después del registro no queda aprobada. Debe mantenerse como propuesta pendiente de decisión funcional.»
   - Se refleja en: TD-10 (reglas de acceso), TD-12 (fuera de alcance y resultado), apartados 23, 26, 27 y 30. La propuesta de destino tras iniciar sesión (apartado 27) sigue como propuesta técnica revisable.
4. Palabras del usuario (2026-11-10): «Acepto provisionalmente los nombres ilustrativos de componentes, carpetas, rutas y mensajes de formulario, sin convertirlos en contratos definitivos.»
   - Se refleja en: introducciones de los apartados 21-24 y 25-27, apartados 22, 23 y 26, resultado de TD-10 y pregunta abierta 12.
5. Palabras del usuario (2026-11-10): «TD-12 sustituye el uso provisional anterior de Zustand para el borrador de reserva. Conserva la trazabilidad histórica, pero evita que el diseño vigente tenga responsabilidades contradictorias.»
   - Se refleja en: TD-07 (tabla), registros de las decisiones TD-07 y TD-10 (texto conservado y marcado «sustituido por TD-12») y TD-12.
6. Palabras del usuario (2026-11-10): «Corrige la atribución de que la consigna exige específicamente useState para controlar Modal. La consigna exige Mantine Core con Modal; useState es nuestra elección técnica para los modales locales. El aviso de acceso compartido sigue controlado mediante Zustand según TD-12.»
   - Se refleja en: «Source and current evidence» (evidencia de TD-09 y restricciones de la consigna), TD-09, TD-12, apartados 21, 24 y 26, «Dependencies, rollout, risks, and validation», registros de las decisiones TD-09 y TD-12 y pregunta abierta 15.

### Preguntas abiertas

Preguntas abiertas y resueltas; las resueltas se indican como tales:

1. ~~Framework/runtime de la API.~~ Resuelta por TD-02 (Express 5.x sobre Node.js y TypeScript).
2. ~~Motor de base de datos relacional.~~ Resuelta por TD-03 (PostgreSQL; versión mayor pendiente).
3. Modelado y ~~acceso a datos~~. El acceso a datos queda resuelto por TD-04 (Drizzle ORM con drizzle-kit; versiones exactas y driver de PostgreSQL pendientes); el modelado de datos sigue abierto. Pendiente (TD-04): verificar el soporte de bloqueo de filas (`SELECT ... FOR UPDATE`) en Drizzle, mediante su API o con SQL explícito dentro de la transacción. *(Actualización 2026-11-10: `.for('update')` está documentado en el changelog oficial de drizzle-orm para PostgreSQL; queda pendiente confirmar su uso dentro de una transacción al implementar, y la vía de SQL parametrizado en PostgreSQL no está verificada.)*
4. Autenticación y sesiones. **Mecanismo resuelto por TD-11:** sesiones administradas por la futura API Express mediante cookies httpOnly. Los detalles siguen abiertos en la pregunta abierta 16.
5. Envío de correos de verificación.
6. Proveedor/pasarela de pago y recepción de confirmaciones.
7. Mecanismo de expiración de la retención de 10 minutos. Nota (TD-03): no puede ser una transacción ni un bloqueo abierto durante el pago.
8. Ejecución del inicio de reembolsos.
9. Comunicación frontend-API (contratos). Incluye (TD-06) la configuración de TanStack Query. ~~Reparto de responsabilidades entre TanStack Query y Zustand.~~ Resuelto por TD-07: TanStack Query gestiona los datos de la API sin duplicarlos en Zustand; la URL (`useSearchParams`) gestiona los filtros, la búsqueda y el orden del catálogo; ~~Zustand solo gestiona el borrador temporal de reserva si se comparte entre componentes~~ Zustand solo gestiona el aviso de acceso activo (TD-12); Mantine Form gestiona los valores y errores de los formularios. Siguen pendientes la configuración de TanStack Query (p. ej., `staleTime`), los nombres de los parámetros de URL y su validación con Zod (decisión técnica propia; TD-08 cubre solo los formularios). ~~El uso o no del middleware `persist` de Zustand.~~ *(Actualización TD-12: Zustand solo guarda el aviso de acceso activo, sin `persist`; la selección de sesión y plazas queda fuera de Zustand. Sigue pendiente el contrato de errores, del que depende abrir el aviso desde fuera de React.)*
10. Alojamiento y despliegue.
11. Estrategia de pruebas. Incluye comprobar el rendimiento de las consultas de disponibilidad calculada (TD-05). *(Actualización: la estrategia prevista y sus límites están en el apartado 28; siguen sin decidir las herramientas de componentes, integración, E2E y de la API. No se ha ejecutado ninguna prueba.)*
12. Mapa de rutas y pantallas del frontend (TD-06). Según TD-09, el flujo de reserva y pago tiene rutas propias (cada paso importante, como reservar y pagar, con su propia pantalla y URL); ~~los nombres y la estructura de esas rutas siguen pendientes~~. **Estructura resuelta por TD-10:** zonas pública, de participante y de organizador con layouts compartidos y rutas anidadas, y URL propias con identificador del servidor para las etapas de reserva y pago. Siguen pendientes: el idioma y los nombres definitivos de las rutas (los de TD-10 son ilustrativos, aceptados provisionalmente por el usuario el 2026-11-10 sin ser contratos definitivos), la URL de retorno del proveedor de pago (relacionada con la pregunta abierta 6) y el formato del enlace de verificación del correo (relacionado con la pregunta abierta 5). También quedan para la implementación la ubicación exacta de la ruta de inicio de la reserva y la ruta de activación del perfil de organizador.
13. Verificación de las versiones exactas exigidas (TD-07, corregida en TD-08). La versión 8.3.1 corresponde a React Router (consigna 03-diseno-tecnico.pdf, sección 5, según el usuario). Queda pendiente verificar que la API usada (modo declarativo, `BrowserRouter`, `useSearchParams`) se comporta igual en React Router 8.3.1 (la evidencia actual corresponde a 7.13.0), y verificar las APIs usadas con Zustand 5.0.15 (evidencia: v5.0.14), Zod 4.4.3 (evidencia: v4.3.6) y Mantine Form y Mantine Core 9.4.1 (evidencia: 9.0.0). No se afirma compatibilidad. Ampliación (TD-10): verificar también en React Router 8.3.1 las rutas anidadas y las rutas de layout sin `path`, `Outlet`, `Navigate` (`to`, `replace`, `state`, `relative`), las opciones `replace` y `state` de `useNavigate`, la prop `state` de `Link` y la ruta comodín (`path="*"`), que tampoco quedó verificada en la documentación de 7.13.0. Ampliación (TD-12): verificar también TanStack Query 5.102.8 (evidencia: v5.90.3) y, en Zustand 5.0.15, la API usada por TD-12 (`create<T>()(...)` y los selectores de un solo valor; evidencia: v5.0.14, la 5.0.15 no está indexada en Context7).
14. Requisitos de la contraseña (pregunta abierta de CU-02) y formato del teléfono (no definido en las fuentes) para los esquemas de TD-08. No se inventan; quedan pendientes de aprobación.
15. ~~Uso de `@mantine/hooks` (TD-09).~~ Resuelta por elección técnica del usuario, no por la consigna (corregido el 2026-11-10): la consigna exige Mantine Core con `Modal` y no obliga a usar `@mantine/hooks` ni `useDisclosure`; el proyecto elige `useState` de React para los modales locales; el aviso de acceso compartido se controla mediante Zustand (TD-12). Contexto anterior: el README de `@mantine/core` 9.0.0 lo instala junto con `@mantine/core` y `useDisclosure` proviene de ese paquete, pero no figura en la lista de versiones exigidas por la consigna. No se instala nada.
16. Detalles de la sesión (TD-11). Sin decidir: la duración de las sesiones; el mecanismo y el almacén de sesiones (express-session es solo un candidato documentado, no adoptado; su MemoryStore por defecto no es apto para producción); el tratamiento de contraseñas (relacionado con la pregunta abierta 14); la configuración definitiva de dominios del frontend y de la API y su relación con SameSite, con Secure detrás de un proxy y con el proxy de desarrollo de Vite (relacionada con la pregunta abierta 10); y el mecanismo concreto de protección CSRF. Tampoco se verificó la regeneración de la sesión al iniciarla. No se inventan valores por defecto.
17. ~~Fuente de datos para desarrollar el frontend mientras la API no existe (apartado 29): esperar a la API o usar datos simulados temporales. Pendiente de decisión del usuario.~~ **Resuelta por el usuario (2026-11-10):** datos simulados temporales para desarrollar primero la interfaz, identificados como tales y sin valor como evidencia de la integración remota; cuando exista la API Express, las consultas reales se integran mediante TanStack Query. El mecanismo de simulación queda para la implementación, sin `useEffect` para obtener datos. Desbloquea el desarrollo de la interfaz de E2 en adelante; la integración real sigue bloqueada hasta que exista la API (apartado 29). No contradice TD-01.
