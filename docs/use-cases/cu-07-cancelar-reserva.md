---
slug: "cu-07-cancelar-reserva"
title: "CU-07 · Cancelar una reserva"
description: "El participante cancela una reserva confirmada dentro del plazo de la política única de MODO; las plazas se liberan y, si pagó en línea, recibe el reembolso completo."
spec_kind: use-case
status: approved
created_at: "2026-10-25T18:23:28.092Z"
last_updated: "2026-10-25T18:27:16.035Z"
---
## Actor, goal, and trigger

- **Actor:** participante con una reserva confirmada (CU-05 o CU-06).
- **Objetivo:** cancelar su reserva respetando la política de cancelación de MODO.
- **Disparador:** el participante ya no puede o no quiere asistir a la experiencia reservada.

## Preconditions and main flow

**Precondiciones**

- El participante ha iniciado sesión (CU-02) y tiene al menos una reserva confirmada para una fecha futura.

**Flujo principal**

1. El participante consulta sus reservas.
2. El participante selecciona la reserva que desea cancelar.
3. MODO muestra la política de cancelación aplicable y, si la reserva se pagó en línea, que corresponde un reembolso completo.
4. El participante confirma la cancelación.
5. MODO comprueba que la cancelación se realiza dentro del plazo permitido.
6. MODO cancela la reserva y las plazas reservadas vuelven a estar disponibles.
7. Si la reserva se pagó en línea, MODO gestiona el reembolso completo.
8. MODO muestra al participante la confirmación de la cancelación.

## Alternatives, failures, and rules

**Alternativas**

- **A1 — Reserva de pago presencial:** la reserva se cancela sin reembolso, ya que no hubo pago previo.
- **A2 — Reserva pagada en línea:** la cancelación dentro del plazo conlleva el reembolso completo.

**Fallos**

- **F1 — Fuera de plazo:** si el plazo permitido ha vencido, MODO no permite cancelar directamente e informa al participante.
- **F2 — Reserva ya cancelada o fecha pasada:** MODO no ofrece la cancelación.

**Reglas de negocio**

- **R1:** MODO aplica una política de cancelación única para todas las experiencias.
- **R2:** solo se puede cancelar hasta un plazo determinado antes de la fecha de la experiencia; el plazo exacto se definirá en la Fase 2.
- **R3:** reserva pagada en línea cancelada dentro del plazo: reembolso completo. Reserva de pago presencial: cancelación sin reembolso.
- **R4:** al cancelar correctamente, las plazas vuelven a estar disponibles para otros participantes.
- **R5:** la política se comunica antes de confirmar la reserva (CU-05, CU-06).
- **R6:** un participante solo puede cancelar las reservas asociadas a su propia cuenta.
- **R7:** la cancelación se aplica a la reserva completa; no se cancelan plazas sueltas.

**Límites y exclusiones**

- No incluye la cancelación por parte del organizador (pendiente de evaluación).
- No define el plazo exacto ni el procedimiento técnico del reembolso (Fase 2 y posteriores).
- No incluye cancelaciones fuera de plazo por otros canales ni lista de espera.

## Observable outcome and acceptance criteria

**Resultado observable:** la reserva cancelada deja de estar activa, sus plazas vuelven a estar disponibles en la fecha correspondiente y, si se pagó en línea, consta el reembolso completo.

**Criterios de aceptación**

- **CA1:** dentro del plazo, el participante puede cancelar una reserva confirmada.
- **CA2:** tras cancelar, las plazas de la reserva vuelven a estar disponibles en esa fecha.
- **CA3:** una reserva pagada en línea cancelada dentro del plazo recibe el reembolso completo.
- **CA4:** una reserva de pago presencial se cancela sin reembolso.
- **CA5:** fuera del plazo, MODO no permite cancelar e informa al participante.
- **CA6:** antes de confirmar la cancelación, MODO muestra la política aplicable.
- **CA7:** un participante no puede cancelar reservas de otra cuenta.

## Decisions and open questions

**Decisiones confirmadas por el usuario (2026-10-25)**

- Política única de MODO; cancelación hasta un plazo antes de la fecha (plazo en Fase 2).
- Reembolso completo para pago en línea dentro del plazo; sin reembolso en pago presencial.
- Liberación de plazas al cancelar; sin cancelación directa fuera de plazo; política comunicada antes de reservar.

**Decisiones confirmadas por el usuario tras la revisión (2026-10-25)**

- Las cancelaciones son completas: no se permite cancelar únicamente algunas plazas de una reserva en la primera versión.
- El participante puede consultar sus reservas para elegir cuál cancelar (paso 1).
- R6/CA7: un participante solo puede cancelar sus propias reservas.

**Preguntas abiertas (fases posteriores)**

- Plazo exacto de cancelación.
- Procedimiento y tiempos del reembolso.
- Cancelación por parte del organizador.