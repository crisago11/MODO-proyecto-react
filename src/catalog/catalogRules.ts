/**
 * catalogRules.ts — Reglas del catálogo de CU-01 como funciones puras.
 *
 * Para qué sirve: reúne la lógica del MVP: sesiones futuras, experiencia agotada, búsqueda,
 * filtros, orden del listado, precio de la tarjeta y textos formateados (precio, fecha,
 * hora, duración).
 * Responsabilidad: calcular; no pinta nada ni guarda estado.
 * Las reglas que dependen del tiempo (getFutureSessions, isSoldOut, matchesFilters,
 * toCatalogItem, getCatalog, findPublicExperience) reciben el instante actual (`now`) como
 * parámetro: ninguna lee el reloj por su cuenta, así el resultado depende solo de sus argumentos.
 * Usa y se relaciona con: tipos y listas de data/mockExperiences.ts. La usan CatalogPage.tsx
 * (getCatalog), ExperienceCard.tsx (etiquetas, formato y precio), CatalogFilters.tsx y
 * useCatalogFilters.ts (tipo CatalogFilters, EMPTY_FILTERS) y
 * experience/ExperienceDetailPage.tsx (detalle).
 * Concepto TS: funciones puras (mismo resultado para los mismos argumentos), tipos exportados,
 * uniones con null para «sin filtro» y el type guard `item is CatalogItem`.
 */
import {
  CATEGORIES,
  PAYMENT_MODES,
  ZONES,
  type CategoryId,
  type Experience,
  type PaymentMode,
  type Session,
  type ZoneId,
} from '../data/mockExperiences.ts'

/** Filtros activos del catálogo (useCatalogFilters los lee de la URL). */
export type CatalogFilters = {
  /** Texto libre; cadena vacía = sin búsqueda. */
  q: string
  /** null = cualquier categoría. */
  category: CategoryId | null
  /** null = cualquier zona. */
  zone: ZoneId | null
  /** true = «Solo con plazas disponibles» (CA8). */
  onlyAvailable: boolean
  /** null = cualquier modalidad de pago. */
  paymentMode: PaymentMode | null
}

/** Sin ningún filtro: es lo que aplica «Limpiar filtros». */
export const EMPTY_FILTERS: CatalogFilters = {
  q: '',
  category: null,
  zone: null,
  onlyAvailable: false,
  paymentMode: null,
}

/** Lo que necesita una tarjeta: la experiencia, la sesión que representa y si está agotada. */
export type CatalogItem = {
  experience: Experience
  /** Sesión que se muestra como «próxima fecha»: la más próxima con plazas, o la más próxima si está agotada. */
  nextSession: Session
  soldOut: boolean
}

/** RF2-16: una sesión es futura mientras su hora de inicio sea posterior a `now`. Devuelve las futuras ordenadas por fecha. */
export function getFutureSessions(experience: Experience, now: Date): Session[] {
  const nowMs = now.getTime()
  return experience.sessions
    .filter((session) => new Date(session.startsAt).getTime() > nowMs)
    .toSorted((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
}

/** Plazas libres de una sesión (nunca negativas). */
export function getAvailableSeats(session: Session): number {
  return Math.max(0, session.capacity - session.bookedSeats)
}

/** RF2-07 / R3: agotada si NINGUNA sesión futura tiene plazas. Una sesión llena no basta. */
export function isSoldOut(experience: Experience, now: Date): boolean {
  return !getFutureSessions(experience, now).some((session) => getAvailableSeats(session) > 0)
}

/** Minúsculas y sin tildes: «Cumbayá» → «cumbaya». */
function normalizeText(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

/** R8: la búsqueda consulta nombre y descripción, sin distinguir mayúsculas ni tildes. */
export function matchesText(experience: Experience, query: string): boolean {
  const needle = normalizeText(query.trim())
  if (needle === '') return true
  return (
    normalizeText(experience.name).includes(needle) ||
    normalizeText(experience.description).includes(needle)
  )
}

/** R7: la experiencia debe cumplir TODOS los filtros activos a la vez; un filtro vacío no restringe. */
export function matchesFilters(experience: Experience, filters: CatalogFilters, now: Date): boolean {
  if (!matchesText(experience, filters.q)) return false
  if (filters.category !== null && experience.category !== filters.category) return false
  if (filters.zone !== null && experience.zone !== filters.zone) return false
  if (filters.paymentMode !== null && experience.paymentMode !== filters.paymentMode) return false
  if (filters.onlyAvailable && isSoldOut(experience, now)) return false
  return true
}

/**
 * Sesión que representa a la experiencia en la tarjeta (su fecha y su precio):
 * la primera sesión futura con plazas; si no hay ninguna (agotada), la primera futura.
 * Recibe las sesiones futuras ya ordenadas (getFutureSessions).
 */
export function getNextSession(futureSessions: Session[]): Session | undefined {
  return futureSessions.find((session) => getAvailableSeats(session) > 0) ?? futureSessions[0]
}

/**
 * Precio (USD) que muestra la tarjeta: el de la MISMA sesión cuya fecha muestra (item.nextSession).
 * No es un «desde» ni un mínimo. Ejemplo: Centro Histórico tiene una sesión llena a $20 y otra
 * con plazas a $25 → la tarjeta muestra la fecha de la segunda y $25.
 */
export function getCardPrice(item: CatalogItem): number {
  return item.nextSession.price
}

/** Construye el elemento de catálogo, o null si la experiencia no tiene sesiones futuras (R2, CA7). */
export function toCatalogItem(experience: Experience, now: Date): CatalogItem | null {
  const nextSession = getNextSession(getFutureSessions(experience, now))
  if (nextSession === undefined) return null
  return { experience, nextSession, soldOut: isSoldOut(experience, now) }
}

/**
 * Listado del catálogo:
 * 1) oculta las experiencias sin sesiones futuras (R2, CA7);
 * 2) aplica búsqueda y filtros de forma conjunta (R7, R8);
 * 3) ordena por la fecha disponible más próxima con las agotadas al final (R6, CA11, CA13).
 */
export function getCatalog(experiences: Experience[], filters: CatalogFilters, now: Date): CatalogItem[] {
  return experiences
    .map((experience) => toCatalogItem(experience, now))
    .filter((item): item is CatalogItem => item !== null)
    .filter((item) => matchesFilters(item.experience, filters, now))
    .toSorted((a, b) => {
      // Agotadas al final; dentro de cada grupo, primero la fecha más próxima.
      if (a.soldOut !== b.soldOut) return a.soldOut ? 1 : -1
      return new Date(a.nextSession.startsAt).getTime() - new Date(b.nextSession.startsAt).getTime()
    })
}

/** Experiencia pública por id: solo si existe y tiene sesiones futuras (R2). */
export function findPublicExperience(
  experiences: Experience[],
  experienceId: string | undefined,
  now: Date,
): Experience | undefined {
  const experience = experiences.find((item) => item.id === experienceId)
  if (experience === undefined) return undefined
  return getFutureSessions(experience, now).length > 0 ? experience : undefined
}

// ---------- Etiquetas y formato (textos visibles en español) ----------
// Las funciones get…Label convierten un id (p. ej. 'valleys') en su texto visible ('Valles').

export function getCategoryLabel(id: CategoryId): string {
  return CATEGORIES.find((category) => category.id === id)?.label ?? id
}

export function getZoneLabel(id: ZoneId): string {
  return ZONES.find((zone) => zone.id === id)?.label ?? id
}

export function getPaymentModeLabel(id: PaymentMode): string {
  return PAYMENT_MODES.find((mode) => mode.id === id)?.label ?? id
}

// Formateadores creados una sola vez, fuera de las funciones, con la zona horaria de Quito.
const QUITO_TIME_ZONE = 'America/Guayaquil'

const priceFormatter = new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD' })

const dateFormatter = new Intl.DateTimeFormat('es-EC', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: QUITO_TIME_ZONE,
})

const timeFormatter = new Intl.DateTimeFormat('es-EC', {
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: QUITO_TIME_ZONE,
})

/** RF2-13: precio de una sesión en dólares estadounidenses. 35 → «$35,00» (formato es-EC). */
export function formatPrice(price: number): string {
  return priceFormatter.format(price)
}

/** «sábado, 14 de noviembre» en hora de Quito. */
export function formatSessionDate(startsAt: string): string {
  return dateFormatter.format(new Date(startsAt))
}

/** «10:00» en hora de Quito. */
export function formatSessionTime(startsAt: string): string {
  return timeFormatter.format(new Date(startsAt))
}

/** 150 → «2 h 30 min». */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return `${rest} min`
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`
}
