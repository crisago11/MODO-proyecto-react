---
slug: "cu-04-administrar-fechas-cupos-precios"
title: "CU-04 · Administrar fechas, horarios, cupos y precios"
description: "El organizador añade, modifica y elimina fechas, horarios, cupos y precios de sus experiencias publicadas, protegiendo las condiciones de las reservas existentes."
spec_kind: use-case
status: approved
created_at: "2026-10-25T18:00:22.603Z"
last_updated: "2026-10-25T19:27:07.519Z"
---
## Actor, goal, and trigger

- **Actor:** organizador de una experiencia publicada (CU-03).
- **Objetivo:** mantener actualizadas las fechas, horarios, cupos y precios de sus experiencias sin afectar a las reservas existentes.
- **Disparador:** el organizador necesita añadir, cambiar o retirar una fecha, o ajustar cupos o precios.

## Preconditions and main flow

**Precondiciones**

- El organizador ha iniciado sesión y tiene al menos una experiencia publicada (CU-03).

**Flujo principal — Añadir una fecha**

1. El organizador abre una de sus experiencias publicadas.
2. El organizador añade una fecha futura con horario, cupos y precio.
3. MODO comprueba los datos y guarda la nueva fecha.
4. La nueva fecha queda disponible en el detalle de la experiencia (CU-01).

**Flujo — Modificar o eliminar una fecha**

1. El organizador selecciona una fecha de una de sus experiencias.
2. El organizador modifica su horario, cupos o precio, o la elimina.
3. MODO aplica el cambio respetando las reglas de protección de reservas.

## Alternatives, failures, and rules

**Alternativas**

- **A1 — Fecha sin reservas activas:** el organizador puede modificar su día, horario, cupos y precio, o eliminarla.
- **A2 — Fecha con reservas activas:** el organizador puede aumentar los cupos, reducirlos sin quedar por debajo de las plazas reservadas y modificar el precio para reservas futuras.
- **A3 — Eliminación de la última fecha futura:** la experiencia deja de aparecer en el catálogo público, según las reglas de visibilidad de CU-01, sin que ello implique eliminar la experiencia del sistema.

**Fallos**

- **F1 — Eliminar o cambiar día u horario de una fecha con reservas activas:** MODO no lo permite e informa al organizador.
- **F2 — Cupo por debajo de las plazas reservadas:** MODO no permite el cambio e informa al organizador.
- **F3 — Fecha pasada o datos incompletos:** MODO no guarda la fecha e indica qué corregir.

**Reglas de negocio**

- **R1:** una fecha con reservas activas no puede eliminarse ni cambiar de día u horario.
- **R2:** los cupos de una fecha con reservas pueden aumentarse o reducirse, pero nunca por debajo de las plazas ya reservadas.
- **R3:** un cambio de precio solo se aplica a reservas futuras; las reservas existentes conservan su precio.
- **R4:** solo se aceptan fechas futuras (CU-03).
- **R5:** cada organizador administra exclusivamente las experiencias que haya publicado.
- **R6:** el precio se establece por cada fecha u horario y puede variar entre sesiones; las reservas confirmadas conservan siempre el precio vigente al momento de reservar.

**Límites y exclusiones**

- No incluye la cancelación de fechas o reservas por parte del organizador (pendiente de evaluación).
- No incluye notificaciones a participantes por cambios.
- No incluye la edición de la información general de la experiencia (nombre, descripción, imágenes).
- Las reglas operativas detalladas corresponden a la Fase 2.

## Observable outcome and acceptance criteria

**Resultado observable:** las fechas, horarios, cupos y precios de la experiencia reflejan los cambios del organizador en el detalle público, sin alterar las condiciones de las reservas existentes.

**Criterios de aceptación**

- **CA1:** el organizador puede añadir una fecha futura con horario, cupos y precio, y esta aparece en el detalle de la experiencia.
- **CA2:** una fecha sin reservas puede modificarse o eliminarse.
- **CA3:** una fecha con reservas activas no puede eliminarse ni cambiar de día u horario, y MODO informa al organizador.
- **CA4:** los cupos de una fecha con reservas pueden aumentarse.
- **CA5:** los cupos no pueden reducirse por debajo de las plazas reservadas.
- **CA6:** tras cambiar el precio, las nuevas reservas usan el nuevo precio y las existentes conservan el anterior.
- **CA7:** no se aceptan fechas pasadas.
- **CA8:** al eliminar la última fecha futura, la experiencia deja de aparecer en el catálogo público, pero no se elimina del sistema.
- **CA9:** un organizador no puede administrar fechas de experiencias de otro organizador.

## Decisions and open questions

**Decisiones confirmadas por el usuario (2026-10-25)**

- Protección de reservas existentes: sin eliminar ni cambiar día u horario de fechas con reservas activas; cupos ajustables sin quedar por debajo de las plazas reservadas.
- Cambios de precio solo para reservas futuras.
- Confirmado (2026-10-25): precio por fecha u horario, variable entre sesiones (por ejemplo, $20 el sábado y $25 el domingo).

**Decisiones confirmadas por el usuario tras la revisión (2026-10-25)**

- A1: las fechas sin reservas pueden modificarse o eliminarse libremente.
- A3/CA8: eliminar la última fecha futura oculta la experiencia del catálogo (consecuencia de CU-01).
- R5/CA9: cada organizador solo administra sus propias experiencias.

**Preguntas abiertas (fases posteriores)**

- Cancelación de fechas por parte del organizador y aviso a participantes.