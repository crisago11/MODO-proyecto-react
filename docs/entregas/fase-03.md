# MODO — Fase 3 · Diseño técnico

**Índice**

1. [Identificación del proyecto](#1-identificación-del-proyecto)
2. [Problema y contexto](#2-problema-y-contexto)
3. [Usuarios y objetivos](#3-usuarios-y-objetivos)
4. [Descripción general de la solución](#4-descripción-general-de-la-solución)
5. [Alcance inicial y exclusiones](#5-alcance-inicial-y-exclusiones)
6. [Secciones o pantallas previstas](#6-secciones-o-pantallas-previstas)
7. [Casos de uso de la versión inicial](#7-casos-de-uso-de-la-versión-inicial)
8. [Decisiones y preguntas pendientes](#8-decisiones-y-preguntas-pendientes)
9. [Decisiones propias y uso de IA](#9-decisiones-propias-y-uso-de-ia)
10. [Fuentes y comprobaciones de esta fase](#10-fuentes-y-comprobaciones-de-esta-fase)
11. [Procesos detallados](#11-procesos-detallados)
12. [Reglas del negocio](#12-reglas-del-negocio)
13. [Datos necesarios y su significado](#13-datos-necesarios-y-su-significado)
14. [Validaciones, permisos y restricciones](#14-validaciones-permisos-y-restricciones)
15. [Estados y cambios permitidos](#15-estados-y-cambios-permitidos)
16. [Cálculos y ejemplos](#16-cálculos-y-ejemplos)
17. [Alternativas, errores y recuperación](#17-alternativas-errores-y-recuperación)
18. [Criterios de aceptación y ejemplos comprobables](#18-criterios-de-aceptación-y-ejemplos-comprobables)
19. [Relación entre casos, procesos, reglas y criterios](#19-relación-entre-casos-procesos-reglas-y-criterios)
20. [Cambios respecto de la primera entrega](#20-cambios-respecto-de-la-primera-entrega)
21. [Stack y matriz de herramientas obligatorias](#21-stack-y-matriz-de-herramientas-obligatorias)
22. [Arquitectura y responsabilidades](#22-arquitectura-y-responsabilidades)
23. [Navegación con React Router](#23-navegación-con-react-router)
24. [Propiedad del estado y uso de Zustand](#24-propiedad-del-estado-y-uso-de-zustand)
25. [Datos, servicios y límites de integración](#25-datos-servicios-y-límites-de-integración)
26. [Formularios, Zod y Mantine Modal](#26-formularios-zod-y-mantine-modal)
27. [Recorridos técnicos y sincronización con TanStack Query](#27-recorridos-técnicos-y-sincronización-con-tanstack-query)
28. [Estrategia de verificación y límites de evidencia](#28-estrategia-de-verificación-y-límites-de-evidencia)
29. [Plan de construcción, dependencias y riesgos](#29-plan-de-construcción-dependencias-y-riesgos)
30. [Trazabilidad técnica y cambios respecto de la segunda entrega](#30-trazabilidad-técnica-y-cambios-respecto-de-la-segunda-entrega)

**Convenciones de identificadores.** CU-01 a CU-08 son los casos de uso aprobados en AHK; dentro de cada caso, R*n*, A*n*, F*n* y CA*n* son sus reglas, alternativas, fallos y criterios (CU-08 numera sus criterios como CA-08-*nn*). RF2-01 a RF2-18 son las reglas de la especificación funcional de Fase 2 (`fase-02-especificacion-funcional`, aprobada) y CA-F2-01 a CA-F2-89 sus criterios de aceptación. PR-01 a PR-08 son etiquetas documentales de proceso usadas solo en esta entrega; no sustituyen a los identificadores de AHK.

**Convenciones de la Fase 3.** TD-01 a TD-12 son las decisiones técnicas de `fase-03-especificacion-tecnica` (aprobada el 2026-11-10; resumen en 8.4). En los apartados 8.5 y 21 a 30, P1 a P17 son las preguntas técnicas de esa especificación (resumen en 8.5); no son las preguntas funcionales P1 a P17 de la Fase 2, que se conservan en 8.3. E0 a E8 son las etapas del plan de construcción (apartado 29).

---

## 1. Identificación del proyecto

| Campo | Valor |
|---|---|
| Producto | MODO |
| Autor | Santiago Roberto Chamorro Rodríguez |
| Curso | Bootcamp Full Stack — React Guide VI |
| Cohorte | CB PFSD4 VI Cohorte Frontend React |
| Entrega | Fase 3 · Diseño técnico |
| Fecha | 10 de noviembre de 2026 |
| Versión del documento | 3.0 |

Esta entrega es acumulativa: conserva la segunda entrega (`docs/entregas/fase-02.md`, versión 2.0, sin modificar) con sus apartados 1 a 20 y añade los apartados 21 a 30, derivados de la especificación técnica aprobada `fase-03-especificacion-tecnica`. Respecto de la Fase 2 solo cambian la identificación (apartado 1), las decisiones y preguntas técnicas (8.4 y 8.5), el bloque 9.3 y el apartado 10; los apartados 2 a 7 y 11 a 20 se conservan sin cambios.

## 2. Problema y contexto

*Redactado a partir de lo documentado en la Fase 1; contenido confirmado por el autor (2026-11-08).*

MODO es una plataforma para descubrir y reservar experiencias. Busca facilitar el descubrimiento y la reserva de experiencias dentro del Distrito Metropolitano de Quito y permitir que los organizadores publiquen y administren sus actividades.

MODO es un proyecto anterior, ubicado en otra carpeta, que ya cuenta con navegación visual pero todavía no tiene reservas funcionales. `proyecto-bootcamp` es un proyecto independiente que conserva la plantilla inicial de React; en la Fase 1 se realizó la definición funcional y en la Fase 2 se precisan los procesos y reglas del negocio. No se ha implementado ninguna funcionalidad de MODO.

**Ámbito geográfico (decisión 6):** MODO estará enfocado exclusivamente en experiencias dentro del Distrito Metropolitano de Quito, incluyendo Quito urbano, Cumbayá, Tumbaco, el Valle de Los Chillos y otros sectores metropolitanos. No se incluirán ciudades fuera de esta área (por ejemplo, Baños de Agua Santa).

*Esta sección describe la intención del producto según las decisiones documentadas. No se han realizado entrevistas, estudios de mercado ni investigaciones con usuarios.*

## 3. Usuarios y objetivos

| Actor | Descripción | Objetivos | Casos |
|---|---|---|---|
| Visitante | Persona sin sesión iniciada. | Explorar el catálogo, buscar y filtrar experiencias y consultar su detalle sin iniciar sesión. Crear una cuenta para poder reservar; al completar el registro queda con la sesión iniciada (RF2-06). | CU-01, CU-02 |
| Participante | Usuario registrado que reserva experiencias. | Iniciar sesión y verificar su correo antes de la primera reserva. Reservar una o varias plazas con pago presencial o en línea, conociendo antes el importe total en USD. Consultar sus reservas y cancelarlas según la política de MODO (24 horas, RF2-01). | CU-02, CU-05, CU-06, CU-07 |
| Organizador | Usuario registrado que activa su perfil de organizador desde su cuenta. Una misma persona puede ser participante y organizador. | Publicar experiencias dentro del Distrito Metropolitano de Quito. Administrar fechas, horarios, cupos y precios de sus experiencias sin afectar a las reservas existentes. **Nuevo en Fase 2:** consultar las reservas confirmadas de una sesión de sus experiencias y registrar como «Recibido» el pago presencial (CU-08, RF2-15). | CU-03, CU-04, CU-08 |

**Incorporación y efecto sobre el alcance.** El objetivo del organizador de registrar el pago presencial es nuevo. Ninguno de los siete casos de la Fase 1 lo cubría (CU-05 lo excluía), por lo que se creó y aprobó CU-08 el 2026-11-06. Es una modificación del alcance: añade una operación (consulta de reservas por sesión y registro del pago presencial) sin cambiar CU-01 a CU-07. No se añaden actores.

## 4. Descripción general de la solución

MODO conecta a tres actores a lo largo de un mismo recorrido. Todo empieza con el organizador: un usuario registrado activa su perfil de organizador desde su cuenta, sin aprobación manual, y publica una experiencia completa con categoría, ubicación dentro del Distrito Metropolitano de Quito, modalidad de pago (en línea o presencial) y al menos una fecha futura con horario, cupos y precio en USD; MODO no publica si dos sesiones tienen exactamente la misma fecha y horario (CU-03, RF2-05, RF2-13). A partir de ahí, el organizador mantiene sus fechas, horarios, cupos y precios, añadiendo, modificando o eliminando fechas sin alterar las sesiones ni las reservas ya existentes y sin duplicar sesiones (CU-04, RF2-02, RF2-04). Las fechas y horarios se interpretan en hora de Ecuador continental, America/Guayaquil (RF2-12).

Las experiencias publicadas con fechas futuras aparecen en el catálogo público, que el visitante puede recorrer sin iniciar sesión: busca por texto, combina filtros, cambia el orden y abre el detalle de cada experiencia, donde ve sus fechas, el precio de cada una en USD y su disponibilidad o la etiqueta «Agotado». Una experiencia solo se muestra como «Agotado» cuando ninguna de sus sesiones futuras tiene plazas, y una sesión deja de ser futura en su hora exacta de inicio (CU-01, RF2-07, RF2-16). Cuando quiere reservar, el visitante crea una cuenta con datos mínimos y queda con la sesión iniciada; no puede reservar hasta verificar su correo, que puede volver a solicitar (CU-02, RF2-06). Desde ese momento actúa como participante.

El participante elige una sesión y el número de plazas, aporta su teléfono si su cuenta aún no lo tiene y revisa un resumen con el importe total (precio por participante × plazas, en USD) y la política de cancelación de 24 horas (RF2-18, RF2-01). Puede reservar hasta antes de la hora exacta de inicio de la sesión (RF2-16). Según la modalidad que definió el organizador:

- **Pago presencial (CU-05):** la reserva se confirma automáticamente al comprobarse que hay plazas suficientes; el participante paga al llegar al lugar, antes de comenzar la actividad (RF2-03), y el organizador registra después ese pago como «Recibido» (CU-08, RF2-15).
- **Pago en línea (CU-06):** el participante paga con tarjeta de crédito o de débito, en USD (RF2-14, RF2-13). Las plazas quedan retenidas un máximo de 10 minutos; si el pago se completa dentro de ese tiempo, la reserva se confirma; si falla, se abandona o vence, las plazas se liberan (RF2-08). Un pago confirmado después de los 10 minutos no confirma la reserva y se reembolsa por completo (RF2-09).

Finalmente, el participante puede consultar sus reservas y cancelar una reserva completa si faltan 24 horas o más para su inicio (CU-07, RF2-01). Las plazas vuelven a estar disponibles. Si pagó en línea, recibe el reembolso del 100 % al mismo método de pago, y MODO inicia la solicitud en un máximo de 24 horas (RF2-10, RF2-11). Si la reserva era presencial, se cancela sin reembolso; si el pago figuraba como «Recibido», MODO conserva ese estado y su historial (RF2-17).

Las decisiones confirmadas se detallan en el apartado 8 y las reglas en el apartado 12.

## 5. Alcance inicial y exclusiones

### 5.1 Incluido en la primera versión

Los ocho casos de uso aprobados, descritos en el apartado 7:

- **CU-01:** explorar el catálogo y consultar el detalle de las experiencias sin iniciar sesión.
- **CU-02:** registrarse, verificar el correo antes de la primera reserva e iniciar sesión.
- **CU-03:** activar el perfil de organizador y publicar experiencias.
- **CU-04:** administrar fechas, horarios, cupos y precios de las experiencias propias.
- **CU-05:** reservar una o varias plazas con pago presencial.
- **CU-06:** reservar una o varias plazas con pago en línea.
- **CU-07:** cancelar una reserva completa según la política de MODO.
- **CU-08 (nuevo en Fase 2):** consultar las reservas confirmadas de una sesión propia y registrar como recibido el pago presencial.

### 5.2 Incluido, con reglas resueltas y pendientes

| Funcionalidad | Resuelto en Fase 2 | Qué sigue por definir | Origen |
|---|---|---|---|
| Pago en línea | Retención máxima de 10 minutos (RF2-08); pago confirmado fuera de plazo (RF2-09); tarjeta de crédito o de débito (RF2-14); moneda USD (RF2-13). | Implementación técnica del pago (fuera de esta fase). | CU-06 |
| Reembolsos | Plazo de cancelación de 24 horas (RF2-01, RF2-12); 100 % al método de pago original (RF2-10); MODO inicia la solicitud en un máximo de 24 horas (RF2-11). | Plazo de acreditación por la entidad financiera; qué ocurre si el método de pago original ya no está disponible. | CU-07 |
| Pago presencial | Momento del pago: al llegar, antes de la actividad (RF2-03); registro manual por el organizador (CU-08, RF2-15); cancelación con pago «Recibido» (RF2-17). | Qué ocurre si el participante no paga; gestión de inasistencias. | CU-05, CU-08 |
| Filtros del catálogo | Moneda USD en el filtro de rango de precios (RF2-13). | Clasificación definitiva de zonas y sectores o parroquias, lista de categorías, forma del filtro de rango de precios y qué días comprende «este fin de semana». | CU-01 |
| Límites de la reserva | Cierre a la hora exacta de inicio de la sesión, sin cierre anticipado (RF2-16); importe total = precio × plazas (RF2-18). | Límite máximo de plazas por reserva. | CU-05, CU-06 |

**Reclasificado:** la verificación del correo se mantiene incluida (CU-02), pero los requisitos de la contraseña y la caducidad y el formato del correo de verificación, que en la Fase 1 figuraban como «por definir», pasan a estar fuera del alcance de la especificación según «Límites y exclusiones» de CU-02 (reclasificación del 2026-11-08).

La implementación técnica de todo el producto corresponde a fases posteriores; en la Fase 2 solo se precisan procesos y reglas.

### 5.3 Excluido de la primera versión

Exclusiones de la Fase 1, que se mantienen (según «Límites y exclusiones» de los casos y `docs/proceso.md`): geolocalización por cercanía (CU-01); filtro por franja horaria (CU-01); recuperación de contraseña (CU-02); guardar borradores de experiencias (CU-03); verificación avanzada de organizadores (CU-03); aprobación manual de organizadores por un administrador (CU-03, R1); cancelación de fechas o reservas por parte del organizador; pendiente de evaluación (CU-04, CU-07); notificaciones a participantes por cambios (CU-04) y notificaciones detalladas (CU-05); lista de espera (CU-05, CU-07); facturación (CU-06); cancelación parcial de plazas de una reserva (CU-07, R7); registro de datos individuales de los acompañantes (CU-05, R2); cédula o pasaporte como requisito general de registro (CU-02, R3); edición de la información general de la experiencia: nombre, descripción, imágenes (CU-04); cancelaciones fuera de plazo por otros canales (CU-07); dirección exacta y requisitos específicos de participación; pendientes de definición (CU-01).

Exclusiones añadidas en la Fase 2 (especificación aprobada):

- Transferencias bancarias y billeteras digitales como medios de pago en línea (RF2-14).
- Proveedores de pago, pasarelas, marcas de tarjeta y mecanismos técnicos de procesamiento del pago (RF2-14).
- Reglas de redondeo, impuestos, comisiones, decimales y formato de presentación de los importes (RF2-13, RF2-18).
- Plazo garantizado de acreditación del reembolso por la entidad financiera y procedimiento técnico del reembolso (RF2-11).
- Cualquier procedimiento de devolución presencial y el tratamiento del dinero recibido fuera de MODO (RF2-17).
- Qué ocurre cuando un participante no paga al llegar y la gestión de inasistencias (RF2-15, CU-08).
- Procedimientos excepcionales para corregir un pago «Recibido» después del comienzo de la sesión (CU-08).
- Registro en el historial de los intentos de corrección rechazados (CU-08).
- Notificaciones al participante por cambios en el estado de su pago (CU-08).
- Requisitos de la contraseña y caducidad y formato del correo de verificación (CU-02, reclasificado).

### 5.4 Mejoras futuras

- Recuperación de contraseña (CU-02), borradores de experiencias (CU-03), verificación avanzada de organizadores (CU-03) y filtro por franja horaria (CU-01), según los propios casos.
- **Reagendamientos:** no se incorporan al alcance actual de MODO. Se mencionan únicamente como posible mejora futura, por instrucción del autor del 2026-11-08 («No vamos a incorporar reagendamientos al alcance actual de MODO. Se pueden mencionar únicamente como posible mejora futura, sin modificar la especificación aprobada.»). No forman parte de la especificación aprobada ni de ningún caso de uso, regla o criterio.

## 6. Secciones o pantallas previstas

*Derivada de los casos aprobados; contenido confirmado por el autor (2026-11-08). No añade funcionalidades ni elige componentes o rutas técnicas.*

| Pantalla | Qué agrupa | Caso(s) de origen |
|---|---|---|
| 1. Catálogo | Listado, búsqueda por texto, filtros combinables (precios en USD) y orden; experiencias agotadas con «Agotado» al final. | CU-01 (RF2-07, RF2-13, RF2-16) |
| 2. Detalle de experiencia | Información de la experiencia, sesiones futuras con fecha y horario (America/Guayaquil), precio por participante en USD, disponibilidad o «Agotado» por sesión, y punto de inicio de la reserva. | CU-01 (RF2-07, RF2-12, RF2-13) |
| 3. Acceso | Registro (con sesión iniciada al completarlo), inicio de sesión y verificación del correo (aviso y reenvío). | CU-02 (RF2-06) |
| 4. Reserva | Selección de sesión y plazas, teléfono si falta, resumen con importe total en USD y política de cancelación de 24 horas; en pago presencial, indicación de que se paga al llegar; en pago en línea, elección entre tarjeta de crédito o de débito y pago dentro de la retención de 10 minutos; confirmación. | CU-05, CU-06 (RF2-01, RF2-03, RF2-08, RF2-14, RF2-18) |
| 5. Mi cuenta | Activación del perfil de organizador y «Mis reservas» con su cancelación. | CU-03, CU-07 (RF2-01, RF2-17) |
| 6. Panel del organizador | «Mis experiencias», publicar experiencia (ficha y sesiones) y gestión de fechas, horarios, cupos y precios. **Nuevo:** para una experiencia y una sesión (fecha y horario), lista de reservas confirmadas con nombre del participante, plazas, importe total en USD, modalidad y estado del pago; marcar el pago presencial como «Recibido» o corregirlo, e historial del pago. | CU-03, CU-04, CU-08 (RF2-04, RF2-05, RF2-15) |

Se mantienen las 6 pantallas de la Fase 1; la Fase 2 solo amplía el contenido de las pantallas 4 y 6.

## 7. Casos de uso de la versión inicial

| ID | Identificador AHK | Título | Actor | Estado | Versión aprobada (lastUpdated) |
|---|---|---|---|---|---|
| CU-01 | `cu-01-explorar-consultar-experiencias` | Explorar y consultar experiencias | Visitante | approved | 2026-10-25T17:43:04.467Z |
| CU-02 | `cu-02-registrarse-para-reservar` | Registrarse para poder reservar | Visitante | approved | 2026-10-25T17:52:58.654Z |
| CU-03 | `cu-03-publicar-experiencias` | Publicar experiencias | Organizador | approved | 2026-10-25T19:27:07.508Z |
| CU-04 | `cu-04-administrar-fechas-cupos-precios` | Administrar fechas, horarios, cupos y precios | Organizador | approved | 2026-10-25T19:27:07.519Z |
| CU-05 | `cu-05-reservar-pago-presencial` | Reservar con pago presencial | Participante | approved | 2026-10-25T18:10:54.391Z |
| CU-06 | `cu-06-reservar-pago-en-linea` | Reservar con pago en línea | Participante | approved | 2026-10-25T18:19:47.417Z |
| CU-07 | `cu-07-cancelar-reserva` | Cancelar una reserva | Participante | approved | 2026-10-25T18:27:16.035Z |
| CU-08 | `cu-08-registrar-pago-presencial` | Registrar pago presencial recibido | Organizador | approved | 2026-11-07T03:08:39.473Z |

Las fichas CU-01 a CU-07 se reproducen sin cambios respecto de la versión aprobada (la misma que en la Fase 1). Al final de cada ficha, la línea «Precisiones de Fase 2» indica qué reglas RF2 concretan el caso sin modificarlo (ver apartado 12). CU-08 es nuevo.

### CU-01 · Explorar y consultar experiencias

**Identificador AHK:** `cu-01-explorar-consultar-experiencias`

**Actor:** visitante sin sesión iniciada.

**Objetivo:** descubrir experiencias libremente y encontrar actividades específicas dentro del Distrito Metropolitano de Quito, y consultar su detalle.

**Condiciones previas:**

- Existen experiencias publicadas por organizadores (CU-03) con categoría y ubicación dentro del Distrito Metropolitano de Quito.
- No se requiere iniciar sesión para explorar ni para consultar el detalle (decisión 3).

**Recorrido principal:**

1. El visitante accede al catálogo público de MODO.
2. MODO muestra el listado de experiencias con fechas futuras, ordenadas por su fecha disponible más próxima y con las agotadas al final del listado.
3. El visitante puede escribir un texto de búsqueda.
4. El visitante puede aplicar uno o varios filtros y combinarlos con la búsqueda: categoría, ubicación (zona y, opcionalmente, sector o parroquia), fecha, rango de precios, plazas disponibles y modalidad de pago.
5. MODO muestra las experiencias que cumplen conjuntamente todos los filtros seleccionados y, si se ha escrito, el texto de búsqueda.
6. El visitante selecciona una experiencia.
7. MODO muestra el detalle de la experiencia.

**Alternativas y errores:**

- **A1 — Ubicación solo por zona:** se muestran experiencias de toda la zona elegida.
- **A2 — Ubicación por zona y sector/parroquia:** se muestran solo las experiencias del sector o parroquia elegido.
- **A3 — Fecha por atajo:** hoy, mañana, este fin de semana o próximos 7 días.
- **A4 — Fecha por rango personalizado:** fecha de inicio y fecha de fin.
- **A5 — Filtro de plazas disponibles activo:** solo aparecen experiencias que todavía se pueden reservar; las agotadas no aparecen.
- **A6 — Intención de reservar:** la reserva requiere registro (decisión 3) y se trata en CU-02, CU-05 y CU-06; queda fuera de este caso.
- **A7 — Cambio de orden:** el visitante puede ordenar por precio o por fecha de publicación.
- **F1 — Sin resultados:** MODO informa de que no hay experiencias que coincidan y permite modificar o limpiar los filtros.

**Reglas principales:**

- **R1:** el catálogo solo contiene experiencias dentro del Distrito Metropolitano de Quito (decisión 6).
- **R2:** las experiencias sin fechas futuras se ocultan del catálogo público.
- **R3:** las experiencias con fechas futuras pero sin plazas aparecen con la etiqueta «Agotado» y sin posibilidad de reservar.
- **R4:** el filtro de ubicación tiene dos niveles: zona amplia obligatoria para filtrar y sector o parroquia opcional.
- **R5:** el detalle muestra nombre, descripción, categoría, zona y sector, fechas y horarios, precio, disponibilidad, modalidad de pago, organizador, imágenes, duración y qué incluye la experiencia.
- **R6:** el orden por defecto es la fecha disponible más próxima; las agotadas se muestran al final con cualquier criterio de ordenación.
- **R7:** los filtros seleccionados se cumplen conjuntamente.
- **R8:** la búsqueda por texto consulta el nombre y la descripción.

**Resultado observable:** el visitante, sin iniciar sesión, ve un listado de experiencias del Distrito Metropolitano de Quito acotado por su búsqueda y filtros, y puede abrir el detalle de cualquiera de ellas.

**Criterios de aceptación:**

- **CA1:** un visitante sin sesión puede ver el listado y el detalle de una experiencia.
- **CA2:** al escribir un texto de búsqueda, el listado muestra solo experiencias cuyo nombre o descripción coinciden con ese texto.
- **CA3:** cada filtro (categoría, ubicación, fecha, rango de precios, plazas disponibles, modalidad de pago) acota el listado; los filtros pueden combinarse entre sí y con la búsqueda, y una experiencia solo aparece si cumple todos los filtros seleccionados.
- **CA4:** al seleccionar solo una zona, se muestran experiencias de toda la zona; al concretar sector o parroquia, solo las de ese sector o parroquia.
- **CA5:** los atajos de fecha (hoy, mañana, este fin de semana, próximos 7 días) y el rango personalizado muestran solo experiencias con fechas dentro del periodo elegido.
- **CA6:** una experiencia con fechas futuras y sin plazas aparece con la etiqueta «Agotado» y no permite reservar.
- **CA7:** una experiencia sin fechas futuras no aparece en el catálogo público.
- **CA8:** con el filtro de plazas disponibles activo, no aparecen experiencias agotadas.
- **CA9:** el detalle muestra todos los datos indicados en R5.
- **CA10:** no aparece ninguna experiencia ubicada fuera del Distrito Metropolitano de Quito.
- **CA11:** sin que el visitante cambie el orden, el listado aparece ordenado por la fecha disponible más próxima.
- **CA12:** el visitante puede ordenar el listado por precio o por fecha de publicación.
- **CA13:** las experiencias agotadas aparecen al final del listado con cualquier criterio de ordenación (fecha disponible más próxima, precio o fecha de publicación).
- **CA14:** si la búsqueda o la combinación de filtros no produce resultados, MODO informa al visitante y le permite modificar o limpiar los filtros.

**Precisiones de Fase 2:** RF2-07 («Agotado» a nivel de experiencia), RF2-12 (hora America/Guayaquil), RF2-13 (precios y filtro en USD), RF2-16 (una sesión deja de ser futura en su hora exacta de inicio).

### CU-02 · Registrarse para poder reservar

**Identificador AHK:** `cu-02-registrarse-para-reservar`

**Actor:** visitante que quiere convertirse en participante; para el inicio de sesión, usuario con una cuenta existente.

**Objetivo:** crear una cuenta en MODO para poder reservar, verificar el correo antes de la primera reserva e iniciar sesión con una cuenta existente.

**Condiciones previas:**

- El visitante no tiene sesión iniciada.
- Para iniciar sesión, existe una cuenta registrada con ese correo electrónico.

**Recorrido principal:**

*Registro*

1. El visitante elige registrarse.
2. MODO solicita nombre completo, correo electrónico y contraseña, y muestra los términos y condiciones y la información sobre el tratamiento de sus datos personales.
3. El visitante introduce sus datos y acepta los términos y condiciones.
4. MODO crea la cuenta y envía un correo de verificación.
5. MODO informa de que la cuenta fue creada y de que deberá verificar su correo antes de su primera reserva.

*Verificación del correo*

1. El usuario abre el correo de verificación y confirma su dirección.
2. MODO marca el correo de la cuenta como verificado.

*Inicio de sesión*

1. El usuario elige iniciar sesión.
2. El usuario introduce su correo electrónico y su contraseña.
3. MODO comprueba los datos e inicia la sesión.
4. El usuario puede explorar experiencias y, si su correo está verificado, reservar.

**Alternativas y errores:**

- **A1 — Intento de reservar con el correo sin verificar:** MODO solicita la verificación y permite reenviar el correo; una vez verificado, el usuario continúa con la reserva (CU-05, CU-06).
- **A2 — Reenvío del correo de verificación:** el usuario solicita un nuevo correo y MODO lo envía.
- **A3 — Registro iniciado desde un intento de reserva:** el visitante llega al registro desde el detalle de una experiencia (CU-01, A6).
- **F1 — Datos incompletos o no válidos:** MODO indica qué datos corregir y no crea la cuenta.
- **F2 — Términos no aceptados:** MODO no crea la cuenta.
- **F3 — Correo ya registrado:** MODO no crea una segunda cuenta, informa al visitante y le ofrece iniciar sesión.
- **F4 — Credenciales incorrectas:** MODO no inicia la sesión e informa al usuario.

**Reglas principales:**

- **R1:** el registro solicita únicamente nombre completo, correo electrónico y contraseña.
- **R2:** la aceptación de los términos y condiciones es obligatoria, y el visitante recibe la información sobre el tratamiento de sus datos personales antes de crear la cuenta.
- **R3:** no se solicita cédula ni pasaporte como requisito general de registro.
- **R4:** el teléfono no se solicita en el registro; podrá solicitarse durante la reserva (CU-05, CU-06).
- **R5:** un correo sin verificar no impide iniciar sesión ni explorar, pero sí reservar.
- **R6:** cada correo electrónico corresponde a una sola cuenta.

**Resultado observable:** el visitante tiene una cuenta de participante en MODO, puede iniciar sesión con ella y, una vez verificado su correo, puede continuar hacia una reserva.

**Criterios de aceptación:**

- **CA1:** al registrarse con nombre completo, correo electrónico y contraseña, y aceptar los términos, se crea la cuenta y se envía un correo de verificación.
- **CA2:** sin aceptar los términos y condiciones no se crea la cuenta.
- **CA3:** el registro no solicita cédula, pasaporte ni teléfono.
- **CA4:** con datos incompletos o no válidos no se crea la cuenta y MODO indica qué corregir.
- **CA5:** con un correo ya registrado no se crea una segunda cuenta y MODO informa al visitante.
- **CA6:** con correo y contraseña correctos, el usuario inicia sesión.
- **CA7:** con credenciales incorrectas no se inicia sesión y MODO informa al usuario.
- **CA8:** un usuario con el correo sin verificar puede iniciar sesión y explorar experiencias.
- **CA9:** al intentar reservar con el correo sin verificar, MODO solicita la verificación y permite reenviar el correo.
- **CA10:** tras verificar su correo, el usuario puede continuar con el proceso de reserva.

**Precisiones de Fase 2:** RF2-06 (sesión iniciada automáticamente tras el registro; sin reservar hasta verificar el correo).

### CU-03 · Publicar experiencias

**Identificador AHK:** `cu-03-publicar-experiencias`

**Actor:** usuario registrado (CU-02) que actúa como organizador.

**Objetivo:** publicar una experiencia para que aparezca en el catálogo de MODO y pueda ser reservada.

**Condiciones previas:**

- El usuario tiene una cuenta en MODO y ha iniciado sesión (CU-02).
- La experiencia se realiza dentro del Distrito Metropolitano de Quito.

**Recorrido principal:**

1. El usuario activa su perfil de organizador desde su cuenta, si aún no lo ha hecho.
2. El organizador elige publicar una nueva experiencia.
3. El organizador introduce nombre, descripción, categoría, zona y sector o parroquia, modalidad de pago (en línea o presencial), imágenes, duración y qué incluye.
4. El organizador añade al menos una fecha futura con horario, cupos y precio.
5. El organizador confirma la publicación.
6. MODO comprueba que la información está completa y publica la experiencia.
7. La experiencia aparece en el catálogo (CU-01) asociada al organizador.

**Alternativas y errores:**

- **A1 — Perfil de organizador ya activo:** el usuario empieza directamente en el paso 2.
- **A2 — Varias fechas:** el organizador añade más de una fecha futura, cada una con horario, cupos y precio.
- **F1 — Información incompleta:** si falta algún dato obligatorio o ninguna fecha futura con horario, cupos y precio, MODO no publica e indica qué completar.
- **F2 — Ubicación fuera del área:** MODO rechaza la publicación fuera del Distrito Metropolitano de Quito e indica que debe corregirse.
- **F3 — Fecha pasada:** MODO no acepta fechas pasadas como fechas de realización disponibles; se requiere al menos una fecha futura válida.

**Reglas principales:**

- **R1:** cualquier usuario registrado puede activar su perfil de organizador; no hay aprobación manual por un administrador.
- **R2:** una misma persona puede ser participante y organizador.
- **R3:** el organizador define la modalidad de pago de cada experiencia: en línea o presencial (decisión 2).
- **R4:** la categoría y la ubicación (zona y sector o parroquia) son obligatorias y deben estar dentro del Distrito Metropolitano de Quito (decisiones 6 y 7).
- **R5:** una experiencia solo se publica con su información completa y al menos una fecha futura con horario, cupos y precio.
- **R6:** al publicarse, la experiencia aparece en el catálogo y cumple las reglas de visibilidad de CU-01.
- **R7:** el precio se establece por cada fecha u horario y puede variar entre sesiones (por ejemplo, $20 el sábado y $25 el domingo).

**Resultado observable:** la experiencia publicada aparece en el catálogo de MODO con su información y sus fechas, y puede consultarse según CU-01.

**Criterios de aceptación:**

- **CA1:** un usuario registrado puede activar su perfil de organizador sin aprobación de un administrador.
- **CA2:** un organizador puede seguir participando en experiencias con la misma cuenta.
- **CA3:** con la información completa y al menos una fecha futura con horario, cupos y precio, la experiencia se publica y aparece en el catálogo.
- **CA4:** sin información obligatoria o sin fecha futura, la experiencia no se publica y MODO indica qué completar.
- **CA5:** no se puede publicar una experiencia ubicada fuera del Distrito Metropolitano de Quito.
- **CA6:** el organizador elige la modalidad de pago (en línea o presencial) y esta se muestra en el detalle.
- **CA7:** el detalle de la experiencia publicada muestra el organizador y los datos definidos en CU-01.
- **CA8:** no existe la opción de guardar una experiencia como borrador.

**Precisiones de Fase 2:** RF2-05 (sin sesiones duplicadas al publicar, extiende RF2-04), RF2-13 (precio en USD).

### CU-04 · Administrar fechas, horarios, cupos y precios

**Identificador AHK:** `cu-04-administrar-fechas-cupos-precios`

**Actor:** organizador de una experiencia publicada (CU-03).

**Objetivo:** mantener actualizadas las fechas, horarios, cupos y precios de sus experiencias sin afectar a las reservas existentes.

**Condiciones previas:**

- El organizador ha iniciado sesión y tiene al menos una experiencia publicada (CU-03).

**Recorrido principal:**

*Añadir una fecha*

1. El organizador abre una de sus experiencias publicadas.
2. El organizador añade una fecha futura con horario, cupos y precio.
3. MODO comprueba los datos y guarda la nueva fecha.
4. La nueva fecha queda disponible en el detalle de la experiencia (CU-01).

*Modificar o eliminar una fecha*

1. El organizador selecciona una fecha de una de sus experiencias.
2. El organizador modifica su horario, cupos o precio, o la elimina.
3. MODO aplica el cambio respetando las reglas de protección de reservas.

**Alternativas y errores:**

- **A1 — Fecha sin reservas activas:** puede modificarse su día, horario, cupos y precio, o eliminarse.
- **A2 — Fecha con reservas activas:** pueden aumentarse los cupos, reducirse sin quedar por debajo de las plazas reservadas y modificarse el precio para reservas futuras.
- **A3 — Eliminación de la última fecha futura:** la experiencia deja de aparecer en el catálogo público (reglas de visibilidad de CU-01), sin eliminarse del sistema.
- **F1 — Eliminar o cambiar día u horario de una fecha con reservas activas:** MODO no lo permite e informa al organizador.
- **F2 — Cupo por debajo de las plazas reservadas:** MODO no permite el cambio e informa al organizador.
- **F3 — Fecha pasada o datos incompletos:** MODO no guarda la fecha e indica qué corregir.

**Reglas principales:**

- **R1:** una fecha con reservas activas no puede eliminarse ni cambiar de día u horario.
- **R2:** los cupos de una fecha con reservas pueden aumentarse o reducirse, pero nunca por debajo de las plazas ya reservadas.
- **R3:** un cambio de precio solo se aplica a reservas futuras; las existentes conservan su precio.
- **R4:** solo se aceptan fechas futuras (CU-03).
- **R5:** cada organizador administra exclusivamente las experiencias que haya publicado.
- **R6:** el precio se establece por cada fecha u horario y puede variar entre sesiones; las reservas confirmadas conservan siempre el precio vigente al momento de reservar.

**Resultado observable:** las fechas, horarios, cupos y precios de la experiencia reflejan los cambios del organizador en el detalle público, sin alterar las condiciones de las reservas existentes.

**Criterios de aceptación:**

- **CA1:** el organizador puede añadir una fecha futura con horario, cupos y precio, y esta aparece en el detalle de la experiencia.
- **CA2:** una fecha sin reservas puede modificarse o eliminarse.
- **CA3:** una fecha con reservas activas no puede eliminarse ni cambiar de día u horario, y MODO informa al organizador.
- **CA4:** los cupos de una fecha con reservas pueden aumentarse.
- **CA5:** los cupos no pueden reducirse por debajo de las plazas reservadas.
- **CA6:** tras cambiar el precio, las nuevas reservas usan el nuevo precio y las existentes conservan el anterior.
- **CA7:** no se aceptan fechas pasadas.
- **CA8:** al eliminar la última fecha futura, la experiencia deja de aparecer en el catálogo público, pero no se elimina del sistema.
- **CA9:** un organizador no puede administrar fechas de experiencias de otro organizador.

**Precisiones de Fase 2:** RF2-02 (añadir fechas no modifica las sesiones existentes), RF2-04 (sin sesiones duplicadas), RF2-12 (hora America/Guayaquil), RF2-13 (USD), RF2-18 (las reservas confirmadas conservan su importe total).

### CU-05 · Reservar con pago presencial

**Identificador AHK:** `cu-05-reservar-pago-presencial`

**Actor:** participante registrado con sesión iniciada (CU-02).

**Objetivo:** reservar una o varias plazas en una fecha de una experiencia cuya modalidad de pago es presencial.

**Condiciones previas:**

- El participante ha iniciado sesión y su correo está verificado (CU-02).
- La experiencia está publicada, su modalidad de pago es presencial (CU-03) y la fecha elegida es futura y tiene plazas disponibles.

**Recorrido principal:**

1. El participante selecciona una fecha de la experiencia y el número de plazas.
2. Si su cuenta no tiene teléfono registrado, MODO lo solicita y el participante lo introduce.
3. MODO muestra el resumen: experiencia, fecha, horario, número de plazas, precio vigente, modalidad de pago presencial y condiciones de cancelación aplicables.
4. El participante confirma la reserva.
5. MODO comprueba que existen suficientes plazas disponibles.
6. MODO confirma la reserva automáticamente, descuenta las plazas de la fecha y la asocia a la cuenta del participante.
7. MODO muestra la confirmación, indicando que el pago se realiza de forma presencial.

**Alternativas y errores:**

- **A1 — Teléfono ya registrado:** MODO no lo solicita de nuevo y se omite el paso 2.
- **A2 — Visitante sin sesión o correo sin verificar:** se aplica CU-02 antes de continuar.
- **F1 — Plazas insuficientes:** si lo solicitado supera la disponibilidad al confirmar, MODO no crea la reserva e informa al participante.
- **F2 — Fecha agotada:** aparece como «Agotado» y no permite reservar (CU-01).
- **F3 — Teléfono no indicado:** si la cuenta no tiene teléfono y el participante no lo proporciona, MODO impide confirmar e indica qué dato falta.

**Reglas principales:**

- **R1:** una reserva puede incluir varias plazas, sin superar la disponibilidad de la fecha.
- **R2:** no se registran datos individuales de los acompañantes; la reserva queda asociada a la cuenta de quien la realiza.
- **R3:** el teléfono es obligatorio en la primera reserva si la cuenta no lo tiene, y se guarda para futuras reservas.
- **R4:** en modalidad presencial, la reserva se confirma automáticamente cuando el participante cumple los requisitos y existen suficientes plazas (decisión 4); no se requiere aprobación manual del organizador.
- **R5:** la reserva conserva el precio vigente en el momento de reservar (CU-04).
- **R6:** las condiciones de cancelación aplicables se comunican antes de confirmar la reserva.

**Resultado observable:** el participante tiene una reserva confirmada asociada a su cuenta para la fecha elegida, y las plazas disponibles de esa fecha disminuyen en el número reservado.

**Criterios de aceptación:**

- **CA1:** un participante con correo verificado puede reservar una o varias plazas de una fecha con disponibilidad suficiente.
- **CA2:** la reserva se confirma automáticamente y las plazas disponibles disminuyen en el número reservado.
- **CA3:** no se puede reservar más plazas de las disponibles; MODO informa al participante.
- **CA4:** si la cuenta no tiene teléfono, MODO lo solicita y la reserva no se completa sin él; una vez guardado, no se vuelve a pedir.
- **CA5:** antes de confirmar se muestran el precio vigente, la modalidad presencial y las condiciones de cancelación.
- **CA6:** no se solicitan datos individuales de acompañantes.
- **CA7:** un usuario sin sesión o con el correo sin verificar no puede completar la reserva sin pasar por CU-02.
- **CA8:** cuando una fecha queda sin plazas tras una reserva, aparece como «Agotado» en el catálogo.

**Precisiones de Fase 2:** RF2-01 (política de 24 horas mostrada antes de confirmar), RF2-03 (pago al llegar, antes de la actividad), RF2-06, RF2-07, RF2-13 (USD), RF2-15 (registro del pago por el organizador, CU-08), RF2-16 (reservas hasta antes de la hora de inicio), RF2-18 (importe total = precio × plazas; concreta el «precio vigente» del resumen).

### CU-06 · Reservar con pago en línea

**Identificador AHK:** `cu-06-reservar-pago-en-linea`

**Actor:** participante registrado con sesión iniciada (CU-02).

**Objetivo:** reservar una o varias plazas en una fecha de una experiencia cuya modalidad de pago es en línea, pagando durante la reserva.

**Condiciones previas:**

- El participante ha iniciado sesión y su correo está verificado (CU-02).
- La experiencia está publicada, su modalidad de pago es en línea (CU-03) y la fecha elegida es futura y tiene plazas disponibles.

**Recorrido principal:**

1. El participante selecciona una fecha de la experiencia y el número de plazas.
2. Si su cuenta no tiene teléfono registrado, MODO lo solicita y el participante lo introduce (igual que en CU-05).
3. MODO muestra el resumen: experiencia, fecha, horario, número de plazas, precio total, modalidad de pago en línea y condiciones de cancelación aplicables.
4. El participante inicia el pago.
5. MODO comprueba que hay plazas suficientes y las aparta temporalmente durante el pago.
6. El participante completa el pago correctamente.
7. MODO confirma la reserva automáticamente, la asocia a la cuenta del participante y las plazas quedan reservadas.
8. MODO muestra la confirmación de la reserva y del pago.

**Alternativas y errores:**

- **A1 — Teléfono ya registrado:** MODO no lo solicita de nuevo y se omite el paso 2.
- **A2 — Visitante sin sesión o correo sin verificar:** se aplica CU-02 antes de continuar.
- **F1 — Plazas insuficientes al iniciar el pago:** MODO no permite iniciar el pago, no aparta plazas y muestra un aviso.
- **F2 — Pago fallido:** la reserva no se confirma; MODO informa al participante, libera las plazas retenidas y permite iniciar un nuevo intento de reserva.
- **F3 — Pago abandonado o tiempo de retención vencido:** la reserva no se confirma y las plazas apartadas se liberan.
- **F4 — Teléfono no indicado:** MODO impide confirmar e indica qué dato falta (igual que en CU-05).

**Reglas principales:**

- **R1:** las reglas de CU-05 sobre varias plazas, acompañantes, teléfono y correo verificado se aplican igualmente.
- **R2:** al iniciar el pago, las plazas seleccionadas se apartan temporalmente y no pueden ser reservadas por otros usuarios.
- **R3:** la reserva se confirma automáticamente solo cuando hay disponibilidad y el pago se completa correctamente (decisión 4).
- **R4:** si el pago falla, se abandona o vence el tiempo permitido, las plazas se liberan.
- **R5:** se respeta el precio mostrado al confirmar la operación (CU-04).
- **R6:** las condiciones de cancelación aplicables se comunican antes de iniciar el pago.

**Resultado observable:** tras un pago correcto, el participante tiene una reserva confirmada y pagada asociada a su cuenta; si el pago no se completa, no existe reserva y las plazas vuelven a estar disponibles.

**Criterios de aceptación:**

- **CA1:** un participante con correo verificado puede reservar una o varias plazas de una fecha con pago en línea.
- **CA2:** mientras el pago está en curso, las plazas seleccionadas no están disponibles para otros usuarios.
- **CA3:** con el pago completado correctamente, la reserva se confirma automáticamente.
- **CA4:** si el pago falla, no se crea ninguna reserva confirmada, las plazas se liberan y MODO informa al participante.
- **CA5:** si el pago se abandona o vence el tiempo permitido, las plazas vuelven a estar disponibles.
- **CA6:** no se puede iniciar el pago por más plazas de las disponibles.
- **CA7:** antes de pagar se muestran el precio total, la modalidad en línea y las condiciones de cancelación, y la reserva conserva ese precio.
- **CA8:** el teléfono se solicita si la cuenta no lo tiene y no se vuelve a pedir una vez guardado.

**Precisiones de Fase 2:** RF2-01 (política de 24 horas), RF2-06, RF2-08 (retención de 10 minutos como máximo; concreta «tiempo permitido»), RF2-09 (pago confirmado fuera de plazo), RF2-10 y RF2-11 (reembolso), RF2-12, RF2-13 (USD), RF2-14 (tarjeta de crédito o débito), RF2-16, RF2-18.

### CU-07 · Cancelar una reserva

**Identificador AHK:** `cu-07-cancelar-reserva`

**Actor:** participante con una reserva confirmada (CU-05 o CU-06).

**Objetivo:** cancelar su reserva respetando la política de cancelación de MODO.

**Condiciones previas:**

- El participante ha iniciado sesión (CU-02) y tiene al menos una reserva confirmada para una fecha futura.

**Recorrido principal:**

1. El participante consulta sus reservas.
2. El participante selecciona la reserva que desea cancelar.
3. MODO muestra la política de cancelación aplicable y, si la reserva se pagó en línea, que corresponde un reembolso completo.
4. El participante confirma la cancelación.
5. MODO comprueba que la cancelación se realiza dentro del plazo permitido.
6. MODO cancela la reserva y las plazas vuelven a estar disponibles.
7. Si la reserva se pagó en línea, MODO gestiona el reembolso completo.
8. MODO muestra la confirmación de la cancelación.

**Alternativas y errores:**

- **A1 — Reserva de pago presencial:** se cancela sin reembolso, ya que no hubo pago previo.
- **A2 — Reserva pagada en línea:** la cancelación dentro del plazo conlleva el reembolso completo.
- **F1 — Fuera de plazo:** MODO no permite cancelar directamente e informa al participante.
- **F2 — Reserva ya cancelada o fecha pasada:** MODO no ofrece la cancelación.

**Reglas principales:**

- **R1:** MODO aplica una política de cancelación única para todas las experiencias.
- **R2:** solo se puede cancelar hasta un plazo determinado antes de la fecha de la experiencia; el plazo exacto se definirá en la Fase 2.
- **R3:** reserva pagada en línea cancelada dentro del plazo: reembolso completo; reserva de pago presencial: cancelación sin reembolso.
- **R4:** al cancelar correctamente, las plazas vuelven a estar disponibles para otros participantes.
- **R5:** la política se comunica antes de confirmar la reserva (CU-05, CU-06).
- **R6:** un participante solo puede cancelar las reservas asociadas a su propia cuenta.
- **R7:** la cancelación se aplica a la reserva completa; no se cancelan plazas sueltas.

**Resultado observable:** la reserva cancelada deja de estar activa, sus plazas vuelven a estar disponibles en la fecha correspondiente y, si se pagó en línea, consta el reembolso completo.

**Criterios de aceptación:**

- **CA1:** dentro del plazo, el participante puede cancelar una reserva confirmada.
- **CA2:** tras cancelar, las plazas de la reserva vuelven a estar disponibles en esa fecha.
- **CA3:** una reserva pagada en línea cancelada dentro del plazo recibe el reembolso completo.
- **CA4:** una reserva de pago presencial se cancela sin reembolso.
- **CA5:** fuera del plazo, MODO no permite cancelar e informa al participante.
- **CA6:** antes de confirmar la cancelación, MODO muestra la política aplicable.
- **CA7:** un participante no puede cancelar reservas de otra cuenta.

**Precisiones de Fase 2:** RF2-01 concreta el plazo de R2 (24 horas antes del inicio de la fecha y horario reservados), RF2-12 (hora America/Guayaquil), RF2-10 y RF2-11 (reembolso del 100 % al método original, solicitud en un máximo de 24 horas), RF2-13 (USD), RF2-17 (cancelación presencial con pago «Recibido»: la justificación de A1 describe el caso habitual y no es un mensaje que MODO muestre).

### CU-08 · Registrar pago presencial recibido

**Identificador AHK:** `cu-08-registrar-pago-presencial` (nuevo en Fase 2; aprobado el 2026-11-06)

**Actor:** organizador con su sesión iniciada en MODO.

**Objetivo:** consultar las reservas confirmadas de una sesión de una de sus experiencias y dejar constancia en MODO de que un participante con pago presencial ya pagó al llegar.

**Inicio (disparador):** el participante llega al lugar de la experiencia y paga en persona antes de que comience la actividad; después de ese pago, el organizador quiere registrarlo.

**Condiciones previas:**

- El organizador ha iniciado sesión y tiene al menos una experiencia publicada (CU-03).
- La sesión elegida tiene reservas confirmadas.
- Para registrar un pago: la reserva tiene pago presencial con estado «Pendiente» (CU-05). La reserva ya está confirmada desde que se hizo.

**Recorrido principal:**

1. El organizador entra en la sección «Mis experiencias» de su cuenta.
2. Elige una de sus experiencias.
3. Elige la fecha y el horario de la sesión que quiere consultar.
4. MODO muestra la lista de las reservas confirmadas de esa sesión, cada una con el nombre del participante, la cantidad de plazas reservadas, el importe total en USD, la modalidad de pago (presencial o en línea) y el estado del pago.
5. El organizador identifica una reserva con pago presencial «Pendiente», cuyo participante ya pagó al llegar.
6. El organizador marca el pago de esa reserva como recibido.
7. MODO cambia el estado del pago de esa reserva a «Recibido», lo muestra en la lista y guarda el cambio en el historial del pago (R5).

**Alternativas y errores:**

- **A1 — Reserva pagada en línea:** aparece en la lista con su modalidad y estado de pago, sin la opción de registrar el pago.
- **A2 — Corrección de un marcado erróneo:** el organizador puede devolver un pago de «Recibido» a «Pendiente» solo antes de que comience la sesión; MODO guarda la corrección en el historial (R5).
- **A3 — Registro posterior del pago:** el organizador puede marcar como «Recibido» un pago presencial pendiente aunque la sesión ya haya comenzado o terminado.
- **A4 — Sesión sin reservas confirmadas:** MODO muestra «Esta sesión todavía no tiene reservas confirmadas», sin participantes ni opciones para registrar pagos; el organizador puede volver a sus experiencias o elegir otra sesión.
- **F1 — Corrección fuera de plazo:** si la sesión ya comenzó, MODO no permite revertir el pago, explica que el plazo para corregirlo terminó y el estado no cambia.
- **F2 — Reserva ajena:** el organizador no puede consultar, registrar ni corregir pagos de reservas de experiencias que no son suyas.

**Reglas principales:**

- **R1:** el organizador solo consulta y gestiona reservas de sus propias experiencias.
- **R2:** registrar el pago como recibido cambia solo el estado del pago; no cambia la confirmación de la reserva, las plazas ocupadas ni el precio acordado.
- **R3:** la corrección «Recibido» → «Pendiente» tampoco cambia la confirmación, las plazas ni el precio acordado.
- **R4:** la corrección solo está permitida hasta el momento en que comienza la sesión.
- **R5:** MODO conserva un historial de cada cambio del estado del pago presencial (registro inicial y cada corrección permitida), con quién hizo el cambio, la fecha y hora del registro, el estado anterior y el estado nuevo.
- **R6:** la opción de registrar el pago solo existe para reservas con pago presencial pendiente; las pagadas en línea no la tienen.
- **R7:** el momento del pago (al llegar, antes de la actividad, RF2-03) y el de su registro en MODO son distintos; el registro puede hacerse en cualquier momento, también después de que la sesión haya comenzado o terminado.
- **R8:** el registro posterior no permite que el participante pague después de la actividad; solo deja constancia de un pago ya recibido al llegar.
- **R9:** la fecha y hora de una entrada del historial es el momento del registro en MODO, no el momento real del pago; MODO no los interpreta como iguales.
- **R10:** MODO no pide la fecha y hora reales del pago; en el historial el dato se identifica como «Fecha y hora del registro», tanto en el registro inicial como en las correcciones.

**Restricciones (exclusiones del caso):** qué ocurre si el participante no paga al llegar; inasistencias; corrección excepcional después del comienzo de la sesión; registro de intentos de corrección rechazados; notificaciones al participante por cambios en su pago.

**Resultado observable:** en la lista de reservas de la sesión, el pago presencial aparece como «Recibido» (o de nuevo «Pendiente» tras una corrección permitida, registrada en el historial). La reserva sigue confirmada, con las mismas plazas y el mismo precio.

**Criterios de aceptación:**

- **CA-08-01:** desde «Mis experiencias» → experiencia propia → fecha y horario de la sesión, MODO lista las reservas confirmadas con nombre, plazas, importe total en USD, modalidad y estado del pago.
- **CA-08-02:** al marcar como recibido un pago presencial «Pendiente» de una experiencia propia, el estado pasa a «Recibido».
- **CA-08-03:** después de CA-08-02, la reserva sigue confirmada con las mismas plazas y el mismo precio acordado.
- **CA-08-04:** una reserva pagada en línea no ofrece la opción de registrar el pago.
- **CA-08-05:** un pago «Recibido» corregido antes del comienzo de la sesión vuelve a «Pendiente»; la reserva no cambia.
- **CA-08-06:** la corrección añade al historial una entrada (organizador, fecha y hora del registro, «Recibido» → «Pendiente») y se conserva la entrada del registro inicial.
- **CA-08-07:** con la sesión ya comenzada, intentar corregir un pago «Recibido» no cambia el estado y MODO explica que el plazo terminó.
- **CA-08-08:** el organizador no puede consultar, registrar ni corregir pagos de experiencias ajenas.
- **CA-08-09:** un pago presencial «Pendiente» puede marcarse como «Recibido» después de que la sesión haya comenzado o terminado; la reserva no cambia.
- **CA-08-10:** un pago marcado «Recibido» después del comienzo no puede devolverse a «Pendiente» (como en CA-08-07).
- ~~**CA-08-11:**~~ retirado como criterio (2026-11-06); su contenido se mantiene como R8.
- **CA-08-12:** el primer marcado como recibido guarda en el historial organizador, fecha y hora del registro, «Pendiente» → «Recibido».
- **CA-08-13:** una entrada registrada después de terminada la sesión muestra la fecha y hora del registro, no presentada como el momento real del pago.
- **CA-08-14:** al marcar el pago como recibido, MODO no pide la fecha ni la hora reales del pago.
- **CA-08-15:** cualquier entrada del historial muestra quién, «Fecha y hora del registro», estado anterior y estado nuevo, sin ningún dato presentado como momento real del pago.
- **CA-08-16:** al elegir una sesión propia sin reservas confirmadas, MODO muestra «Esta sesión todavía no tiene reservas confirmadas», sin participantes ni opciones de registro, y permite volver o elegir otra sesión.

**Precisiones de Fase 2:** RF2-03 (momento del pago), RF2-13 (USD), RF2-15 (registro manual del pago), RF2-17 (cancelación con pago «Recibido»), RF2-18 (importe total conservado en la lista). Pregunta abierta propia: qué etiqueta muestra la lista como estado de pago de las reservas pagadas en línea (ver 8.3).

## 8. Decisiones y preguntas pendientes

### 8.1 Decisiones confirmadas

**Decisiones globales de la Fase 1 (confirmadas por el usuario el 25 de octubre de 2026; se mantienen sin cambios)**

1. Los organizadores podrán publicar y administrar experiencias, fechas, horarios, cupos y precios.
2. Cada organizador determinará si una experiencia requiere pago en línea o permite pago presencial.
3. Los visitantes podrán explorar experiencias sin iniciar sesión, pero deberán registrarse para reservar.
4. Las reservas se confirmarán automáticamente cuando se cumplan las condiciones de disponibilidad y pago.
5. Los participantes podrán cancelar reservas respetando las condiciones correspondientes.
6. MODO estará enfocado exclusivamente en experiencias dentro del Distrito Metropolitano de Quito; no se incluirán ciudades fuera de esta área.
7. En CU-03, el organizador deberá indicar la categoría y la ubicación de su experiencia dentro del área cubierta por MODO.
8. El precio se establece por fecha u horario de cada experiencia y puede variar entre sesiones; las reservas confirmadas conservan siempre el precio vigente al momento de reservar.

Las decisiones clave por caso de la Fase 1 están incorporadas en las reglas de cada ficha del apartado 7 y no cambian.

**Decisiones de la Fase 2 (confirmadas por el usuario; registradas en `docs/proceso.md` y en la especificación aprobada)**

| ID | Fecha | Decisión | Casos afectados | Qué resuelve |
|---|---|---|---|---|
| RF2-01 | 2026-11-05 | Cancelación permitida si faltan 24 h o más para el inicio; con menos, se rechaza. | CU-07 (R2), CU-05, CU-06 | «Plazo exacto de cancelación» (Fase 1, 5.2 y 8.2). |
| RF2-02 | 2026-11-05 | Aclaración: añadir fechas no modifica las sesiones existentes ni sus reservas. | CU-04 | Ninguna pregunta (aclaración). |
| RF2-03 | 2026-11-05 | El pago presencial se hace al llegar, antes de comenzar la actividad. | CU-05 (R4) | En parte «Pago presencial». |
| RF2-04 | 2026-11-05 | Sin sesiones duplicadas con exactamente la misma fecha y horario en una experiencia. | CU-04 | — |
| RF2-05 | 2026-11-05 | RF2-04 se aplica también a la publicación inicial. | CU-03 (A2) | Pregunta derivada de RF2-04. |
| RF2-06 | 2026-11-05 | Sesión iniciada automáticamente tras el registro; sin reservar hasta verificar el correo. | CU-02 | Pregunta de CU-02 sobre la sesión tras el registro. |
| RF2-07 | 2026-11-05 | «Agotado» a nivel de experiencia solo si ninguna sesión futura tiene plazas. | CU-01 | — (deriva una pregunta nueva). |
| RF2-08 | 2026-11-05 | Retención de plazas de 10 minutos como máximo durante el pago en línea. | CU-06 | «Tiempo exacto de retención». |
| RF2-09 | 2026-11-05 | Pago confirmado después de los 10 minutos: no se confirma la reserva y se reembolsa por completo. | CU-06 | Pregunta derivada de RF2-08. |
| RF2-10 | 2026-11-06 | Todo reembolso de pago en línea, al 100 % y al método de pago original. | CU-06, CU-07 | En parte «Reembolsos» (método). |
| RF2-11 | 2026-11-06 | MODO inicia la solicitud de reembolso en un máximo de 24 h. | CU-06, CU-07 | En parte «Reembolsos» (plazo de tramitación). |
| RF2-12 | 2026-11-06 | Zona horaria de referencia America/Guayaquil (UTC−5). | Todos los plazos | «Zona horaria» (derivada de RF2-01). |
| RF2-13 | 2026-11-06 | Moneda única USD, sin conversión ni selector. | CU-01, CU-03 a CU-07 | Parte de moneda de pago en línea, precios y filtros. |
| RF2-14 | 2026-11-06 | Pago en línea con tarjeta de crédito o de débito; sin transferencias ni billeteras. | CU-06 | Parte de medios de pago. |
| CU-08 | 2026-11-06 | Nuevo caso de uso: consultar reservas de una sesión y registrar el pago presencial. | CU-08 (CU-05 sin cambios) | Registro del pago presencial. |
| RF2-15 | 2026-11-06 | El organizador registra manualmente el pago presencial como recibido; solo cambia el estado del pago. | CU-08, CU-05 | Registro del pago presencial. |
| RF2-16 | 2026-11-08 | Nuevas reservas solo antes de la hora exacta de inicio; sin cierre anticipado. | CU-01, CU-05, CU-06 | «Límite de antelación o cierre de reservas». |
| RF2-17 | 2026-11-08 | Cancelación presencial: sin reembolso; si el pago es «Recibido», se conserva con su historial. | CU-07, CU-08 | Bloqueo B3 de la auditoría del 2026-11-08. |
| RF2-18 | 2026-11-08 | Importe total = precio por participante × plazas, mostrado antes y conservado tras confirmar. | CU-04, CU-05, CU-06, CU-08 | Bloqueo B4 de la auditoría del 2026-11-08. |

Otras decisiones registradas:

- **2026-11-08:** correcciones M1–M5 de la auditoría (sin decisiones nuevas): CA-F2-47, CA-F2-59, CA-F2-65 y CA-F2-70 se retiran como criterios; CA-F2-51, CA-F2-62 y CA-F2-63 se reformulan; la pregunta sobre verificación del correo se reclasifica como fuera de alcance.
- **2026-11-08:** aprobación de la especificación funcional de Fase 2 por el usuario (ver apartado 10).
- **2026-11-08 (instrucciones del autor, tarea 29):** «Mi decisión sobre la cancelación de 24 horas se mantiene.» y «No vamos a incorporar reagendamientos al alcance actual de MODO. Se pueden mencionar únicamente como posible mejora futura, sin modificar la especificación aprobada.»

### 8.2 Supuestos

- La justificación de CU-07 A1 («ya que no hubo pago previo») describe el caso habitual, en el que el participante paga al llegar (RF2-03); no es un mensaje que MODO muestre. RF2-17 precisa que MODO no hace esa afirmación cuando el pago figura como «Recibido».
- Las fuentes no registran otros supuestos; no se añaden.

### 8.3 Preguntas abiertas

Ninguna bloquea el cierre de la especificación de Fase 2, que está aprobada. Ninguna se presenta como decidida.

| # | Pregunta (pendiente) | Origen | Documentos afectados | ¿Bloquea el cierre? |
|---|---|---|---|---|
| P1 | Con un filtro de fecha activo, ¿«Agotado» se evalúa solo sobre las sesiones del periodo filtrado? | RF2-07 | CU-01, spec | No |
| P2 | ¿Qué ocurre si el método de pago original ya no está disponible al gestionar el reembolso? | RF2-10 | CU-06, CU-07, spec | No |
| P3 | ¿Qué etiqueta muestra la lista de CU-08 como estado de pago de las reservas pagadas en línea? | CU-08 | CU-08, spec | No |
| P4 | ¿Qué ocurre con un pago en línea iniciado antes de la hora de inicio que se completa, dentro de los 10 minutos, después de esa hora? | RF2-16 | CU-06, spec | No |
| P5 | ¿Qué precio se aplica si el organizador cambia el precio después de mostrar el importe total y antes de la confirmación (presencial: entre resumen y confirmación; en línea: durante la retención)? | RF2-18 | CU-04, CU-05, CU-06, spec | No |
| P6 | Pago presencial: qué ocurre si el participante no paga y cómo se gestionan las inasistencias. | CU-05, CU-08, RF2-15 | CU-05, CU-08, spec | No |
| P7 | Reembolsos: plazo de acreditación por la entidad financiera y procedimiento técnico. | RF2-11 | CU-07, spec | No |
| P8 | Filtros: clasificación de zonas y sectores o parroquias, lista de categorías, forma del filtro de rango de precios, días de «este fin de semana». | CU-01 | CU-01, spec | No |
| P9 | Límite máximo de plazas por reserva. | CU-05 | CU-05, CU-06, spec | No |
| P10 | Cancelación por parte del organizador: si se adopta y cómo. | CU-04, CU-07 | CU-04, CU-07, spec | No |
| P11 | Dirección exacta y requisitos de participación. | CU-01 | CU-01, spec | No |
| P12 | Fechas recurrentes. | proceso.md | CU-03, CU-04 | No |
| P13 | Precios: tarifas y experiencias gratuitas (y valores de precio admitidos). | proceso.md, RF2-18 | CU-03, CU-04, spec | No |
| P14 | Notificaciones: qué avisos recibe cada actor. | proceso.md | Varios | No |
| P15 | Lista de espera. | proceso.md | CU-05, CU-07 | No |
| P16 | CU-02: vuelta a la experiencia tras registrarse desde un intento de reserva; cierre de sesión. | CU-02 | CU-02, spec | No |
| P17 | CU-03: si se requiere correo verificado para publicar; edición posterior de la información general. | CU-03 | CU-03, CU-04, spec | No |

Pendientes propios de esta entrega (no funcionales): ninguno. El autor realizó su revisión final del documento el 8 de noviembre de 2026 y confirmó los apartados 2 y 6 en la misma fecha. Lo resuelto desde la Fase 1 se resume en los apartados 5.2 y 20.

*Los apartados 8.1 a 8.3 se conservan literalmente de la Fase 2.*

### 8.4 Decisiones técnicas de la Fase 3

Decisiones confirmadas por el usuario el 2026-11-09 (TD-01 a TD-04) y el 2026-11-10 (TD-05 a TD-12), registradas en `fase-03-especificacion-tecnica` (aprobada el 2026-11-10). Aquí se resumen en una línea; el detalle, las alternativas descartadas y las palabras del usuario están en la especificación técnica.

| TD | Decisión | Remite a |
|---|---|---|
| TD-01 | Arquitectura: frontend React + Vite existente; API propia y base de datos relacional como componentes futuros, no implementados (alternativa B). | Apartados 22 y 25 |
| TD-02 | API con Express 5.x sobre Node.js y TypeScript (alternativa A); componente futuro. | Apartados 21 y 25 |
| TD-03 | Base de datos PostgreSQL (alternativa A); versión mayor pendiente; componente futuro. | Apartados 21 y 29 |
| TD-04 | Acceso a datos con Drizzle ORM y drizzle-kit (alternativa D); versiones exactas y driver de PostgreSQL pendientes. | Apartados 21 y 29 |
| TD-05 | Disponibilidad calculada (cupo de la sesión − plazas de las reservas confirmadas − plazas de las retenciones vigentes) con bloqueo breve de la sesión (alternativa B). | Apartados 24, 25 y 29 |
| TD-06 | React Router en modo declarativo, sin *loaders*, *actions* ni modo framework (alternativa A). | Apartado 23 |
| TD-07 | Reparto de estado: TanStack Query para los datos de la API, URL para los filtros del catálogo, Zustand solo para lo que fija TD-12 y Mantine Form para los formularios (alternativa C; la parte de Zustand la sustituye TD-12). | Apartado 24 |
| TD-08 | Esquemas Zod importados desde `zod/v4` conectados a Mantine Form mediante su `schemaResolver` integrado; la futura API Express valida de nuevo (alternativa A). | Apartado 26 |
| TD-09 | `Modal` de `@mantine/core` solo para confirmaciones y avisos breves; reserva y pago en páginas propias con URL; sin `@mantine/modals`; `useState` para los modales locales como elección técnica del proyecto (alternativa A). | Apartado 26 |
| TD-10 | Rutas por zonas pública, de participante y de organizador, con layouts compartidos, rutas anidadas y URL propias con identificador del servidor para la reserva y el pago; nombres ilustrativos aceptados provisionalmente (alternativa C). | Apartado 23 |
| TD-11 | Sesiones administradas por la futura API Express mediante cookies httpOnly, sin tokens gestionados por JavaScript en el navegador; express-session solo como candidato no adoptado (alternativa A). | Apartados 23 y 25 |
| TD-12 | Zustand solo para el aviso de acceso activo (iniciar sesión o verificar el correo), sin `persist`; sustituye el borrador de reserva en Zustand (alternativa B). | Apartados 24 y 26 |

### 8.5 Preguntas técnicas

Preguntas técnicas de `fase-03-especificacion-tecnica` (P1 a P17), distintas de las preguntas funcionales P1 a P17 de 8.3. Ninguna pregunta abierta se presenta como decidida.

| # | Pregunta técnica | Estado |
|---|---|---|
| P1 | Framework y entorno de ejecución de la API. | Resuelta (TD-02) |
| P2 | Motor de base de datos relacional. | Resuelta (TD-03); versión mayor pendiente |
| P3 | Modelado y acceso a datos. | Abierta: el modelado sigue abierto; el acceso a datos está resuelto (TD-04); falta confirmar el bloqueo de filas dentro de una transacción en Drizzle |
| P4 | Autenticación y sesiones. | Resuelta en mecanismo (TD-11); los detalles siguen abiertos en P16 |
| P5 | Envío de correos de verificación. | Abierta |
| P6 | Proveedor o pasarela de pago y recepción de confirmaciones. | Abierta |
| P7 | Mecanismo de expiración de la retención de 10 minutos (no puede ser una transacción ni un bloqueo abierto durante el pago). | Abierta |
| P8 | Ejecución del inicio de reembolsos. | Abierta |
| P9 | Comunicación frontend-API (contratos). | Abierta: el reparto de estado está resuelto (TD-07, TD-12); siguen pendientes los contratos, la configuración de TanStack Query, los nombres y la validación de los parámetros de URL y el contrato de errores |
| P10 | Alojamiento y despliegue. | Abierta |
| P11 | Estrategia de pruebas. | Abierta: la estrategia prevista está en el apartado 28; las herramientas de componentes, integración, E2E y de la API siguen sin decidir |
| P12 | Mapa de rutas y pantallas del frontend. | Resuelta en estructura (TD-10); siguen pendientes el idioma y los nombres definitivos de las rutas, la URL de retorno del pago, el formato del enlace de verificación, la ubicación de la ruta de reserva y la ruta de activación del perfil de organizador |
| P13 | Verificación de las versiones exactas exigidas (React Router 8.3.1, TanStack Query 5.102.8, Zustand 5.0.15, Zod 4.4.3, Mantine 9.4.1) frente a la documentación consultada. | Abierta; no se afirma compatibilidad |
| P14 | Requisitos de la contraseña y formato del teléfono. | Abierta |
| P15 | Uso de `@mantine/hooks`. | Resuelta por elección técnica: `useState` para los modales locales; la consigna no lo exige |
| P16 | Detalles de la sesión (duración, almacén, contraseñas, dominios y cookies, CSRF). | Abierta |
| P17 | Fuente de datos para desarrollar el frontend sin API. | Resuelta por el usuario (2026-11-10): datos simulados temporales identificados, sin valor como evidencia de integración |


## 9. Decisiones propias y uso de IA

*Los apartados 9.1 y 9.2 corresponden a la Fase 2 y se conservan literalmente.*

### 9.1 Decisión propia del autor

Para esta segunda fase de MODO decidí establecer un plazo de cancelación de 24 horas antes de que empiece la experiencia. Consideré también plazos de 48 y 72 horas, pero preferí las 24 horas porque considero que dan mayor flexibilidad a los participantes para organizarse, especialmente en Ecuador, donde, desde mi experiencia, muchas decisiones sobre actividades se toman con poca anticipación.

Por ejemplo, si una experiencia está programada para el sábado a las 15:00, una persona puede cancelarla el viernes a las 14:00 porque todavía faltan 25 horas. En cambio, si intenta cancelarla el sábado a las 10:00, MODO no lo permite porque faltan solamente cinco horas.

En la primera fase ya contemplaba que los participantes pudieran cancelar sus reservas, pero todavía no había establecido un plazo exacto. En esta fase definí esa condición para que la regla fuera clara y se pudiera comprobar. También consideré la posibilidad de reagendar reservas, pero prefiero dejarla como una mejora futura porque todavía habría que definir sus condiciones y restricciones.

Todavía no he podido comprobar con usuarios y organizadores reales si el plazo de 24 horas es suficiente para ambos. Aunque considero que ofrece mayor flexibilidad a los participantes, me gustaría validar en el futuro si también funciona bien para quienes organizan las experiencias. Tampoco he probado estas reglas dentro de una aplicación funcional, por lo que todavía falta comprobar cómo se comportarían en situaciones reales. Además, queda pendiente estudiar si sería conveniente permitir reagendamientos y bajo qué condiciones.

### 9.2 Uso de IA y herramientas en esta fase

Durante esta segunda fase utilicé Claude Code y Agent Harness Kit (AHK) 3.0.0 como herramientas de apoyo para organizar el trabajo, analizar las reglas de negocio y desarrollar la documentación de MODO.

Claude Code me ayudó a identificar aspectos que todavía necesitaban una decisión. Para cada uno pude revisar diferentes alternativas y elegir la que consideraba más adecuada para el proyecto. Por ejemplo, definí el plazo de cancelación de 24 horas, la retención de plazas durante 10 minutos para los pagos en línea y el cálculo del importe de las reservas según el número de participantes.

También utilicé AHK para registrar las decisiones y revisar que las reglas nuevas fueran coherentes con los casos de uso que ya había aprobado en la primera fase. Durante las revisiones se detectaron algunos aspectos que debían aclararse, así como errores en la documentación, que se corrigieron antes de finalizar la entrega.

Las comprobaciones técnicas, como la validación de las especificaciones, la revisión del entorno y las pruebas de salud del proyecto, fueron ejecutadas mediante Claude Code y sus agentes. Las comprobaciones finales se realizaron con Node 22.23.4, mientras que las tareas anteriores se habían realizado con Node 24.18.0.

Finalmente, Claude Code me ayudó a estructurar el documento acumulativo y comprobar que incluyera los apartados solicitados. Yo participé en las decisiones funcionales, revisé los resultados y autoricé expresamente la aprobación de los documentos correspondientes y la exportación del PDF. Utilicé la IA como apoyo para organizar y verificar el trabajo, manteniendo bajo mi responsabilidad las decisiones tomadas para MODO.

### 9.3 Decisiones propias y uso de IA en la Fase 3

Durante esta fase decidí mantener React con Vite para el frontend y diseñar una API propia con Express y PostgreSQL. Elegí esta arquitectura porque MODO necesita controlar las reservas, los pagos y la disponibilidad desde el servidor. Consideré utilizar Supabase, que habría permitido avanzar más rápido, pero preferí una solución que me permita comprender mejor el funcionamiento de una aplicación Full Stack, aunque requiera más trabajo.

También opté por separar las responsabilidades de las herramientas del frontend. React Router se encargará de la navegación, TanStack Query de consultar y actualizar la información del servidor y Zustand de administrar los avisos de acceso compartidos. Esta separación evita duplicar información y facilita la organización del proyecto.

Por ejemplo, cuando un participante selecciona una experiencia y solicita una reserva, la interfaz recoge los datos, pero la API debe comprobar la disponibilidad antes de confirmar las plazas. Si posteriormente solicita una cancelación, Mantine Modal permite confirmar la acción y el servidor verifica que se cumpla el plazo establecido.

Utilicé Claude Code y AHK para analizar alternativas, consultar documentación y organizar la especificación técnica. Revisé y confirmé las decisiones propuestas considerando las necesidades de MODO. Hasta el momento se ha comprobado el entorno de desarrollo y la coherencia documental, pero todavía no se han implementado ni probado las funcionalidades de reservas, pagos y cancelaciones.

## 10. Fuentes y comprobaciones de esta fase

### 10.0 Retroalimentación docente

Hasta la fecha de esta entrega no he recibido retroalimentación docente sobre la Fase 2. Las aprobaciones registradas en AHK son aprobaciones del autor sobre sus propios documentos y no equivalen a una aprobación del profesor.

### 10.1 Fuentes utilizadas

| Fuente | Identificador / archivo | Estado | Versión o huella (sha256) |
|---|---|---|---|
| CU-01 | `cu-01-explorar-consultar-experiencias` · `docs/use-cases/cu-01-explorar-consultar-experiencias.md` | approved | lastUpdated 2026-10-25T17:43:04.467Z · `192836e7f622beeeefd954447dbf7a7f0f27be4eea1941724a8ec06e0d4fc700` |
| CU-02 | `cu-02-registrarse-para-reservar` · `docs/use-cases/cu-02-registrarse-para-reservar.md` | approved | 2026-10-25T17:52:58.654Z · `45f7f3352ef19c4ebf7d734045238632db1e5cc4eec89bcdce9ed9e1b1bd0cba` |
| CU-03 | `cu-03-publicar-experiencias` · `docs/use-cases/cu-03-publicar-experiencias.md` | approved | 2026-10-25T19:27:07.508Z · `994b3b43b76af65741ccc4643a53d28318d2f6c09f220751e30b834d0d08cbb5` |
| CU-04 | `cu-04-administrar-fechas-cupos-precios` · `docs/use-cases/cu-04-administrar-fechas-cupos-precios.md` | approved | 2026-10-25T19:27:07.519Z · `e1cc02acc53e9ef9062740a347d10bbcc4d8633fef7f32cf48b48dee1d6c68cb` |
| CU-05 | `cu-05-reservar-pago-presencial` · `docs/use-cases/cu-05-reservar-pago-presencial.md` | approved | 2026-10-25T18:10:54.391Z · `05b9c2c1b40dfdff8b45e3a794df390f79de4af99c3268c26112d57a35aa786d` |
| CU-06 | `cu-06-reservar-pago-en-linea` · `docs/use-cases/cu-06-reservar-pago-en-linea.md` | approved | 2026-10-25T18:19:47.417Z · `978252ae06243d5fb727c8147f620b922475d4787a006883bedda01441ac043e` |
| CU-07 | `cu-07-cancelar-reserva` · `docs/use-cases/cu-07-cancelar-reserva.md` | approved | 2026-10-25T18:27:16.035Z · `8cfbc5399db166087974f7f7b72eed7a3313d635b9916011a1b15aaebf209530` |
| CU-08 | `cu-08-registrar-pago-presencial` · `docs/use-cases/cu-08-registrar-pago-presencial.md` | approved (2026-11-06) | 2026-11-07T03:08:39.473Z · `166c518ef58671c61a129cbf05e78229f0d359c02b687726b4bb2573c83c2518` |
| Especificación funcional de Fase 2 | `fase-02-especificacion-funcional` · `docs/specs/fase-02-especificacion-funcional.md` | approved (2026-11-08) | 2026-11-09T01:40:10.237Z · `d20e1f6f6ed9cff279b661dd9e892246a0edad7fa960ca95d646af75fb0a2a04` |
| Especificación técnica de Fase 3 | `fase-03-especificacion-tecnica` · `docs/specs/fase-03-especificacion-tecnica.md` | approved (2026-11-10) | Ver nota |
| Registro del proceso | `docs/proceso.md` | — | `f469401b6e04cc3bb0b8d2a1487d868d4ff6672a08cfbeecdd001f58d5db1cdd` |
| Primera entrega | `docs/entregas/fase-01.md` | sin modificar | `f05a53cdcafb20eb224c5efc1e878e8152fa903569d2f875722739df048db8ac` |
| PDF de la primera entrega | `docs/entregas/MODO-fase-01-definicion-funcional.pdf` | sin modificar | `38026dc6ab65f9572e548e9ffbef8a7d7904d3dbe534c98459d5fc0913886766` |
| Segunda entrega | `docs/entregas/fase-02.md` | sin modificar | `1e7ce60c2c75318402e79455f878881656e8ff83610df742fa6761b712021926` |
| PDF de la segunda entrega | `docs/entregas/MODO-fase-02-procesos-y-reglas.pdf` | sin modificar | `d65d23e05e6eb6332e255fa1703ea6a489cb2a1b20808f7b332a34ab89c042b3` |
| Consigna (fuente externa) | 03-diseno-tecnico.pdf | — | Según el usuario; consultada fuera del repositorio; no copiada |

Las huellas de CU-01 a CU-08, de la especificación funcional y de `docs/proceso.md` coinciden con las registradas en la Fase 2 (la especificación funcional, con la huella posterior a su aprobación que se indica en la nota de 10.1 de la Fase 2).

**Nota sobre la especificación técnica.** El usuario aprobó explícitamente la revisión con sha256 `446862126c76837035a7c9a68294550e1109558ec334f951a48d3e087713dbdd` (`last_updated` 2026-11-10T19:34:07.212Z; tarea 52). El archivo actual tiene sha256 `d1a0b4fe40e96ee85aa1c2609d6b369bfcb1a6185538c0a0f64f1c68a0d5345e`; difiere de la revisión aprobada solo en el frontmatter que cambió la transición de estado `draft` → `approved` (`status` y `last_updated` 2026-11-10T20:01:29.864Z), sin cambios en el contenido técnico.

### 10.2 Entorno

Valores observados el 2026-11-10 (tarea 52) con comandos de solo lectura.

| Herramienta | Versión observada | Comentario |
|---|---|---|
| Node | v24.18.0 (`node -v`) | Cumple el rango `engines` de `package.json` (`>=22.22.0`), pero no es la línea Node 22 que pide la consigna. No se cambió. |
| pnpm | 11.17.0 (`pnpm -v`) | Coincide con `packageManager` de `package.json`. |
| AHK | 3.0.0 (`ahk --version`) | Versión usada durante la Fase 3. |

### 10.3 Comprobaciones realizadas en esta fase

| Comprobación | Resultado | Qué demuestra | Límite |
|---|---|---|---|
| Health de AHK al cerrar las tareas 36 a 51 de la Fase 3 | 16 ejecuciones passed; tareas 47 a 51: runs `35cf13d8-d27f-46f4-8c4e-275f4293153b`, `95a41df7-122c-486c-a864-da0d8cbd563d`, `5ab44646-993a-4103-b1f2-dc9bf7dc187d`, `7278481e-28c9-4a8f-8aeb-6db53ff5952b`, `cbd9a39c-59c8-42c4-b2c4-a0f40121fb52` | El build real de la plantilla (`pnpm build` → `tsc -b && vite build`) siguió funcionando durante la fase. | Compila la plantilla React; no prueba ninguna regla ni decisión técnica de MODO. El health final de la tarea 52 se registra en AHK al cerrarla. |
| Llamada MCP real `specs_transition` (tarea 52) | `fase-03-especificacion-tecnica`: `draft` → `approved`, tras comprobar que el sha256 coincidía con la revisión aprobada | Estado documental vigente. | Es una aprobación del autor, no del profesor (10.0). |
| Llamada MCP real `specs_validate` (tarea 52, después de la transición) | `{"valid":true,"errors":[]}` | Frontmatter, enlaces y referencias válidos. | Formato válido no prueba que las decisiones sean correctas. |
| Documentación consultada con Context7 | React Router 7.13.0, TanStack Query v5.90.3, Zustand v5.0.14, Zod v4.3.6, Mantine 9.0.0, Express v5.3.0 y express-session v1.19.0 | Comportamiento documentado en esas versiones. | Son versiones inferiores a las exigidas; no se afirma compatibilidad con las versiones exigidas (P13 técnica (8.5)). |
| Integridad de fuentes (comprobación del agente con `shasum -a 256`, no es un registro de AHK) | CU-01 a CU-08, especificación funcional, `docs/proceso.md`, `fase-01.md`, `fase-02.md` y los dos PDF: huellas de 10.1, sin cambios durante la redacción de esta entrega | Esta entrega no modificó sus fuentes. | Solo compara huellas. |

### 10.4 No comprobado

- Funcionalidades de MODO: no existen todavía (`src/` conserva la plantilla de Vite), así que no se ha ejecutado ninguna prueba funcional ni técnica. El apartado 28 describe pruebas previstas.
- Dependencias exigidas por la consigna (React Router, TanStack Query, Zustand, Zod, Mantine): no instaladas.
- API, base de datos, pagos y correo: no existen; ningún contrato está verificado (apartado 25).
- Compatibilidad de las versiones exactas exigidas con la documentación consultada (P13 técnica (8.5)).
- PDF de esta entrega: se exporta desde la versión final de este documento, tras la revisión del autor; su verificación (número de páginas, 30 apartados, tablas y texto seleccionable) consta en el registro de AHK (tarea 53), no en este documento.

## 11. Procesos detallados

Cada proceso (PR-xx) cubre un caso de uso; CU-05 y CU-06 se mantienen separados porque sus recorridos difieren (pago presencial frente a pago en línea con retención). Las reglas se citan por identificador y se describen una sola vez en el apartado 12 o en las fichas del apartado 7.

### PR-01 · Explorar catálogo y consultar detalle

| Elemento | Contenido |
|---|---|
| Casos | CU-01 |
| Actor | Visitante (también cualquier usuario con sesión) |
| Inicio | El visitante accede al catálogo público. |
| Condiciones previas | Existen experiencias publicadas en el DMQ (CU-03). No requiere sesión. |
| Datos de entrada | Texto de búsqueda, filtros (categoría, ubicación, fecha, rango de precios en USD, plazas disponibles, modalidad), orden. Todos opcionales. |
| Pasos | 1) Visitante abre el catálogo. 2) MODO lista experiencias con sesiones futuras, por fecha más próxima, agotadas al final. 3) Visitante busca, filtra u ordena. 4) MODO muestra solo las que cumplen todo. 5) Visitante abre una experiencia. 6) MODO muestra el detalle con sesiones, precios y disponibilidad. |
| Decisiones | ¿La sesión es futura (antes de su hora de inicio)? ¿Alguna sesión futura tiene plazas (disponible) o ninguna («Agotado»)? ¿No tiene sesiones futuras (oculta)? |
| Reglas | CU-01 R1–R8; RF2-07, RF2-12, RF2-13, RF2-16 |
| Resultado | Éxito: listado y detalle. Sin resultados: aviso y opción de modificar o limpiar filtros (CU-01 F1). |

### PR-02 · Registro, verificación e inicio de sesión

| Elemento | Contenido |
|---|---|
| Casos | CU-02 |
| Actor | Visitante; usuario con cuenta para el inicio de sesión |
| Inicio | El visitante elige registrarse (o llega desde un intento de reserva, CU-02 A3). |
| Condiciones previas | Sin sesión iniciada. |
| Datos de entrada | Nombre completo, correo, contraseña, aceptación de términos; para iniciar sesión, correo y contraseña. |
| Pasos | 1) MODO pide los datos y muestra términos e información de datos personales. 2) Visitante los introduce y acepta. 3) MODO crea la cuenta, envía el correo de verificación e inicia la sesión automáticamente (RF2-06). 4) El usuario verifica su correo cuando abre el enlace. |
| Decisiones | ¿Datos completos y válidos? ¿Términos aceptados? ¿Correo ya registrado? ¿Correo verificado al intentar reservar? |
| Reglas | CU-02 R1–R6; RF2-06 |
| Resultado | Éxito: cuenta creada, sesión iniciada, correo pendiente de verificar. Fallo: sin cuenta ni sesión (CU-02 F1–F3); credenciales incorrectas (F4). |

### PR-03 · Activar perfil y publicar experiencia

| Elemento | Contenido |
|---|---|
| Casos | CU-03 |
| Actor | Usuario registrado que actúa como organizador |
| Inicio | El usuario activa su perfil de organizador o, si ya lo tiene, elige publicar. |
| Condiciones previas | Sesión iniciada; experiencia dentro del DMQ. |
| Datos de entrada | Nombre, descripción, categoría, zona y sector o parroquia, modalidad de pago, imágenes, duración, qué incluye; una o más sesiones con fecha, horario, cupos y precio en USD. |
| Pasos | 1) Activa el perfil (CU-03 R1). 2) Introduce la experiencia y sus sesiones. 3) Confirma la publicación. 4) MODO comprueba datos, ubicación, fechas futuras y duplicados. 5) MODO publica y la experiencia aparece en el catálogo. |
| Decisiones | ¿Información completa? ¿Ubicación en el DMQ? ¿Al menos una fecha futura? ¿Hay sesiones con exactamente la misma fecha y horario? |
| Reglas | CU-03 R1–R7; RF2-05 (extiende RF2-04), RF2-13 |
| Resultado | Éxito: publicada (sin borrador). Fallo: no se publica e indica qué corregir (CU-03 F1–F3, RF2-05). |

### PR-04 · Gestionar sesiones de una experiencia

| Elemento | Contenido |
|---|---|
| Casos | CU-04 |
| Actor | Organizador de la experiencia |
| Inicio | El organizador abre una de sus experiencias publicadas. |
| Condiciones previas | Sesión iniciada; experiencia propia publicada. |
| Datos de entrada | Fecha, horario, cupos y precio en USD de la sesión que se añade o modifica; o la sesión que se elimina. |
| Pasos | 1) Elige añadir, modificar o eliminar una sesión. 2) Introduce el cambio. 3) MODO comprueba las reglas de protección de reservas, fecha futura y duplicados. 4) MODO guarda el cambio y el detalle público lo refleja. |
| Decisiones | ¿La sesión tiene reservas activas? ¿Cupos ≥ plazas reservadas? ¿Fecha futura? ¿Coincide exactamente con otra sesión de la misma experiencia? ¿Es la última sesión futura? |
| Reglas | CU-04 R1–R6; RF2-02, RF2-04, RF2-12, RF2-13, RF2-18 |
| Resultado | Éxito: cambio guardado; reservas existentes sin cambios. Fallo: no se guarda e informa (CU-04 F1–F3, RF2-04). Eliminar la última fecha futura oculta la experiencia sin borrarla (CU-04 A3). |

### PR-05 · Reservar con pago presencial

| Elemento | Contenido |
|---|---|
| Casos | CU-05 |
| Actor | Participante |
| Inicio | El participante selecciona una sesión y el número de plazas. |
| Condiciones previas | Sesión iniciada y correo verificado (RF2-06); experiencia con modalidad presencial; sesión futura (antes de su hora de inicio, RF2-16) con plazas. |
| Datos de entrada | Sesión, número de plazas, teléfono si la cuenta no lo tiene. |
| Pasos | 1) Selecciona sesión y plazas. 2) Si falta teléfono, lo introduce. 3) MODO muestra el resumen: importe total en USD, pago al llegar y política de 24 horas. 4) Confirma. 5) MODO comprueba plazas y hora. 6) MODO confirma la reserva, descuenta plazas y fija el estado del pago en «Pendiente». 7) MODO muestra la confirmación indicando que se paga al llegar. |
| Decisiones | ¿Correo verificado? ¿Teléfono? ¿Plazas suficientes? ¿Antes de la hora de inicio? |
| Reglas | CU-05 R1–R6; RF2-01 (política mostrada), RF2-03, RF2-06, RF2-07, RF2-13, RF2-15, RF2-16, RF2-18 |
| Resultado | Éxito: reserva confirmada con importe total conservado. Fallo: no se crea reserva (CU-05 F1–F3; RF2-16 a partir de la hora de inicio). |

### PR-06 · Reservar con pago en línea

| Elemento | Contenido |
|---|---|
| Casos | CU-06 |
| Actor | Participante |
| Inicio | El participante selecciona una sesión y el número de plazas. |
| Condiciones previas | Sesión iniciada y correo verificado; modalidad en línea; sesión futura con plazas. |
| Datos de entrada | Sesión, plazas, teléfono si falta, medio de pago (tarjeta de crédito o de débito). |
| Pasos | 1) Selecciona sesión y plazas. 2) Teléfono si falta. 3) MODO muestra importe total en USD, política de 24 horas y los medios admitidos. 4) Elige tarjeta e inicia el pago. 5) MODO comprueba plazas y las retiene un máximo de 10 minutos. 6) El participante completa el pago. 7) Si el pago llega dentro de los 10 minutos, MODO confirma la reserva. 8) MODO muestra la confirmación de reserva y pago. |
| Decisiones | ¿Plazas suficientes al iniciar? ¿Antes de la hora de inicio? ¿Medio admitido? ¿Pago correcto dentro de los 10 minutos, fallido, abandonado, vencido o confirmado tarde? |
| Reglas | CU-06 R1–R6; RF2-01, RF2-06, RF2-08, RF2-09, RF2-10, RF2-11, RF2-12, RF2-13, RF2-14, RF2-16, RF2-18 |
| Resultado | Éxito: reserva confirmada y pagada. Cancelación por el usuario (abandono) o fallo: sin reserva y plazas liberadas (RF2-08). Pago tardío: sin reserva, reembolso del 100 % al método original iniciado en ≤24 h (RF2-09 a RF2-11). |

### PR-07 · Cancelar una reserva

| Elemento | Contenido |
|---|---|
| Casos | CU-07 |
| Actor | Participante titular de la reserva |
| Inicio | El participante consulta sus reservas y selecciona una. |
| Condiciones previas | Sesión iniciada; reserva propia confirmada de una sesión futura. |
| Datos de entrada | La reserva elegida y la confirmación de cancelación. |
| Pasos | 1) Consulta sus reservas. 2) Elige una. 3) MODO muestra la política (24 horas) y, si pagó en línea, que corresponde reembolso completo. 4) Confirma. 5) MODO comprueba que faltan 24 h o más (hora America/Guayaquil). 6) MODO cancela la reserva completa y libera plazas. 7) En línea: inicia el reembolso del 100 % al método original en ≤24 h. Presencial: sin reembolso; el estado del pago y su historial se conservan. 8) Muestra la confirmación. |
| Decisiones | ¿Faltan 24 h o más? ¿Modalidad en línea o presencial? ¿Pago presencial «Pendiente» o «Recibido»? |
| Reglas | CU-07 R1, R3–R7 (R2 concretada por RF2-01); RF2-01, RF2-10, RF2-11, RF2-12, RF2-13, RF2-17 |
| Resultado | Éxito: reserva cancelada. Fallo: fuera de plazo, no se cancela y se informa (CU-07 F1); ya cancelada o fecha pasada, no se ofrece (F2). |

### PR-08 · Consultar reservas de una sesión y registrar pago presencial

| Elemento | Contenido |
|---|---|
| Casos | CU-08 |
| Actor | Organizador de la experiencia |
| Inicio | El participante pagó al llegar y el organizador quiere registrarlo; o el organizador quiere consultar las reservas de una sesión. |
| Condiciones previas | Sesión iniciada; experiencia propia; para registrar, reserva presencial «Pendiente». |
| Datos de entrada | Experiencia y sesión elegidas; acción sobre el pago (marcar «Recibido» o corregir a «Pendiente»). No se pide la fecha y hora reales del pago. |
| Pasos | 1) «Mis experiencias». 2) Elige experiencia. 3) Elige fecha y horario. 4) MODO lista reservas confirmadas (nombre, plazas, importe USD, modalidad, estado del pago). 5) Marca un pago presencial «Pendiente» como recibido. 6) MODO cambia el estado a «Recibido» y guarda la entrada del historial. |
| Decisiones | ¿Experiencia propia? ¿Sesión con reservas? ¿Reserva presencial «Pendiente»? Para corregir: ¿la sesión ya comenzó? |
| Reglas | CU-08 R1–R10; RF2-03, RF2-13, RF2-15, RF2-17, RF2-18 |
| Resultado | Éxito: estado del pago actualizado e historial; la reserva no cambia. Sin reservas: mensaje de CU-08 A4. Fallo: corrección fuera de plazo (F1) o experiencia ajena (F2), sin cambios. |

## 12. Reglas del negocio

Las reglas aprobadas de cada caso (CU-0x R*n*) siguen vigentes tal como figuran en el apartado 7 y no se repiten aquí. Esta tabla consolida una sola vez las reglas de Fase 2; los procesos las referencian por su identificador. La columna «Motivo» solo recoge la razón cuando consta en la especificación o en `docs/proceso.md` (citada literalmente); en los demás casos indica «No consta en las fuentes».

| ID | Condición | Comportamiento exigido | Motivo | Límites, prioridades y excepciones | Procesos |
|---|---|---|---|---|---|
| RF2-01 | El participante intenta cancelar una reserva confirmada. | Faltan ≥24 h para el inicio de la fecha y horario reservados: se permite. Faltan <24 h: se rechaza y MODO informa de que ya no es posible cancelarla directamente. | No consta en las fuentes. | Exactamente 24 h se permite. Se cuenta en hora America/Guayaquil (RF2-12). Concreta CU-07 R2. | PR-05, PR-06 (política mostrada), PR-07 |
| RF2-02 | El organizador añade una fecha y horario. | Las sesiones existentes (día, horario, cupos, precio) y sus reservas no cambian. | No consta en las fuentes. | Sujeta a CU-04 R4, R5 y a RF2-04. | PR-04 |
| RF2-03 | Reserva con pago presencial. | El participante paga al llegar al lugar, antes de comenzar la actividad. | No consta en las fuentes. | La reserva sigue confirmándose automáticamente. No define impago ni inasistencias. | PR-05, PR-08 |
| RF2-04 | El organizador guarda una sesión (alta o modificación permitida). | Si coincide exactamente en fecha y horario con otra sesión de la misma experiencia, no se guarda y MODO explica que ya hay una sesión programada para ese momento. | No consta en las fuentes. | Mismo día con otro horario: permitido. Experiencias distintas pueden coincidir. Solapes parciales no tratados. La modificación solo aplica si CU-04 permite cambiar día u horario. | PR-04 |
| RF2-05 | El organizador publica una experiencia con varias sesiones. | Si dos o más coinciden exactamente en fecha y horario, no se publica hasta corregirlas e indica qué corregir. | No consta en las fuentes. | Mismo día con horarios distintos: permitido. | PR-03 |
| RF2-06 | El usuario completa correctamente el registro. | Queda con la sesión iniciada; puede explorar, filtrar y ver detalles. Sin correo verificado no puede reservar; MODO lo informa y permite reenviar la verificación. | «Así puede explorar las experiencias, utilizar los filtros y consultar sus detalles sin tener que volver a ingresar sus credenciales.» (usuario, 2026-11-05) | Si el registro no se completa, no hay cuenta ni sesión. | PR-02, PR-05, PR-06 |
| RF2-07 | MODO evalúa la disponibilidad de una experiencia en el catálogo. | «Agotado» solo si ninguna sesión futura tiene plazas; las agotadas siguen visibles al final; sin sesiones futuras, oculta; con el filtro de plazas, aparecen las que tienen al menos una sesión futura con plazas. | No consta en las fuentes. | Una sesión concreta sin plazas sigue mostrando «Agotado» (CU-05 F2). Con filtro de fecha: pregunta abierta P1. | PR-01, PR-05 |
| RF2-08 | El participante inicia el pago en línea. | Las plazas quedan retenidas un máximo de 10 minutos. Pago correcto dentro del plazo: se confirma. Fallo, abandono o 10 minutos sin completar: se liberan y no se confirma. | Apartar las plazas «para evitar que otros usuarios las reserven durante ese proceso» (`docs/proceso.md`, decisiones de CU-06). La duración de 10 minutos no tiene motivo registrado. | Reintentar exige una nueva reserva, sujeta a disponibilidad. | PR-06 |
| RF2-09 | La confirmación del pago llega después de los 10 minutos. | No se confirma aunque haya plazas; las plazas siguen liberadas; reembolso completo; mensaje claro; nueva reserva para volver a intentarlo. | «Como el periodo de retención ya terminó, las plazas deben permanecer liberadas» (usuario, 2026-11-05). | — | PR-06 |
| RF2-10 | Se reembolsa un pago en línea (cancelación válida o pago tardío). | 100 % del importe pagado, al mismo método de pago original; sin elegir otro método. | No consta en las fuentes. | Método original no disponible: pregunta abierta P2. | PR-06, PR-07 |
| RF2-11 | Cancelación válida de reserva en línea o identificación de un pago tardío. | MODO inicia la solicitud de reembolso en un máximo de 24 horas. | «Quiero distinguir claramente entre el tiempo que tiene MODO para solicitar el reembolso y el tiempo que tarda la entidad financiera en acreditar el dinero.» (usuario, 2026-11-06) | No se fija plazo de acreditación bancaria. Hora America/Guayaquil (RF2-12). | PR-06, PR-07 |
| RF2-12 | Se interpretan fechas y horarios de sesiones y los plazos de RF2-01 y RF2-11. | Zona horaria America/Guayaquil (UTC−5). | No consta en las fuentes. | Solo se aplica a esos ámbitos. | PR-01, PR-04, PR-06, PR-07 |
| RF2-13 | Cualquier precio, importe total, pago o reembolso. | Exclusivamente en USD; sin conversión ni selector de moneda. | No consta en las fuentes. | No define redondeo, impuestos, comisiones, decimales ni formato. | PR-01, PR-03 a PR-08 |
| RF2-14 | El participante elige el medio de pago en línea. | Solo tarjeta de crédito o de débito; MODO muestra el importe total en USD antes; un medio no admitido no inicia el pago, se informa y se permite elegir tarjeta. | No consta en las fuentes. | Sin transferencias ni billeteras; sin proveedores, pasarelas ni marcas definidos. | PR-06 |
| RF2-15 | El participante pagó presencialmente al llegar. | El organizador lo registra manualmente como recibido (CU-08); solo cambia el estado del pago; la reserva sigue confirmada desde que se hizo; solo en experiencias propias. | No consta en las fuentes. | No define impago ni inasistencias. | PR-05, PR-08 |
| RF2-16 | Se intenta una nueva reserva o se evalúa la disponibilidad. | Se admiten nuevas reservas solo antes de la hora exacta de inicio; desde esa hora la sesión deja de ser futura para el catálogo y para «Agotado». | No consta en las fuentes. | Sin cierre anticipado. No afecta a CU-03 ni CU-04. Pago en línea que termina después del inicio: pregunta abierta P4. | PR-01, PR-05, PR-06 |
| RF2-17 | Cancelación válida de una reserva con pago presencial. | Se cancela la reserva completa y se liberan plazas sin reembolso. Si el pago es «Recibido», se conservan el estado y su historial y MODO no afirma que no hubo pago ni que se devolvió. | No consta en las fuentes. | Devolución presencial y dinero fuera de MODO: fuera del alcance. | PR-07, PR-08 |
| RF2-18 | El participante selecciona plazas en una sesión. | Importe total = precio por participante × plazas, mostrado antes de confirmar o pagar y conservado tras confirmar aunque cambie el precio. | No consta en las fuentes. | Sin impuestos, comisiones, descuentos ni redondeo. Cambio de precio antes de confirmar: pregunta abierta P5. | PR-04, PR-05, PR-06, PR-08 |

**Prioridades entre reglas.** RF2-12 fija la hora con que se evalúan RF2-01, RF2-11 y RF2-16. RF2-16 concreta qué es una sesión «futura» para RF2-07 y las precondiciones de CU-05 y CU-06. RF2-09 prevalece sobre la confirmación automática de CU-06 R3 cuando el pago llega fuera de la retención de RF2-08.

## 13. Datos necesarios y su significado

No se definen tablas, tipos ni almacenamiento; solo la información que cada proceso necesita.

| Dato | Proceso | Origen | Significado | Obligatorio | Valores permitidos | Quién lo ve / modifica |
|---|---|---|---|---|---|---|
| Nombre completo, correo, contraseña | PR-02 | Usuario | Identifican la cuenta. | Sí | Correo único por cuenta (CU-02 R6). Requisitos de contraseña: fuera de alcance. | El titular. |
| Aceptación de términos | PR-02 | Usuario | Consentimiento previo a crear la cuenta. | Sí | Aceptado | — |
| Correo verificado | PR-02, PR-05, PR-06 | Producto | Si la cuenta puede reservar. | — | Sí / no | MODO lo actualiza al verificar. |
| Teléfono | PR-05, PR-06 | Usuario (primera reserva) | Contacto del participante. | Sí en la primera reserva si falta | No definido | El titular. |
| Perfil de organizador | PR-03 | Usuario (activación) | Permite publicar. | — | Activo / no activo | El titular. |
| Datos de la experiencia (nombre, descripción, categoría, zona y sector o parroquia, modalidad de pago, imágenes, duración, qué incluye) | PR-01, PR-03 | Organizador | Información pública de la experiencia. | Sí | Ubicación dentro del DMQ; modalidad en línea o presencial. Límites de imágenes y textos: no definidos. | Público lo ve; solo el organizador la crea. |
| Organizador y fecha de publicación | PR-01 | Producto | Autoría y criterio de orden. | — | — | Visibles en catálogo y detalle. |
| Sesión: fecha y horario | PR-03, PR-04 | Organizador | Inicio de la experiencia (hora America/Guayaquil). | Sí | Futura; sin duplicar exactamente en la misma experiencia. | Público lo ve; solo el organizador modifica, con las restricciones de CU-04. |
| Sesión: cupos | PR-03, PR-04 | Organizador | Plazas totales. | Sí | No inferior a las plazas reservadas. Mínimo y máximo: no definidos. | Ídem. |
| Sesión: precio por participante | PR-03, PR-04 | Organizador | Precio individual en USD. | Sí | USD. Decimales, límites y sesiones gratuitas: no definidos. | Ídem. |
| Plazas disponibles | PR-01, PR-05, PR-06 | Producto (calculado) | Cupos menos plazas reservadas o retenidas. | — | ≥ 0 | Público lo ve. |
| «Agotado» / sesión futura | PR-01 | Producto (calculado) | Disponibilidad según RF2-07 y RF2-16. | — | — | Público lo ve. |
| Sesión y número de plazas de la reserva | PR-05, PR-06 | Participante | Qué reserva. | Sí | 1 o más, sin superar la disponibilidad. Máximo por reserva: no definido. | Participante y organizador. |
| Importe total | PR-05, PR-06, PR-08 | Producto (calculado y conservado) | Precio × plazas en USD (RF2-18). | — | USD | Participante; organizador en la lista de CU-08. |
| Modalidad de pago de la reserva | PR-05 a PR-08 | Producto (según la experiencia) | Presencial o en línea. | — | Presencial / en línea | Participante y organizador. |
| Estado de la reserva | PR-05 a PR-08 | Producto | Ver apartado 15. | — | Confirmada / cancelada | Participante; organizador ve las confirmadas. |
| Estado del pago presencial | PR-05, PR-07, PR-08 | Producto («Pendiente») y organizador («Recibido») | Constancia del pago al llegar. | — | «Pendiente» / «Recibido» | Organizador lo modifica (CU-08); la etiqueta para pagos en línea es pregunta abierta P3. |
| Historial del pago presencial | PR-08 | Producto | Quién, «Fecha y hora del registro», estado anterior y nuevo. | — | — | Organizador. No incluye el momento real del pago. |
| Medio de pago en línea | PR-06 | Participante | Cómo se paga. | Sí | Tarjeta de crédito / tarjeta de débito | Participante. |
| Inicio del pago | PR-06 | Producto | Referencia para los 10 minutos de retención. | — | — | — |
| Reembolso | PR-06, PR-07 | Producto | 100 % del importe pagado, USD, método original, solicitud en ≤24 h. | — | — | Participante. |
| Búsqueda, filtros y orden | PR-01 | Usuario | Acotar y ordenar el catálogo. | No | Ver CU-01 R4, R7, R8 y A1–A7. | — |

No se registran datos de acompañantes (CU-05 R2) ni cédula o pasaporte (CU-02 R3).

## 14. Validaciones, permisos y restricciones

| Actor | Acción | Condición para permitirla | Respuesta si no se cumple | ¿Corregible o reintentable? |
|---|---|---|---|---|
| Visitante | Explorar y ver detalle | Ninguna (CU-01) | — | — |
| Visitante | Registrarse | Datos completos y válidos, términos aceptados, correo no registrado (CU-02 R1, R2, R6) | No crea la cuenta; indica qué corregir o, si el correo existe, ofrece iniciar sesión (CU-02 F1–F3) | Sí, corrigiendo los datos |
| Usuario | Iniciar sesión | Credenciales correctas | No inicia sesión e informa (CU-02 F4) | Sí |
| Participante | Reservar (presencial o en línea) | Sesión iniciada, correo verificado (RF2-06), teléfono, plazas suficientes, antes de la hora exacta de inicio (RF2-16) | Correo sin verificar: informa y permite reenviar la verificación. Sin teléfono: indica el dato que falta. Sin plazas: no crea la reserva e informa. A partir de la hora de inicio: no permite la reserva. | Sí, salvo que la sesión ya haya comenzado |
| Participante | Pagar en línea | Tarjeta de crédito o de débito (RF2-14); pago dentro de 10 minutos (RF2-08) | Medio no admitido: no inicia el pago, informa y permite elegir tarjeta. Fallo, abandono o vencimiento: libera plazas. Pago tardío: mensaje de RF2-09 y reembolso. | Sí, con una nueva reserva sujeta a disponibilidad |
| Participante | Cancelar una reserva | Reserva propia (CU-07 R6), confirmada, faltan ≥24 h (RF2-01) | Fuera de plazo: «ya no es posible cancelarla directamente». Ya cancelada o fecha pasada: no se ofrece la opción. Reserva ajena: no permitido. | No |
| Usuario registrado | Activar perfil de organizador | Cuenta registrada (CU-03 R1) | — | — |
| Organizador | Publicar experiencia | Información completa, ubicación en el DMQ, ≥1 fecha futura con horario, cupos y precio, sin duplicados (CU-03 R4, R5; RF2-05) | No publica e indica qué completar o corregir (CU-03 F1–F3) | Sí |
| Organizador | Añadir o modificar sesión | Experiencia propia (CU-04 R5), fecha futura, sin coincidencia exacta (RF2-04); con reservas activas, sin cambiar día u horario y cupos ≥ reservadas (CU-04 R1, R2) | No guarda e informa; en duplicados, «ya hay una sesión programada para ese momento» | Sí, cambiando fecha, horario o cupos |
| Organizador | Eliminar sesión | Sin reservas activas (CU-04 R1) | No lo permite e informa (CU-04 F1) | No |
| Organizador | Consultar reservas y registrar pago presencial | Experiencia propia (CU-08 R1); reserva presencial «Pendiente» (R6) | Experiencia ajena: no permitido (F2). Reserva en línea: no aparece la opción (A1). Sin reservas: «Esta sesión todavía no tiene reservas confirmadas» (A4). | — |
| Organizador | Corregir «Recibido» → «Pendiente» | Antes del comienzo de la sesión (CU-08 R4) | No cambia el estado; explica que el plazo para corregirlo terminó (F1) | No |

Ocultar una opción no sustituye al permiso: en CU-07 R6, CU-04 R5 y CU-08 R1 la restricción es sobre quién puede realizar la acción, no solo sobre lo que se muestra.

## 15. Estados y cambios permitidos

Las respuestas temporales (carga, error de datos) no son estados del producto. Las «plazas retenidas» durante el pago en línea son una retención temporal de plazas, no un estado de la reserva.

**Reserva**

| Estado inicial | Cambio | Actor | Condición | Efecto |
|---|---|---|---|---|
| (no existe) | → Confirmada (presencial) | Participante | Plazas suficientes, correo verificado, antes de la hora de inicio (CU-05 R4, RF2-16) | Plazas descontadas; estado del pago «Pendiente»; importe total conservado (RF2-18). |
| (no existe) | → Confirmada (en línea) | Participante | Pago correcto dentro de los 10 minutos (RF2-08) | Plazas reservadas; importe conservado. |
| (no existe) | sin reserva | — | Pago fallido, abandonado, vencido o confirmado tarde (RF2-08, RF2-09) | Plazas liberadas; si hubo cobro tardío, reembolso. |
| Confirmada | → Cancelada | Participante titular | Faltan ≥24 h (RF2-01, RF2-12); reserva completa (CU-07 R7) | Plazas liberadas; en línea, reembolso (RF2-10, RF2-11); presencial, sin reembolso y estado del pago conservado (RF2-17). |
| Cancelada o con fecha pasada | — | — | — | No se ofrece la cancelación (CU-07 F2). |

**Estado del pago presencial (CU-08)**

| Estado inicial | Cambio | Actor | Condición | Efecto |
|---|---|---|---|---|
| — | → «Pendiente» | Producto | Al confirmarse la reserva presencial | — |
| «Pendiente» | → «Recibido» | Organizador | Experiencia propia; en cualquier momento, también después de la sesión (R7, A3) | Entrada en el historial; la reserva no cambia (R2). |
| «Recibido» | → «Pendiente» | Organizador | Antes del comienzo de la sesión (R4) | Entrada en el historial; la reserva no cambia (R3). Después del comienzo: rechazado (F1). |
| «Pendiente» o «Recibido» | sin cambio | — | Cancelación de la reserva | Se conservan estado e historial (RF2-17). |

Las reservas en línea no tienen esta opción (R6).

**Sesión:** futura hasta su hora exacta de inicio; desde entonces deja de contar para el catálogo y para «Agotado» (RF2-16). Una sesión sin plazas muestra «Agotado» y no se puede reservar (CU-05 F2). Con reservas activas no se elimina ni cambia de día u horario (CU-04 R1).

**Experiencia en el catálogo:** disponible (alguna sesión futura con plazas) → «Agotado» (ninguna sesión futura con plazas, visible al final) → oculta (sin sesiones futuras; no se elimina, CU-04 A3) (RF2-07, RF2-16). La publicación es inmediata: no hay estado de borrador (CU-03 CA8).

**Cuenta:** correo sin verificar → verificado (CU-02); perfil de organizador inactivo → activo (CU-03 R1).

**Reembolso:** las fuentes solo definen que MODO inicia la solicitud en un máximo de 24 horas (RF2-11). No se definen más estados del reembolso y no se inventan.

## 16. Cálculos y ejemplos

Todos los importes están en USD (RF2-13). No se aplican impuestos, comisiones, descuentos ni redondeos; el número de decimales y el formato no están definidos (RF2-13, RF2-18). Los ejemplos proceden de las fuentes.

| Cálculo | Entradas y regla | Ejemplo esperado | Límite o entrada inválida |
|---|---|---|---|
| Plazo de cancelación (RF2-01, RF2-12) | Tiempo hasta el inicio de la sesión reservada, en hora America/Guayaquil. Se permite si es ≥ 24 h. | Sesión el sábado a las 15:00: se puede cancelar hasta el viernes a las 15:00, inclusive (CA-F2-48). Exactamente 24 h: permitido (CA-F2-02). | Viernes a las 15:01: rechazado (CA-F2-49). Faltan 23 h 59 min: rechazado (CA-F2-03). |
| Cierre de reservas (RF2-16, RF2-12) | Hora actual frente a la hora exacta de inicio de la sesión. Se admite si es anterior. | Sesión a las 15:00: reservar a las 14:59 está permitido (CA-F2-71); a las 12:00 del mismo día también (CA-F2-77). | A las 15:00 ya no se permite (CA-F2-72, CA-F2-73); la sesión deja de contar en el catálogo (CA-F2-74 a CA-F2-76). |
| Retención en el pago en línea (RF2-08, RF2-09) | Tiempo desde el inicio del pago; máximo 10 minutos. | Pago completado dentro de los 10 minutos: reserva confirmada (CA-F2-30). | 10 minutos sin completar: plazas liberadas (CA-F2-34). Confirmación tras los 10 minutos: no se confirma y se reembolsa el 100 % (CA-F2-36 a CA-F2-42). |
| Importe total (RF2-18) | Precio por participante de la sesión × plazas seleccionadas. | 20 USD × 3 plazas = 60 USD (CA-F2-82); 1 plaza = 20 USD (CA-F2-83). | El precio cambia a 25 USD: la reserva ya confirmada conserva 60 USD (CA-F2-86); una nueva reserva de 3 plazas = 25 × 3 = 75 USD (CA-F2-87). El total es exactamente 60 USD, sin sumas ni restas (CA-F2-89). |
| Reembolso (CU-07 R3, RF2-09, RF2-10, RF2-11) | 100 % del importe pagado, en USD, al método original; MODO inicia la solicitud en ≤ 24 h desde la cancelación válida o la identificación del pago tardío. | Cancelación válida de una reserva pagada en línea: reembolso completo (CA-F2-41, CA-F2-44). | El plazo de acreditación bancaria no está definido. Reserva presencial: sin reembolso (RF2-17). |
| Plazas disponibles (CU-05 R1, CU-07 R4, CU-04 R2) | Cupos menos plazas reservadas; se recuperan al cancelar. | Reservar disminuye las plazas en el número reservado (CU-05 CA2); cancelar las devuelve (CU-07 CA2). | Pedir más plazas de las disponibles: se rechaza (CU-05 CA3, CU-06 CA6). Reducir cupos por debajo de lo reservado: no permitido (CU-04 CA5). |

## 17. Alternativas, errores y recuperación

No se añaden escenarios que dependan de servicios o capacidades fuera del alcance aprobado.

| Proceso | Situación | Qué ve el usuario | Qué cambia / qué permanece | Cómo continúa |
|---|---|---|---|---|
| PR-01 | Búsqueda o filtros sin resultados (CU-01 F1) | Aviso de que no hay coincidencias | Nada cambia | Modificar o limpiar filtros |
| PR-02 | Datos incompletos o inválidos; términos no aceptados (CU-02 F1, F2) | Qué datos corregir | No se crea cuenta ni sesión (RF2-06) | Corregir y reenviar |
| PR-02 | Correo ya registrado (F3) | Aviso y oferta de iniciar sesión | No se crea una segunda cuenta | Iniciar sesión |
| PR-02 | Credenciales incorrectas (F4) | Aviso | Sin sesión | Reintentar |
| PR-02 / PR-05 / PR-06 | Intento de reservar con el correo sin verificar (CU-02 A1, RF2-06) | Debe verificar el correo; opción de reenvío | Sin reserva | Verificar y continuar la reserva |
| PR-03 | Información incompleta, ubicación fuera del DMQ, fecha pasada (CU-03 F1–F3) o sesiones duplicadas (RF2-05) | Qué completar o corregir | No se publica | Corregir y publicar |
| PR-04 | Eliminar o cambiar día u horario con reservas activas; cupos bajo lo reservado; fecha pasada (CU-04 F1–F3) | Aviso | No se guarda el cambio | Otro cambio permitido |
| PR-04 | Sesión duplicada (RF2-04) | «Ya hay una sesión programada para ese momento» | No se guarda | Cambiar fecha u horario |
| PR-05 | Plazas insuficientes; sesión agotada; teléfono no indicado (CU-05 F1–F3) | Aviso o dato que falta | Sin reserva | Elegir otra cantidad o sesión; aportar teléfono |
| PR-05 / PR-06 | Hora de inicio alcanzada (RF2-16) | No se permite reservar | Sin reserva | Elegir otra sesión futura |
| PR-06 | Plazas insuficientes al iniciar el pago (CU-06 F1) | Aviso | No se retienen plazas | Elegir otra cantidad o sesión |
| PR-06 | Medio no admitido (RF2-14) | Medio no disponible; opción de tarjeta | No se inicia el pago | Elegir tarjeta de crédito o de débito |
| PR-06 | Pago fallido, abandonado o vencido (CU-06 F2, F3; RF2-08) | Aviso (en el fallo) | Plazas liberadas; sin reserva | Nueva reserva si hay plazas |
| PR-06 | Pago confirmado después de los 10 minutos (RF2-09) | Pago fuera de plazo, reserva no confirmada, devolución en gestión | Plazas siguen liberadas; reembolso del 100 % al método original (RF2-10, RF2-11) | Nueva reserva con la disponibilidad actual |
| PR-07 | Fuera de plazo (CU-07 F1, RF2-01) | «Ya no es posible cancelarla directamente» | La reserva sigue confirmada | No hay otra vía (cancelación por otros canales excluida) |
| PR-07 | Reserva ya cancelada o fecha pasada (F2) | No se ofrece la cancelación | — | — |
| PR-07 | Cancelación presencial con pago «Recibido» (RF2-17) | Confirmación de cancelación, sin afirmar que no hubo pago ni que se devolvió | Reserva cancelada y plazas liberadas; estado «Recibido» e historial conservados | — |
| PR-08 | Sesión sin reservas confirmadas (CU-08 A4) | «Esta sesión todavía no tiene reservas confirmadas» | Nada | Volver o elegir otra sesión |
| PR-08 | Corrección después del comienzo (F1) | El plazo para corregirlo terminó | Estado sin cambios; el intento no queda en el historial | No hay otra vía |
| PR-08 | Experiencia ajena (F2) | No permitido | Nada | — |

Operación repetida: reintentar una reserva en línea tras un fallo es siempre una nueva reserva (RF2-08); un pago presencial ya «Recibido» no vuelve a ofrecer la opción de registro (CU-08 R6).

## 18. Criterios de aceptación y ejemplos comprobables

Los criterios describen el comportamiento esperado. No se han ejecutado pruebas, porque las funcionalidades de MODO no están implementadas. Los criterios propios de cada caso (CU-0x CA*n* y CA-08-*nn*) figuran en las fichas del apartado 7 y se relacionan en el apartado 19. Esta lista recoge los 85 criterios activos de Fase 2. CA-F2-47, CA-F2-59, CA-F2-65 y CA-F2-70 están **retirados** (2026-11-08): describían el documento y su contenido pasó a las exclusiones del apartado 5.3; no se evalúan.

| ID | Proceso | Reglas | Condición inicial | Acción | Resultado esperado |
|---|---|---|---|---|---|
| CA-F2-01 | PR-07 | RF2-01 | Reserva confirmada; faltan más de 24 h para el inicio de la fecha y horario reservados | El participante cancela | La cancelación se permite. |
| CA-F2-02 | PR-07 | RF2-01 | Reserva confirmada; faltan exactamente 24 h para el inicio | El participante cancela | La cancelación se permite (caso límite incluido). |
| CA-F2-03 | PR-07 | RF2-01 | Reserva confirmada; faltan menos de 24 h para el inicio (por ejemplo, 23 h 59 min) | El participante cancela | MODO rechaza la cancelación directa y muestra que ya no es posible cancelarla directamente. |
| CA-F2-04 | PR-05, PR-06, PR-07 | RF2-01 | Participante a punto de confirmar una reserva (CU-05, CU-06) o una cancelación (CU-07) | Llega al paso de confirmación | MODO muestra la política con el plazo de 24 h. |
| CA-F2-05 | PR-04 | RF2-02 | Experiencia que ya tiene sesiones | El organizador añade una nueva fecha y horario | El día, el horario, los cupos y el precio de las sesiones existentes no cambian. |
| CA-F2-06 | PR-04 | RF2-02 | Experiencia con sesiones que tienen reservas | El organizador añade una nueva fecha y horario | Las reservas existentes de las demás sesiones conservan fecha, horario, plazas y precio. |
| CA-F2-07 | PR-04 | RF2-02 | Experiencia que ya tiene sesiones | El organizador añade una nueva fecha y horario | El detalle de la experiencia (CU-01) muestra la nueva sesión junto con las existentes. |
| CA-F2-08 | PR-05 | RF2-03 | Reserva con pago presencial (CU-05) | El participante ve el resumen previo a la confirmación (paso 3) | Indica que el pago se realiza en el lugar, al llegar y antes de que comience la actividad. |
| CA-F2-09 | PR-05 | RF2-03 | Reserva con pago presencial (CU-05) confirmada | El participante ve la confirmación (paso 7) | Indica que el pago se realiza en el lugar, al llegar y antes de que comience la actividad. |
| CA-F2-10 | PR-05 | RF2-03 | Reserva con pago presencial (CU-05) con disponibilidad suficiente | El participante confirma la reserva | No se solicita ningún pago en línea; la reserva se confirma automáticamente. |
| CA-F2-11 | PR-04 | RF2-04 | Experiencia con una sesión en una fecha y horario dados | El organizador añade otra sesión con exactamente la misma fecha y horario | MODO no la guarda y explica que ya hay una sesión programada para ese momento. |
| CA-F2-12 | PR-04 | RF2-04 | Sesión sin reservas activas (CU-04 A1) | El organizador cambia su fecha u horario para que coincida exactamente con otra sesión de la misma experiencia | MODO no guarda el cambio y muestra el mismo mensaje. |
| CA-F2-13 | PR-04 | RF2-04 | Experiencia con una sesión en un día | El organizador añade otra sesión el mismo día con otro horario | Se permite. |
| CA-F2-14 | PR-04 | RF2-04 | Sesión de una experiencia en una fecha y horario dados | Se guarda una sesión de otra experiencia con la misma fecha y horario | RF2-04 no impide guardarla. |
| CA-F2-15 | PR-04 | RF2-04 | Sesión rechazada por CA-F2-11 o CA-F2-12 | El organizador cambia la fecha o el horario por uno que no coincide con otra sesión de la experiencia | La sesión se guarda si cumple las demás reglas de CU-04 (por ejemplo, R4). |
| CA-F2-16 | PR-03 | RF2-05 | Experiencia con dos o más sesiones de exactamente la misma fecha y horario | El organizador publica (CU-03) | MODO no la publica e indica que debe corregir las sesiones duplicadas. |
| CA-F2-17 | PR-03 | RF2-05 | Publicación rechazada por CA-F2-16 | El organizador corrige los duplicados y el resto cumple CU-03 (R5, F1–F3) | La experiencia se publica y aparece en el catálogo. |
| CA-F2-18 | PR-03 | RF2-05 | Experiencia con varias sesiones en un mismo día y horarios diferentes | El organizador publica | RF2-05 no impide la publicación. |
| CA-F2-19 | PR-02 | RF2-06 | Visitante sin sesión iniciada | Completa correctamente el registro (CU-02 CA1) | Queda con la sesión iniciada sin volver a introducir correo ni contraseña. |
| CA-F2-20 | PR-02 | RF2-06 | Visitante con datos incompletos o no válidos, términos no aceptados o correo ya registrado (CU-02 F1–F3) | Intenta registrarse | No se crea la cuenta y no se inicia ninguna sesión. |
| CA-F2-21 | PR-02 | RF2-06 | Usuario con la sesión iniciada tras el registro y el correo sin verificar | Explora experiencias, usa los filtros y consulta el detalle (CU-01) | Se permite. |
| CA-F2-22 | PR-02, PR-05, PR-06 | RF2-06 | Usuario con el correo sin verificar | Intenta completar una reserva | No puede completarla (CU-02 R5). |
| CA-F2-23 | PR-02, PR-05, PR-06 | RF2-06 | Usuario con el correo sin verificar | Intenta reservar | MODO informa de que debe verificar su correo y permite solicitar de nuevo el correo de verificación. |
| CA-F2-24 | PR-02, PR-05, PR-06 | RF2-06 | Usuario que acaba de verificar su correo | Continúa con la reserva (CU-05, CU-06) | Puede continuar si se cumplen las demás condiciones de esos casos. |
| CA-F2-25 | PR-01 | RF2-07 | Experiencia con una sesión futura agotada y otra sesión futura con plazas | Se consulta el catálogo | No aparece como «Agotado» ni se ordena al final por ese motivo. |
| CA-F2-26 | PR-01 | RF2-07 | Experiencia con todas sus sesiones futuras sin plazas | Se consulta el catálogo con cualquier criterio de orden | Aparece como «Agotado» y al final. |
| CA-F2-27 | PR-01 | RF2-07 | Experiencia sin fechas futuras | Se consulta el catálogo público | No aparece. |
| CA-F2-28 | PR-01 | RF2-07 | Filtro de plazas disponibles activo; una experiencia con al menos una sesión futura con plazas y otra con todas sin plazas | Se consulta el catálogo | Aparece la primera, aunque tenga sesiones agotadas; no aparece la segunda. |
| CA-F2-29 | PR-01 | RF2-07 | Experiencia disponible con una sesión sin plazas y otras con plazas | Se consulta el detalle | La sesión sin plazas aparece como «Agotado» y no permite reservar; las demás sí. |
| CA-F2-30 | PR-06 | RF2-08 | Pago en línea iniciado (CU-06) | El participante completa correctamente el pago dentro de los 10 minutos | MODO confirma automáticamente la reserva. |
| CA-F2-31 | PR-06 | RF2-08 | Pago en línea iniciado; retención en curso (máximo 10 minutos) | Otro usuario intenta reservar esas plazas | Las plazas retenidas no están disponibles para él. |
| CA-F2-32 | PR-06 | RF2-08 | Pago en línea iniciado | El pago falla | Plazas liberadas y disponibles, ninguna reserva confirmada y aviso al participante. |
| CA-F2-33 | PR-06 | RF2-08 | Pago en línea iniciado | El participante abandona el proceso de pago | Plazas liberadas y disponibles; la reserva no se confirma. |
| CA-F2-34 | PR-06 | RF2-08 | Pago en línea iniciado | Transcurren 10 minutos sin completar el pago | Plazas liberadas y disponibles; ninguna reserva confirmada. |
| CA-F2-35 | PR-06 | RF2-08 | Pago en línea fallido, abandonado o vencido | El participante quiere volver a intentarlo | Solo puede hacerlo con una nueva reserva y si hay plazas suficientes; si no las hay, no puede iniciar el pago. |
| CA-F2-36 | PR-06 | RF2-09 | Pago en línea cuya confirmación llega después de los 10 minutos de retención, con plazas aún disponibles | Llega la confirmación del pago | MODO no confirma la reserva. |
| CA-F2-37 | PR-06 | RF2-09 | Pago en línea cuya confirmación llega después de los 10 minutos; plazas liberadas al vencer la retención | Llega la confirmación del pago | Las plazas siguen liberadas y disponibles; la confirmación tardía no las vuelve a retener. |
| CA-F2-38 | PR-06 | RF2-09 | Pago en línea cuya confirmación llega después de los 10 minutos de retención | Llega la confirmación del pago | MODO gestiona un reembolso completo del importe pagado. |
| CA-F2-39 | PR-06 | RF2-09 | Pago en línea cuya confirmación llega después de los 10 minutos de retención | Llega la confirmación del pago | El participante recibe un mensaje: pago confirmado fuera del plazo, reserva no confirmada y devolución en gestión. |
| CA-F2-40 | PR-06 | RF2-09 | Participante con un pago confirmado fuera de plazo (RF2-09) | Quiere reservar nuevamente | Debe iniciar una nueva reserva con la disponibilidad actual; sin plazas suficientes no puede iniciar el pago. |
| CA-F2-41 | PR-07 | RF2-10, RF2-01 | Reserva pagada en línea; faltan 24 h o más para el inicio | El participante la cancela | MODO reembolsa el 100 % del importe pagado al mismo método de pago original. |
| CA-F2-42 | PR-06 | RF2-10, RF2-09 | Pago en línea confirmado después de los 10 minutos de retención (RF2-09) | MODO gestiona el reembolso | Reembolsa el 100 % del importe pagado al mismo método de pago que usó el participante. |
| CA-F2-43 | PR-06, PR-07 | RF2-10 | Reembolso por cancelación dentro del plazo o por pago confirmado fuera de plazo | MODO gestiona la devolución | No ofrece al participante elegir un método de devolución distinto del original. |
| CA-F2-44 | PR-07 | RF2-11 | Reserva pagada en línea; faltan 24 h o más para el inicio | El participante la cancela | MODO inicia la solicitud de reembolso en un máximo de 24 h desde la cancelación. |
| CA-F2-45 | PR-06 | RF2-11, RF2-09 | Pago en línea confirmado después de los 10 minutos de retención | MODO identifica ese pago | Inicia la solicitud de reembolso en un máximo de 24 h desde la identificación. |
| CA-F2-46 | PR-06, PR-07 | RF2-11, RF2-10 | Cancelación válida de una reserva en línea (CA-F2-44) o pago tardío identificado (CA-F2-45) | MODO inicia la solicitud de reembolso | La solicitud es por el 100 % del importe pagado y al método de pago original. |
| CA-F2-48 | PR-07 | RF2-12, RF2-01 | Experiencia que empieza el sábado a las 15:00 (America/Guayaquil) | El participante cancela el viernes a las 15:00 | Se permite. |
| CA-F2-49 | PR-07 | RF2-12, RF2-01 | Experiencia que empieza el sábado a las 15:00 (America/Guayaquil) | El participante intenta cancelar el viernes a las 15:01 | MODO rechaza la cancelación directa con el mensaje de RF2-01. |
| CA-F2-50 | PR-06, PR-07 | RF2-12, RF2-11 | Cancelación válida de una reserva en línea o pago tardío identificado | Se cuenta el plazo máximo de 24 h de RF2-11 | Se calcula en hora America/Guayaquil. |
| CA-F2-51 | PR-04, PR-05, PR-06, PR-07 | RF2-12, RF2-01, RF2-16 | Sesión que el organizador registra para el sábado a las 15:00 | Se interpretan su fecha, el plazo de cancelación y el cierre de reservas | 15:00 de Ecuador continental; cancelación hasta el viernes a las 15:00; nuevas reservas hasta las 14:59 del sábado. |
| CA-F2-52 | PR-03, PR-04 | RF2-13 | Organizador que publica una experiencia (CU-03) o añade o modifica una sesión (CU-04) | Fija el precio de la sesión | El precio queda en USD y MODO no permite elegir otra moneda. |
| CA-F2-53 | PR-01 | RF2-13 | Experiencias publicadas con precio por sesión | Se consultan el catálogo, el detalle y el filtro de rango de precios (CU-01) | Precios e importes del filtro en USD. |
| CA-F2-54 | PR-05 | RF2-13 | Reserva con pago presencial (CU-05) | El participante ve el resumen previo a la confirmación (paso 3) | El resumen y el importe total aparecen en USD. |
| CA-F2-55 | PR-06 | RF2-13 | Reserva con pago en línea (CU-06) | El participante ve el resumen previo al pago (paso 3) | El resumen y el precio total aparecen en USD. |
| CA-F2-56 | PR-06 | RF2-13 | Reserva con pago en línea (CU-06) | El participante paga | El pago se cobra en USD. |
| CA-F2-57 | PR-06, PR-07 | RF2-13 | Reembolso de un pago en línea por cancelación válida o por pago confirmado fuera de plazo | MODO gestiona el reembolso | El reembolso se expresa en USD. |
| CA-F2-58 | PR-01 a PR-07 | RF2-13 | Cualquier punto con importes: publicación, administración de sesiones, catálogo, detalle, filtros, reserva, pago o reembolso | El usuario consulta o introduce importes | MODO no ofrece conversión de divisas ni selector de moneda. |
| CA-F2-60 | PR-06 | RF2-14 | Reserva con pago en línea (CU-06) | El participante paga con tarjeta de crédito | Se permite. |
| CA-F2-61 | PR-06 | RF2-14 | Reserva con pago en línea (CU-06) | El participante paga con tarjeta de débito | Se permite. |
| CA-F2-62 | PR-06 | RF2-14 | Reserva con pago en línea (CU-06), antes del paso 4 | El participante elige el medio de pago | Solo se ofrecen tarjeta de crédito y de débito; no aparecen transferencia bancaria ni billetera digital. |
| CA-F2-63 | PR-06 | RF2-14 | Reserva con pago en línea (CU-06) | El participante intenta pagar con un medio no admitido (transferencia bancaria o billetera digital) | MODO no inicia el pago, informa de que ese medio no está disponible y permite elegir tarjeta de crédito o de débito. |
| CA-F2-64 | PR-06 | RF2-14, RF2-13 | Reserva con pago en línea (CU-06), antes del paso 4 | El participante va a iniciar el pago | MODO muestra el importe total en USD y permite elegir entre tarjeta de crédito y de débito. |
| CA-F2-66 | PR-08 | RF2-15 | Reserva confirmada con pago presencial «Pendiente» de una experiencia propia | El organizador marca el pago como recibido | El estado del pago pasa a «Recibido». |
| CA-F2-67 | PR-05 | RF2-15 | Reserva con pago presencial realizada correctamente, sin pago registrado | Se consulta la reserva antes de que el organizador registre el pago | La reserva ya está confirmada. |
| CA-F2-68 | PR-08 | RF2-15 | Reserva con pago presencial cuyo pago el organizador marcó como recibido (CA-F2-66) | Se consulta la reserva | Sigue confirmada, con las mismas plazas ocupadas y el mismo precio acordado. |
| CA-F2-69 | PR-08 | RF2-15 | Reserva de una experiencia que no es del organizador | El organizador intenta registrar su pago | MODO no lo permite. |
| CA-F2-71 | PR-05 | RF2-16 | Sesión con pago presencial que comienza a las 15:00 (America/Guayaquil) con plazas disponibles | Un participante reserva a las 14:59 | Puede completar la reserva. |
| CA-F2-72 | PR-05 | RF2-16 | Sesión con pago presencial que comienza a las 15:00 (America/Guayaquil) con plazas disponibles | Un participante intenta reservar a las 15:00 | MODO no permite completar la reserva. |
| CA-F2-73 | PR-06 | RF2-16, RF2-08 | Sesión con pago en línea que comienza a las 15:00 (America/Guayaquil) con plazas disponibles | El participante intenta iniciar el pago a las 14:59 y a las 15:00 | A las 14:59 puede iniciarlo; a las 15:00 MODO no lo permite. |
| CA-F2-74 | PR-01 | RF2-16 | Experiencia cuya única sesión futura comienza a las 15:00 | Se consulta el catálogo a las 14:59 y a las 15:00 | Aparece a las 14:59; desde las 15:00 deja de aparecer, como una experiencia sin fechas futuras. |
| CA-F2-75 | PR-01 | RF2-16, RF2-07 | Experiencia con una sesión a las 15:00 con plazas y todas sus demás sesiones futuras sin plazas | Se consulta el catálogo a las 14:59 y a las 15:00 | A las 14:59 no aparece como «Agotado»; desde las 15:00 aparece como «Agotado» y al final. |
| CA-F2-76 | PR-01 | RF2-16, RF2-07 | Experiencia de CA-F2-75 con el filtro de plazas disponibles activo | Se consulta el catálogo a las 14:59 y a las 15:00 | Aparece a las 14:59; no aparece desde las 15:00. |
| CA-F2-77 | PR-05 | RF2-16 | Sesión con pago presencial que comienza a las 15:00 (America/Guayaquil) con plazas disponibles | Un participante reserva a las 12:00 del mismo día | Puede completar la reserva (sin cierre anticipado). |
| CA-F2-78 | PR-07 | RF2-17 | Reserva con pago presencial «Pendiente»; faltan 24 h o más para el inicio | El participante la cancela | MODO cancela la reserva completa, libera sus plazas y no inicia ningún reembolso. |
| CA-F2-79 | PR-07 | RF2-17 | Reserva con pago presencial «Recibido»; faltan 24 h o más para el inicio | El participante la cancela | MODO cancela la reserva completa, libera sus plazas y no inicia ni gestiona ningún reembolso. |
| CA-F2-80 | PR-07, PR-08 | RF2-17 | Reserva con pago presencial «Recibido» cancelada dentro del plazo (CA-F2-79) | Se consultan el estado del pago y su historial | El estado sigue siendo «Recibido» y el historial conserva todas sus entradas sin cambios. |
| CA-F2-81 | PR-07 | RF2-17 | Reserva con pago presencial «Recibido»; faltan 24 h o más para el inicio | El participante la cancela | Ni antes de confirmar ni en la confirmación MODO muestra un mensaje que afirme que no hubo pago o que el dinero se devolvió. |
| CA-F2-82 | PR-05, PR-06 | RF2-18 | Sesión con precio de 20 USD por participante | El participante selecciona 3 plazas | MODO muestra un importe total de 60 USD. |
| CA-F2-83 | PR-05, PR-06 | RF2-18 | Sesión con precio de 20 USD por participante | El participante selecciona 1 plaza | MODO muestra un importe total de 20 USD. |
| CA-F2-84 | PR-05 | RF2-18 | Reserva con pago presencial de 3 plazas en una sesión de 20 USD por participante | El participante ve el resumen antes de confirmar | MODO muestra un importe total de 60 USD. |
| CA-F2-85 | PR-06 | RF2-18, RF2-14 | Reserva con pago en línea de 3 plazas en una sesión de 20 USD por participante | El participante va a iniciar el pago | MODO muestra un importe total de 60 USD antes de iniciarlo. |
| CA-F2-86 | PR-04, PR-08 | RF2-18 | Reserva confirmada de 3 plazas con importe total de 60 USD en una sesión de 20 USD | El organizador cambia el precio de la sesión a 25 USD | La reserva sigue mostrando 60 USD, también en la lista de reservas de CU-08. |
| CA-F2-87 | PR-04 | RF2-18 | Sesión cuyo precio cambió de 20 a 25 USD (CA-F2-86) | Un participante selecciona 3 plazas en una nueva reserva | MODO muestra un importe total de 75 USD. |
| CA-F2-88 | PR-05, PR-06 | RF2-18 | Reserva confirmada con pago presencial o con pago en línea | El organizador cambia después el precio de la sesión | La reserva conserva su importe total en ambas modalidades. |
| CA-F2-89 | PR-05, PR-06 | RF2-18 | Reservas de 3 plazas en una sesión de 20 USD, presencial (CA-F2-84) y en línea (CA-F2-85) | MODO muestra el importe total | Exactamente 60 USD: sin impuestos, comisiones, descuentos ni redondeos. |

## 19. Relación entre casos, procesos, reglas y criterios

| caso de uso | proceso | reglas | datos o estados relevantes | criterios de aceptación | especificación fuente |
|---|---|---|---|---|---|
| CU-01 Explorar y consultar experiencias | PR-01 Explorar catálogo y consultar detalle | CU-01 R1–R8; RF2-07, RF2-12, RF2-13, RF2-16 | Búsqueda, filtros y orden; sesión futura; experiencia disponible / «Agotado» / oculta; precio en USD | CU-01 CA1–CA14; CA-F2-07, 21, 25–29, 53, 58, 74–76 | `cu-01-explorar-consultar-experiencias`; `fase-02-especificacion-funcional` |
| CU-02 Registrarse para poder reservar | PR-02 Registro, verificación e inicio de sesión | CU-02 R1–R6; RF2-06 | Nombre, correo, contraseña, términos; correo sin verificar → verificado; sesión iniciada | CU-02 CA1–CA10; CA-F2-19–24 | `cu-02-registrarse-para-reservar`; `fase-02-especificacion-funcional` |
| CU-03 Publicar experiencias | PR-03 Activar perfil y publicar experiencia | CU-03 R1–R7; RF2-05 (extiende RF2-04), RF2-13 | Datos de la experiencia, ubicación en el DMQ, modalidad, sesiones (fecha, horario, cupos, precio en USD); publicada sin borrador | CU-03 CA1–CA8; CA-F2-16–18, 52 | `cu-03-publicar-experiencias`; `fase-02-especificacion-funcional` |
| CU-04 Administrar fechas, horarios, cupos y precios | PR-04 Gestionar sesiones de una experiencia | CU-04 R1–R6; RF2-02, RF2-04, RF2-12, RF2-13, RF2-18 | Sesión con o sin reservas activas; cupos ≥ plazas reservadas; precio en USD por participante; última fecha futura → oculta | CU-04 CA1–CA9; CA-F2-05–07, 11–15, 51, 52, 86, 87 | `cu-04-administrar-fechas-cupos-precios`; `fase-02-especificacion-funcional` |
| CU-05 Reservar con pago presencial | PR-05 Reservar con pago presencial | CU-05 R1–R6; RF2-01 (política mostrada), RF2-03, RF2-06, RF2-07, RF2-13, RF2-15, RF2-16, RF2-18 | Plazas, teléfono, importe total en USD; reserva confirmada; pago «Pendiente»; sesión futura | CU-05 CA1–CA8; CA-F2-04, 08–10, 22–24, 29, 54, 67, 71, 72, 77, 82–84, 88, 89 | `cu-05-reservar-pago-presencial`; `fase-02-especificacion-funcional` |
| CU-06 Reservar con pago en línea | PR-06 Reservar con pago en línea | CU-06 R1–R6; RF2-01 (política mostrada), RF2-06, RF2-08, RF2-09, RF2-10, RF2-11, RF2-12, RF2-13, RF2-14, RF2-16, RF2-18 | Plazas retenidas ≤10 min; tarjeta de crédito o débito; importe en USD; confirmada / no confirmada; reembolso por pago tardío | CU-06 CA1–CA8; CA-F2-04, 22–24, 30–40, 42, 43, 45, 46, 55–57, 60–64, 73, 85, 88, 89 | `cu-06-reservar-pago-en-linea`; `fase-02-especificacion-funcional` |
| CU-07 Cancelar una reserva | PR-07 Cancelar una reserva | CU-07 R1, R3–R7 (R2 concretada por RF2-01); RF2-01, RF2-10, RF2-11, RF2-12, RF2-13, RF2-17 | Confirmada → cancelada; tiempo hasta el inicio (America/Guayaquil); plazas liberadas; reembolso del 100 % al método original (en línea); estado del pago presencial e historial conservados | CU-07 CA1–CA7; CA-F2-01–04, 41, 43, 44, 46, 48–50, 57, 78–81 | `cu-07-cancelar-reserva`; `fase-02-especificacion-funcional` |
| CU-08 Registrar pago presencial recibido | PR-08 Consultar reservas de una sesión y registrar pago presencial | CU-08 R1–R10; RF2-03, RF2-13, RF2-15, RF2-17, RF2-18 | Lista de reservas confirmadas (nombre, plazas, importe USD, modalidad, estado del pago); «Pendiente» ↔ «Recibido»; historial con «Fecha y hora del registro»; inicio de la sesión | CU-08 CA-08-01–10, 12–16 (CA-08-11 retirado); CA-F2-66–69, 80, 86 | `cu-08-registrar-pago-presencial`; `fase-02-especificacion-funcional` |

Notas: RF2-13 aparece en todas las filas con importes; RF2-12, donde hay plazos u horarios; RF2-16, en CU-01, CU-05 y CU-06; RF2-18, en CU-04, CU-05, CU-06 y CU-08. Los criterios retirados (CA-F2-47, 59, 65, 70; CA-08-11) no se usan. Ningún criterio evalúa una funcionalidad excluida.

## 20. Cambios respecto de la primera entrega

**Retroalimentación docente.** Hasta la fecha de elaboración de esta entrega, no he recibido retroalimentación docente sobre la Fase 1 del proyecto MODO. Por este motivo, la revisión se ha realizado tomando como referencia los casos de uso aprobados en AHK, las decisiones registradas durante el proceso y los requisitos establecidos en la consigna de la Fase 2.

La primera entrega (`docs/entregas/fase-01.md`, versión 1.0) se conserva sin cambios como versión histórica.

| Cambio | Antes (Fase 1) | Decisión actual | Motivo | Fuentes afectadas | Tipo |
|---|---|---|---|---|---|
| Nuevo caso CU-08 | Siete casos; el registro del pago presencial quedaba excluido de CU-05 y pendiente (5.2). | Ocho casos; CU-08 consulta reservas de una sesión y registra el pago presencial (RF2-15). | Ningún caso cubría la operación; aprobado el 2026-11-06. | CU-08, spec, apartados 3, 5, 6, 7 | Modificación del alcance |
| Plazo de cancelación | «Plazo exacto en la Fase 2» (CU-07 R2; 5.2, 8.2). | 24 h antes del inicio, exactamente 24 h incluido, hora America/Guayaquil (RF2-01, RF2-12). | Decisión del usuario del 2026-11-05/06. | spec, apartados 4, 12, 16 | Precisión de regla |
| Pago en línea | Retención, medios y moneda por definir. | 10 minutos (RF2-08); pago tardío sin confirmar y reembolsado (RF2-09); tarjeta de crédito o débito (RF2-14); USD (RF2-13). | Decisiones del 2026-11-05/06. | spec | Precisión de regla |
| Transferencias y billeteras | No mencionadas. | Excluidas del alcance inicial (RF2-14). | Decisión del usuario. | spec, apartado 5.3 | Modificación del alcance (exclusión) |
| Reembolsos | Procedimiento y tiempos por definir. | 100 % al método original (RF2-10); solicitud en ≤24 h (RF2-11); acreditación sin plazo. | Decisiones del 2026-11-06. | spec | Precisión de regla |
| Pago presencial | Registro e inasistencias por definir; CU-07 A1 «ya que no hubo pago previo». | Pago al llegar (RF2-03); registro por el organizador (RF2-15); con pago «Recibido» la cancelación conserva el estado y no afirma que no hubo pago (RF2-17). Impago e inasistencias siguen pendientes. | Decisiones del 2026-11-05/06/08. | CU-08, spec | Precisión de regla |
| Devolución presencial | No mencionada. | Excluida, junto con el dinero recibido fuera de MODO (RF2-17). | Decisión del 2026-11-08. | spec, apartado 5.3 | Modificación del alcance (exclusión) |
| Cierre de reservas | Límite de antelación o cierre por definir. | Hasta antes de la hora exacta de inicio, sin cierre anticipado (RF2-16). | Decisión del 2026-11-08. | spec | Precisión de regla |
| Importe de la reserva | «Resumen con el precio vigente». | Importe total = precio por participante × plazas, mostrado antes y conservado (RF2-18). | Decisión del 2026-11-08. | spec, apartados 4, 16 | Precisión de regla |
| Sesiones | Sin regla sobre duplicados. | Sin sesiones idénticas en una experiencia, también al publicar (RF2-04, RF2-05); añadir fechas no altera las existentes (RF2-02). | Decisiones del 2026-11-05. | spec | Precisión de regla |
| Registro | Pregunta abierta sobre la sesión tras el registro. | Sesión iniciada automáticamente; sin reservar hasta verificar el correo (RF2-06). | Decisión del 2026-11-05. | spec | Precisión de regla |
| «Agotado» | A nivel de fecha, sin precisar la experiencia. | La experiencia solo es «Agotado» si ninguna sesión futura tiene plazas (RF2-07). | Decisión del 2026-11-05. | spec | Precisión de regla |
| Verificación del correo | Requisitos de contraseña y del correo de verificación «por definir» (5.2). | Fuera del alcance de la especificación según CU-02. | Correcciones M1–M5 de la auditoría del 2026-11-08 (reclasificación, sin decisión nueva). | spec, apartado 5 | Corrección de clasificación |
| Pantallas | Panel del organizador sin reservas por sesión. | Pantalla 6 incluye la lista de reservas y el registro del pago; pantalla 4 muestra importe total y medios de pago. | Consecuencia de CU-08 y RF2-14/18. | apartado 6 | Precisión |
| Apartados 11 a 20 | No existían. | Procesos, reglas, datos, permisos, estados, cálculos, errores, criterios, matriz y cambios. | Requisito de la consigna de la Fase 2. | Este documento | Ampliación del documento |
| Identificación | Fase 1, 25 de octubre de 2026, versión 1.0. | Fase 2, 8 de noviembre de 2026, versión 2.0; cohorte CB PFSD4 VI Cohorte Frontend React; autor con nombre completo. | Nueva entrega. | apartado 1 | Redacción |
| Apartado 9 | Texto del autor de la Fase 1. | Texto del autor sobre su decisión del plazo de 24 horas (9.1) y sobre el uso de IA y herramientas (9.2). | Lo redacta el estudiante; 9.2 describe el uso de Claude Code y AHK. | apartado 9 | Redacción |

**Se mantiene sin cambios**

- **Cancelación de 24 horas.** Decisión del autor del 2026-11-08: «Mi decisión sobre la cancelación de 24 horas se mantiene.»
- CU-01 a CU-07, aprobados el 2026-10-25, y las decisiones globales 1 a 8 de la Fase 1.
- Las exclusiones de la Fase 1 (apartado 5.3) y las preguntas que siguen abiertas (apartado 8.3).

**Reagendamientos.** No se incorporan al alcance actual de MODO. Se registran únicamente como posible mejora futura, por instrucción del autor del 2026-11-08; no forman parte de la especificación aprobada.

## 21. Stack y matriz de herramientas obligatorias

Apartados de entrega 21-24 de la consigna 03-diseno-tecnico.pdf (según el usuario), derivados de TD-01 a TD-12. Los nombres de componentes, carpetas, archivos y rutas son **ilustrativos** y coinciden con TD-10 y TD-12; el usuario los aceptó provisionalmente el 2026-11-10, sin convertirlos en contratos definitivos. No se crea ningún archivo ni se instala nada. Las referencias «P*n*» remiten a las preguntas técnicas de la especificación técnica (`fase-03-especificacion-tecnica`), resumidas en el apartado 8.5.

Fuentes: `package.json` (leído el 2026-11-10) y la tabla de versiones exigidas por la consigna, sección 5 (según el usuario; ver la sección «Source and current evidence» de la especificación técnica). `package.json` no cambia en esta entrega.

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
- Vitest: herramienta de la cohorte para pruebas de funciones puras (apartado 28). No está instalada; la sección 5 de la consigna no fija su versión (según lo informado por el usuario).
- Restricciones de la consigna: ver la lista de la sección 5 de la consigna en la sección «Source and current evidence» de la especificación técnica; aplican a todas las capas del apartado 22.

## 22. Arquitectura y responsabilidades

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

## 23. Navegación con React Router

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

## 24. Propiedad del estado y uso de Zustand

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

## 25. Datos, servicios y límites de integración

Apartados de entrega 25-27 de la consigna 03-diseno-tecnico.pdf (según el usuario), derivados de TD-01 a TD-12, de los apartados 21-24 y de los F*, R* y CA* de CU-01 a CU-08. Los nombres de componentes, hooks, query keys y campos son **ilustrativos**, aceptados provisionalmente por el usuario (2026-11-10) sin ser contratos definitivos. No se crea ningún archivo, no se instala nada y no se ha ejecutado ninguna prueba. «P*n*» remite a las preguntas técnicas de la especificación técnica, resumidas en el apartado 8.5.

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

## 26. Formularios, Zod y Mantine Modal

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

## 27. Recorridos técnicos y sincronización con TanStack Query

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

## 28. Estrategia de verificación y límites de evidencia

Apartados de entrega 28-30 de la consigna 03-diseno-tecnico.pdf (según el usuario), derivados de TD-01 a TD-12 y de los apartados 21-27. **No se ha ejecutado ninguna prueba de MODO:** lo que sigue es un plan. Los nombres de piezas son ilustrativos (apartado 22). «P*n*» remite a las preguntas técnicas de la especificación técnica, resumidas en el apartado 8.5.

Evidencia actual:

- Única comprobación vigente: el health `pnpm build` (`tsc -b && vite build`) sobre la plantilla de Vite. `pnpm lint` (oxlint) está disponible, pero no forma parte del health (apartado 21).
- **No se ha ejecutado ninguna prueba de MODO. Vitest no está instalado** (herramienta de la cohorte para funciones puras; la sección 5 de la consigna no fija su versión; apartado 21).
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

## 29. Plan de construcción, dependencias y riesgos

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

Riesgos (registrados en la sección «Dependencies, rollout, risks, and validation» de la especificación técnica; no se duplican):

- Divergencias de versión (P13; riesgos de TD-07 a TD-12).
- Contratos no definidos (P9; apartado 25).
- Alcance del backend en un bootcamp: mayor esfuerzo que un backend gestionado; autenticación, correo, seguridad y despliegue de dos piezas por construir.
- Seguridad de la sesión (P16; riesgos de TD-11).

## 30. Trazabilidad técnica y cambios respecto de la segunda entrega

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

### Cambios respecto de la segunda entrega (Fase 2)

**Retroalimentación docente.** Hasta la fecha de esta entrega no he recibido retroalimentación docente sobre la Fase 2. Las aprobaciones registradas en AHK son aprobaciones del autor sobre sus propios documentos y no equivalen a una aprobación del profesor.

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
