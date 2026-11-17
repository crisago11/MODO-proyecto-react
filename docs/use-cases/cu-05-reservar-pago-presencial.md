---
slug: "cu-05-reservar-pago-presencial"
title: "CU-05 · Reservar con pago presencial"
description: "El participante registrado y verificado reserva una o varias plazas de una fecha de una experiencia con pago presencial, y la reserva se confirma automáticamente si hay disponibilidad."
spec_kind: use-case
status: approved
created_at: "2026-10-25T18:08:05.046Z"
last_updated: "2026-10-25T18:10:54.391Z"
---
## Actor, goal, and trigger

- **Actor:** participante registrado con sesión iniciada (CU-02).
- **Objetivo:** reservar una o varias plazas en una fecha de una experiencia cuya modalidad de pago es presencial.
- **Disparador:** desde el detalle de una experiencia (CU-01), el participante elige una fecha disponible y decide reservar.

## Preconditions and main flow

**Precondiciones**

- El participante ha iniciado sesión y su correo está verificado (CU-02).
- La experiencia está publicada, su modalidad de pago es presencial (CU-03) y la fecha elegida es futura y tiene plazas disponibles.

**Flujo principal**

1. El participante selecciona una fecha de la experiencia y el número de plazas.
2. Si su cuenta no tiene teléfono registrado, MODO lo solicita y el participante lo introduce.
3. MODO muestra el resumen de la reserva: experiencia, fecha, horario, número de plazas, precio vigente, modalidad de pago presencial y las condiciones de cancelación aplicables.
4. El participante confirma la reserva.
5. MODO comprueba que existen suficientes plazas disponibles.
6. MODO confirma la reserva automáticamente, descuenta las plazas reservadas de la fecha y la asocia a la cuenta del participante.
7. MODO muestra al participante la confirmación de la reserva, indicando que el pago se realiza de forma presencial.

## Alternatives, failures, and rules

**Alternativas**

- **A1 — Teléfono ya registrado:** MODO no lo solicita de nuevo y se omite el paso 2.
- **A2 — Visitante sin sesión o correo sin verificar:** se aplica CU-02 (registro, inicio de sesión o verificación) antes de continuar.

**Fallos**

- **F1 — Plazas insuficientes:** si el número de plazas solicitado supera la disponibilidad en el momento de confirmar, MODO no crea la reserva e informa al participante.
- **F2 — Fecha agotada:** una fecha sin plazas aparece como «Agotado» y no permite reservar (CU-01).
- **F3 — Teléfono no indicado:** si la cuenta no tiene teléfono y el participante no lo proporciona, MODO impide confirmar la operación e indica qué dato falta.

**Reglas de negocio**

- **R1:** una reserva puede incluir varias plazas, sin superar la disponibilidad de la fecha.
- **R2:** no se registran datos individuales de los acompañantes; la reserva queda asociada a la cuenta de quien la realiza.
- **R3:** el teléfono es obligatorio en la primera reserva si la cuenta no lo tiene, y se guarda para futuras reservas.
- **R4:** en la modalidad presencial, la reserva se confirma automáticamente cuando el participante cumple los requisitos y existen suficientes plazas disponibles (decisión 4), ya que el pago se realiza en el lugar. No se requiere aprobación manual del organizador.
- **R5:** la reserva conserva el precio vigente en el momento de reservar (CU-04).
- **R6:** las condiciones de cancelación aplicables se comunican antes de confirmar la reserva.

**Límites y exclusiones**

- No incluye el pago en línea (CU-06) ni la cancelación (CU-07).
- No define el registro del pago presencial ni la gestión de inasistencias (fases posteriores).
- No incluye notificaciones detalladas ni lista de espera.

## Observable outcome and acceptance criteria

**Resultado observable:** el participante tiene una reserva confirmada asociada a su cuenta para la fecha elegida, y las plazas disponibles de esa fecha disminuyen en el número reservado.

**Criterios de aceptación**

- **CA1:** un participante con correo verificado puede reservar una o varias plazas de una fecha con disponibilidad suficiente.
- **CA2:** la reserva se confirma automáticamente y las plazas disponibles disminuyen en el número reservado.
- **CA3:** no se puede reservar más plazas de las disponibles; MODO informa al participante.
- **CA4:** si la cuenta no tiene teléfono, MODO lo solicita y la reserva no se completa sin él; una vez guardado, no se vuelve a pedir.
- **CA5:** antes de confirmar se muestran el precio vigente, la modalidad presencial y las condiciones de cancelación.
- **CA6:** no se solicitan datos individuales de acompañantes.
- **CA7:** un usuario sin sesión o con el correo sin verificar no puede completar la reserva sin pasar por CU-02.
- **CA8:** cuando una fecha queda sin plazas tras una reserva, aparece como «Agotado» en el catálogo.

## Decisions and open questions

**Decisiones confirmadas por el usuario (2026-10-25)**

- Varias plazas por reserva sin superar la disponibilidad; sin datos individuales de acompañantes; reserva asociada a la cuenta de quien reserva.
- Teléfono obligatorio en la primera reserva si no está registrado; se guarda en la cuenta.
- Las mismas reglas se aplican a CU-06.

**Decisiones confirmadas por el usuario tras la revisión (2026-10-25)**

- R4: en pago presencial, la reserva se confirma automáticamente solo con disponibilidad suficiente (interpretación de la decisión 4).
- F3: sin teléfono no se completa la reserva.

**Preguntas abiertas (fases posteriores)**

- Registro del pago presencial e inasistencias.
- Límite máximo de plazas por reserva.
- Condiciones de cancelación concretas (CU-07).