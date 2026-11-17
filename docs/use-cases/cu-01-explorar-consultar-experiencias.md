---
slug: "cu-01-explorar-consultar-experiencias"
title: "CU-01 · Explorar y consultar experiencias"
description: "El visitante, sin iniciar sesión, descubre y encuentra experiencias del Distrito Metropolitano de Quito mediante listado, búsqueda por texto y filtros combinables, y consulta su detalle."
spec_kind: use-case
status: approved
created_at: "2026-10-25T17:34:38.749Z"
last_updated: "2026-10-25T17:43:04.467Z"
---
## Actor, goal, and trigger

- **Actor:** visitante sin sesión iniciada.
- **Objetivo:** descubrir experiencias libremente y encontrar actividades específicas dentro del Distrito Metropolitano de Quito, y consultar su detalle.
- **Disparador:** el visitante accede al catálogo público de MODO.

## Preconditions and main flow

**Precondiciones**

- Existen experiencias publicadas por organizadores (CU-03) con categoría y ubicación dentro del Distrito Metropolitano de Quito.
- No se requiere iniciar sesión para explorar ni para consultar el detalle (decisión 3).

**Flujo principal**

1. El visitante accede al catálogo público de MODO.
2. MODO muestra el listado de experiencias que tienen fechas futuras, ordenadas por su fecha disponible más próxima y con las experiencias agotadas al final del listado.
3. El visitante puede escribir un texto de búsqueda.
4. El visitante puede aplicar uno o varios filtros y combinarlos con la búsqueda: categoría, ubicación (zona y, opcionalmente, sector o parroquia), fecha, rango de precios, plazas disponibles y modalidad de pago.
5. MODO muestra las experiencias que cumplen conjuntamente todos los filtros seleccionados y, si se ha escrito, el texto de búsqueda.
6. El visitante selecciona una experiencia.
7. MODO muestra el detalle de la experiencia.

## Alternatives, failures, and rules

**Alternativas**

- **A1 — Ubicación solo por zona:** si el visitante selecciona una zona sin concretar sector o parroquia, se muestran experiencias de toda la zona elegida.
- **A2 — Ubicación por zona y sector/parroquia:** se muestran solo las experiencias del sector o parroquia elegido.
- **A3 — Fecha por atajo:** el visitante elige hoy, mañana, este fin de semana o próximos 7 días.
- **A4 — Fecha por rango personalizado:** el visitante indica una fecha de inicio y una de fin.
- **A5 — Filtro de plazas disponibles activo:** se muestran únicamente experiencias que todavía se pueden reservar; las agotadas no aparecen.
- **A6 — Intención de reservar:** la reserva requiere registro (decisión 3) y se trata en CU-02, CU-05 y CU-06; queda fuera de este caso de uso.
- **A7 — Cambio de orden:** el visitante puede ordenar el listado por precio o por fecha de publicación.

**Fallos**

- **F1 — Sin resultados:** si la búsqueda o la combinación de filtros no produce resultados, MODO informa al visitante de que no hay experiencias que coincidan y le permite modificar o limpiar los filtros.

**Reglas de negocio**

- **R1:** el catálogo solo contiene experiencias dentro del Distrito Metropolitano de Quito (decisión 6).
- **R2:** las experiencias sin fechas futuras se ocultan del catálogo público.
- **R3:** las experiencias con fechas futuras pero sin plazas disponibles aparecen con la etiqueta «Agotado» y sin posibilidad de reservar.
- **R4:** el filtro de ubicación tiene dos niveles: zona amplia obligatoria para filtrar y sector o parroquia opcional.
- **R5:** el detalle muestra: nombre, descripción, categoría, zona y sector, fechas y horarios, precio, disponibilidad, modalidad de pago, organizador, imágenes, duración y qué incluye la experiencia.
- **R6:** el orden por defecto del listado es la fecha disponible más próxima. Las experiencias agotadas se muestran al final del listado, independientemente del criterio de ordenación seleccionado.
- **R7:** los filtros seleccionados se cumplen conjuntamente: una experiencia solo aparece si cumple todos ellos.
- **R8:** la búsqueda por texto consulta el nombre y la descripción de las experiencias.

**Límites y exclusiones**

- No incluye geolocalización por cercanía en esta primera versión.
- No incluye filtro por franja horaria (futura versión).
- No muestra la dirección exacta ni requisitos específicos de participación (pendientes de definición).
- No incluye registro (CU-02) ni reserva (CU-05, CU-06).
- Las condiciones de cancelación aplicables deberán comunicarse antes de confirmar una reserva; esa comunicación corresponde a los casos de reserva, no a este caso de uso.

## Observable outcome and acceptance criteria

**Resultado observable:** el visitante, sin iniciar sesión, ve un listado de experiencias del Distrito Metropolitano de Quito acotado por su búsqueda y filtros, y puede abrir el detalle de cualquiera de ellas.

**Criterios de aceptación**

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

## Decisions and open questions

**Decisiones confirmadas por el usuario (2026-10-25)**

- Listado, búsqueda por texto y filtros combinables en el mismo caso de uso.
- Filtros: categoría, sector o ubicación dentro de Quito, fecha, rango de precios, plazas disponibles y modalidad de pago.
- Ubicación en dos niveles; sin geolocalización por cercanía.
- Fecha: atajos (hoy, mañana, este fin de semana, próximos 7 días) y rango personalizado; franja horaria en futura versión.
- Visibilidad: agotadas visibles con «Agotado»; sin fechas futuras ocultas.
- Detalle: información básica, organizador, imágenes, duración y qué incluye.
- Orden: por defecto, fecha disponible más próxima; el visitante puede ordenar por precio o por fecha de publicación; las experiencias agotadas se muestran al final, independientemente del criterio de ordenación.
- Sin resultados: MODO informa al visitante y le permite modificar o limpiar los filtros.
- Los filtros seleccionados se cumplen conjuntamente; la búsqueda por texto consulta nombre y descripción.

**Preguntas abiertas**

- Clasificación definitiva de zonas y sectores o parroquias (pendiente de validación).
- Lista de categorías.
- Forma del filtro de rango de precios y moneda.
- Qué días comprende «este fin de semana».
- Dirección exacta y requisitos específicos de participación (pendientes de definición).
