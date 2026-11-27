# MODO AI — Contrato técnico de integración

## 1. Objetivo

Incorporar un sistema de recomendaciones personalizadas mediante inteligencia artificial en el catálogo público de MODO, utilizando las preferencias del usuario y las experiencias existentes.

Esta integración corresponde al proyecto final del módulo AI Integration & Cloud Deployment y complementa la arquitectura previamente definida sin sustituir la futura API Express y PostgreSQL.

## 2. Alcance

- Recomendaciones personalizadas mediante Google Gemini.
- Comunicación entre React y AWS Lambda mediante HTTPS.
- Validación de entradas y respuestas.
- Reutilización de las reglas y componentes existentes.
- Gestión de estados de carga, éxito, ausencia de resultados y error.
- Protección de credenciales en el backend.
- Conservación de las funcionalidades existentes.

Quedan fuera del alcance la autenticación, las reservas reales, los pagos y la persistencia de datos.

## 3. Arquitectura

| Componente | Responsabilidad |
|---|---|
| React, TypeScript y Vite | Interfaz y consumo del servicio |
| Zod | Validación de solicitudes y respuestas en el frontend |
| AWS Lambda | Procesamiento y validación de solicitudes |
| Google Gemini | Generación de recomendaciones |
| Amazon S3 | Alojamiento estático del frontend |
| GitHub Actions | Validación, compilación y despliegue controlado |

El catálogo continúa utilizando datos simulados. Las recomendaciones serán generadas por un servicio de IA real cuando la integración se encuentre operativa.

## 4. Contrato de solicitud

Método: POST.

Content-Type: application/json.

La solicitud incluirá los siguientes campos:

- interests: descripción de las preferencias del usuario.
- maxBudget: presupuesto máximo por persona en USD o null.
- zone: north, center, south, valleys o null.
- experiences: listado reducido de experiencias elegibles.

Cada experiencia enviada incluirá:

- id
- name
- description
- category
- zone
- sector
- durationMinutes
- price
- startsAt
- availableSeats

## 5. Contrato de respuesta

La respuesta exitosa tendrá una propiedad recommendations que contendrá entre cero y tres recomendaciones.

Cada recomendación incluirá:

- experienceId: identificador de una experiencia elegible.
- reason: justificación personalizada de la recomendación.

Una lista vacía representa una respuesta válida sin recomendaciones.

El frontend recuperará los nombres, imágenes, precios y fechas desde los datos originales del catálogo, no desde textos generados por Gemini.

## 6. Validaciones

### Entrada

- Eliminar espacios innecesarios del texto.
- interests: entre 10 y 500 caracteres.
- maxBudget: número positivo, finito y no superior a 1000 USD, o null.
- zone: identificador permitido o null.
- Máximo siete experiencias por solicitud.
- Validar los campos y tipos del catálogo enviado.
- No enviar credenciales ni datos personales.

### Respuesta

- Validar la estructura mediante Zod.
- Máximo tres recomendaciones.
- Identificadores existentes en el conjunto de experiencias enviadas.
- No admitir identificadores duplicados.
- Justificaciones no vacías y de máximo 300 caracteres.
- Verificar nuevamente la disponibilidad y las restricciones aplicadas antes de mostrar los resultados.
- Rechazar respuestas con una estructura inválida.

## 7. Reglas del recomendador

Las recomendaciones utilizarán exclusivamente experiencias existentes en el catálogo de MODO.

Se reutilizarán las funciones getFutureSessions, getAvailableSeats, getCatalog y getCardPrice de catalogRules.ts.

Para mantener la coherencia con ExperienceCard, se utilizará el precio de la próxima sesión disponible que representa la tarjeta.

No se recomendarán experiencias agotadas ni experiencias sin sesiones futuras.

El presupuesto y la zona seleccionada serán restricciones obligatorias cuando se indiquen.

Gemini seleccionará y justificará recomendaciones entre las experiencias elegibles, pero no determinará los precios, las fechas ni la disponibilidad.

Los resultados se mostrarán reutilizando ExperienceCard.

El recomendador no modificará los filtros actuales del catálogo.

## 8. Estados de interfaz

| Estado | Comportamiento |
|---|---|
| Inicial | Formulario disponible |
| Entrada inválida | Mensaje de validación sin llamar a la API |
| Carga | Indicador de procesamiento y botón deshabilitado |
| Éxito | Presentación de las recomendaciones y sus justificaciones |
| Sin resultados | Mensaje informativo y posibilidad de cambiar preferencias |
| Error | Mensaje controlado y posibilidad de reintentar |

La solicitud se realizará mediante una acción explícita del usuario, sin utilizar useEffect para obtener datos.

## 9. Gestión de errores

| Código HTTP | Significado |
|---|---|
| 400 | Solicitud inválida |
| 405 | Método no permitido |
| 413 | Solicitud demasiado grande |
| 429 | Límite de solicitudes alcanzado |
| 500 | Error interno |
| 502 | Fallo del proveedor o respuesta inválida |
| 504 | Tiempo de espera agotado |

Los errores generados por el backend utilizarán un objeto error con las propiedades code y message.

El frontend también gestionará fallos de red, respuestas no JSON y errores de validación sin interrumpir el funcionamiento del catálogo.

No se expondrán detalles internos del proveedor, credenciales ni trazas de ejecución.

## 10. Seguridad y consumo

- GEMINI_API_KEY permanecerá exclusivamente en AWS Lambda.
- La URL pública del backend podrá configurarse mediante VITE_MODO_AI_API_URL.
- Ninguna clave privada utilizará el prefijo VITE_.
- CORS permitirá únicamente el origen local autorizado y el sitio publicado en S3.
- CORS no constituye autenticación ni impide llamadas directas al endpoint.
- Lambda validará nuevamente las solicitudes.
- Tamaño máximo propuesto de solicitud: 16 KB.
- Concurrencia reservada de Lambda: 1.
- Tiempo máximo de ejecución de Lambda: 30 segundos.
- Tiempo máximo de espera de la llamada a Gemini: 20 segundos.
- No se realizarán reintentos automáticos.
- Se limitará el tamaño de las respuestas del proveedor.
- La API pública se considera un recurso de demostración académica y requiere controles adicionales de autenticación y consumo antes de un uso comercial.

La concurrencia reservada limita las ejecuciones simultáneas, pero no garantiza un límite diario de consumo.

## 11. Organización de archivos propuesta

- src/ai/ModoAI.tsx
- src/ai/aiSchemas.ts
- src/ai/aiService.ts
- src/ai/aiRules.ts
- backend/modo-ai/index.mjs
- docs/specs/modo-ai-integracion.md
- .env.example

El backend no formará parte de la carpeta dist del frontend.

## 12. Plan de verificación

- Solicitud válida con recomendaciones.
- Texto vacío o demasiado corto.
- Presupuesto sin experiencias compatibles.
- Exclusión de experiencias agotadas.
- Exclusión de experiencias con sesiones pasadas.
- Respuesta con identificadores inexistentes.
- Respuesta JSON inválida.
- Fallo de conexión o del proveedor.
- Comprobación de que el catálogo continúa funcionando ante errores.
- Verificación con ESLint y build de producción.
- Validación desde el sitio publicado en Amazon S3.

## 13. Limitaciones

- Las experiencias, precios, fechas y plazas corresponden a datos simulados.
- Las recomendaciones no constituyen reservas reales.
- El catálogo enviado desde el navegador no constituye una fuente de datos confiable para un entorno comercial.
- La disponibilidad de Gemini depende de las cuotas del proveedor.
- AWS Academy utiliza recursos y credenciales sujetos a las restricciones del laboratorio.
- El endpoint de alojamiento estático de S3 utiliza HTTP.
- CloudFront podrá incorporarse posteriormente para proporcionar HTTPS al frontend.

## 14. Estado

Contrato técnico propuesto para la tarea #63 de Agent Harness Kit.

Pendiente de implementación y verificación.

No se declaran pruebas de integración ejecutadas ni resultados de IA obtenidos en esta etapa.

## 15. Registro de revisión

El contrato técnico fue elaborado y revisado manualmente
con asistencia de ChatGPT debido a la falta de acceso a
Claude Code.

Se verificaron los siete criterios de aceptación de la
tarea #63, se ejecutó ESLint sin errores y se completó
satisfactoriamente el health check de Agent Harness Kit.

La implementación y las pruebas de integración quedan
pendientes para las siguientes tareas.