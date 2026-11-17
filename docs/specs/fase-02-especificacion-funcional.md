---
slug: "fase-02-especificacion-funcional"
title: "Fase 2 · Especificación funcional de MODO"
description: "Especificación funcional de Fase 2 de MODO derivada de los ocho casos de uso aprobados (CU-01 a CU-08, CU-08 aprobado el 2026-11-06). Concreta sus reglas abiertas mediante RF2-01 a RF2-18 (cancelación, sesiones, registro, catálogo, pago en línea y presencial, reembolsos, zona horaria, moneda, cierre de reservas, cancelación de reservas presenciales e importe total de la reserva), con criterios de aceptación CA-F2-01 a CA-F2-89, sin modificar los casos de uso. Los aspectos no decididos quedan como preguntas abiertas o exclusiones."
spec_kind: spec
status: approved
created_at: "2026-11-06T01:01:05.619Z"
last_updated: "2026-11-09T01:40:10.237Z"
source_use_cases:
  - cu-01-explorar-consultar-experiencias
  - cu-02-registrarse-para-reservar
  - cu-03-publicar-experiencias
  - cu-04-administrar-fechas-cupos-precios
  - cu-05-reservar-pago-presencial
  - cu-06-reservar-pago-en-linea
  - cu-07-cancelar-reserva
  - cu-08-registrar-pago-presencial
---
## Upstream use cases and scope

**Casos de uso de origen (CU-01 a CU-07 aprobados el 2026-10-25; CU-08 aprobado el 2026-11-06)**

| ID | Slug | Actor | Objetivo |
|---|---|---|---|
| CU-01 | `cu-01-explorar-consultar-experiencias` | Visitante | Explorar experiencias y consultar su detalle sin iniciar sesión |
| CU-02 | `cu-02-registrarse-para-reservar` | Visitante | Registrarse para poder reservar |
| CU-03 | `cu-03-publicar-experiencias` | Organizador | Publicar una experiencia con su modalidad de pago |
| CU-04 | `cu-04-administrar-fechas-cupos-precios` | Organizador | Administrar fechas, horarios, cupos y precios de una experiencia |
| CU-05 | `cu-05-reservar-pago-presencial` | Participante | Reservar una experiencia con pago presencial |
| CU-06 | `cu-06-reservar-pago-en-linea` | Participante | Reservar una experiencia con pago en línea |
| CU-07 | `cu-07-cancelar-reserva` | Participante | Cancelar una reserva según las condiciones aplicables |
| CU-08 | `cu-08-registrar-pago-presencial` | Organizador | Consultar las reservas confirmadas de una sesión y registrar como recibido el pago presencial |

**Alcance de la Fase 2**

- Concretar las reglas funcionales que los casos de uso aprobados dejan abiertas.
- Esta versión concreta y añade estas reglas, sin modificar los casos de uso aprobados:
  - RF2-01: concreta la regla R2 de CU-07 (plazo de cancelación).
  - RF2-02: recoge una aclaración sobre CU-04 (añadir nuevas fechas y horarios sin modificar las sesiones existentes).
  - RF2-03: concreta la regla R4 de CU-05 (momento y lugar del pago presencial).
  - RF2-04 sobre CU-04 (una misma experiencia no puede tener dos sesiones con exactamente la misma fecha y horario).
  - RF2-05 sobre CU-03, que extiende RF2-04 a la publicación inicial (no se publica una experiencia con sesiones duplicadas hasta corregirlas).
  - RF2-06 sobre CU-02 (tras completar correctamente el registro, el usuario queda con la sesión iniciada automáticamente; mientras no verifique su correo no puede reservar).
  - RF2-07 sobre CU-01 (una experiencia solo se considera agotada cuando ninguna de sus sesiones futuras tiene plazas disponibles; las completamente agotadas siguen visibles con «Agotado» al final del catálogo).
  - RF2-08 sobre CU-06 (al iniciar el pago en línea, las plazas seleccionadas quedan retenidas un máximo de 10 minutos; si el pago falla, se abandona o no se completa en ese plazo, se liberan automáticamente).
  - RF2-09 sobre CU-06, vinculada a RF2-08 (si la confirmación del pago en línea llega después de los 10 minutos de retención, la reserva no se confirma aunque queden plazas, las plazas siguen liberadas y MODO gestiona un reembolso completo).
  - RF2-10 sobre CU-07 (vinculada a RF2-01), CU-06 y RF2-09 (todo reembolso de un pago en línea se hace, al 100 % del importe pagado, al mismo método de pago utilizado originalmente por el participante, que no puede elegir otro método de devolución).
  - RF2-11, vinculada a CU-07, CU-06, RF2-09 y RF2-10 (MODO inicia la solicitud de reembolso en un plazo máximo de 24 horas desde una cancelación válida o desde que identifica un pago confirmado después de vencer la retención; el reembolso sigue siendo del 100 % y al método de pago original, y no se fija el plazo de acreditación por la entidad financiera).
  - RF2-12, vinculada a RF2-01 y RF2-11 (MODO usa la zona horaria America/Guayaquil (UTC−5, Ecuador continental) como referencia para las fechas y horarios de las experiencias y para calcular el plazo de cancelación de RF2-01 y el plazo de solicitud de reembolso de RF2-11).
  - RF2-13, vinculada a CU-01, CU-03, CU-04, CU-05, CU-06 y CU-07, y a RF2-09, RF2-10 y RF2-11 para los reembolsos (todos los precios que fijan los organizadores y que consultan los participantes, el importe total de las reservas, los pagos en línea y presenciales y los reembolsos se expresan exclusivamente en dólares estadounidenses (USD), sin conversión de divisas ni selección de otra moneda).
  - RF2-14, vinculada a CU-06 y RF2-13 (el pago en línea se admite con tarjeta de crédito o de débito; las transferencias bancarias y las billeteras digitales quedan excluidas en el alcance inicial; antes de iniciar el pago, MODO muestra el importe total en USD y permite elegir entre los medios admitidos; si se intenta un medio no admitido, MODO informa de que no está disponible y permite elegir una tarjeta de crédito o de débito).
  - Incorpora CU-08, aprobado el 2026-11-06.
  - RF2-15, vinculada a CU-08, CU-05 y RF2-03 (el organizador registra manualmente como recibido el pago presencial; la reserva sigue confirmada desde que se realiza y solo cambia su estado de pago, sin modificar la reserva, el precio acordado ni las plazas ocupadas; solo en sus propias experiencias).
  - RF2-16, vinculada a CU-01, CU-05, CU-06, RF2-07 y RF2-12 (las nuevas reservas de una sesión solo se admiten antes de su hora exacta de inicio, en hora America/Guayaquil, sin cierre anticipado; desde ese momento la sesión deja de considerarse futura para la disponibilidad del catálogo y el estado «Agotado»).
  - RF2-17, vinculada a CU-07, CU-08 y RF2-01 (al cancelar válidamente una reserva con pago presencial, MODO cancela la reserva completa y libera las plazas sin iniciar ningún reembolso; si el pago figura como «Recibido», conserva ese estado y su historial y no afirma que no hubo pago ni que se devolvió; el tratamiento del dinero recibido fuera de MODO queda fuera del alcance).
  - RF2-18, vinculada a CU-04, CU-05, CU-06, CU-08 y RF2-13 (cada sesión tiene un precio individual por participante; el importe total de la reserva es ese precio multiplicado por las plazas seleccionadas, se muestra antes de confirmar la reserva o iniciar el pago y se conserva al quedar confirmada aunque el organizador cambie después el precio de la sesión; se aplica al pago presencial y al pago en línea).
- Las reglas aprobadas de CU-01, CU-02, CU-03, CU-04, CU-05, CU-06, CU-07 y CU-08 se mantienen sin cambios.
- El resto de aspectos sigue pendiente.

**Exclusiones de esta especificación**

- No incluye diseño técnico ni implementación.
- No modifica los casos de uso aprobados. Si una decisión llegara a cambiar el comportamiento de un caso de uso, ese caso de uso deberá reabrirse por separado.

## Rules, exclusions, and acceptance criteria

**Reglas vigentes de CU-07 (contexto, sin cambios)**

Se copian solo como contexto; su fuente es CU-07 y no se modifican aquí.

- **R1:** MODO aplica una política de cancelación única para todas las experiencias.
- **R3:** reserva pagada en línea cancelada dentro del plazo: reembolso completo. Reserva de pago presencial: cancelación sin reembolso.
- **R4:** al cancelar correctamente, las plazas vuelven a estar disponibles para otros participantes.
- **R5:** la política se comunica antes de confirmar la reserva (CU-05, CU-06).
- **R6:** un participante solo puede cancelar las reservas asociadas a su propia cuenta.
- **R7:** la cancelación se aplica a la reserva completa; no se cancelan plazas sueltas.
- **F2:** si la reserva ya está cancelada o su fecha ha pasado, MODO no ofrece la cancelación.

**Regla nueva de Fase 2 — RF2-01: plazo de cancelación (concreta CU-07 R2)**

- MODO permite cancelar una reserva confirmada si faltan 24 horas o más para el inicio de la experiencia. Si faltan menos de 24 horas, MODO no permite cancelarla directamente e informa al participante de que ya no es posible.
- Se toma como «inicio de la experiencia» la fecha y el horario de inicio reservados (los que se definen en CU-04).
- Esta regla concreta el «plazo determinado» de CU-07 R2 sin modificar CU-07: donde CU-07 habla de «antes de la fecha de la experiencia», RF2-01 precisa que el plazo se cuenta desde el inicio de la fecha y horario reservados.
- Palabras del usuario (2026-11-05): «política general que permita cancelar hasta 24 horas antes del inicio de la experiencia» y «Si faltan menos de 24 horas para la experiencia, MODO informa que ya no es posible cancelarla directamente.»
- El caso de exactamente 24 horas se permite: es la lectura conjunta de las dos frases («hasta 24 horas antes» lo incluye y la negativa solo se aplica cuando faltan menos de 24 horas), no una decisión nueva.

**Reglas vigentes de CU-04 (contexto, sin cambios)**

Se copian solo como contexto; su fuente es CU-04 y no se modifican aquí.

- **R1:** una fecha con reservas activas no puede eliminarse ni cambiar de día u horario.
- **R2:** los cupos de una fecha con reservas pueden aumentarse o reducirse, pero nunca por debajo de las plazas ya reservadas.
- **R3:** un cambio de precio solo se aplica a reservas futuras; las reservas existentes conservan su precio.
- **R4:** solo se aceptan fechas futuras (CU-03).
- **R5:** cada organizador administra exclusivamente las experiencias que haya publicado.
- **R6:** el precio se establece por cada fecha u horario y puede variar entre sesiones; las reservas confirmadas conservan siempre el precio vigente al momento de reservar.
- **A1:** fecha sin reservas activas: el organizador puede modificar su día, horario, cupos y precio, o eliminarla.
- **A3:** eliminación de la última fecha futura: la experiencia deja de aparecer en el catálogo público, según las reglas de visibilidad de CU-01, sin que ello implique eliminar la experiencia del sistema.

**Aclaración de Fase 2 — RF2-02: añadir fechas sin modificar las sesiones existentes (sobre CU-04)**

- El organizador puede añadir nuevas fechas y horarios a una misma experiencia; hacerlo no modifica las sesiones ya existentes de esa experiencia (día, horario, cupos y precio) ni sus reservas.
- Palabras del usuario (2026-11-05): «el organizador puede añadir nuevas fechas y horarios para una misma experiencia sin modificar las sesiones existentes».
- Es coherente con el flujo «Añadir una fecha» y CA1 de CU-04 y no modifica CU-04. Las nuevas fechas siguen sujetas a R4 y R5 de CU-04.

**Reglas vigentes de CU-05 (contexto, sin cambios)**

Se copian solo como contexto; su fuente es CU-05 y no se modifican aquí.

- **R1:** una reserva puede incluir varias plazas, sin superar la disponibilidad de la fecha.
- **R2:** no se registran datos individuales de los acompañantes; la reserva queda asociada a la cuenta de quien la realiza.
- **R3:** el teléfono es obligatorio en la primera reserva si la cuenta no lo tiene, y se guarda para futuras reservas.
- **R4:** en la modalidad presencial, la reserva se confirma automáticamente cuando el participante cumple los requisitos y existen suficientes plazas disponibles (decisión 4), ya que el pago se realiza en el lugar. No se requiere aprobación manual del organizador.
- **R5:** la reserva conserva el precio vigente en el momento de reservar (CU-04).
- **R6:** las condiciones de cancelación aplicables se comunican antes de confirmar la reserva.

**Regla nueva de Fase 2 — RF2-03: momento del pago presencial (concreta CU-05 R4)**

- En una reserva con pago presencial, el participante deberá realizar el pago al llegar al lugar de la experiencia, antes de comenzar la actividad.
- Palabras del usuario (2026-11-05): «el participante deberá realizar el pago presencial al llegar al lugar de la experiencia, antes de comenzar la actividad».
- Esta regla concreta el «pago se realiza en el lugar» de CU-05 R4 sin modificar CU-05: la reserva sigue confirmándose automáticamente con disponibilidad suficiente y sin aprobación manual del organizador.
- No define cómo se registra el pago presencial, qué ocurre si el participante no paga ni cómo se gestionan las inasistencias; esos aspectos siguen abiertos. *(Actualización 2026-11-08: el registro del pago presencial lo resuelven RF2-15 y CU-08; siguen pendientes qué ocurre si el participante no paga y la gestión de inasistencias.)*

**Regla nueva de Fase 2 — RF2-04: sin sesiones duplicadas con la misma fecha y horario (sobre CU-04)**

- Una misma experiencia no puede tener dos sesiones con exactamente la misma fecha y horario. Si el organizador intenta guardar una sesión cuya fecha y horario coinciden exactamente con los de otra sesión de esa experiencia, MODO no la guarda y muestra un mensaje que explica que ya hay una sesión programada para ese momento. El organizador puede modificar la fecha o el horario para continuar.
- Se aplica al añadir una sesión (flujo «Añadir una fecha» de CU-04) y al modificar una sesión existente. En la modificación, solo cuando CU-04 permite cambiar su día u horario (R1 y A1: sesiones sin reservas activas); ver «Reglas vigentes de CU-04 (contexto, sin cambios)» más arriba.
- Se permiten varias sesiones de una misma experiencia en un mismo día, siempre que tengan horarios diferentes. También pueden coincidir en fecha y horario sesiones de experiencias distintas.
- Palabras del usuario (2026-11-05): «Quiero que MODO no permita crear dos sesiones de una misma experiencia que tengan exactamente la misma fecha y horario.», «Si existe, no debe permitir guardar la nueva sesión y debe mostrar un mensaje explicando que ya hay una sesión programada para ese momento. El organizador podrá modificar la fecha o el horario para continuar.», «Esta misma validación debe aplicarse cuando se modifica una sesión existente, siempre que ese cambio esté permitido según las reglas de CU-04.» y «Sí quiero permitir varias sesiones de una misma experiencia durante un mismo día, siempre que tengan horarios diferentes. También pueden coincidir sesiones de experiencias distintas.»
- Complementa RF2-02: añadir nuevas fechas y horarios sigue sin modificar las sesiones existentes, pero la nueva sesión no puede coincidir exactamente en fecha y horario con otra de la misma experiencia. No modifica CU-04, y las sesiones siguen sujetas a sus demás reglas (por ejemplo, R4 y R5).
- RF2-04 solo trata la coincidencia exacta de fecha y horario. No añade ninguna regla sobre horarios distintos que se solapen parcialmente. Si se aplica a las varias fechas de la publicación inicial (CU-03 A2) es una pregunta abierta. *(Actualización 2026-11-08: resuelta por RF2-05: RF2-04 se aplica también a la publicación inicial (CU-03 A2).)*

**Reglas vigentes de CU-03 (contexto, sin cambios)**

Se copian solo como contexto; su fuente es CU-03 y no se modifican aquí.

- **R1:** cualquier usuario registrado puede activar su perfil de organizador; no hay aprobación manual por un administrador.
- **R2:** una misma persona puede ser participante y organizador.
- **R3:** el organizador define la modalidad de pago de cada experiencia: en línea o presencial (decisión 2).
- **R4:** la categoría y la ubicación (zona y sector o parroquia) son obligatorias y deben estar dentro del Distrito Metropolitano de Quito (decisiones 6 y 7).
- **R5:** una experiencia solo se publica con su información completa y al menos una fecha futura con horario, cupos y precio.
- **R6:** al publicarse, la experiencia aparece en el catálogo y cumple las reglas de visibilidad de CU-01.
- **R7:** el precio se establece por cada fecha u horario y puede variar entre sesiones (por ejemplo, $20 el sábado y $25 el domingo).
- **A2 — Varias fechas:** el organizador añade más de una fecha futura, cada una con horario, cupos y precio.
- **F1 — Información incompleta:** si falta algún dato obligatorio o no se ha añadido ninguna fecha futura con horario, cupos y precio, MODO no publica la experiencia e indica qué debe completarse.
- **F2 — Ubicación fuera del área:** MODO rechaza la publicación de experiencias cuya ubicación esté fuera del Distrito Metropolitano de Quito e indica al organizador que debe corregirla.
- **F3 — Fecha pasada:** MODO no acepta fechas pasadas como fechas de realización disponibles; la publicación requiere al menos una fecha futura válida.

**Regla nueva de Fase 2 — RF2-05: RF2-04 en la publicación inicial (sobre CU-03)**

- Al publicar una experiencia (CU-03), si el organizador añade varias sesiones (A2) y dos o más tienen exactamente la misma fecha y horario, MODO no publica la experiencia hasta que se corrijan los duplicados, e indica qué debe corregirse.
- Se permiten varias sesiones de una misma experiencia en un mismo día, siempre que tengan horarios diferentes (como en RF2-04).
- Palabras del usuario (2026-11-05): «También confirmo que la regla RF2-04 debe aplicarse durante la publicación inicial. Si el organizador añade varias sesiones de una misma experiencia con exactamente la misma fecha y horario, MODO no debe permitir publicar hasta que corrija los duplicados.» y «Si falta información o alguna condición no se cumple, MODO debe indicar qué necesita corregirse.»
- Extiende RF2-04 al flujo de publicación de CU-03 (A2) sin modificar RF2-04 ni CU-03. Es coherente con F1 y CA4 de CU-03 (MODO indica qué completar o corregir), y la publicación sigue sujeta a las demás reglas de CU-03 (R4, R5, F2, F3).
- Igual que RF2-04, solo trata la coincidencia exacta de fecha y horario; no añade ninguna regla sobre horarios distintos que se solapen parcialmente.

**Reglas vigentes de CU-02 (contexto, sin cambios)**

Se copian solo como contexto; su fuente es CU-02 y no se modifican aquí.

- **R1:** el registro solicita únicamente nombre completo, correo electrónico y contraseña.
- **R2:** la aceptación de los términos y condiciones es obligatoria, y el visitante recibe la información sobre el tratamiento de sus datos personales antes de crear la cuenta.
- **R3:** no se solicita cédula ni pasaporte como requisito general de registro.
- **R4:** el teléfono no se solicita en el registro; podrá solicitarse durante la reserva cuando sea necesario (CU-05, CU-06).
- **R5:** un correo sin verificar no impide iniciar sesión ni explorar experiencias, pero sí reservar.
- **R6:** cada correo electrónico corresponde a una sola cuenta.
- **A1 — Intento de reservar con el correo sin verificar:** MODO solicita la verificación del correo y permite reenviar el correo de verificación. Una vez verificado, el usuario puede continuar con el proceso de reserva (CU-05, CU-06).
- **A2 — Reenvío del correo de verificación:** el usuario solicita un nuevo correo de verificación y MODO lo envía.
- **F1 — Datos incompletos o no válidos:** MODO indica qué datos deben corregirse y no crea la cuenta.
- **F2 — Términos no aceptados:** MODO no crea la cuenta.
- **F3 — Correo ya registrado:** MODO no crea una segunda cuenta con ese correo e informa al visitante, ofreciéndole iniciar sesión.

**Regla nueva de Fase 2 — RF2-06: inicio de sesión automático tras el registro (sobre CU-02)**

- Tras completar correctamente el registro (flujo principal de CU-02), el usuario queda con la sesión iniciada automáticamente, sin tener que volver a introducir sus credenciales. Puede explorar las experiencias, utilizar los filtros y consultar sus detalles (CU-01).
- Mientras no haya verificado su correo electrónico, no puede realizar reservas. MODO le informa de esta condición y le permite solicitar nuevamente el correo de verificación (CU-02 A1, A2). Una vez verificado, puede continuar con el proceso de reserva (CU-05, CU-06), siempre que se cumplan las demás condiciones.
- Si el registro no se completa (CU-02 F1, F2 o F3), no se crea la cuenta y, por tanto, no se inicia ninguna sesión.
- Palabras del usuario (2026-11-05): «He decidido que, después de completar correctamente el registro, el usuario inicie sesión automáticamente. Así puede explorar las experiencias, utilizar los filtros y consultar sus detalles sin tener que volver a ingresar sus credenciales.» y «Sin embargo, mientras no haya verificado su correo electrónico, no podrá realizar reservas. MODO debe informarle de esta condición y permitirle solicitar nuevamente el correo de verificación.»
- Resuelve la pregunta abierta de CU-02 «Si, tras registrarse, el usuario queda con la sesión iniciada automáticamente.» No modifica CU-02: es coherente con R5 (un correo sin verificar no impide iniciar sesión ni explorar experiencias, pero sí reservar), con A1 y A2 y con CA8 a CA10 de CU-02.
- No resuelve si, al registrarse desde un intento de reserva (CU-02 A3), el usuario vuelve a la experiencia que quería reservar, ni los requisitos de la contraseña, la caducidad y el formato del correo de verificación o el cierre de sesión; esas preguntas siguen abiertas.

**Reglas vigentes de CU-01 (contexto, sin cambios)**

Se copian solo como contexto; su fuente es CU-01 y no se modifican aquí.

- **R1:** el catálogo solo contiene experiencias dentro del Distrito Metropolitano de Quito (decisión 6).
- **R2:** las experiencias sin fechas futuras se ocultan del catálogo público.
- **R3:** las experiencias con fechas futuras pero sin plazas disponibles aparecen con la etiqueta «Agotado» y sin posibilidad de reservar.
- **R4:** el filtro de ubicación tiene dos niveles: zona amplia obligatoria para filtrar y sector o parroquia opcional.
- **R5:** el detalle muestra: nombre, descripción, categoría, zona y sector, fechas y horarios, precio, disponibilidad, modalidad de pago, organizador, imágenes, duración y qué incluye la experiencia.
- **R6:** el orden por defecto del listado es la fecha disponible más próxima. Las experiencias agotadas se muestran al final del listado, independientemente del criterio de ordenación seleccionado.
- **R7:** los filtros seleccionados se cumplen conjuntamente: una experiencia solo aparece si cumple todos ellos.
- **R8:** la búsqueda por texto consulta el nombre y la descripción de las experiencias.
- **A5 — Filtro de plazas disponibles activo:** se muestran únicamente experiencias que todavía se pueden reservar; las agotadas no aparecen.
- **F1 — Sin resultados:** si la búsqueda o la combinación de filtros no produce resultados, MODO informa al visitante de que no hay experiencias que coincidan y le permite modificar o limpiar los filtros.

**Regla nueva de Fase 2 — RF2-07: estado «Agotado» a nivel de experiencia (sobre CU-01)**

- Una experiencia se considera agotada solo cuando ninguna de sus sesiones futuras tiene plazas disponibles. Si al menos una sesión futura tiene plazas, la experiencia sigue disponible aunque otras de sus sesiones estén agotadas: no se muestra como «Agotado» ni se ordena al final del catálogo por ese motivo.
- Las experiencias completamente agotadas (todas sus sesiones futuras sin plazas) siguen visibles en el catálogo, identificadas como «Agotado», y aparecen al final con cualquier criterio de ordenación (CU-01 R6, CA13). Las experiencias que ya no tienen fechas futuras no se muestran (CU-01 R2, CA7).
- Con el filtro de plazas disponibles activo (CU-01 A5, CA8), aparece toda experiencia con al menos una sesión futura con plazas; las completamente agotadas no aparecen.
- Palabras del usuario (2026-11-05): «Quiero precisar que una experiencia solamente debe considerarse agotada cuando ninguna de sus sesiones futuras tenga plazas disponibles. Si una sesión está agotada, pero otra fecha todavía tiene plazas, la experiencia sigue disponible.» y «Las experiencias completamente agotadas permanecen visibles, identificadas como «Agotado» y aparecen al final del catálogo. En cambio, las experiencias que ya no tienen fechas futuras no se muestran.»
- Concreta, a nivel de experiencia, CU-01 R3 («sin plazas disponibles»), R6 (agotadas al final) y A5/CA8 (filtro de plazas disponibles) sin modificar CU-01.
- Relación con CU-05, sin modificarlo: RF2-07 trata el estado de la experiencia en el catálogo. Una sesión concreta sin plazas sigue mostrándose como «Agotado» y no permite reservar, aunque la experiencia siga disponible por tener otras sesiones con plazas (CU-05 F2: «una fecha sin plazas aparece como «Agotado» y no permite reservar (CU-01)»). CU-05 CA8 («cuando una fecha queda sin plazas tras una reserva, aparece como «Agotado» en el catálogo») se lee en el catálogo según RF2-07: la fecha queda como «Agotado», y la experiencia solo aparece como «Agotado» cuando ninguna de sus sesiones futuras tiene plazas.
- No resuelve si, con un filtro de fecha activo (CU-01 A3, A4), el estado «Agotado» se evalúa solo sobre las sesiones del periodo filtrado; esa pregunta queda abierta.

**Reglas vigentes de CU-06 (contexto, sin cambios)**

Se copian solo como contexto; su fuente es CU-06 y no se modifican aquí.

- **R1:** las reglas de CU-05 sobre varias plazas, acompañantes, teléfono y correo verificado se aplican igualmente a esta modalidad.
- **R2:** al iniciar el pago, las plazas seleccionadas se apartan temporalmente y no pueden ser reservadas por otros usuarios durante ese proceso.
- **R3:** la reserva se confirma automáticamente solo cuando hay disponibilidad y el pago se completa correctamente (decisión 4).
- **R4:** si el pago falla, se abandona o vence el tiempo permitido, las plazas se liberan.
- **R5:** se respeta el precio mostrado al confirmar la operación (CU-04).
- **R6:** las condiciones de cancelación aplicables se comunican antes de iniciar el pago.
- **F1 — Plazas insuficientes al iniciar el pago:** si no existen plazas suficientes para la cantidad solicitada, MODO no permite iniciar el pago, no aparta plazas y muestra un aviso al participante.
- **F2 — Pago fallido:** la reserva no se confirma; MODO informa al participante, libera las plazas retenidas y permite iniciar un nuevo intento de reserva.
- **F3 — Pago abandonado o tiempo de retención vencido:** la reserva no se confirma y las plazas apartadas se liberan y vuelven a estar disponibles.
- **F4 — Teléfono no indicado:** MODO impide confirmar la operación e indica qué dato falta (igual que en CU-05).

**Regla nueva de Fase 2 — RF2-08: retención de plazas de 10 minutos durante el pago en línea (sobre CU-06)**

- Cuando el participante inicia el pago (CU-06 paso 4), MODO retiene las plazas seleccionadas durante un máximo de 10 minutos. Durante ese tiempo, esas plazas no están disponibles para otras personas.
- Si el pago se completa correctamente dentro de los 10 minutos, MODO confirma automáticamente la reserva (CU-06 R3).
- Si el pago falla, el participante abandona el proceso o transcurren los 10 minutos sin completar el pago, MODO libera automáticamente las plazas retenidas y la reserva no se confirma (CU-06 F2, F3).
- Si el participante quiere intentarlo nuevamente, debe comenzar una nueva reserva, siempre que todavía existan plazas disponibles (CU-06 F1).
- Palabras del usuario (2026-11-05): «He decidido que, cuando un participante inicia el proceso de pago, las plazas seleccionadas queden retenidas durante un máximo de 10 minutos. Durante ese tiempo no estarán disponibles para otras personas.», «Si el pago se completa correctamente dentro de los 10 minutos, MODO confirma automáticamente la reserva.», «Si el pago falla, el participante abandona el proceso o transcurren los 10 minutos sin completar el pago, las plazas deben liberarse automáticamente.» y «Si el participante quiere intentarlo nuevamente, deberá comenzar una nueva reserva, siempre que todavía existan plazas disponibles.»
- Concreta CU-06 sin modificarlo. En R2, la retención «durante ese proceso» dura como máximo 10 minutos. En R4 y F3, «el tiempo permitido» o «tiempo de retención» es de 10 minutos. En F2, el «nuevo intento de reserva» es una nueva reserva, sujeta a que haya plazas disponibles. Las reglas aprobadas de CU-06 no cambian.
- Resuelve la pregunta abierta «Tiempo exacto de retención» de CU-06 y de `docs/entregas/fase-01.md` §5.2 y §8.2, y fija el tiempo de retención que CU-06 deja sin definir en sus límites y exclusiones. No define los mecanismos técnicos de pago, los medios de pago aceptados, la moneda ni los reembolsos. *(Actualización 2026-11-08: la moneda la fija RF2-13, los medios de pago aceptados RF2-14 y los reembolsos RF2-09, RF2-10 y RF2-11 (método de devolución e inicio de la solicitud); siguen sin definir los mecanismos técnicos de pago y el plazo de acreditación del reembolso.)*
- No resuelve qué ocurre con un pago cuya confirmación llega después de vencer la retención; el usuario pide expresamente dejar esa pregunta abierta. *(Actualización 2026-11-08: resuelto por RF2-09.)*

**Regla nueva de Fase 2 — RF2-09: pago confirmado fuera del plazo de retención (sobre CU-06, vinculada a RF2-08)**

- Si la confirmación de un pago en línea llega después de que hayan transcurrido los 10 minutos de retención de RF2-08, MODO no confirma la reserva, aunque todavía existan plazas disponibles.
- Como la retención ya terminó, las plazas siguen liberadas y disponibles para otras personas (RF2-08; CU-06 R4, F3). MODO gestiona un reembolso completo del importe pagado.
- El participante recibe un mensaje claro que indica que el pago se confirmó fuera del plazo permitido, que su reserva no fue confirmada y que se gestionará la devolución del dinero.
- Si quiere reservar nuevamente, debe iniciar una nueva reserva, sujeta a la disponibilidad actual (como en RF2-08 y CU-06 F1).
- Palabras del usuario (2026-11-05): «He decidido que, si la confirmación de un pago en línea llega después de que hayan transcurrido los 10 minutos de retención, MODO no debe confirmar esa reserva, aunque todavía existan plazas disponibles.», «Como el periodo de retención ya terminó, las plazas deben permanecer liberadas y el sistema debe gestionar un reembolso completo del importe pagado.», «El participante debe recibir un mensaje claro indicando que el pago se confirmó fuera del plazo permitido, que su reserva no fue confirmada y que se gestionará la devolución del dinero.» y «Si quiere reservar nuevamente, deberá iniciar una nueva reserva y comprobar la disponibilidad actual.»
- Se apoya en las reglas recogidas en «Reglas vigentes de CU-06 (contexto, sin cambios)» más arriba, sin duplicarlas y sin modificar CU-06: es coherente con R3 (la reserva solo se confirma cuando hay disponibilidad y el pago se completa correctamente) y con F3 (vencido el tiempo de retención, la reserva no se confirma y las plazas se liberan). Complementa RF2-08 sin modificarla.
- Resuelve la pregunta abierta, pedida por el usuario y derivada de RF2-08, sobre el pago cuya confirmación llega después de vencer la retención. No define el procedimiento ni el plazo exacto del reembolso, que siguen pendientes por petición expresa del usuario; tampoco define los medios de pago aceptados ni la moneda. *(Actualización 2026-11-08: el método de devolución lo fija RF2-10, el plazo de inicio de la solicitud RF2-11, la moneda RF2-13 y los medios de pago aceptados RF2-14; siguen pendientes el plazo de acreditación por la entidad financiera y el procedimiento técnico del reembolso.)*

**Regla nueva de Fase 2 — RF2-10: reembolso al método de pago original (vinculada a CU-07, CU-06 y RF2-09)**

- Todo reembolso de un pago en línea en MODO se realiza al mismo método de pago que utilizó originalmente el participante.
- Se aplica a los dos casos de reembolso ya confirmados: la cancelación de una reserva pagada en línea dentro del plazo de 24 horas de RF2-01 (CU-07) y el pago confirmado después de vencer los 10 minutos de retención (RF2-09, sobre CU-06).
- En ambos casos se mantiene la devolución del 100 % del importe pagado, según CU-07 R3 y RF2-09; RF2-10 no cambia el importe del reembolso.
- MODO no ofrece al participante la posibilidad de seleccionar otro método de devolución.
- Palabras del usuario (2026-11-06): «He decidido que todos los reembolsos de pagos en línea en MODO se realicen al mismo método de pago utilizado originalmente por el participante.», «Esta condición debe aplicarse tanto cuando un participante cancela una reserva dentro del plazo permitido de 24 horas de anticipación (CU-07), como cuando un pago se confirma después de vencer los 10 minutos de retención (RF2-09).», «En ambos casos, se mantiene la devolución del 100 % del importe pagado, según las reglas que ya hemos confirmado.» y «No quiero que el participante pueda seleccionar otro método de devolución.»
- Se apoya en las reglas recogidas en «Reglas vigentes de CU-07 (contexto, sin cambios)» (R3: reembolso completo de la reserva pagada en línea cancelada dentro del plazo) y en «Reglas vigentes de CU-06 (contexto, sin cambios)» más arriba, sin duplicarlas y sin modificar CU-07 ni CU-06. Es coherente con CU-07 A2 y con su paso 7, en el que MODO gestiona el reembolso completo. Complementa RF2-01 y RF2-09 sin modificarlas.
- Resuelve solo en parte la pregunta abierta «Reembolsos: procedimiento y tiempos del reembolso» de CU-07 y de `docs/entregas/fase-01.md` §5.2: queda definido el método de devolución. El plazo de tramitación y de acreditación del reembolso sigue pendiente, por petición expresa del usuario. No define qué ocurre si el método de pago original ya no está disponible, ni los medios de pago aceptados ni la moneda. *(Actualización 2026-11-08: el plazo de tramitación (inicio de la solicitud por MODO) lo fija RF2-11, la moneda RF2-13 y los medios de pago aceptados RF2-14; siguen pendientes el plazo de acreditación por la entidad financiera y qué ocurre si el método de pago original ya no está disponible.)*

**Regla nueva de Fase 2 — RF2-11: plazo de MODO para iniciar el reembolso (vinculada a CU-07, CU-06, RF2-09 y RF2-10)**

- MODO inicia la solicitud de reembolso de un pago en línea en un plazo máximo de 24 horas.
- Se aplica a los dos casos de reembolso ya confirmados. El plazo se cuenta desde la cancelación válida de una reserva pagada en línea (dentro del plazo de RF2-01, CU-07) o desde que MODO identifica un pago confirmado después de vencer los 10 minutos de retención (RF2-09, sobre CU-06).
- El reembolso sigue siendo del 100 % del importe pagado y se hace al método de pago original (RF2-10). RF2-11 no cambia ni el importe ni el método de devolución.
- Hay que distinguir dos plazos. Uno es el que tiene MODO para solicitar el reembolso: RF2-11 lo fija en 24 horas como máximo. El otro es el tiempo que tarda la entidad financiera en acreditar el dinero, que no se fija. La especificación no establece ningún plazo garantizado de acreditación bancaria, por petición expresa del usuario.
- Palabras del usuario (2026-11-06): «He decidido que MODO debe iniciar la solicitud de reembolso en un plazo máximo de 24 horas desde que se produce una cancelación válida o se identifica un pago confirmado después del vencimiento de la retención.», «Esta condición se aplica a CU-07 y CU-06, en relación con RF2-09 y RF2-10.», «El reembolso sigue siendo del 100 % y debe realizarse al método de pago original.» y «Quiero distinguir claramente entre el tiempo que tiene MODO para solicitar el reembolso y el tiempo que tarda la entidad financiera en acreditar el dinero. No quiero establecer todavía un plazo garantizado de acreditación bancaria.»
- Se apoya, sin duplicarlas, en las reglas de «Reglas vigentes de CU-07 (contexto, sin cambios)» y «Reglas vigentes de CU-06 (contexto, sin cambios)» de más arriba y en RF2-09 y RF2-10. No modifica CU-07 ni CU-06. Fija cuándo inicia MODO el reembolso completo que gestiona según CU-07 (paso 7, A2) y RF2-09. Complementa RF2-09 y RF2-10 sin modificarlas.
- Resuelve en parte lo que RF2-10 deja pendiente de la pregunta abierta «Reembolsos: procedimiento y tiempos del reembolso» de CU-07 y de `docs/entregas/fase-01.md` §5.2: queda definido el plazo de tramitación, es decir, el inicio de la solicitud por MODO.
- Sigue pendiente el plazo de acreditación por la entidad financiera. RF2-11 no define qué ocurre si el método de pago original ya no está disponible (pregunta derivada de RF2-10, sin decidir). Tampoco define el procedimiento técnico del reembolso, los medios de pago aceptados ni la moneda. *(Actualización 2026-11-08: la moneda la fija RF2-13 y los medios de pago aceptados RF2-14; siguen pendientes el plazo de acreditación, el procedimiento técnico del reembolso y la pregunta derivada de RF2-10.)*

**Regla nueva de Fase 2 — RF2-12: zona horaria de referencia America/Guayaquil (vinculada a RF2-01 y RF2-11)**

- MODO utiliza la zona horaria America/Guayaquil (UTC−5), correspondiente a Ecuador continental, como referencia para las fechas y horarios de las experiencias.
- Esa misma zona horaria se usa para calcular el plazo de cancelación de RF2-01 (hasta 24 horas antes del inicio de la experiencia, CU-07) y el plazo máximo de 24 horas de RF2-11 para que MODO inicie la solicitud de reembolso.
- Ejemplo del usuario: si una experiencia comienza el sábado a las 15:00, la cancelación está permitida hasta el viernes a las 15:00, inclusive, según la hora de Ecuador continental. Es coherente con RF2-01, que permite el caso de exactamente 24 horas.
- Palabras del usuario (2026-11-06): «Confirmo que MODO utilizará la zona horaria America/Guayaquil (UTC−5), correspondiente a Ecuador continental, como referencia para las fechas y horarios de las experiencias y para calcular los plazos de cancelación y solicitud de reembolso.», «Esta decisión debe aplicarse a RF2-01, que permite cancelar hasta 24 horas antes del inicio de una experiencia, y a RF2-11, que establece un máximo de 24 horas para iniciar la solicitud de reembolso.» y «Por ejemplo, si una experiencia comienza el sábado a las 15:00, la cancelación estará permitida hasta el viernes a las 15:00, inclusive, según la hora de Ecuador continental.»
- No modifica RF2-01 ni RF2-11: precisa en qué hora se interpretan sus plazos. Las reglas aprobadas de los casos de uso no cambian.
- Solo se aplica a lo que indica el usuario: las fechas y horarios de las experiencias, el plazo de cancelación de RF2-01 y el plazo de solicitud de reembolso de RF2-11. No extiende la zona horaria a otros ámbitos que el usuario no menciona.
- Resuelve la pregunta abierta «Zona horaria de referencia para calcular el plazo de 24 horas», derivada de RF2-01. La pregunta derivada de RF2-10 sobre el método de pago original no disponible sigue sin decidir.

**Regla nueva de Fase 2 — RF2-13: moneda única USD (vinculada a CU-01, CU-03, CU-04, CU-05, CU-06 y CU-07)**

- Todos los importes de MODO se expresan exclusivamente en dólares estadounidenses (USD). MODO no ofrece conversión de divisas ni permite seleccionar otra moneda.
- Se aplica a los precios que fijan los organizadores al publicar una experiencia (CU-03) y al administrar las fechas, horarios, cupos y precios de sus sesiones (CU-04); a los precios que consultan los participantes en el catálogo, en el detalle y en el filtro de rango de precios (CU-01); al importe total de la reserva y al pago presencial (CU-05); al importe total de la reserva y al pago en línea (CU-06), y a los reembolsos (CU-07, RF2-09, RF2-10 y RF2-11).
- Palabras del usuario (2026-11-06): «He decidido que todos los precios de las experiencias, los pagos en línea, los pagos presenciales y los reembolsos se expresen exclusivamente en dólares estadounidenses (USD).», «MODO no ofrecerá conversiones de divisas ni permitirá seleccionar otras monedas.» y «Esta regla debe aplicarse a los precios que establecen los organizadores, los precios que consultan los participantes, el importe total de las reservas y las devoluciones correspondientes.»
- Se apoya, sin duplicarlas, en las reglas de «Reglas vigentes de CU-03 (contexto, sin cambios)» (R7), «Reglas vigentes de CU-04 (contexto, sin cambios)» (R3, R6), «Reglas vigentes de CU-01 (contexto, sin cambios)» (R5), «Reglas vigentes de CU-05 (contexto, sin cambios)» (R5), «Reglas vigentes de CU-06 (contexto, sin cambios)» (R5) y «Reglas vigentes de CU-07 (contexto, sin cambios)» (R3) de más arriba, y en RF2-09, RF2-10 y RF2-11. Solo fija la moneda: no cambia el precio por sesión, el precio conservado al reservar, el reembolso del 100 %, el método de devolución ni sus plazos. No modifica los casos de uso aprobados ni RF2-01 a RF2-12.
- Lo que RF2-08, RF2-09, RF2-10 y RF2-11 dejan sin definir sobre la moneda queda fijado por RF2-13, sin modificar esas reglas.
- No define el redondeo, los impuestos ni las comisiones (el usuario pide expresamente no inventarlos), ni el número de decimales ni el formato de presentación de los importes (CU-03 ya deja fuera el formato del precio). Esos aspectos no están definidos.
- Resuelve la parte de moneda de la pregunta abierta «Pago en línea: medios de pago aceptados, moneda y tiempo exacto de retención» (CU-06 / fase-01 §5.2). También resuelve la parte de moneda de la pregunta abierta de CU-01 «Forma del filtro de rango de precios y moneda.» (recogida en «Filtros del catálogo») y del punto anterior «Precios: moneda, tipos de entrada o tarifas, experiencias gratuitas» (proceso.md, Fase 1 / fase-01 §8.2, recogido en «Precios: tarifas y experiencias gratuitas»). El resto de esas preguntas sigue pendiente: los medios de pago aceptados, la forma del filtro de rango de precios, las tarifas y las experiencias gratuitas, así como la pregunta derivada de RF2-10. *(Actualización 2026-11-08: los medios de pago aceptados los fija RF2-14; siguen pendientes la forma del filtro de rango de precios, las tarifas, las experiencias gratuitas y la pregunta derivada de RF2-10.)*

**Regla nueva de Fase 2 — RF2-14: medios de pago en línea admitidos (vinculada a CU-06 y RF2-13)**

- En el pago en línea (CU-06), MODO admite como medios de pago la tarjeta de crédito y la tarjeta de débito.
- Las transferencias bancarias y las billeteras digitales no se admiten como medios de pago en línea en el alcance inicial del proyecto.
- El pago en línea se realiza exclusivamente en dólares estadounidenses (USD), según RF2-13; RF2-14 no cambia la moneda.
- Antes de que el participante inicie el pago (CU-06 paso 4), MODO muestra el importe total de la reserva y le permite elegir entre los medios de pago admitidos: tarjeta de crédito o tarjeta de débito.
- Si el participante intenta utilizar un medio de pago no admitido, MODO le informa de que no está disponible y le permite seleccionar una tarjeta de crédito o de débito.
- Palabras del usuario (2026-11-06): «He decidido que los participantes podrán pagar sus reservas en línea utilizando tarjetas de crédito o débito.», «No quiero incluir transferencias bancarias ni billeteras digitales como medios de pago en línea durante el alcance inicial del proyecto.», «Los pagos se realizarán exclusivamente en dólares estadounidenses (USD), según lo establecido en RF2-13.», «Antes de iniciar el pago, MODO debe mostrar el importe total de la reserva y permitir al participante elegir entre los medios de pago admitidos.» y «Si el participante intenta utilizar un medio no admitido, MODO debe informarle de que no está disponible y permitirle seleccionar una tarjeta de crédito o débito.»
- Se apoya, sin duplicarlas, en las reglas de «Reglas vigentes de CU-06 (contexto, sin cambios)» de más arriba (R6: lo que se comunica antes de iniciar el pago), en el resumen previo al pago de CU-06 (paso 3, que ya muestra el precio total) y en RF2-13. No modifica CU-06 ni RF2-13, ni RF2-01 a RF2-12 ni los casos de uso aprobados.
- Lo que RF2-08, RF2-09, RF2-10 y RF2-11 dejan sin definir sobre los medios de pago aceptados queda fijado por RF2-14, sin modificar esas reglas.
- No elige ni define proveedores de pago, pasarelas de pago, marcas de tarjeta ni mecanismos técnicos de procesamiento del pago (el usuario pide expresamente no elegir proveedores, pasarelas ni mecanismos técnicos). Esos aspectos no están definidos.
- Resuelve la parte de medios de pago de la pregunta abierta «Pago en línea: medios de pago aceptados, moneda y tiempo exacto de retención» (CU-06 / fase-01 §5.2); el tiempo de retención y la moneda ya estaban resueltos por RF2-08 y RF2-13. No resuelve la pregunta derivada de RF2-10 (qué ocurre si el método de pago original ya no está disponible al gestionar el reembolso), que sigue sin decidir.

**Reglas vigentes de CU-08 (contexto, sin cambios)**

Se copian solo como contexto; su fuente es CU-08 y no se modifican aquí.

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

**Regla nueva de Fase 2 — RF2-15: registro manual del pago presencial recibido (vinculada a CU-08, CU-05 y RF2-03)**

- En una reserva con pago presencial (CU-05), cuando el participante paga al llegar al lugar de la experiencia, antes de comenzar la actividad (RF2-03), el organizador registra manualmente ese pago como recibido en MODO, según el recorrido de CU-08.
- La reserva permanece confirmada desde el momento en que se realiza correctamente (CU-05 R4), aunque todavía no se haya pagado presencialmente.
- Cuando el organizador marca el pago como recibido, MODO actualiza únicamente el estado del pago. No modifica la reserva, el precio acordado ni las plazas ocupadas (CU-08 R2).
- El organizador solo puede registrar pagos de reservas de sus propias experiencias (CU-08 R1).
- Palabras del usuario (2026-11-06): «He decidido que, cuando un participante realice el pago presencial al llegar al lugar de la experiencia, antes de comenzar la actividad, el organizador registre manualmente ese pago como recibido en MODO.», «La reserva debe permanecer confirmada desde el momento en que se realiza correctamente, aunque todavía no se haya pagado presencialmente.», «Cuando el organizador marque el pago como recibido, MODO debe actualizar únicamente su estado de pago, sin modificar la reserva, el precio acordado ni las plazas ocupadas.» y «El organizador solo podrá registrar pagos correspondientes a reservas de sus propias experiencias.»
- Antes de registrar esta regla se comprobó mediante AHK que la operación no estaba cubierta por los casos de uso aprobados (CU-05 la excluye). Con la aprobación explícita del usuario se definió CU-08 mediante ahk-use-case y se aprobó el 2026-11-06. CU-01 a CU-07 no se modificaron.
- Se apoya, sin duplicarlas, en «Reglas vigentes de CU-08 (contexto, sin cambios)», en «Reglas vigentes de CU-05 (contexto, sin cambios)» (R4, R5) y en RF2-03. El detalle del recorrido lo define CU-08 y no se repite aquí: la consulta desde «Mis experiencias», la corrección hasta el inicio de la sesión, el registro posterior, el historial con «Fecha y hora del registro» y la sesión sin reservas. No modifica CU-05, CU-08, RF2-03 ni RF2-01 a RF2-14.
- La exclusión de CU-05 «No define el registro del pago presencial ni la gestión de inasistencias (fases posteriores).» se mantiene sin cambios para CU-05. El registro del pago presencial lo cubre CU-08.
- No define qué ocurre cuando un participante no paga al llegar ni cómo se gestionan las inasistencias: el usuario pide expresamente dejarlos pendientes. Esos aspectos no están definidos.
- Resuelve la parte «cómo se registra el pago» de la pregunta abierta «Pago presencial: registro del pago presencial y gestión de inasistencias». Siguen pendientes qué ocurre si el participante no paga y la gestión de inasistencias.

**Regla nueva de Fase 2 — RF2-16: cierre de reservas a la hora exacta de inicio de la sesión (vinculada a CU-01, CU-05, CU-06, RF2-07 y RF2-12)**

- Los participantes pueden reservar una sesión hasta antes de su hora exacta de inicio, según la zona horaria America/Guayaquil (UTC−5) de RF2-12.
- Desde el momento en que comienza la sesión, MODO ya no permite nuevas reservas en ella, ni con pago presencial (CU-05) ni con pago en línea (CU-06).
- Desde ese mismo momento la sesión deja de considerarse futura: no cuenta para la disponibilidad del catálogo (CU-01 R2, R3 y A5) ni para determinar si una experiencia está agotada (RF2-07).
- No hay cierre anticipado: MODO no cierra las reservas horas antes del inicio de la sesión.
- Ejemplo del usuario: si una sesión comienza a las 15:00, se puede reservar a las 14:59, pero a las 15:00 ya no.
- Palabras del usuario (2026-11-08): «He decidido que los participantes puedan reservar una sesión hasta antes de su hora exacta de inicio, utilizando la zona horaria America/Guayaquil (UTC−5).», «Desde el momento en que comienza la sesión, ya no se permiten nuevas reservas. Esa sesión deja de considerarse futura y no debe contar para la disponibilidad del catálogo ni para determinar si una experiencia está agotada.», «Por ejemplo, si una sesión comienza a las 15:00, se puede reservar a las 14:59, pero a las 15:00 ya no.» y «No quiero establecer un cierre anticipado de varias horas.».
- Concreta, sin modificarlos, el término «fecha futura» de las precondiciones de CU-05 y CU-06 y de CU-01 R2 y R3, y el término «sesiones futuras» de RF2-07: una sesión es futura mientras no haya llegado su hora exacta de inicio. No modifica CU-01, CU-05, CU-06, RF2-07, RF2-12 ni RF2-01 a RF2-15.
- Resuelve la parte «límite de antelación o cierre de reservas» de la pregunta abierta «Límites de la reserva» (CU-05 / proceso.md / fase-01 §5.2). Sigue pendiente el límite máximo de plazas por reserva.
- Solo se aplica a lo que indica el usuario: las nuevas reservas, la disponibilidad del catálogo y el estado «Agotado». No se extiende a la publicación de experiencias (CU-03) ni a la administración de sesiones (CU-04).
- No decide qué ocurre si un pago en línea iniciado antes del comienzo de la sesión se completa, dentro de los 10 minutos de retención de RF2-08, después de la hora de inicio; queda como pregunta abierta derivada de RF2-16.

**Regla nueva de Fase 2 — RF2-17: cancelación de una reserva con pago presencial según el estado del pago (vinculada a CU-07, CU-08 y RF2-01)**

- Cuando un participante cancela válidamente una reserva con pago presencial (dentro del plazo de RF2-01), MODO cancela la reserva completa y libera las plazas, según CU-07 (R3, R4, R7).
- Si el pago está marcado como «Pendiente», no existe un pago registrado que devolver.
- Si el pago figura como «Recibido» (CU-08), MODO conserva ese estado y su historial, pero no inicia ni gestiona ningún reembolso presencial.
- En ese caso, MODO no afirma que no hubo pago ni que el dinero se devolvió.
- Palabras del usuario (2026-11-08): «Cuando un participante cancela válidamente una reserva con pago presencial, MODO cancela la reserva completa y libera las plazas, siguiendo CU-07.», «Si el pago está marcado como «Pendiente», no existe un pago registrado que devolver.», «Si el pago aparece como «Recibido», MODO conserva ese estado y su historial, pero no inicia ni gestiona un reembolso presencial. No debe afirmar que no hubo pago cuando el historial muestra lo contrario.» y «No quiero añadir un procedimiento de devolución presencial al alcance inicial. Cualquier tratamiento del dinero recibido fuera de la plataforma debe quedar explícitamente fuera del alcance, sin afirmar que se devolvió.».
- Compatibilidad verificada mediante AHK (2026-11-08): coincide con CU-07 R3, R4, R7, pasos 6 a 8 y CA4 (cancelación presencial sin reembolso y con liberación de plazas) y con CU-08 R2, R3 y R5 (solo el organizador cambia el estado del pago y el historial se conserva). La justificación de CU-07 A1 («ya que no hubo pago previo») describe el caso habitual, en el que el participante paga al llegar (RF2-03), y no es un mensaje que MODO muestre. RF2-17 precisa que MODO no hace esa afirmación cuando el pago figura como «Recibido». No modifica CU-07, CU-08 ni RF2-01 a RF2-16.
- No añade ningún procedimiento de devolución presencial. El tratamiento del dinero recibido fuera de MODO queda fuera del alcance inicial (ver «Exclusiones de Fase 2 (según RF2-17)»).
- Resuelve el bloqueo B3 de la auditoría del 2026-11-08.

**Regla nueva de Fase 2 — RF2-18: importe total de la reserva (vinculada a CU-04, CU-05, CU-06, CU-08 y RF2-13)**

- Cada sesión tiene un precio individual por participante.
- El importe total de la reserva se calcula multiplicando el precio de esa sesión por la cantidad de plazas seleccionadas.
- MODO muestra el importe total antes de que el participante confirme la reserva (pago presencial, CU-05) o inicie el pago (pago en línea, CU-06).
- Cuando la reserva queda confirmada, conserva ese importe total aunque el organizador cambie después el precio de la sesión (CU-04).
- La regla se aplica tanto a las reservas con pago presencial como a las reservas con pago en línea. El importe se expresa en USD, según RF2-13; RF2-18 no cambia la moneda.
- Ejemplo del usuario: si una sesión cuesta 20 USD por persona y el participante reserva 3 plazas, el total es de 60 USD.
- Palabras del usuario (2026-11-08): «En MODO, cada sesión tiene un precio individual por participante. El importe total de la reserva se calcula multiplicando el precio de esa sesión por la cantidad de plazas seleccionadas.», «Por ejemplo, si una sesión cuesta 20 USD por persona y el participante reserva 3 plazas, el total será de 60 USD.», «El importe total debe mostrarse antes de confirmar la reserva o iniciar el pago, y debe conservarse cuando la reserva queda confirmada, aunque el organizador cambie posteriormente el precio de la sesión.» y «Esta regla se aplica tanto a las reservas con pago presencial como a las reservas con pago en línea.».
- Compatibilidad verificada mediante AHK (2026-11-08): coincide con CU-04 A2, R3, R6 y CA6 (un cambio de precio solo se aplica a reservas futuras y las reservas existentes conservan su precio), con CU-06 paso 3, R5 y CA7 (antes de pagar se muestra el precio total y la reserva conserva ese precio) y con CU-08 (la lista de reservas muestra el importe total en USD). CU-05 paso 3 y CA5 hablan del «precio vigente»: RF2-18 lo concreta, sin modificar CU-05, mostrando además el importe total antes de confirmar. No modifica CU-01 a CU-08 ni RF2-01 a RF2-17.
- Se apoya, sin duplicarlas, en las reglas de «Reglas vigentes de CU-04 (contexto, sin cambios)» (R3, R6), «Reglas vigentes de CU-05 (contexto, sin cambios)» (R5) y «Reglas vigentes de CU-06 (contexto, sin cambios)» (R5) de más arriba, y en RF2-13 y RF2-14.
- RF2-18 no añade impuestos, comisiones, descuentos ni reglas de redondeo (no decididos por el usuario). Tampoco define el número de decimales ni el formato de presentación de los importes (ver RF2-13), ni las sesiones gratuitas o los valores de precio admitidos (siguen en la pregunta abierta «Precios: tarifas y experiencias gratuitas»). Esos aspectos no están definidos.
- No decide qué precio se aplica si el organizador cambia el precio de la sesión después de que MODO muestre el importe total y antes de que la reserva quede confirmada; queda como pregunta abierta derivada de RF2-18.
- Resuelve el bloqueo B4 de la auditoría del 2026-11-08.

**Criterios de aceptación de Fase 2**

- **CA-F2-01:** si faltan más de 24 horas para el inicio de la fecha y horario reservados, la cancelación se permite.
- **CA-F2-02:** si faltan exactamente 24 horas, la cancelación se permite (caso límite incluido).
- **CA-F2-03:** si faltan menos de 24 horas (por ejemplo, 23 h 59 min), MODO rechaza la cancelación directa y muestra un mensaje que indica que ya no es posible cancelarla directamente.
- **CA-F2-04:** antes de confirmar una reserva (CU-05, CU-06) y antes de confirmar una cancelación (CU-07 CA6), MODO muestra la política con el plazo de 24 horas. Solo aplica R5 y CA6, que ya existen; no añade ningún comportamiento nuevo.
- **CA-F2-05:** al añadir una nueva fecha y horario a una experiencia que ya tiene sesiones, el día, el horario, los cupos y el precio de las sesiones existentes no cambian.
- **CA-F2-06:** al añadir una nueva fecha y horario, las reservas existentes de las demás sesiones conservan su fecha, horario, plazas y precio.
- **CA-F2-07:** tras añadir la nueva fecha, el detalle de la experiencia (CU-01) muestra la nueva sesión junto con las sesiones existentes.
- **CA-F2-08:** en una reserva con pago presencial, el resumen previo a la confirmación (CU-05 paso 3) indica que el pago se realiza en el lugar de la experiencia, al llegar y antes de que comience la actividad.
- **CA-F2-09:** la confirmación de una reserva con pago presencial (CU-05 paso 7) indica que el pago se realiza en el lugar de la experiencia, al llegar y antes de que comience la actividad.
- **CA-F2-10:** confirmar una reserva con pago presencial no solicita ningún pago en línea; la reserva se confirma automáticamente con disponibilidad suficiente (CU-05 R4, CA2).
- **CA-F2-11:** si el organizador añade a una experiencia una sesión con exactamente la misma fecha y horario que otra sesión de esa experiencia, MODO no la guarda y muestra un mensaje que explica que ya hay una sesión programada para ese momento.
- **CA-F2-12:** si el organizador modifica la fecha o el horario de una sesión sin reservas activas (CU-04 A1) y la sesión pasa a coincidir exactamente en fecha y horario con otra de la misma experiencia, MODO no guarda el cambio y muestra el mismo mensaje.
- **CA-F2-13:** una experiencia puede tener varias sesiones en un mismo día con horarios diferentes: añadir una sesión el mismo día que otra, pero con otro horario, se permite.
- **CA-F2-14:** sesiones de experiencias distintas pueden tener la misma fecha y horario; RF2-04 no impide guardarlas.
- **CA-F2-15:** tras el rechazo de CA-F2-11 o CA-F2-12, si el organizador cambia la fecha o el horario por uno que no coincide con otra sesión de la misma experiencia, la sesión se guarda, siempre que cumpla las demás reglas de CU-04 (por ejemplo, R4: solo fechas futuras).
- **CA-F2-16:** al publicar una experiencia (CU-03) con dos o más sesiones de exactamente la misma fecha y horario, MODO no la publica e indica qué debe corregirse (las sesiones duplicadas).
- **CA-F2-17:** tras el rechazo de CA-F2-16, si el organizador corrige los duplicados y el resto de la información cumple CU-03 (R5, F1–F3), la experiencia se publica y aparece en el catálogo (CU-03 CA3).
- **CA-F2-18:** al publicar una experiencia con varias sesiones en un mismo día y con horarios diferentes, RF2-05 no impide la publicación.
- **CA-F2-19:** tras completar correctamente el registro (CU-02 CA1), el usuario queda con la sesión iniciada sin volver a introducir su correo electrónico ni su contraseña.
- **CA-F2-20:** si el registro no se completa (CU-02 F1, F2 o F3), no se crea la cuenta y no se inicia ninguna sesión.
- **CA-F2-21:** con la sesión iniciada tras el registro y el correo sin verificar, el usuario puede explorar experiencias, utilizar los filtros y consultar su detalle (CU-01).
- **CA-F2-22:** con el correo sin verificar, el usuario no puede completar una reserva (CU-02 R5).
- **CA-F2-23:** al intentar reservar con el correo sin verificar, MODO le informa de que debe verificar su correo para reservar y le permite solicitar nuevamente el correo de verificación (CU-02 A1, A2, CA9).
- **CA-F2-24:** tras verificar su correo, el usuario puede continuar con el proceso de reserva (CU-05, CU-06), siempre que se cumplan las demás condiciones de esos casos de uso (CU-02 CA10).
- **CA-F2-25:** una experiencia con una sesión futura agotada y otra sesión futura con plazas no aparece como «Agotado» en el catálogo y no se ordena al final por ese motivo.
- **CA-F2-26:** una experiencia con todas sus sesiones futuras sin plazas aparece como «Agotado» y al final del catálogo con cualquier criterio de ordenación (fecha disponible más próxima, precio o fecha de publicación).
- **CA-F2-27:** una experiencia sin fechas futuras no aparece en el catálogo público.
- **CA-F2-28:** con el filtro de plazas disponibles activo, aparece una experiencia con al menos una sesión futura con plazas, aunque tenga otras sesiones agotadas; una experiencia con todas sus sesiones futuras sin plazas no aparece.
- **CA-F2-29:** en el detalle de una experiencia que sigue disponible, una sesión sin plazas aparece como «Agotado» y no permite reservar, mientras que sus sesiones con plazas siguen permitiendo reservar (CU-05 F2, RF2-07).
- **CA-F2-30:** si el participante completa correctamente el pago dentro de los 10 minutos siguientes a iniciarlo, MODO confirma automáticamente la reserva (CU-06 CA3, RF2-08).
- **CA-F2-31:** desde que se inicia el pago y mientras dura la retención (como máximo 10 minutos), las plazas retenidas no están disponibles para otros usuarios (CU-06 CA2).
- **CA-F2-32:** si el pago falla, MODO libera automáticamente las plazas retenidas, que vuelven a estar disponibles para otros usuarios, no queda ninguna reserva confirmada y MODO informa al participante (CU-06 F2, CA4).
- **CA-F2-33:** si el participante abandona el proceso de pago, MODO libera automáticamente las plazas retenidas, que vuelven a estar disponibles, y la reserva no se confirma (CU-06 F3, CA5).
- **CA-F2-34:** si transcurren 10 minutos desde que se inició el pago sin que se haya completado, MODO libera automáticamente las plazas retenidas, que vuelven a estar disponibles, y no queda ninguna reserva confirmada (CU-06 F3, CA5).
- **CA-F2-35:** tras un pago fallido, abandonado o vencido, el participante solo puede volver a intentarlo comenzando una nueva reserva, y solo si todavía hay plazas suficientes; si no las hay, MODO no permite iniciar el pago (CU-06 F1, CA6).
- **CA-F2-36:** si la confirmación del pago en línea llega después de que hayan transcurrido los 10 minutos de retención, MODO no confirma la reserva, aunque todavía existan plazas disponibles (RF2-09).
- **CA-F2-37:** tras una confirmación de pago fuera de plazo, las plazas liberadas al vencer la retención siguen liberadas y disponibles para otros participantes; la confirmación tardía no vuelve a retenerlas (RF2-09, RF2-08, CU-06 F3).
- **CA-F2-38:** ante una confirmación de pago fuera de plazo, MODO gestiona un reembolso completo del importe pagado (RF2-09).
- **CA-F2-39:** ante una confirmación de pago fuera de plazo, el participante recibe un mensaje que indica que el pago se confirmó fuera del plazo permitido, que su reserva no fue confirmada y que se gestionará la devolución del dinero (RF2-09).
- **CA-F2-40:** tras una confirmación de pago fuera de plazo, si el participante quiere reservar nuevamente, deberá iniciar una nueva reserva y comprobar la disponibilidad actual; si no hay plazas suficientes, MODO no permite iniciar el pago (RF2-09, CU-06 F1).
- **CA-F2-41:** si un participante cancela dentro del plazo (faltan 24 horas o más para el inicio, RF2-01) una reserva pagada en línea, MODO reembolsa el 100 % del importe pagado al mismo método de pago que utilizó originalmente (RF2-10, CU-07 R3).
- **CA-F2-42:** ante una confirmación de pago fuera de plazo, MODO reembolsa el 100 % del importe pagado al mismo método de pago que utilizó originalmente el participante (RF2-10, RF2-09).
- **CA-F2-43:** ni en la cancelación dentro del plazo ni en el pago confirmado fuera de plazo MODO ofrece al participante seleccionar un método de devolución distinto del método de pago original (RF2-10).
- **CA-F2-44:** si un participante cancela de forma válida (dentro del plazo de RF2-01) una reserva pagada en línea, MODO inicia la solicitud de reembolso en un plazo máximo de 24 horas desde la cancelación (RF2-11, CU-07).
- **CA-F2-45:** si MODO identifica un pago en línea confirmado después de vencer los 10 minutos de retención, inicia la solicitud de reembolso en un plazo máximo de 24 horas desde esa identificación (RF2-11, RF2-09).
- **CA-F2-46:** en los casos de CA-F2-44 y CA-F2-45, la solicitud de reembolso que inicia MODO es por el 100 % del importe pagado y al método de pago original (RF2-11, RF2-10).
- ~~**CA-F2-47:**~~ Retirado como criterio (2026-11-08): describía el documento y no un comportamiento comprobable. Su contenido pasa a «Exclusiones de Fase 2 (aclaraciones de alcance)».
- **CA-F2-48:** para una experiencia que empieza el sábado a las 15:00 (hora de Ecuador continental, America/Guayaquil), la cancelación se permite el viernes a las 15:00 (RF2-12, RF2-01).
- **CA-F2-49:** para esa misma experiencia, si el participante intenta cancelar el viernes después de las 15:00 (por ejemplo, a las 15:01, hora America/Guayaquil), MODO rechaza la cancelación directa y muestra el mensaje de RF2-01 que indica que ya no es posible cancelarla directamente (RF2-12, RF2-01, CA-F2-03).
- **CA-F2-50:** el plazo máximo de 24 horas de RF2-11 para que MODO inicie la solicitud de reembolso se calcula en hora America/Guayaquil (RF2-12, RF2-11).
- **CA-F2-51:** dada una sesión que el organizador registra para el sábado a las 15:00, esa fecha y horario se interpretan como las 15:00 de Ecuador continental (America/Guayaquil): el plazo de cancelación de RF2-01 termina el viernes a las 15:00 y las nuevas reservas de RF2-16 se admiten hasta las 14:59 del sábado, ambos en esa hora (RF2-12, RF2-01, RF2-16).
- **CA-F2-52:** al publicar una experiencia (CU-03) y al añadir o modificar una sesión (CU-04), el organizador fija el precio de cada sesión en USD y MODO no le permite elegir otra moneda (RF2-13).
- **CA-F2-53:** el catálogo y el detalle de la experiencia (CU-01) muestran los precios en USD, y el filtro de rango de precios (CU-01) usa importes en USD (RF2-13).
- **CA-F2-54:** en una reserva con pago presencial, el resumen previo a la confirmación (CU-05 paso 3) y el importe total de la reserva aparecen en USD (RF2-13).
- **CA-F2-55:** en una reserva con pago en línea, el resumen previo al pago (CU-06 paso 3) y el precio total de la reserva aparecen en USD (RF2-13, CU-06 CA7).
- **CA-F2-56:** el pago en línea se cobra en USD (RF2-13, CU-06).
- **CA-F2-57:** los reembolsos de pagos en línea, tanto por una cancelación válida (CU-07, RF2-10, RF2-11) como por un pago confirmado fuera de plazo (RF2-09, RF2-10, RF2-11), se expresan en USD (RF2-13).
- **CA-F2-58:** MODO no ofrece conversión de divisas ni un selector de moneda en ningún punto: publicación, administración de sesiones, catálogo, detalle, filtros, reserva, pago ni reembolso (RF2-13).
- ~~**CA-F2-59:**~~ Retirado como criterio (2026-11-08): describía el documento y no un comportamiento comprobable. Su contenido pasa a «Exclusiones de Fase 2 (aclaraciones de alcance)».
- **CA-F2-60:** en una reserva con pago en línea (CU-06), el participante puede pagar con tarjeta de crédito (RF2-14).
- **CA-F2-61:** en una reserva con pago en línea (CU-06), el participante puede pagar con tarjeta de débito (RF2-14).
- **CA-F2-62:** al elegir el medio de pago en línea (CU-06, antes del paso 4), MODO ofrece únicamente tarjeta de crédito y tarjeta de débito; la transferencia bancaria y la billetera digital no aparecen como medios admitidos (RF2-14).
- **CA-F2-63:** si el participante intenta pagar con un medio no admitido (por ejemplo, transferencia bancaria o billetera digital), MODO no inicia el pago, le informa de que ese medio no está disponible y le permite seleccionar una tarjeta de crédito o de débito (RF2-14).
- **CA-F2-64:** antes de que el participante inicie el pago (CU-06 paso 4), MODO muestra el importe total de la reserva en USD y le permite elegir entre tarjeta de crédito y tarjeta de débito (RF2-14, RF2-13, CU-06 CA7).
- ~~**CA-F2-65:**~~ Retirado como criterio (2026-11-08): describía el documento y no un comportamiento comprobable. Su contenido pasa a «Exclusiones de Fase 2 (aclaraciones de alcance)».
- **CA-F2-66:** dada una reserva confirmada con pago presencial «Pendiente» de una experiencia propia, cuando el organizador marca el pago como recibido, el estado del pago pasa a «Recibido» (RF2-15, CU-08 CA-08-02).
- **CA-F2-67:** una reserva con pago presencial queda confirmada desde que se realiza correctamente, antes de que el organizador registre el pago como recibido (RF2-15, CU-05 R4).
- **CA-F2-68:** después de marcar el pago como recibido, la reserva sigue confirmada y conserva la misma cantidad de plazas ocupadas y el mismo precio acordado (RF2-15, CU-08 CA-08-03).
- **CA-F2-69:** el organizador no puede registrar pagos de reservas de experiencias que no son suyas (RF2-15, CU-08 CA-08-08).
- ~~**CA-F2-70:**~~ Retirado como criterio (2026-11-08): describía el documento y no un comportamiento comprobable. Su contenido pasa a «Exclusiones de Fase 2 (aclaraciones de alcance)».
- **CA-F2-71:** dada una sesión con pago presencial que comienza a las 15:00 (hora America/Guayaquil) y tiene plazas disponibles, a las 14:59 un participante puede completar una reserva (RF2-16, CU-05).
- **CA-F2-72:** para esa misma sesión, a las 15:00 MODO no permite completar una nueva reserva (RF2-16, CU-05).
- **CA-F2-73:** dada una sesión con pago en línea que comienza a las 15:00 (hora America/Guayaquil) y tiene plazas disponibles, a las 14:59 el participante puede iniciar el pago, y a las 15:00 MODO no permite iniciarlo (RF2-16, CU-06, RF2-08).
- **CA-F2-74:** dada una experiencia cuya única sesión futura comienza a las 15:00, a las 14:59 aparece en el catálogo público y a partir de las 15:00 deja de aparecer, como una experiencia sin fechas futuras (RF2-16, CU-01 R2, CA-F2-27).
- **CA-F2-75:** dada una experiencia con una sesión a las 15:00 con plazas disponibles y todas sus demás sesiones futuras sin plazas, a las 14:59 no aparece como «Agotado»; a partir de las 15:00 aparece como «Agotado» y al final del catálogo (RF2-16, RF2-07, CA-F2-26).
- **CA-F2-76:** con el filtro de plazas disponibles activo, la experiencia de CA-F2-75 aparece a las 14:59 y no aparece a partir de las 15:00 (RF2-16, RF2-07, CU-01 A5).
- **CA-F2-77:** MODO no cierra las reservas antes de la hora de inicio: con plazas disponibles, a las 12:00 un participante puede completar una reserva con pago presencial para una sesión que comienza a las 15:00 del mismo día (RF2-16).
- **CA-F2-78:** dada una reserva con pago presencial «Pendiente», cuando el participante la cancela dentro del plazo de RF2-01, MODO cancela la reserva completa, libera sus plazas y no inicia ningún reembolso (RF2-17, CU-07 R3, R4, R7, CA4).
- **CA-F2-79:** dada una reserva con pago presencial «Recibido», cuando el participante la cancela dentro del plazo de RF2-01, MODO cancela la reserva completa, libera sus plazas y no inicia ni gestiona ningún reembolso (RF2-17, CU-07 CA4).
- **CA-F2-80:** después de la cancelación de CA-F2-79, el estado del pago sigue siendo «Recibido» y su historial conserva todas sus entradas sin cambios (RF2-17, CU-08 R5).
- **CA-F2-81:** en la cancelación de CA-F2-79, ni antes de confirmarla ni en su confirmación MODO muestra al participante un mensaje que afirme que no hubo pago o que el dinero se devolvió (RF2-17).
- **CA-F2-82:** dada una sesión con un precio de 20 USD por participante, cuando el participante selecciona 3 plazas, MODO muestra un importe total de la reserva de 60 USD (RF2-18).
- **CA-F2-83:** dada la sesión de CA-F2-82, cuando el participante selecciona 1 plaza, MODO muestra un importe total de 20 USD (RF2-18).
- **CA-F2-84:** en una reserva con pago presencial de 3 plazas en la sesión de CA-F2-82, MODO muestra el importe total de 60 USD en el resumen, antes de que el participante confirme la reserva (RF2-18, CU-05 paso 3, CA5).
- **CA-F2-85:** en una reserva con pago en línea de 3 plazas en la sesión de CA-F2-82, MODO muestra el importe total de 60 USD antes de que el participante inicie el pago (RF2-18, RF2-14, CU-06 paso 3, CA7).
- **CA-F2-86:** dada una reserva confirmada de 3 plazas en la sesión de CA-F2-82 con un importe total de 60 USD, cuando el organizador cambia el precio de la sesión a 25 USD por participante, esa reserva sigue mostrando un importe total de 60 USD, también en la lista de reservas de la sesión (RF2-18, CU-04 R3, R6, CA6, CU-08 CA-08-01).
- **CA-F2-87:** después del cambio de precio de CA-F2-86, cuando un participante selecciona 3 plazas en una nueva reserva de esa sesión, MODO muestra un importe total de 75 USD (RF2-18, CU-04 CA6).
- **CA-F2-88:** la conservación del importe total de CA-F2-86 se cumple tanto si la reserva confirmada tiene pago presencial como si tiene pago en línea (RF2-18).
- **CA-F2-89:** en las reservas de CA-F2-84 y CA-F2-85, el importe total mostrado es exactamente 60 USD: MODO no le suma impuestos ni comisiones, no le resta descuentos ni le aplica redondeos (RF2-18).

**Exclusiones (según CU-07)**

- Sin cancelación por otros canales fuera de plazo.
- Sin cancelación por parte del organizador.
- Sin procedimiento ni tiempos de reembolso. *(Actualización 2026-11-08: el método de devolución lo fija RF2-10 y el plazo de inicio de la solicitud RF2-11; el plazo de acreditación por la entidad financiera y el procedimiento técnico del reembolso siguen fuera del alcance.)*
- Sin lista de espera.

**Exclusiones (según CU-04)**

- No incluye la cancelación de fechas o reservas por parte del organizador (pendiente de evaluación).
- No incluye notificaciones a participantes por cambios.
- No incluye la edición de la información general de la experiencia (nombre, descripción, imágenes).

**Exclusiones (según CU-05)**

- No incluye el pago en línea (CU-06) ni la cancelación (CU-07).
- No define el registro del pago presencial ni la gestión de inasistencias (fases posteriores). *(Actualización 2026-11-08: el registro del pago presencial lo cubren CU-08 y RF2-15; la gestión de inasistencias sigue sin definir.)*
- No incluye notificaciones detalladas ni lista de espera.

**Exclusiones (según CU-03)**

- No incluye guardar borradores de experiencias (posible mejora futura).
- No incluye la verificación avanzada de organizadores (futuras versiones).
- No define detalles secundarios (límites de imágenes, longitud de textos, formato del precio).

**Exclusiones (según CU-02)**

- La recuperación de contraseña queda fuera del alcance inicial (mejora futura).
- No incluye la reserva (CU-05, CU-06).
- No define detalles técnicos ni secundarios (requisitos de la contraseña, caducidad o formato del correo de verificación).

**Exclusiones (según CU-01)**

- No incluye geolocalización por cercanía en esta primera versión.
- No incluye filtro por franja horaria (futura versión).
- No muestra la dirección exacta ni requisitos específicos de participación (pendientes de definición).

**Exclusiones (según CU-06)**

- No define el tiempo exacto de retención ni los mecanismos técnicos de pago (fases posteriores). *(Actualización 2026-11-08: el tiempo de retención lo fija RF2-08 (10 minutos como máximo); los mecanismos técnicos de pago siguen excluidos.)*
- No incluye facturación.

**Exclusiones (según CU-08)**

- Qué ocurre cuando un participante no paga al llegar.
- La gestión de las inasistencias.
- Cualquier procedimiento excepcional para corregir un pago marcado como «Recibido» después del comienzo de la sesión. En CU-08 no existe otra vía de corrección.
- El registro en el historial de los intentos de corrección rechazados, porque no modifican el estado del pago.
- Las notificaciones al participante por cambios en el estado de su pago.

**Exclusiones de Fase 2 (aclaraciones de alcance)**

- No se fija un plazo garantizado de acreditación del reembolso por la entidad financiera; el plazo de 24 horas de RF2-11 se refiere solo al inicio de la solicitud por MODO (antes CA-F2-47).
- No se fijan reglas de redondeo, impuestos, comisiones, decimales ni formato de presentación de los importes en USD (RF2-13; antes CA-F2-59).
- No se fijan proveedores de pago, pasarelas de pago, marcas de tarjeta ni mecanismos técnicos de procesamiento del pago (RF2-14; antes CA-F2-65).
- No se define qué ocurre cuando un participante no paga al llegar ni cómo se gestionan las inasistencias (RF2-15, CU-08; antes CA-F2-70).

**Exclusiones de Fase 2 (según RF2-17)**

- Cualquier procedimiento de devolución presencial.
- El tratamiento del dinero de un pago presencial recibido fuera de MODO, incluida su posible devolución. MODO no registra ni afirma que ese dinero se haya devuelto.

## Decisions and open questions

**Decisión confirmada por el usuario (2026-11-05)**

- RF2-01, plazo de cancelación. Palabras del usuario: «política general que permita cancelar hasta 24 horas antes del inicio de la experiencia» y «Si faltan menos de 24 horas para la experiencia, MODO informa que ya no es posible cancelarla directamente.»
- Resuelve la pregunta abierta «Plazo exacto de cancelación» de CU-07 y de `docs/entregas/fase-01.md` §5.2 y §8.2.

**Aclaración confirmada por el usuario (2026-11-05)**

- RF2-02, añadir fechas y horarios. Palabras del usuario: «el organizador puede añadir nuevas fechas y horarios para una misma experiencia sin modificar las sesiones existentes».
- Mantiene sin cambios las reglas aprobadas de CU-04. No resuelve ninguna pregunta abierta.

**Decisión confirmada por el usuario (2026-11-05) — pago presencial**

- RF2-03, momento del pago presencial. Palabras del usuario: «el participante deberá realizar el pago presencial al llegar al lugar de la experiencia, antes de comenzar la actividad».
- Concreta CU-05 R4 sin modificar CU-05. Resuelve solo en parte la pregunta abierta «Registro del pago presencial e inasistencias» de CU-05 y de `docs/entregas/fase-01.md` §5.2: fija cuándo y dónde se paga, pero no cómo se registra el pago, qué ocurre si no se paga ni cómo se gestionan las inasistencias. *(Actualización 2026-11-08: el registro del pago lo resuelven RF2-15 y CU-08; siguen pendientes qué ocurre si el participante no paga y la gestión de inasistencias.)*

**Decisión confirmada por el usuario (2026-11-05) — sesiones sin duplicar**

- RF2-04, sin sesiones duplicadas con la misma fecha y horario. Palabras del usuario: «Quiero que MODO no permita crear dos sesiones de una misma experiencia que tengan exactamente la misma fecha y horario.», «Si existe, no debe permitir guardar la nueva sesión y debe mostrar un mensaje explicando que ya hay una sesión programada para ese momento. El organizador podrá modificar la fecha o el horario para continuar.», «Esta misma validación debe aplicarse cuando se modifica una sesión existente, siempre que ese cambio esté permitido según las reglas de CU-04.» y «Sí quiero permitir varias sesiones de una misma experiencia durante un mismo día, siempre que tengan horarios diferentes. También pueden coincidir sesiones de experiencias distintas.»
- Complementa RF2-02 y no modifica CU-04. No resuelve ninguna pregunta abierta; «Modelo de fechas: fechas recurrentes» sigue pendiente.

**Decisión confirmada por el usuario (2026-11-05) — RF2-04 en la publicación inicial**

- RF2-05, RF2-04 en la publicación inicial (CU-03 A2). Palabras del usuario: «También confirmo que la regla RF2-04 debe aplicarse durante la publicación inicial. Si el organizador añade varias sesiones de una misma experiencia con exactamente la misma fecha y horario, MODO no debe permitir publicar hasta que corrija los duplicados.» y «Si falta información o alguna condición no se cumple, MODO debe indicar qué necesita corregirse.»
- Extiende RF2-04 y no modifica RF2-04 ni CU-03. Resuelve la pregunta abierta derivada de RF2-04 sobre CU-03 A2.

**Decisión confirmada por el usuario (2026-11-05) — sesión automática tras el registro**

- RF2-06, inicio de sesión automático tras el registro (CU-02). Palabras del usuario: «He decidido que, después de completar correctamente el registro, el usuario inicie sesión automáticamente. Así puede explorar las experiencias, utilizar los filtros y consultar sus detalles sin tener que volver a ingresar sus credenciales.» y «Sin embargo, mientras no haya verificado su correo electrónico, no podrá realizar reservas. MODO debe informarle de esta condición y permitirle solicitar nuevamente el correo de verificación.»
- Es coherente con CU-02 R5 y no modifica CU-02. Resuelve la pregunta abierta «Si, tras registrarse, el usuario queda con la sesión iniciada automáticamente.» de CU-02 y de `docs/entregas/fase-01.md` §8.2. El resto de preguntas abiertas de CU-02 sigue pendiente.

**Decisión confirmada por el usuario (2026-11-05) — estado «Agotado» de la experiencia**

- RF2-07, estado «Agotado» a nivel de experiencia (CU-01). Palabras del usuario: «Quiero precisar que una experiencia solamente debe considerarse agotada cuando ninguna de sus sesiones futuras tenga plazas disponibles. Si una sesión está agotada, pero otra fecha todavía tiene plazas, la experiencia sigue disponible.» y «Las experiencias completamente agotadas permanecen visibles, identificadas como «Agotado» y aparecen al final del catálogo. En cambio, las experiencias que ya no tienen fechas futuras no se muestran.»
- Concreta CU-01 R3, R6 y A5/CA8 a nivel de experiencia y no modifica CU-01. Es coherente con CU-05 F2 (la fecha sin plazas aparece como «Agotado» y no permite reservar) y concreta CU-05 CA8 para el catálogo, sin modificar CU-05. No resuelve ninguna pregunta abierta existente; deriva una nueva.

**Decisión confirmada por el usuario (2026-11-05) — retención de 10 minutos en el pago en línea**

- RF2-08, retención de plazas de 10 minutos durante el pago en línea (CU-06). Palabras del usuario: «He decidido que, cuando un participante inicia el proceso de pago, las plazas seleccionadas queden retenidas durante un máximo de 10 minutos. Durante ese tiempo no estarán disponibles para otras personas.», «Si el pago se completa correctamente dentro de los 10 minutos, MODO confirma automáticamente la reserva.», «Si el pago falla, el participante abandona el proceso o transcurren los 10 minutos sin completar el pago, las plazas deben liberarse automáticamente.» y «Si el participante quiere intentarlo nuevamente, deberá comenzar una nueva reserva, siempre que todavía existan plazas disponibles.»
- Concreta CU-06 R2, R4, F2 y F3 y no modifica CU-06. Resuelve la pregunta abierta «Tiempo exacto de retención» de CU-06 y de `docs/entregas/fase-01.md` §5.2 y §8.2. Deriva una pregunta nueva, pedida por el usuario. Siguen pendientes los medios de pago aceptados, la moneda y los reembolsos. *(Actualización 2026-11-08: la pregunta derivada la resuelve RF2-09; la moneda, RF2-13; los medios de pago aceptados, RF2-14, y los reembolsos, en parte, RF2-10 y RF2-11; sigue pendiente el plazo de acreditación del reembolso.)*

**Decisión confirmada por el usuario (2026-11-05) — pago confirmado fuera de plazo**

- RF2-09, pago confirmado fuera del plazo de retención (CU-06, vinculada a RF2-08). Palabras del usuario: «He decidido que, si la confirmación de un pago en línea llega después de que hayan transcurrido los 10 minutos de retención, MODO no debe confirmar esa reserva, aunque todavía existan plazas disponibles.», «Como el periodo de retención ya terminó, las plazas deben permanecer liberadas y el sistema debe gestionar un reembolso completo del importe pagado.», «El participante debe recibir un mensaje claro indicando que el pago se confirmó fuera del plazo permitido, que su reserva no fue confirmada y que se gestionará la devolución del dinero.» y «Si quiere reservar nuevamente, deberá iniciar una nueva reserva y comprobar la disponibilidad actual.»
- Complementa RF2-08 y no modifica RF2-08 ni CU-06. Resuelve la pregunta abierta nueva, pedida por el usuario, derivada de RF2-08 sobre el pago cuya confirmación llega después de vencer la retención. El procedimiento y el plazo exacto del reembolso siguen pendientes, por petición expresa del usuario; también siguen pendientes los medios de pago aceptados y la moneda. *(Actualización 2026-11-08: el método de devolución lo fija RF2-10, el plazo de inicio de la solicitud RF2-11, la moneda RF2-13 y los medios de pago aceptados RF2-14; siguen pendientes el plazo de acreditación por la entidad financiera y el procedimiento técnico del reembolso.)*

**Decisión confirmada por el usuario (2026-11-06) — reembolso al método de pago original**

- RF2-10, reembolso al método de pago original (CU-07 con RF2-01, CU-06 y RF2-09). Palabras del usuario: «He decidido que todos los reembolsos de pagos en línea en MODO se realicen al mismo método de pago utilizado originalmente por el participante.», «Esta condición debe aplicarse tanto cuando un participante cancela una reserva dentro del plazo permitido de 24 horas de anticipación (CU-07), como cuando un pago se confirma después de vencer los 10 minutos de retención (RF2-09).», «En ambos casos, se mantiene la devolución del 100 % del importe pagado, según las reglas que ya hemos confirmado.» y «No quiero que el participante pueda seleccionar otro método de devolución.»
- Complementa RF2-01 y RF2-09 y no modifica RF2-01, RF2-09, CU-06 ni CU-07. Mantiene la devolución del 100 % del importe pagado (CU-07 R3, RF2-09). Resuelve solo en parte la pregunta abierta «Reembolsos: procedimiento y tiempos del reembolso» de CU-07 y de `docs/entregas/fase-01.md` §5.2: queda definido el método de devolución. El plazo de tramitación y de acreditación del reembolso sigue pendiente, por petición expresa del usuario; también siguen pendientes los medios de pago aceptados y la moneda. *(Actualización 2026-11-08: el plazo de tramitación lo fija RF2-11, la moneda RF2-13 y los medios de pago aceptados RF2-14; sigue pendiente el plazo de acreditación por la entidad financiera.)*

**Decisión confirmada por el usuario (2026-11-06) — plazo para iniciar el reembolso**

- RF2-11, plazo de MODO para iniciar el reembolso (CU-07, CU-06, RF2-09 y RF2-10). Palabras del usuario: «He decidido que MODO debe iniciar la solicitud de reembolso en un plazo máximo de 24 horas desde que se produce una cancelación válida o se identifica un pago confirmado después del vencimiento de la retención.», «Esta condición se aplica a CU-07 y CU-06, en relación con RF2-09 y RF2-10.», «El reembolso sigue siendo del 100 % y debe realizarse al método de pago original.» y «Quiero distinguir claramente entre el tiempo que tiene MODO para solicitar el reembolso y el tiempo que tarda la entidad financiera en acreditar el dinero. No quiero establecer todavía un plazo garantizado de acreditación bancaria.»
- Complementa RF2-09 y RF2-10. No modifica RF2-01, RF2-09, RF2-10, CU-06 ni CU-07. Mantiene la devolución del 100 % al método de pago original (RF2-10).
- Separa el plazo de MODO para iniciar la solicitud de reembolso (24 horas como máximo) del plazo de acreditación por la entidad financiera, que no se fija.
- Resuelve el plazo de tramitación de la pregunta abierta «Reembolsos: procedimiento y tiempos del reembolso» de CU-07 y de `docs/entregas/fase-01.md` §5.2.
- El plazo de acreditación sigue pendiente, por petición expresa del usuario. La pregunta derivada de RF2-10 sobre el método de pago original no disponible sigue sin decidir. También siguen pendientes los medios de pago aceptados y la moneda. *(Actualización 2026-11-08: la moneda la fija RF2-13 y los medios de pago aceptados RF2-14; siguen pendientes el plazo de acreditación y la pregunta derivada de RF2-10.)*

**Decisión confirmada por el usuario (2026-11-06) — zona horaria de referencia**

- RF2-12, zona horaria de referencia America/Guayaquil (vinculada a RF2-01 y RF2-11). Palabras del usuario: «Confirmo que MODO utilizará la zona horaria America/Guayaquil (UTC−5), correspondiente a Ecuador continental, como referencia para las fechas y horarios de las experiencias y para calcular los plazos de cancelación y solicitud de reembolso.», «Esta decisión debe aplicarse a RF2-01, que permite cancelar hasta 24 horas antes del inicio de una experiencia, y a RF2-11, que establece un máximo de 24 horas para iniciar la solicitud de reembolso.» y «Por ejemplo, si una experiencia comienza el sábado a las 15:00, la cancelación estará permitida hasta el viernes a las 15:00, inclusive, según la hora de Ecuador continental.»
- Fija America/Guayaquil (UTC−5, Ecuador continental) como referencia para las fechas y horarios de las experiencias y para calcular el plazo de cancelación de RF2-01 y el plazo de solicitud de reembolso de RF2-11. No modifica RF2-01, RF2-11 ni los casos de uso aprobados, y no se extiende a otros ámbitos.
- Resuelve la pregunta abierta «Zona horaria de referencia para calcular el plazo de 24 horas», derivada de RF2-01. La pregunta derivada de RF2-10 sobre el método de pago original no disponible sigue sin decidir, por petición expresa del usuario; el resto de preguntas abiertas sigue pendiente. *(Actualización 2026-11-08: después, RF2-13, RF2-14, RF2-15 y RF2-16 resuelven parte de esas preguntas; ver «Preguntas abiertas».)*

**Decisión confirmada por el usuario (2026-11-06) — moneda única USD**

- RF2-13, moneda única USD (vinculada a CU-01, CU-03, CU-04, CU-05, CU-06 y CU-07, y a RF2-09, RF2-10 y RF2-11 para los reembolsos). Palabras del usuario: «He decidido que todos los precios de las experiencias, los pagos en línea, los pagos presenciales y los reembolsos se expresen exclusivamente en dólares estadounidenses (USD).», «MODO no ofrecerá conversiones de divisas ni permitirá seleccionar otras monedas.» y «Esta regla debe aplicarse a los precios que establecen los organizadores, los precios que consultan los participantes, el importe total de las reservas y las devoluciones correspondientes.»
- Todos los precios, el importe total de las reservas, los pagos en línea y presenciales y los reembolsos se expresan exclusivamente en USD, sin conversión de divisas ni selección de otra moneda. No modifica RF2-01 a RF2-12 ni los casos de uso aprobados.
- No define el redondeo, los impuestos, las comisiones, los decimales ni el formato de presentación, que siguen sin definir.
- Resuelve la parte de moneda de las preguntas abiertas «Pago en línea: medios de pago aceptados, moneda y tiempo exacto de retención», «Precios: tarifas y experiencias gratuitas» y «Filtros del catálogo» (forma del filtro de rango de precios y moneda, CU-01). Siguen pendientes los medios de pago aceptados, las tarifas, las experiencias gratuitas, la forma del filtro de rango de precios y la pregunta derivada de RF2-10. *(Actualización 2026-11-08: los medios de pago aceptados los fija RF2-14.)*

**Decisión confirmada por el usuario (2026-11-06) — medios de pago en línea**

- RF2-14, medios de pago en línea admitidos (vinculada a CU-06 y RF2-13). Palabras del usuario: «He decidido que los participantes podrán pagar sus reservas en línea utilizando tarjetas de crédito o débito.», «No quiero incluir transferencias bancarias ni billeteras digitales como medios de pago en línea durante el alcance inicial del proyecto.», «Los pagos se realizarán exclusivamente en dólares estadounidenses (USD), según lo establecido en RF2-13.», «Antes de iniciar el pago, MODO debe mostrar el importe total de la reserva y permitir al participante elegir entre los medios de pago admitidos.» y «Si el participante intenta utilizar un medio no admitido, MODO debe informarle de que no está disponible y permitirle seleccionar una tarjeta de crédito o débito.»
- El pago en línea se admite con tarjeta de crédito o de débito; las transferencias bancarias y las billeteras digitales quedan excluidas en el alcance inicial. El pago es en USD (RF2-13). Antes de iniciar el pago, MODO muestra el importe total y permite elegir entre los medios admitidos; ante un medio no admitido, informa de que no está disponible y permite elegir una tarjeta de crédito o de débito. No modifica CU-06, RF2-13, RF2-01 a RF2-12 ni los casos de uso aprobados.
- No se eligen proveedores, pasarelas, marcas de tarjeta ni mecanismos técnicos de procesamiento; siguen sin definir.
- Resuelve la parte de medios de pago de la pregunta abierta «Pago en línea: medios de pago aceptados, moneda y tiempo exacto de retención». La pregunta derivada de RF2-10 sobre el método de pago original no disponible sigue sin decidir; el resto de preguntas abiertas sigue pendiente. *(Actualización 2026-11-08: después, RF2-15 y RF2-16 resuelven parte de esas preguntas; ver «Preguntas abiertas».)*

**Decisión confirmada por el usuario (2026-11-06) — registro manual del pago presencial**

- RF2-15, registro manual del pago presencial recibido (vinculada a CU-08, CU-05 y RF2-03). Palabras del usuario: «He decidido que, cuando un participante realice el pago presencial al llegar al lugar de la experiencia, antes de comenzar la actividad, el organizador registre manualmente ese pago como recibido en MODO.», «La reserva debe permanecer confirmada desde el momento en que se realiza correctamente, aunque todavía no se haya pagado presencialmente.», «Cuando el organizador marque el pago como recibido, MODO debe actualizar únicamente su estado de pago, sin modificar la reserva, el precio acordado ni las plazas ocupadas.» y «El organizador solo podrá registrar pagos correspondientes a reservas de sus propias experiencias.»
- La operación no estaba cubierta por los casos de uso aprobados (CU-05 la excluye). Con la aprobación explícita del usuario se creó CU-08 «Registrar pago presencial recibido» mediante ahk-use-case y se aprobó el 2026-11-06. CU-01 a CU-07 no se modificaron.
- La reserva sigue confirmada desde que se realiza. Al marcar el pago como recibido solo cambia el estado del pago, no la reserva, el precio acordado ni las plazas ocupadas. El organizador solo actúa sobre sus propias experiencias. No modifica CU-05, RF2-03 ni RF2-01 a RF2-14.
- Resuelve la parte de registro del pago de la pregunta abierta «Pago presencial: registro del pago presencial y gestión de inasistencias». Siguen pendientes, por decisión del usuario, qué ocurre si el participante no paga y la gestión de inasistencias.

**Decisión confirmada por el usuario (2026-11-08) — cierre de reservas a la hora de inicio**

- RF2-16, cierre de reservas a la hora exacta de inicio de la sesión (vinculada a CU-01, CU-05, CU-06, RF2-07 y RF2-12). Palabras del usuario: «He decidido que los participantes puedan reservar una sesión hasta antes de su hora exacta de inicio, utilizando la zona horaria America/Guayaquil (UTC−5).», «Desde el momento en que comienza la sesión, ya no se permiten nuevas reservas. Esa sesión deja de considerarse futura y no debe contar para la disponibilidad del catálogo ni para determinar si una experiencia está agotada.», «Por ejemplo, si una sesión comienza a las 15:00, se puede reservar a las 14:59, pero a las 15:00 ya no.» y «No quiero establecer un cierre anticipado de varias horas.».
- Resuelve el bloqueo B2 de la auditoría del 2026-11-08 (opción A). Concreta «fecha futura» y «sesiones futuras» de CU-01, CU-05, CU-06 y RF2-07 sin modificarlos, con la zona horaria de RF2-12. No hay cierre anticipado. No modifica los casos de uso aprobados ni RF2-01 a RF2-15.
- Resuelve el cierre de reservas de la pregunta abierta «Límites de la reserva». Siguen pendientes el límite máximo de plazas por reserva y la pregunta derivada de RF2-16 sobre el pago en línea que se completa después del inicio de la sesión.

**Decisión confirmada por el usuario (2026-11-08) — cancelación de una reserva presencial con pago «Recibido»**

- RF2-17, cancelación de una reserva con pago presencial según el estado del pago (vinculada a CU-07, CU-08 y RF2-01). Palabras del usuario: «Cuando un participante cancela válidamente una reserva con pago presencial, MODO cancela la reserva completa y libera las plazas, siguiendo CU-07.», «Si el pago está marcado como «Pendiente», no existe un pago registrado que devolver.», «Si el pago aparece como «Recibido», MODO conserva ese estado y su historial, pero no inicia ni gestiona un reembolso presencial. No debe afirmar que no hubo pago cuando el historial muestra lo contrario.» y «No quiero añadir un procedimiento de devolución presencial al alcance inicial. Cualquier tratamiento del dinero recibido fuera de la plataforma debe quedar explícitamente fuera del alcance, sin afirmar que se devolvió.».
- Resuelve el bloqueo B3 de la auditoría del 2026-11-08 (opción A con la precisión del usuario). La compatibilidad con CU-07 y CU-08 se verificó mediante AHK antes de registrarla; no modifica casos de uso aprobados ni RF2-01 a RF2-16.
- No añade procedimiento de devolución presencial; el tratamiento del dinero recibido fuera de MODO queda fuera del alcance inicial.

**Decisión confirmada por el usuario (2026-11-08) — importe total de la reserva**

- RF2-18, importe total de la reserva (vinculada a CU-04, CU-05, CU-06, CU-08 y RF2-13). Palabras del usuario: «En MODO, cada sesión tiene un precio individual por participante. El importe total de la reserva se calcula multiplicando el precio de esa sesión por la cantidad de plazas seleccionadas.», «Por ejemplo, si una sesión cuesta 20 USD por persona y el participante reserva 3 plazas, el total será de 60 USD.», «El importe total debe mostrarse antes de confirmar la reserva o iniciar el pago, y debe conservarse cuando la reserva queda confirmada, aunque el organizador cambie posteriormente el precio de la sesión.» y «Esta regla se aplica tanto a las reservas con pago presencial como a las reservas con pago en línea.».
- Resuelve el bloqueo B4 de la auditoría del 2026-11-08 (opción A). La compatibilidad con CU-04, CU-05, CU-06 y CU-08 se verificó mediante AHK antes de registrarla; no modifica casos de uso aprobados ni RF2-01 a RF2-17.
- El importe total es el precio por participante de la sesión multiplicado por las plazas seleccionadas; se muestra antes de confirmar la reserva o iniciar el pago y se conserva al quedar confirmada aunque el organizador cambie después el precio. Se aplica al pago presencial y al pago en línea.
- No añade impuestos, comisiones, descuentos ni reglas de redondeo (no decididos por el usuario). No resuelve la pregunta abierta «Precios: tarifas y experiencias gratuitas», que sigue pendiente.

**Preguntas abiertas**

Nueva, derivada de RF2-01:

- Zona horaria de referencia para calcular el plazo de 24 horas (el usuario no la ha indicado). **Resuelta por RF2-12 (2026-11-06):** America/Guayaquil (UTC−5).

Nueva, derivada de RF2-04:

- Si RF2-04 se aplica también a las varias fechas que el organizador añade al publicar la experiencia (CU-03 A2), es decir, si al publicar se impide introducir dos fechas con exactamente la misma fecha y horario. **Resuelta por RF2-05 (2026-11-05):** sí; MODO no permite publicar hasta que se corrijan las sesiones duplicadas con exactamente la misma fecha y horario.

Nueva, derivada de RF2-07:

- Si, al combinar el estado «Agotado» con un filtro de fecha (CU-01 A3, A4), este se evalúa solo sobre las sesiones futuras dentro del periodo filtrado o sobre todas las sesiones futuras de la experiencia (el usuario no lo ha indicado).

Nueva, pedida por el usuario (RF2-08):

- Qué ocurre con un pago cuya confirmación llega después de vencer la retención de 10 minutos (el usuario pide expresamente dejarla pendiente; no se decide). **Resuelta por RF2-09 (2026-11-05):** la reserva no se confirma aunque queden plazas, las plazas siguen liberadas, MODO gestiona un reembolso completo y el participante recibe un mensaje claro; para reservar de nuevo debe iniciar una nueva reserva. Siguen pendientes el procedimiento y el plazo exacto del reembolso.

Nueva, derivada de RF2-10:

- Qué ocurre si el método de pago original ya no está disponible al gestionar el reembolso (el usuario no lo ha indicado; no se decide).

Nueva, derivada de CU-08:

- Qué etiqueta concreta muestra la lista de reservas de CU-08 como estado de pago de las reservas pagadas en línea (pregunta abierta de CU-08 aprobado; no se decide).

Nueva, derivada de RF2-16:

- Qué ocurre si un pago en línea iniciado antes de la hora de inicio de la sesión se completa, dentro de los 10 minutos de retención de RF2-08, después de esa hora (el usuario no lo ha indicado; no se decide).

Nueva, derivada de RF2-18:

- Qué precio se aplica si el organizador cambia el precio de la sesión después de que MODO muestre el importe total y antes de que la reserva quede confirmada: en el pago presencial, entre el resumen y la confirmación; en el pago en línea, durante la retención de 10 minutos de RF2-08 (el usuario no lo ha indicado; no se decide).

Ya documentadas, copiadas sin decidir nada:

- Pago en línea: medios de pago aceptados, moneda y tiempo exacto de retención (CU-06 / fase-01 §5.2). **Resuelta por RF2-08 (2026-11-05):** 10 minutos como máximo. Siguen abiertos los medios de pago aceptados y la moneda. **Moneda resuelta por RF2-13 (2026-11-06):** USD. Sigue pendiente la definición de los medios de pago aceptados. **Medios de pago resueltos por RF2-14 (2026-11-06):** tarjeta de crédito o débito.
- Reembolsos: procedimiento y tiempos del reembolso (CU-07 / fase-01 §5.2). RF2-09 añade un caso de reembolso completo (pago confirmado fuera de plazo), pero no resuelve esta pregunta: el procedimiento y los tiempos del reembolso siguen pendientes. **Resuelta en parte por RF2-10 (2026-11-06):** método de devolución = el método de pago original; sigue pendiente el plazo de tramitación y acreditación del reembolso. **Plazo de tramitación resuelto por RF2-11 (2026-11-06):** MODO inicia la solicitud en un máximo de 24 horas; sigue pendiente el plazo de acreditación por la entidad financiera.
- Pago presencial: registro del pago presencial y gestión de inasistencias (CU-05 / fase-01 §5.2). **Parcialmente resuelto por RF2-03:** el momento y el lugar del pago quedan fijados; siguen abiertos cómo se registra el pago, qué ocurre si el participante no paga y la gestión de inasistencias. **Registro del pago resuelto por RF2-15 y CU-08 (2026-11-06):** el organizador lo registra manualmente como recibido. Siguen pendientes qué ocurre si el participante no paga y la gestión de inasistencias.
- Verificación del correo: requisitos de la contraseña, caducidad y formato del correo de verificación (CU-02 / fase-01 §5.2). *(Reclasificada 2026-11-08: fuera del alcance de esta especificación según «Límites y exclusiones» de CU-02; no bloquea la aprobación.)*
- Filtros del catálogo: clasificación definitiva de zonas y sectores o parroquias, lista de categorías, forma del filtro de rango de precios y qué días comprende «este fin de semana» (CU-01 / fase-01 §5.2).
- Límites de la reserva: límite máximo de plazas por reserva y límite de antelación o cierre de reservas (CU-05 / proceso.md / fase-01 §5.2). **Cierre de reservas resuelto por RF2-16 (2026-11-08):** se puede reservar hasta antes de la hora exacta de inicio de la sesión, sin cierre anticipado; sigue pendiente el límite máximo de plazas por reserva.
- Cancelación por parte del organizador: si se adopta y, en tal caso, si puede cancelar una fecha o una reserva y cómo se informa al participante (CU-04 / CU-07 / fase-01 §8.2).
- Dirección exacta y requisitos específicos de participación (CU-01 / fase-01 §8.2).
- Modelo de fechas: fechas recurrentes (proceso.md / fase-01 §8.2).
- Precios: tarifas y experiencias gratuitas (proceso.md / fase-01 §8.2).
- Notificaciones: qué avisos recibe cada actor (confirmación, cancelación, cambios) (proceso.md / fase-01 §8.2).
- Lista de espera: si existe cuando no hay cupo (proceso.md / fase-01 §8.2).
- CU-02: si, tras registrarse, el usuario queda con la sesión iniciada automáticamente; si, al registrarse desde un intento de reserva, vuelve a la experiencia que quería reservar; cierre de sesión (CU-02 / fase-01 §8.2). **Resuelta por RF2-06 (2026-11-05):** la pregunta sobre la sesión iniciada automáticamente: sí, tras completar correctamente el registro el usuario queda con la sesión iniciada y, mientras no verifique su correo, no puede reservar. Siguen abiertas la vuelta a la experiencia tras registrarse desde un intento de reserva y el cierre de sesión.
- CU-03: si el organizador debe tener el correo verificado para publicar; edición posterior de la información general de la experiencia (nombre, descripción, imágenes) (CU-03 / fase-01 §8.2).
