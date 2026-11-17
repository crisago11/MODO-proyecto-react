# MODO — Fase 1 · Definición funcional

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

---

## 1. Identificación del proyecto

| Campo | Valor |
|---|---|
| Producto | MODO |
| Autor | Santiago Chamorro |
| Curso | Bootcamp Full Stack — React Guide VI |
| Entrega | Fase 1 · Definición funcional |
| Fecha | 25 de octubre de 2026 |
| Versión del documento | 1.0 |

## 2. Problema y contexto

*Propuesta redactada a partir de lo documentado en la Fase 1; pendiente de revisión del autor.*

MODO es una plataforma para descubrir y reservar experiencias. Busca facilitar el descubrimiento y la reserva de experiencias dentro del Distrito Metropolitano de Quito y permitir que los organizadores publiquen y administren sus actividades.

MODO es un proyecto anterior, ubicado en otra carpeta, que ya cuenta con navegación visual pero todavía no tiene reservas funcionales. `proyecto-bootcamp` es un proyecto independiente que, durante la Fase 1, conserva la plantilla inicial de React; en esta fase solo se realiza la definición funcional.

**Ámbito geográfico (decisión 6):** MODO estará enfocado exclusivamente en experiencias dentro del Distrito Metropolitano de Quito, incluyendo Quito urbano, Cumbayá, Tumbaco, el Valle de Los Chillos y otros sectores metropolitanos. No se incluirán ciudades fuera de esta área (por ejemplo, Baños de Agua Santa).

*Esta sección describe la intención del producto según las decisiones documentadas. No se han realizado entrevistas, estudios de mercado ni investigaciones con usuarios.*

## 3. Usuarios y objetivos

| Actor | Descripción | Objetivos | Casos |
|---|---|---|---|
| Visitante | Persona sin sesión iniciada. | Explorar el catálogo, buscar y filtrar experiencias y consultar su detalle sin iniciar sesión. Crear una cuenta para poder reservar. | CU-01, CU-02 |
| Participante | Usuario registrado que reserva experiencias. | Iniciar sesión y verificar su correo antes de la primera reserva. Reservar una o varias plazas con pago presencial o en línea. Consultar sus reservas y cancelarlas según la política de MODO. | CU-02, CU-05, CU-06, CU-07 |
| Organizador | Usuario registrado que activa su perfil de organizador desde su cuenta. Una misma persona puede ser participante y organizador. | Publicar experiencias dentro del Distrito Metropolitano de Quito. Administrar fechas, horarios, cupos y precios de sus experiencias sin afectar a las reservas existentes. | CU-03, CU-04 |

## 4. Descripción general de la solución

MODO conecta a tres actores a lo largo de un mismo recorrido. Todo empieza con el organizador: un usuario registrado activa su perfil de organizador desde su cuenta, sin aprobación manual, y publica una experiencia completa con categoría, ubicación dentro del Distrito Metropolitano de Quito, modalidad de pago (en línea o presencial) y al menos una fecha futura con horario, cupos y precio (CU-03). A partir de ahí, el organizador mantiene sus fechas, horarios, cupos y precios, añadiendo, modificando o eliminando fechas sin alterar las condiciones de las reservas ya existentes (CU-04).

Las experiencias publicadas con fechas futuras aparecen en el catálogo público, que el visitante puede recorrer sin iniciar sesión: busca por texto, combina filtros, cambia el orden y abre el detalle de cada experiencia, donde ve sus fechas, el precio de cada una y su disponibilidad o la etiqueta «Agotado» (CU-01). Cuando quiere reservar, el visitante crea una cuenta con datos mínimos, inicia sesión y verifica su correo antes de su primera reserva (CU-02); desde ese momento actúa como participante.

El participante elige una fecha y el número de plazas, aporta su teléfono si su cuenta aún no lo tiene y revisa un resumen con el precio vigente y las condiciones de cancelación. Según la modalidad que definió el organizador, la reserva se confirma automáticamente al comprobarse que hay plazas suficientes, con pago presencial (CU-05), o al completarse el pago en línea, durante el cual las plazas quedan retenidas temporalmente (CU-06). Finalmente, el participante puede consultar sus reservas y cancelar una reserva completa dentro del plazo de la política única de MODO; las plazas vuelven a estar disponibles para otros participantes y, si pagó en línea, recibe el reembolso completo (CU-07).

Las decisiones confirmadas se detallan en el apartado 8.1.

## 5. Alcance inicial y exclusiones

### 5.1 Incluido en la primera versión

Los siete casos de uso aprobados, descritos en el apartado 7:

- **CU-01:** explorar el catálogo y consultar el detalle de las experiencias sin iniciar sesión.
- **CU-02:** registrarse, verificar el correo antes de la primera reserva e iniciar sesión.
- **CU-03:** activar el perfil de organizador y publicar experiencias.
- **CU-04:** administrar fechas, horarios, cupos y precios de las experiencias propias.
- **CU-05:** reservar una o varias plazas con pago presencial.
- **CU-06:** reservar una o varias plazas con pago en línea.
- **CU-07:** cancelar una reserva completa según la política de MODO.

### 5.2 Incluido, con reglas o mecanismos por definir en fases posteriores

Estas funcionalidades forman parte del producto, pero sus detalles aún no están definidos:

| Funcionalidad | Qué está previsto | Qué queda por definir | Origen |
|---|---|---|---|
| Pago en línea | Reserva con pago durante el proceso y retención temporal de plazas. | Medios de pago aceptados, moneda, tiempo exacto de retención e implementación técnica del pago. | CU-06 |
| Reembolsos | Reembolso completo de las reservas pagadas en línea canceladas dentro del plazo. | Plazo exacto de cancelación (Fase 2), procedimiento y tiempos del reembolso. | CU-07 |
| Pago presencial | Confirmación automática con disponibilidad suficiente. | Registro del pago presencial y gestión de inasistencias. | CU-05 |
| Verificación del correo | Verificación antes de la primera reserva, con reenvío. | Requisitos de la contraseña, caducidad y formato del correo de verificación. | CU-02 |
| Filtros del catálogo | Filtros por categoría, ubicación, fecha, rango de precios, plazas disponibles y modalidad de pago. | Clasificación definitiva de zonas y sectores o parroquias, lista de categorías, forma del filtro de rango de precios y qué días comprende «este fin de semana». | CU-01 |
| Límites de la reserva | Reserva de varias plazas sin superar la disponibilidad. | Límite máximo de plazas por reserva y límite de antelación o cierre de reservas. | CU-05, proceso.md |

La implementación técnica de todo el producto corresponde a fases posteriores; en la Fase 1 solo se realiza la definición funcional.

### 5.3 Excluido de la primera versión

Según las secciones «Límites y exclusiones» de los casos y `docs/proceso.md`:

- Geolocalización por cercanía (CU-01).
- Filtro por franja horaria; queda para una futura versión (CU-01).
- Recuperación de contraseña; mejora futura (CU-02).
- Guardar borradores de experiencias; posible mejora futura (CU-03).
- Verificación avanzada de organizadores; futuras versiones (CU-03).
- Aprobación manual de organizadores por un administrador (CU-03, R1).
- Cancelación de fechas o reservas por parte del organizador; pendiente de evaluación (CU-04, CU-07, proceso.md).
- Notificaciones a participantes por cambios (CU-04) y notificaciones detalladas (CU-05).
- Lista de espera (CU-05, CU-07).
- Facturación (CU-06).
- Cancelación parcial de plazas de una reserva; solo se cancelan reservas completas (CU-07, R7).
- Registro de datos individuales de los acompañantes (CU-05, R2).
- Cédula o pasaporte como requisito general de registro (CU-02, R3).
- Edición de la información general de la experiencia: nombre, descripción, imágenes (CU-04).
- Cancelaciones fuera de plazo por otros canales (CU-07).
- Dirección exacta y requisitos específicos de participación; pendientes de definición (CU-01).

## 6. Secciones o pantallas previstas

*Propuesta derivada de los siete casos aprobados; pendiente de revisión del autor. No añade funcionalidades.*

| Pantalla | Qué agrupa | Caso(s) de origen |
|---|---|---|
| 1. Catálogo | Listado, búsqueda por texto, filtros combinables y orden. | CU-01 |
| 2. Detalle de experiencia | Información de la experiencia, fechas, precio por fecha, disponibilidad o «Agotado», y punto de inicio de la reserva. | CU-01 |
| 3. Acceso | Registro, inicio de sesión y verificación del correo (aviso y reenvío). | CU-02 |
| 4. Reserva | Selección de fecha y plazas, teléfono si falta, resumen con precio y condiciones de cancelación, pago en línea cuando corresponda y confirmación. | CU-05, CU-06 |
| 5. Mi cuenta | Activación del perfil de organizador y «Mis reservas» con su cancelación. | CU-03, CU-07 |
| 6. Panel del organizador | Mis experiencias, publicar experiencia (ficha y fechas) y gestión de fechas, horarios, cupos y precios. | CU-03, CU-04 |

Correspondencia con la versión anterior de la propuesta: las 12 pantallas iniciales se agruparon en estas 6 sin eliminar ninguna funcionalidad aprobada.

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

## 8. Decisiones y preguntas pendientes

### 8.1 Decisiones confirmadas

**Decisiones globales (confirmadas por el usuario el 25 de octubre de 2026)**

1. Los organizadores podrán publicar y administrar experiencias, fechas, horarios, cupos y precios.
2. Cada organizador determinará si una experiencia requiere pago en línea o permite pago presencial.
3. Los visitantes podrán explorar experiencias sin iniciar sesión, pero deberán registrarse para reservar.
4. Las reservas se confirmarán automáticamente cuando se cumplan las condiciones de disponibilidad y pago.
5. Los participantes podrán cancelar reservas respetando las condiciones correspondientes.
6. MODO estará enfocado exclusivamente en experiencias dentro del Distrito Metropolitano de Quito, incluyendo Quito urbano, Cumbayá, Tumbaco, el Valle de Los Chillos y otros sectores metropolitanos; no se incluirán ciudades fuera de esta área (por ejemplo, Baños de Agua Santa).
7. En CU-03, el organizador deberá indicar la categoría y la ubicación de su experiencia dentro del área cubierta por MODO.
8. El precio se establece por fecha u horario de cada experiencia y puede variar entre sesiones; las reservas confirmadas conservan siempre el precio vigente al momento de reservar.

**Decisiones clave por caso**

- **CU-01:** listado, búsqueda por texto (nombre y descripción) y filtros combinables en el mismo caso; filtros por categoría, ubicación, fecha, rango de precios, plazas disponibles y modalidad de pago, que se cumplen conjuntamente; ubicación en dos niveles (zona y, opcionalmente, sector o parroquia) sin geolocalización por cercanía; fecha con atajos (hoy, mañana, este fin de semana, próximos 7 días) y rango personalizado; agotadas visibles con «Agotado» y al final del listado con cualquier orden; sin fechas futuras ocultas; orden por defecto por fecha disponible más próxima, con opción por precio o fecha de publicación; aviso y opción de modificar o limpiar filtros cuando no hay resultados.
- **CU-02:** registro mínimo con nombre completo, correo y contraseña; aceptación de términos e información sobre el tratamiento de datos personales; sin cédula ni pasaporte; teléfono solicitado durante la reserva; verificación del correo antes de la primera reserva, con reenvío; un correo, una cuenta; recuperación de contraseña como mejora futura.
- **CU-03:** activación propia del perfil de organizador sin aprobación manual; una misma persona puede participar y organizar; publicación solo completa y con al menos una fecha futura con horario, cupos y precio; sin borradores; rechazo de ubicaciones fuera del Distrito Metropolitano de Quito y de fechas pasadas.
- **CU-04:** protección de reservas existentes (sin eliminar ni cambiar día u horario de fechas con reservas activas; cupos ajustables sin quedar por debajo de lo reservado); cambios de precio solo para reservas futuras; fechas sin reservas modificables o eliminables; la pérdida de la última fecha futura oculta la experiencia del catálogo sin eliminarla; cada organizador solo administra sus experiencias.
- **CU-05:** varias plazas por reserva sin superar la disponibilidad; sin datos individuales de acompañantes; teléfono obligatorio en la primera reserva y guardado en la cuenta; confirmación automática con disponibilidad suficiente, sin aprobación del organizador; las mismas reglas se aplican a CU-06.
- **CU-06:** retención temporal de plazas durante el pago; confirmación al completarse; liberación de plazas si el pago falla, se abandona o vence el tiempo; sin plazas suficientes no se inicia el pago; ante un pago fallido, MODO informa y permite un nuevo intento.
- **CU-07:** política de cancelación única de MODO con plazo previo a la fecha (plazo exacto en la Fase 2); reembolso completo para pago en línea dentro del plazo y sin reembolso para pago presencial; liberación de plazas; sin cancelación directa fuera de plazo; cancelaciones completas; consulta de las reservas propias para elegir cuál cancelar; cada participante solo cancela sus propias reservas.

### 8.2 Preguntas pendientes

Las siguientes cuestiones quedan abiertas para fases posteriores. Los detalles de funcionalidades incluidas pero aún sin definir se recogen en el apartado 5.2 y aquí solo se mencionan con «(ver 5.2)».

**Aspectos generales pendientes o parcialmente resueltos** (según `docs/proceso.md`)

| Aspecto | Estado | Qué falta |
|---|---|---|
| Cancelación por parte del organizador | Abierto | Decidir si se adopta; en tal caso, si el organizador puede cancelar una fecha o una reserva y cómo se informa al participante (pregunta también abierta en CU-04 y CU-07). |
| Clasificación de zonas y sectores o parroquias | Abierto | Validar la clasificación definitiva (ver 5.2). |
| Dirección exacta y requisitos de participación | Abierto | Definirlos (también en CU-01). |
| Modelo de fechas | Parcialmente resuelto | Cupo y precio por fecha u horario están decididos; faltan las fechas recurrentes. |
| Precios | Parcialmente resuelto | Precio por fecha u horario decidido; faltan moneda (ver 5.2), tarifas y experiencias gratuitas. |
| Reserva | Parcialmente resuelto | Límite de antelación o cierre de reservas (ver 5.2). |
| Pago presencial | Parcialmente resuelto | Registro del pago presencial y no asistencia (ver 5.2). |
| Condiciones de cancelación | Resuelto con pendiente | Plazo exacto, que se definirá en la Fase 2 (ver 5.2). |
| Notificaciones | Abierto | Qué avisos recibe cada actor (confirmación, cancelación, cambios). |
| Lista de espera | Abierto | Si existe cuando no hay cupo. |

**Preguntas abiertas de los casos** (sin repetir las anteriores)

- **CU-01:** lista de categorías, forma del filtro de rango de precios y qué días comprende «este fin de semana» (ver 5.2).
- **CU-02:** si, tras registrarse, el usuario queda con la sesión iniciada automáticamente; si, al registrarse desde un intento de reserva, vuelve a la experiencia que quería reservar; cierre de sesión; requisitos de la contraseña y caducidad y formato del correo de verificación (ver 5.2).
- **CU-03:** si el organizador debe tener el correo verificado para publicar; edición posterior de la información general de la experiencia (nombre, descripción, imágenes).
- **CU-05:** límite máximo de plazas por reserva (ver 5.2).
- **CU-06:** tiempo exacto de retención, medios de pago aceptados, moneda y reembolsos (ver 5.2).
- **CU-07:** procedimiento y tiempos del reembolso (ver 5.2).

## 9. Decisiones propias y uso de IA

Elegí MODO para este módulo porque considero que es una buena oportunidad para continuar desarrollando un proyecto que ya había comenzado. Actualmente tiene una estructura visual y navegación, pero todavía le faltan funcionalidades importantes. Quiero aprovechar lo aprendido en el bootcamp para completarlas progresivamente, especialmente el sistema de reservas.

Decidí permitir que un usuario registrado active su perfil de organizador sin aprobación manual para simplificar la primera versión. Después de revisar esta decisión, considero importante incorporar en el futuro un proceso de verificación que ofrezca mayor confianza y seguridad.

Como ejemplo del recorrido principal, un participante entra en MODO, encuentra un taller de cerámica en Cumbayá, consulta la información y selecciona una fecha y dos plazas. Inicia sesión o se registra, verifica su correo y proporciona su teléfono si todavía no lo tiene registrado. Revisa el precio y las condiciones, confirma la reserva con pago presencial y recibe la confirmación si existen plazas suficientes.

Como situación alternativa, si las plazas se agotan antes de confirmar, MODO informa de que no hay disponibilidad y no permite completar la reserva.

Claude Code me ayudó principalmente a organizar mis ideas. Mediante preguntas y alternativas pude definir con más claridad las funcionalidades de MODO y su comportamiento.

Reconozco que las reservas, los pagos y las cancelaciones todavía no están implementados ni probados con usuarios reales. Estas funcionalidades deberán desarrollarse y comprobarse progresivamente en las siguientes fases.

El agente utilizado fue Claude Code con AHK 3.0.0. Se verificaron la versión de AHK, el harness local, la skill `ahk-use-case` y el acceso real al MCP. Los siete casos fueron aprobados y validados.

## 10. Fuentes y comprobaciones de esta fase

### 10.1 Comprobaciones realizadas por el agente durante la sesión

| Fuente o comprobación | Qué demuestra | Limitaciones |
|---|---|---|
| `ahk --version` → `3.0.0` | AHK 3.0.0 instalado. | Instalado de forma global, no como dependencia del proyecto. |
| `agent-harness-kit.config.json`, `agent-harness-kit.config.local.json`, `.mcp.json`, `.harness/harness.db` | Harness local configurado (proveedor claude-code, SQLite local, MCP en el puerto 3742). | La configuración se inspeccionó en modo lectura. |
| Skill `.claude/skills/ahk-use-case/` (`SKILL.md`, `resources/workflow.md`, `resources/template.md`) | La skill y sus recursos son legibles y se usaron como guía. | — |
| MCP `specs.list` | Los siete casos existen con estado `approved` y sin diagnósticos. | Refleja metadatos, no calidad funcional. |
| MCP `specs.validate` → `{"valid":true,"errors":[]}` | Frontmatter, enlaces y referencias válidos. | No valida el contenido funcional. |
| `docs/use-cases/*.md` (7 archivos) | Fuente de las fichas del apartado 7. | Definición funcional; sin implementación. |
| `docs/proceso.md` | Registro cronológico de decisiones confirmadas, aclaraciones y pendientes. | Documento elaborado durante la sesión; no sustituye la validación con usuarios. |
| Inspección de `src/` | `proyecto-bootcamp` conserva la plantilla inicial de React + Vite. | No hay funcionalidades implementadas. |

### 10.2 Comprobaciones realizadas por el autor antes de esta síntesis

*Declaradas por el autor; no reejecutadas por el agente.*

| Comprobación | Resultado | Qué demuestra | Limitaciones |
|---|---|---|---|
| `ahk health` en `/Users/santich/proyecto-bootcamp` | `Health check passed` | El harness y el script de salud del proyecto funcionan. | Verifica la plantilla y el entorno, no las funcionalidades de MODO. |
| `tsc -b && vite build` (ejecutado por el script de salud) | Compilación correcta con Vite 8.2.2 | La plantilla React + TypeScript compila sin errores. | No hay funcionalidades de MODO implementadas que compilar. |
| Apertura de la plantilla React en el navegador | Funcionaba correctamente | El entorno de desarrollo se ejecuta. | Solo verifica la plantilla inicial. |

Limitaciones generales: el directorio no es un repositorio git; las comprobaciones verifican la plantilla y el entorno, no la implementación de las funcionalidades de MODO; no se realizaron pruebas con usuarios.
