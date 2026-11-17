---
slug: "cu-08-registrar-pago-presencial"
title: "CU-08 · Registrar pago presencial recibido"
description: "El organizador consulta las reservas confirmadas de una sesión de sus experiencias, marca como recibido el pago presencial de un participante, incluso después de la sesión, y puede corregir un marcado erróneo hasta el comienzo de la sesión."
spec_kind: use-case
status: approved
created_at: "2026-11-06T18:51:25.827Z"
last_updated: "2026-11-07T03:08:39.473Z"
---
## Actor, goal, and trigger

- **Actor:** organizador, con su sesión iniciada en MODO.
- **Objetivo:** consultar las reservas confirmadas de una sesión de una de sus experiencias. Dejar constancia en MODO de que un participante con pago presencial ya pagó al llegar.
- **Disparador:** el participante llega al lugar de la experiencia y paga en persona antes de que comience la actividad. Después de ese pago, el organizador quiere registrarlo.

## Preconditions and main flow

**Precondiciones**
- El organizador ha iniciado sesión y tiene al menos una experiencia publicada (CU-03).
- La sesión elegida tiene reservas confirmadas.
- Para registrar un pago: la reserva tiene pago presencial con estado «Pendiente» (CU-05). La reserva ya está confirmada desde que se hizo.

**Flujo principal**
1. El organizador entra en la sección «Mis experiencias» de su cuenta.
2. Elige una de sus experiencias.
3. Elige la fecha y el horario de la sesión que quiere consultar.
4. MODO muestra la lista de las reservas confirmadas de esa sesión. Cada una muestra:
   - el nombre del participante;
   - la cantidad de plazas reservadas;
   - el importe total en USD;
   - la modalidad de pago (presencial o en línea);
   - el estado del pago.
5. El organizador identifica una reserva con pago presencial «Pendiente», cuyo participante ya pagó al llegar.
6. El organizador marca el pago de esa reserva como recibido.
7. MODO cambia el estado del pago de esa reserva a «Recibido», lo muestra en la lista y guarda el cambio en el historial del pago (R5).

## Alternatives, failures, and rules

**Alternativas**
- **A1. Reserva pagada en línea:** aparece en la lista con su modalidad y estado de pago. No ofrece la opción de registrar el pago otra vez.
- **A2. Corrección de un marcado erróneo:** si el organizador marcó por error un pago como recibido, puede devolverlo de «Recibido» a «Pendiente». Solo puede hacerlo antes de que comience la sesión de la experiencia. MODO guarda la corrección en el historial del pago (R5).
- **A3. Registro posterior del pago:** el organizador puede marcar como «Recibido» un pago presencial pendiente aunque la sesión ya haya comenzado o terminado. Así puede registrar después un pago que de verdad recibió al llegar el participante, aunque no haya podido actualizar MODO en ese momento.
- **A4. Sesión sin reservas confirmadas:** si la sesión elegida todavía no tiene reservas confirmadas, MODO muestra el mensaje «Esta sesión todavía no tiene reservas confirmadas». No muestra participantes ni opciones para registrar pagos. El organizador puede volver a sus experiencias o elegir otra sesión.

**Fallos**
- **F1. Corrección fuera de plazo:** si la sesión ya comenzó, MODO no permite revertir el pago. Muestra un mensaje que explica que el plazo para corregirlo terminó, y el estado del pago no cambia.
- **F2. Reserva ajena:** el organizador no puede consultar, registrar ni corregir pagos de reservas de experiencias que no son suyas.

**Reglas**
- **R1.** El organizador solo consulta y gestiona reservas de sus propias experiencias.
- **R2.** Registrar el pago como recibido cambia solo el estado del pago. No cambia la confirmación de la reserva, las plazas ocupadas ni el precio acordado.
- **R3.** La corrección «Recibido» → «Pendiente» tampoco cambia la confirmación de la reserva, las plazas ocupadas ni el precio acordado.
- **R4.** La corrección solo está permitida hasta el momento en que comienza la sesión.
- **R5.** MODO conserva un historial de cada cambio del estado del pago presencial: el registro inicial («Pendiente» → «Recibido») y cada corrección permitida («Recibido» → «Pendiente»). Cada entrada indica quién hizo el cambio, la fecha y hora del registro, el estado anterior y el estado nuevo.
- **R6.** La opción de registrar el pago solo existe para reservas con pago presencial pendiente. Las reservas pagadas en línea no la tienen.
- **R7.** El momento del pago y el momento de su registro en MODO son distintos. El participante paga al llegar al lugar, antes de que comience la actividad (RF2-03 de la especificación de Fase 2). El organizador puede registrar ese pago como «Recibido» en cualquier momento, también después de que la sesión haya comenzado o terminado.
- **R8.** El registro posterior no permite que el participante pague después de la actividad. Solo deja constancia de un pago ya recibido al llegar.
- **R9.** La fecha y hora de una entrada del historial es el momento en que el organizador registró la operación en MODO, no el momento real en que el participante pagó. MODO no interpreta automáticamente ambos momentos como iguales.
- **R10.** MODO guarda únicamente la fecha y hora en que el organizador registra la operación. No le pide la fecha y hora reales en que el participante entregó el dinero. En el historial ese dato se identifica como «Fecha y hora del registro» y no como el momento real del pago. Esto vale para el registro inicial y para las correcciones.

**Exclusiones**
- Qué ocurre cuando un participante no paga al llegar.
- La gestión de las inasistencias.
- Cualquier procedimiento excepcional para corregir un pago marcado como «Recibido» después del comienzo de la sesión. En CU-08 no existe otra vía de corrección.
- El registro en el historial de los intentos de corrección rechazados, porque no modifican el estado del pago.
- Las notificaciones al participante por cambios en el estado de su pago.

## Observable outcome and acceptance criteria

**Resultado observable:** en la lista de reservas de la sesión, el pago presencial de la reserva aparece como «Recibido». Si hubo una corrección, aparece otra vez como «Pendiente» y el historial la registra. La reserva sigue confirmada, con las mismas plazas y el mismo precio.

**Criterios de aceptación**
- **CA-08-01.** Dado un organizador con sesión iniciada, cuando entra en «Mis experiencias», elige una experiencia propia y elige la fecha y el horario de una sesión, entonces MODO lista las reservas confirmadas de esa sesión. Cada una muestra el nombre del participante, las plazas, el importe total en USD, la modalidad de pago y el estado del pago.
- **CA-08-02.** Dada una reserva confirmada con pago presencial «Pendiente» en una experiencia propia, cuando el organizador marca el pago como recibido, entonces el estado del pago pasa a «Recibido».
- **CA-08-03.** Después de CA-08-02, la reserva sigue confirmada y conserva la misma cantidad de plazas ocupadas y el mismo precio acordado.
- **CA-08-04.** Dada una reserva pagada en línea, cuando aparece en la lista, entonces no ofrece la opción de registrar el pago.
- **CA-08-05.** Dado un pago presencial marcado como «Recibido», cuando el organizador lo corrige antes del comienzo de la sesión, entonces el estado vuelve a «Pendiente». La reserva sigue confirmada, con las mismas plazas y el mismo precio.
- **CA-08-06.** Después de CA-08-05, el historial del pago guarda una entrada nueva con: el organizador que hizo la corrección, la fecha y hora del registro, el estado anterior «Recibido» y el estado nuevo «Pendiente». La entrada del registro inicial sigue en el historial.
- **CA-08-07.** Dado un pago «Recibido» de una sesión que ya comenzó, cuando el organizador intenta corregirlo, entonces MODO no cambia el estado y muestra un mensaje que explica que el plazo para corregirlo terminó.
- **CA-08-08.** Dado un organizador, cuando intenta consultar, registrar o corregir pagos de reservas de una experiencia que no es suya, entonces MODO no lo permite.
- **CA-08-09.** Dada una reserva confirmada de una experiencia propia, con pago presencial «Pendiente», cuyo participante pagó al llegar y antes del comienzo, cuando el organizador marca el pago como recibido después de que la sesión haya comenzado o terminado, entonces MODO lo permite y el estado del pago pasa a «Recibido». La reserva sigue confirmada, con las mismas plazas y el mismo precio.
- **CA-08-10.** Dado un pago presencial marcado como «Recibido» después del comienzo de la sesión, cuando el organizador intenta devolverlo a «Pendiente», entonces MODO no cambia el estado y muestra el mensaje de que el plazo para corregirlo terminó (como en CA-08-07).
- ~~**CA-08-11.**~~ Retirado como criterio (2026-11-06): MODO no puede comprobar cuándo se entregó físicamente el dinero. Su contenido se mantiene como regla R8.
- **CA-08-12.** Dada una reserva confirmada de una experiencia propia con pago presencial «Pendiente», cuando el organizador marca por primera vez el pago como recibido, entonces el historial del pago guarda una entrada con ese organizador, la fecha y hora del registro, el estado anterior «Pendiente» y el estado nuevo «Recibido».
- **CA-08-13.** Dado un participante que pagó al llegar, antes del comienzo, y un organizador que registra el pago después de que la sesión terminó, cuando se consulta esa entrada del historial, entonces su fecha y hora es la del registro en MODO, y MODO no la presenta como el momento real en que el participante pagó.
- **CA-08-14.** Dada una reserva con pago presencial «Pendiente», cuando el organizador marca el pago como recibido, entonces MODO no le pide la fecha ni la hora reales en que el participante pagó.
- **CA-08-15.** Dada cualquier entrada del historial del pago (registro inicial o corrección), cuando se consulta, entonces muestra quién hizo el cambio, la fecha y hora identificadas como «Fecha y hora del registro», el estado anterior y el estado nuevo. No muestra ningún dato presentado como el momento real del pago.
- **CA-08-16.** Dada una sesión de una experiencia propia sin reservas confirmadas, cuando el organizador la elige, entonces MODO muestra el mensaje «Esta sesión todavía no tiene reservas confirmadas», no muestra participantes ni opciones para registrar pagos, y el organizador puede volver a sus experiencias o elegir otra sesión.

## Decisions and open questions

**Decisiones confirmadas por el usuario (2026-11-06)**
- CU-08 es un caso nuevo. CU-01..CU-07 se mantienen aprobados y sin cambios.
- Se accede desde «Mis experiencias» → experiencia → fecha y horario de la sesión.
- La lista contiene las reservas confirmadas con los datos de CA-08-01.
- El pago presencial pendiente se marca como recibido después de que el participante pague al llegar. Solo cambia el estado del pago.
- Las reservas pagadas en línea se ven en la lista sin la opción de registrar el pago.
- La corrección «Recibido» → «Pendiente» se permite hasta el comienzo de la sesión y queda en el historial (quién, cuándo, estado anterior). *Ampliada después por R5 y R10: el historial también guarda el estado nuevo y el registro inicial, y la fecha se identifica como «Fecha y hora del registro».*
- El organizador solo actúa sobre reservas de sus propias experiencias.
- El organizador puede marcar un pago presencial como «Recibido» aunque la sesión ya haya comenzado o terminado. El pago se hace al llegar y antes del comienzo (RF2-03). La corrección a «Pendiente» sigue limitada al inicio de la sesión. Registrar o corregir no cambia la reserva, las plazas ni el precio.
- MODO conserva un historial del registro inicial y de las correcciones del pago presencial. Cada entrada indica quién hizo el cambio, la fecha y hora del registro, el estado anterior y el estado nuevo. La fecha y hora del registro es distinta del momento real del pago, y MODO no las interpreta automáticamente como iguales.
- MODO guarda solo la fecha y hora del registro, sin pedir la fecha y hora reales del pago. En el historial se identifica como «Fecha y hora del registro», tanto en el registro inicial como en las correcciones.
- Una vez comenzada la sesión no existe otra vía para corregir un pago marcado como «Recibido». Cualquier procedimiento excepcional queda fuera del alcance inicial.
- Si la sesión elegida no tiene reservas confirmadas, MODO muestra «Esta sesión todavía no tiene reservas confirmadas», sin participantes ni opciones para registrar pagos. El organizador puede volver a sus experiencias o elegir otra sesión.
- Quedan fuera del alcance inicial: los participantes que no pagan al llegar, las inasistencias, el registro de los intentos de corrección rechazados y las notificaciones al participante. La consulta de reservas se mantiene dentro de CU-08. CA-08-11 se retira como criterio y su contenido queda en R8.

**Preguntas abiertas**
- Qué ocurre cuando un participante no paga al llegar (pendiente por decisión del usuario).
- Cómo se gestionan las inasistencias (pendiente por decisión del usuario).
- ~~Si existe un plazo para marcar un pago como recibido, por ejemplo después del comienzo o del final de la sesión.~~ Resuelta por R7 y A3 (2026-11-06): no hay plazo para registrar; el pago se hace al llegar, antes del comienzo.
- ~~Si el marcado inicial como «Recibido» también queda en el historial, o solo las correcciones.~~ Resuelta por R5 (2026-11-06): quedan los dos.
- ~~Si MODO registra el momento real en que el participante pagó y, en ese caso, cómo se indica (nueva, derivada de R9).~~ Resuelta por R10 (2026-11-06): no se registra; solo se guarda la fecha y hora del registro.
- ~~Si los intentos de corrección rechazados por estar fuera de plazo quedan en el historial (nueva, derivada de R5).~~ Resuelta (2026-11-06): no se guardan, porque no modifican el estado del pago (ver Exclusiones).
- ~~Qué alternativa existe, si la hay, para corregir un pago una vez comenzada la sesión («no permitirá revertir directamente»).~~ Resuelta (2026-11-06): en CU-08 no existe otra vía; los procedimientos excepcionales quedan excluidos.
- ~~Qué ve el organizador cuando la sesión no tiene reservas confirmadas.~~ Resuelta por A4 (2026-11-06).
- ~~Si se notifica al participante cuando cambia el estado de su pago.~~ Resuelta (2026-11-06): fuera del alcance de CU-08 (ver Exclusiones).
- ~~Si la consulta de reservas, independiente del registro de pagos, debe separarse en un caso de uso propio.~~ Resuelta (2026-11-06): se mantiene dentro de CU-08.
- Qué etiqueta concreta muestra la lista como estado de pago de las reservas pagadas en línea (nueva, derivada de A1).