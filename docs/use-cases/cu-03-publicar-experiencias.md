---
slug: "cu-03-publicar-experiencias"
title: "CU-03 · Publicar experiencias"
description: "Un usuario registrado activa su perfil de organizador y publica una experiencia completa dentro del Distrito Metropolitano de Quito, que pasa a aparecer en el catálogo de MODO."
spec_kind: use-case
status: approved
created_at: "2026-10-25T17:56:36.458Z"
last_updated: "2026-10-25T19:27:07.508Z"
---
## Actor, goal, and trigger

- **Actor:** usuario registrado (CU-02) que actúa como organizador.
- **Objetivo:** publicar una experiencia para que aparezca en el catálogo de MODO y pueda ser reservada.
- **Disparador:** el usuario decide ofrecer una experiencia en MODO.

## Preconditions and main flow

**Precondiciones**

- El usuario tiene una cuenta en MODO y ha iniciado sesión (CU-02).
- La experiencia se realiza dentro del Distrito Metropolitano de Quito.

**Flujo principal**

1. El usuario activa su perfil de organizador desde su cuenta, si aún no lo ha hecho.
2. El organizador elige publicar una nueva experiencia.
3. El organizador introduce la información de la experiencia: nombre, descripción, categoría, zona y sector o parroquia, modalidad de pago (en línea o presencial), imágenes, duración y qué incluye.
4. El organizador añade al menos una fecha futura con horario, cupos y precio.
5. El organizador confirma la publicación.
6. MODO comprueba que la información está completa y publica la experiencia.
7. La experiencia aparece en el catálogo de MODO (CU-01) asociada al organizador.

## Alternatives, failures, and rules

**Alternativas**

- **A1 — Perfil de organizador ya activo:** el usuario empieza directamente en el paso 2.
- **A2 — Varias fechas:** el organizador añade más de una fecha futura, cada una con horario, cupos y precio.

**Fallos**

- **F1 — Información incompleta:** si falta algún dato obligatorio o no se ha añadido ninguna fecha futura con horario, cupos y precio, MODO no publica la experiencia e indica qué debe completarse.
- **F2 — Ubicación fuera del área:** MODO rechaza la publicación de experiencias cuya ubicación esté fuera del Distrito Metropolitano de Quito e indica al organizador que debe corregirla.
- **F3 — Fecha pasada:** MODO no acepta fechas pasadas como fechas de realización disponibles; la publicación requiere al menos una fecha futura válida.

**Reglas de negocio**

- **R1:** cualquier usuario registrado puede activar su perfil de organizador; no hay aprobación manual por un administrador.
- **R2:** una misma persona puede ser participante y organizador.
- **R3:** el organizador define la modalidad de pago de cada experiencia: en línea o presencial (decisión 2).
- **R4:** la categoría y la ubicación (zona y sector o parroquia) son obligatorias y deben estar dentro del Distrito Metropolitano de Quito (decisiones 6 y 7).
- **R5:** una experiencia solo se publica con su información completa y al menos una fecha futura con horario, cupos y precio.
- **R6:** al publicarse, la experiencia aparece en el catálogo y cumple las reglas de visibilidad de CU-01.
- **R7:** el precio se establece por cada fecha u horario y puede variar entre sesiones (por ejemplo, $20 el sábado y $25 el domingo).

**Límites y exclusiones**

- No incluye guardar borradores de experiencias (posible mejora futura).
- No incluye la verificación avanzada de organizadores (futuras versiones).
- La administración posterior de fechas, horarios, cupos y precios corresponde a CU-04.
- No define detalles secundarios (límites de imágenes, longitud de textos, formato del precio).

## Observable outcome and acceptance criteria

**Resultado observable:** la experiencia publicada aparece en el catálogo de MODO con su información y sus fechas, y puede consultarse según CU-01.

**Criterios de aceptación**

- **CA1:** un usuario registrado puede activar su perfil de organizador sin aprobación de un administrador.
- **CA2:** un organizador puede seguir participando en experiencias con la misma cuenta.
- **CA3:** con la información completa y al menos una fecha futura con horario, cupos y precio, la experiencia se publica y aparece en el catálogo.
- **CA4:** sin información obligatoria o sin fecha futura, la experiencia no se publica y MODO indica qué completar.
- **CA5:** no se puede publicar una experiencia ubicada fuera del Distrito Metropolitano de Quito.
- **CA6:** el organizador elige la modalidad de pago (en línea o presencial) y esta se muestra en el detalle.
- **CA7:** el detalle de la experiencia publicada muestra el organizador y los datos definidos en CU-01.
- **CA8:** no existe la opción de guardar una experiencia como borrador.

## Decisions and open questions

**Decisiones confirmadas por el usuario (2026-10-25)**

- Activación propia del perfil de organizador, sin aprobación manual; una misma persona puede participar y organizar; verificación avanzada en futuras versiones.
- Publicación completa con al menos una fecha futura con horario, cupos y precio; visible en el catálogo al publicarse; gestión posterior en CU-04.
- Sin borradores de experiencias en la primera versión.
- Confirmado tras la revisión: MODO rechaza ubicaciones fuera del Distrito Metropolitano de Quito indicando que deben corregirse (F2), y no acepta fechas pasadas como fechas de realización disponibles (F3).
- Confirmado (2026-10-25): el precio se establece por fecha u horario de cada experiencia y puede variar entre sesiones; las reservas confirmadas conservan el precio vigente al reservar.

**Preguntas abiertas (fases posteriores)**

- Si el organizador debe tener el correo verificado para publicar.
- Edición posterior de la información general de la experiencia (nombre, descripción, imágenes).
- Lista de categorías y clasificación de zonas (pendientes de validación).