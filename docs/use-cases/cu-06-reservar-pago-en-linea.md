---
slug: "cu-06-reservar-pago-en-linea"
title: "CU-06 · Reservar con pago en línea"
description: "El participante registrado y verificado reserva una o varias plazas de una experiencia con pago en línea; las plazas se retienen durante el pago y la reserva se confirma automáticamente al completarse."
spec_kind: use-case
status: approved
created_at: "2026-10-25T18:15:11.941Z"
last_updated: "2026-10-25T18:19:47.417Z"
---
## Actor, goal, and trigger

- **Actor:** participante registrado con sesión iniciada (CU-02).
- **Objetivo:** reservar una o varias plazas en una fecha de una experiencia cuya modalidad de pago es en línea, pagando durante la reserva.
- **Disparador:** desde el detalle de una experiencia (CU-01), el participante elige una fecha disponible y decide reservar.

## Preconditions and main flow

**Precondiciones**

- El participante ha iniciado sesión y su correo está verificado (CU-02).
- La experiencia está publicada, su modalidad de pago es en línea (CU-03) y la fecha elegida es futura y tiene plazas disponibles.

**Flujo principal**

1. El participante selecciona una fecha de la experiencia y el número de plazas.
2. Si su cuenta no tiene teléfono registrado, MODO lo solicita y el participante lo introduce (igual que en CU-05).
3. MODO muestra el resumen de la reserva: experiencia, fecha, horario, número de plazas, precio total, modalidad de pago en línea y las condiciones de cancelación aplicables.
4. El participante inicia el pago.
5. MODO comprueba que hay plazas suficientes y las aparta temporalmente durante el proceso de pago.
6. El participante completa el pago correctamente.
7. MODO confirma la reserva automáticamente, la asocia a la cuenta del participante y las plazas quedan reservadas.
8. MODO muestra al participante la confirmación de la reserva y del pago.

## Alternatives, failures, and rules

**Alternativas**

- **A1 — Teléfono ya registrado:** MODO no lo solicita de nuevo y se omite el paso 2.
- **A2 — Visitante sin sesión o correo sin verificar:** se aplica CU-02 antes de continuar.

**Fallos**

- **F1 — Plazas insuficientes al iniciar el pago:** si no existen plazas suficientes para la cantidad solicitada, MODO no permite iniciar el pago, no aparta plazas y muestra un aviso al participante.
- **F2 — Pago fallido:** la reserva no se confirma; MODO informa al participante, libera las plazas retenidas y permite iniciar un nuevo intento de reserva.
- **F3 — Pago abandonado o tiempo de retención vencido:** la reserva no se confirma y las plazas apartadas se liberan y vuelven a estar disponibles.
- **F4 — Teléfono no indicado:** MODO impide confirmar la operación e indica qué dato falta (igual que en CU-05).

**Reglas de negocio**

- **R1:** las reglas de CU-05 sobre varias plazas, acompañantes, teléfono y correo verificado se aplican igualmente a esta modalidad.
- **R2:** al iniciar el pago, las plazas seleccionadas se apartan temporalmente y no pueden ser reservadas por otros usuarios durante ese proceso.
- **R3:** la reserva se confirma automáticamente solo cuando hay disponibilidad y el pago se completa correctamente (decisión 4).
- **R4:** si el pago falla, se abandona o vence el tiempo permitido, las plazas se liberan.
- **R5:** se respeta el precio mostrado al confirmar la operación (CU-04).
- **R6:** las condiciones de cancelación aplicables se comunican antes de iniciar el pago.

**Límites y exclusiones**

- No define el tiempo exacto de retención ni los mecanismos técnicos de pago (fases posteriores).
- No incluye la cancelación ni los reembolsos (CU-07).
- No incluye facturación.

## Observable outcome and acceptance criteria

**Resultado observable:** tras un pago correcto, el participante tiene una reserva confirmada y pagada asociada a su cuenta; si el pago no se completa, no existe reserva y las plazas vuelven a estar disponibles.

**Criterios de aceptación**

- **CA1:** un participante con correo verificado puede reservar una o varias plazas de una fecha con pago en línea.
- **CA2:** mientras el pago está en curso, las plazas seleccionadas no están disponibles para otros usuarios.
- **CA3:** con el pago completado correctamente, la reserva se confirma automáticamente.
- **CA4:** si el pago falla, no se crea ninguna reserva confirmada, las plazas se liberan y MODO informa al participante.
- **CA5:** si el pago se abandona o vence el tiempo permitido, las plazas vuelven a estar disponibles.
- **CA6:** no se puede iniciar el pago por más plazas de las disponibles.
- **CA7:** antes de pagar se muestran el precio total, la modalidad en línea y las condiciones de cancelación, y la reserva conserva ese precio.
- **CA8:** el teléfono se solicita si la cuenta no lo tiene y no se vuelve a pedir una vez guardado.

## Decisions and open questions

**Decisiones confirmadas por el usuario (2026-10-25)**

- Retención temporal de plazas durante el pago; confirmación al completarse; liberación si falla, se abandona o vence el tiempo.
- Se mantienen las decisiones de CU-05: correo verificado, teléfono, varias plazas y precio mostrado al confirmar.

**Decisiones confirmadas por el usuario tras la revisión (2026-10-25)**

- F1/CA6: si no hay plazas suficientes, no se inicia el pago.
- F2/CA4: ante un pago fallido, MODO informa al participante (que puede volver a intentarlo iniciando una nueva reserva).

**Preguntas abiertas (fases posteriores)**

- Tiempo exacto de retención.
- Medios de pago aceptados y moneda.
- Reembolsos (relacionados con CU-07).