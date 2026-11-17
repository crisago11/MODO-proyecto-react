---
slug: "cu-02-registrarse-para-reservar"
title: "CU-02 · Registrarse para poder reservar"
description: "El visitante crea una cuenta de participante con datos mínimos, verifica su correo antes de su primera reserva e inicia sesión con una cuenta existente."
spec_kind: use-case
status: approved
created_at: "2026-10-25T17:50:34.695Z"
last_updated: "2026-10-25T17:52:58.654Z"
---
## Actor, goal, and trigger

- **Actor:** visitante que quiere convertirse en participante; para el inicio de sesión, usuario con una cuenta existente.
- **Objetivo:** crear una cuenta en MODO para poder reservar, verificar el correo antes de la primera reserva e iniciar sesión con una cuenta existente.
- **Disparador:** el visitante elige registrarse o iniciar sesión, por iniciativa propia o al intentar reservar una experiencia desde su detalle (CU-01, alternativa A6).

## Preconditions and main flow

**Precondiciones**

- El visitante no tiene sesión iniciada.
- Para iniciar sesión, existe una cuenta registrada con ese correo electrónico.

**Flujo principal — Registro**

1. El visitante elige registrarse.
2. MODO solicita nombre completo, correo electrónico y contraseña, y muestra los términos y condiciones y la información sobre el tratamiento de sus datos personales.
3. El visitante introduce sus datos y acepta los términos y condiciones.
4. MODO crea la cuenta y envía un correo de verificación a la dirección indicada.
5. MODO informa al visitante de que su cuenta fue creada y de que deberá verificar su correo antes de su primera reserva.

**Flujo — Verificación del correo**

1. El usuario abre el correo de verificación recibido y confirma su dirección.
2. MODO marca el correo de la cuenta como verificado.

**Flujo — Inicio de sesión**

1. El usuario elige iniciar sesión.
2. El usuario introduce su correo electrónico y su contraseña.
3. MODO comprueba los datos e inicia la sesión.
4. El usuario puede explorar experiencias y, si su correo está verificado, reservar.

## Alternatives, failures, and rules

**Alternativas**

- **A1 — Intento de reservar con el correo sin verificar:** MODO solicita la verificación del correo y permite reenviar el correo de verificación. Una vez verificado, el usuario puede continuar con el proceso de reserva (CU-05, CU-06).
- **A2 — Reenvío del correo de verificación:** el usuario solicita un nuevo correo de verificación y MODO lo envía.
- **A3 — Registro iniciado desde un intento de reserva:** el visitante llega al registro desde el detalle de una experiencia (CU-01, A6).

**Fallos**

- **F1 — Datos incompletos o no válidos:** MODO indica qué datos deben corregirse y no crea la cuenta.
- **F2 — Términos no aceptados:** MODO no crea la cuenta.
- **F3 — Correo ya registrado:** MODO no crea una segunda cuenta con ese correo e informa al visitante, ofreciéndole iniciar sesión.
- **F4 — Credenciales incorrectas:** MODO no inicia la sesión e informa al usuario.

**Reglas de negocio**

- **R1:** el registro solicita únicamente nombre completo, correo electrónico y contraseña.
- **R2:** la aceptación de los términos y condiciones es obligatoria, y el visitante recibe la información sobre el tratamiento de sus datos personales antes de crear la cuenta.
- **R3:** no se solicita cédula ni pasaporte como requisito general de registro.
- **R4:** el teléfono no se solicita en el registro; podrá solicitarse durante la reserva cuando sea necesario (CU-05, CU-06).
- **R5:** un correo sin verificar no impide iniciar sesión ni explorar experiencias, pero sí reservar.
- **R6:** cada correo electrónico corresponde a una sola cuenta.

**Límites y exclusiones**

- La recuperación de contraseña queda fuera del alcance inicial (mejora futura).
- No incluye cómo se obtiene el rol de organizador (pendiente general).
- No incluye la reserva (CU-05, CU-06).
- No define detalles técnicos ni secundarios (requisitos de la contraseña, caducidad o formato del correo de verificación).

## Observable outcome and acceptance criteria

**Resultado observable:** el visitante tiene una cuenta de participante en MODO, puede iniciar sesión con ella y, una vez verificado su correo, puede continuar hacia una reserva.

**Criterios de aceptación**

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

## Decisions and open questions

**Decisiones confirmadas por el usuario (2026-10-25)**

- Registro mínimo: nombre completo, correo electrónico y contraseña.
- Aceptación de términos y condiciones e información sobre el tratamiento de datos personales.
- Sin cédula ni pasaporte como requisito general; el teléfono podrá solicitarse durante la reserva (CU-05, CU-06).
- Verificación del correo antes de la primera reserva, con posibilidad de reenvío; sin verificar se puede iniciar sesión y explorar.
- Alcance: registro, verificación del correo e inicio de sesión; la recuperación de contraseña es una mejora futura.

**Decisiones confirmadas por el usuario tras la revisión (2026-10-25)**

- F3 y R6: no se permiten cuentas duplicadas con el mismo correo electrónico; si ya existe una cuenta, MODO lo indica y ofrece iniciar sesión.
- F1 y F4: si faltan datos o son incorrectos, MODO impide completar el registro e indica qué debe corregirse; si las credenciales de inicio de sesión son incorrectas, no permite acceder y muestra un aviso.

**Preguntas abiertas (fases posteriores)**

- Si, tras registrarse, el usuario queda con la sesión iniciada automáticamente.
- Si, al registrarse desde un intento de reserva, el usuario vuelve a la experiencia que quería reservar.
- Requisitos de la contraseña.
- Caducidad y formato del correo de verificación.
- Cierre de sesión.