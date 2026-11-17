/**
 * mockExperiences.ts — DATOS SIMULADOS — no provienen de ninguna API (P17).
 *
 * Este módulo es la ÚNICA fuente de datos del MVP de CU-01. No hay fetch,
 * backend, autenticación, pagos ni reservas. Las experiencias, organizadores,
 * precios y plazas son inventados para la demostración.
 *
 * Las zonas y las categorías son ILUSTRATIVAS: su clasificación definitiva
 * es una pregunta abierta de CU-01 (pendiente de validación).
 *
 * Las fechas se generan relativas al día actual (hora de Quito, UTC-05:00)
 * para que la demostración muestre siempre sesiones futuras y pasadas.
 *
 * Responsabilidad: definir los tipos (Experience, Session…), las listas de opciones
 * (CATEGORIES, ZONES, PAYMENT_MODES) y las experiencias de ejemplo.
 * Usa y se relaciona con: no importa nada. Lo importan catalog/catalogRules.ts,
 * catalog/useCatalogFilters.ts, catalog/CatalogFilters.tsx, catalog/CatalogPage.tsx y
 * experience/ExperienceDetailPage.tsx.
 * Concepto TS: `as const` + `(typeof LISTA)[number]['id']` derivan uniones de ids
 * ('north' | 'center' | …) a partir de los propios datos.
 */

/** Categorías ILUSTRATIVAS (pregunta abierta de CU-01: lista de categorías). */
export const CATEGORIES = [
  { id: 'gastronomy', label: 'Gastronomía' },
  { id: 'culture', label: 'Cultura y patrimonio' },
  { id: 'nature', label: 'Naturaleza y aventura' },
  { id: 'arts', label: 'Arte y talleres' },
] as const

/** Zonas ILUSTRATIVAS (pregunta abierta de CU-01: clasificación de zonas y sectores). */
export const ZONES = [
  { id: 'north', label: 'Norte' },
  { id: 'center', label: 'Centro' },
  { id: 'south', label: 'Sur' },
  { id: 'valleys', label: 'Valles' },
] as const

/** Modalidades de pago (solo informativas: este MVP no cobra nada). */
export const PAYMENT_MODES = [
  { id: 'online', label: 'Pago en línea' },
  { id: 'in-person', label: 'Pago presencial' },
] as const

// Tipos derivados de las listas: si se añade una opción, el tipo se actualiza solo.
export type CategoryId = (typeof CATEGORIES)[number]['id']
export type ZoneId = (typeof ZONES)[number]['id']
export type PaymentMode = (typeof PAYMENT_MODES)[number]['id']

/** Una fecha concreta de una experiencia, con aforo, plazas reservadas (simuladas) y precio. */
export type Session = {
  id: string
  /** ISO 8601 con desplazamiento de Quito, p. ej. 2026-11-14T10:00:00-05:00 */
  startsAt: string
  capacity: number
  bookedSeats: number
  /** Precio por persona de ESTA sesión en dólares estadounidenses (USD) (CU-03 R7, RF2-18). */
  price: number
}

/** Una experiencia publicada; sus sesiones pueden ser pasadas o futuras. */
export type Experience = {
  id: string
  name: string
  description: string
  category: CategoryId
  zone: ZoneId
  sector: string
  organizer: string
  imageUrl: string
  durationMinutes: number
  includes: string[]
  paymentMode: PaymentMode
  publishedAt: string
  sessions: Session[]
}

// Quito usa UTC-05:00 todo el año (sin horario de verano).
const QUITO_OFFSET_MS = -5 * 60 * 60 * 1000

/**
 * Devuelve una fecha ISO con desplazamiento -05:00 situada `daysFromToday`
 * días después del día actual en Quito, a la hora indicada.
 * Ejemplo: quitoDate(2, 10) → "2026-11-14T10:00:00-05:00" si hoy es 12/11/2026.
 */
function quitoDate(daysFromToday: number, hour: number, minute = 0): string {
  const quitoNow = new Date(Date.now() + QUITO_OFFSET_MS)
  const day = new Date(
    Date.UTC(quitoNow.getUTCFullYear(), quitoNow.getUTCMonth(), quitoNow.getUTCDate() + daysFromToday),
  )
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${day.getUTCFullYear()}-${pad(day.getUTCMonth() + 1)}-${pad(day.getUTCDate())}T${pad(hour)}:${pad(minute)}:00-05:00`
}

/** Las 7 experiencias de ejemplo: cada una ilustra un caso de las reglas (con plazas, agotada, solo pasadas…). */
export const mockExperiences: Experience[] = [
  {
    id: 'taller-chocolate-cacao-fino',
    name: 'Taller de chocolate de cacao fino',
    description:
      'Descubre el proceso del cacao fino de aroma ecuatoriano, desde la semilla hasta la tableta, y elabora tu propio chocolate artesanal.',
    category: 'gastronomy',
    zone: 'valleys',
    sector: 'Cumbayá',
    organizer: 'Cacao Vivo Cumbayá (simulado)',
    imageUrl: '/images/experiences/chocolate.webp',
    durationMinutes: 150,
    includes: ['Degustación de cacao fino', 'Materiales e ingredientes', 'Tableta de chocolate para llevar'],
    paymentMode: 'online',
    publishedAt: quitoDate(-20, 9),
    sessions: [
      { id: 'choc-past', startsAt: quitoDate(-1, 10), capacity: 12, bookedSeats: 10, price: 35 },
      { id: 'choc-1', startsAt: quitoDate(2, 10), capacity: 12, bookedSeats: 5, price: 35 },
      { id: 'choc-2', startsAt: quitoDate(9, 10), capacity: 12, bookedSeats: 0, price: 35 },
    ],
  },
  {
    id: 'recorrido-nocturno-centro-historico',
    name: 'Recorrido nocturno por el Centro Histórico',
    description:
      'Camina por plazas, iglesias y leyendas del Centro Histórico de Quito con una guía local al caer la noche.',
    category: 'culture',
    zone: 'center',
    sector: 'Centro Histórico',
    organizer: 'Leyendas de San Francisco (simulado)',
    imageUrl: '/images/experiences/centro-historico.webp',
    durationMinutes: 120,
    includes: ['Guía local', 'Bebida caliente tradicional'],
    paymentMode: 'in-person',
    publishedAt: quitoDate(-30, 9),
    // Una sesión llena y otra con plazas: la experiencia NO está agotada (RF2-07).
    // Precios distintos por sesión ($20 y $25): la tarjeta muestra $25, el precio de
    // la sesión con plazas cuya fecha muestra; el detalle muestra ambos.
    sessions: [
      { id: 'night-1', startsAt: quitoDate(1, 19), capacity: 15, bookedSeats: 15, price: 20 },
      { id: 'night-2', startsAt: quitoDate(4, 19), capacity: 15, bookedSeats: 6, price: 25 },
    ],
  },
  {
    id: 'ascenso-rucu-pichincha',
    name: 'Ascenso al Rucu Pichincha',
    description:
      'Caminata de alta montaña desde el TelefériQo hasta la cumbre del Rucu Pichincha con vistas a toda la ciudad.',
    category: 'nature',
    zone: 'center',
    sector: 'Cruz Loma',
    organizer: 'Andes Trekking Quito (simulado)',
    imageUrl: '/images/experiences/pichincha.webp',
    durationMinutes: 360,
    includes: ['Guía de montaña', 'Bastones de trekking', 'Refrigerio'],
    paymentMode: 'online',
    publishedAt: quitoDate(-15, 9),
    // Todas las sesiones futuras están completas: aparece como «Agotado» (R3, CA6).
    // La tarjeta muestra la primera sesión futura y su precio ($45).
    sessions: [
      { id: 'rucu-1', startsAt: quitoDate(3, 7), capacity: 10, bookedSeats: 10, price: 45 },
      { id: 'rucu-2', startsAt: quitoDate(10, 7), capacity: 10, bookedSeats: 10, price: 50 },
    ],
  },
  {
    id: 'ceramica-torno-principiantes',
    name: 'Cerámica en torno para principiantes',
    description:
      'Aprende a centrar el barro y a dar forma a tu primera pieza en el torno en un taller pequeño y tranquilo.',
    category: 'arts',
    zone: 'north',
    sector: 'La Floresta',
    organizer: 'Taller Barro y Fuego (simulado)',
    imageUrl: '/images/experiences/ceramica.webp',
    durationMinutes: 180,
    includes: ['Barro y herramientas', 'Delantal', 'Horneado de una pieza'],
    paymentMode: 'in-person',
    publishedAt: quitoDate(-5, 9),
    sessions: [{ id: 'clay-1', startsAt: quitoDate(5, 15), capacity: 8, bookedSeats: 3, price: 40 }],
  },
  {
    id: 'cata-cafe-altura',
    name: 'Cata de café de altura ecuatoriano',
    description:
      'Prueba cafés de distintas provincias del Ecuador y aprende a reconocer sus aromas con un barista profesional.',
    category: 'gastronomy',
    zone: 'north',
    sector: 'La Carolina',
    organizer: 'Tostadora Mitad del Grano (simulado)',
    imageUrl: '/images/experiences/cafe.webp',
    durationMinutes: 90,
    includes: ['Cata de cuatro cafés', 'Bolsa de café de 250 g'],
    paymentMode: 'online',
    publishedAt: quitoDate(-2, 9),
    sessions: [
      { id: 'coffee-1', startsAt: quitoDate(6, 17), capacity: 10, bookedSeats: 9, price: 22 },
      { id: 'coffee-2', startsAt: quitoDate(13, 17), capacity: 10, bookedSeats: 2, price: 22 },
    ],
  },
  {
    id: 'ruta-bicicleta-sur',
    name: 'Ruta en bicicleta por el sur de Quito',
    description:
      'Recorrido guiado en bicicleta por parques y ciclovías del sur de la ciudad, apto para todos los niveles.',
    category: 'nature',
    zone: 'south',
    sector: 'Quitumbe',
    organizer: 'Pedalea Sur (simulado)',
    imageUrl: '/images/experiences/bicicleta.webp',
    durationMinutes: 150,
    includes: ['Bicicleta y casco', 'Hidratación'],
    paymentMode: 'in-person',
    publishedAt: quitoDate(-10, 9),
    sessions: [{ id: 'bike-1', startsAt: quitoDate(7, 8), capacity: 20, bookedSeats: 4, price: 15 }],
  },
  {
    id: 'musica-andina-la-ronda',
    name: 'Música andina en vivo en La Ronda',
    description:
      'Velada de música andina con instrumentos tradicionales en una casa patrimonial de la calle La Ronda.',
    category: 'culture',
    zone: 'center',
    sector: 'La Ronda',
    organizer: 'Casa Cultural La Ronda (simulado)',
    imageUrl: '/images/experiences/musica-andina.webp',
    durationMinutes: 120,
    includes: ['Concierto', 'Canelazo de bienvenida'],
    paymentMode: 'online',
    publishedAt: quitoDate(-40, 9),
    // Solo sesiones pasadas: nunca aparece en el catálogo público (R2, CA7).
    sessions: [
      { id: 'music-1', startsAt: quitoDate(-10, 20), capacity: 30, bookedSeats: 22, price: 12 },
      { id: 'music-2', startsAt: quitoDate(-3, 20), capacity: 30, bookedSeats: 28, price: 12 },
    ],
  },
]
