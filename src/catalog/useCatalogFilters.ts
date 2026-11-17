/*
 * useCatalogFilters.ts — Hook personalizado: los filtros del catálogo guardados en la URL.
 *
 * Para qué sirve: que los filtros se conserven al recargar, al compartir el enlace y con
 * Atrás/Adelante.
 * Responsabilidad: convertir la query string en un objeto CatalogFilters (y al revés) y
 * ofrecer updateFilters, clearFilters y hasActiveFilters.
 * Usa y se relaciona con: useSearchParams de React Router; CATEGORIES, ZONES y PAYMENT_MODES
 * (data/mockExperiences.ts) para validar valores; EMPTY_FILTERS y el tipo CatalogFilters
 * (catalogRules.ts). Lo usa CatalogPage.tsx, que pasa sus funciones a CatalogFilters.tsx.
 * Concepto React/TS: hook personalizado (función «use…» que llama a otros hooks); la URL
 * como fuente de verdad en lugar de useState; genéricos (pickKnown<T>) y Partial<T>.
 */
import { useSearchParams } from 'react-router'
import { CATEGORIES, PAYMENT_MODES, ZONES } from '../data/mockExperiences.ts'
import { EMPTY_FILTERS, type CatalogFilters } from './catalogRules.ts'

/**
 * Parámetros de la URL: ?q=&category=&zone=&available=1&payment=
 *
 * Decisión de historial:
 * - Texto de búsqueda: `replace: true` → escribir no crea una entrada de historial por tecla.
 * - Selects, casilla y «Limpiar filtros»: entrada nueva (push) → Atrás deshace ese filtro.
 */

function pickKnown<T extends string>(value: string | null, known: readonly { id: T }[]): T | null {
  // Valores no reconocidos en la URL (p. ej. ?zone=marte) se ignoran.
  return known.find((option) => option.id === value)?.id ?? null
}

/** URL → filtros. Lo que falta o no es válido queda como «sin filtro». */
function readFilters(params: URLSearchParams): CatalogFilters {
  return {
    q: params.get('q') ?? '',
    category: pickKnown(params.get('category'), CATEGORIES),
    zone: pickKnown(params.get('zone'), ZONES),
    onlyAvailable: params.get('available') === '1',
    paymentMode: pickKnown(params.get('payment'), PAYMENT_MODES),
  }
}

/** Filtros → URL. Solo se escriben los filtros activos, así la URL queda limpia. */
function toSearchParams(filters: CatalogFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.q !== '') params.set('q', filters.q)
  if (filters.category !== null) params.set('category', filters.category)
  if (filters.zone !== null) params.set('zone', filters.zone)
  if (filters.onlyAvailable) params.set('available', '1')
  if (filters.paymentMode !== null) params.set('payment', filters.paymentMode)
  return params
}

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  // Se recalcula en cada render a partir de la URL: no hay copia en useState.
  const filters = readFilters(searchParams)

  /** Aplica un cambio parcial con UNA sola llamada a setSearchParams. */
  function updateFilters(change: Partial<CatalogFilters>, options: { replace?: boolean } = {}) {
    setSearchParams(toSearchParams({ ...filters, ...change }), { replace: options.replace ?? false })
  }

  /** Vuelve a EMPTY_FILTERS creando una entrada nueva en el historial. */
  function clearFilters() {
    setSearchParams(toSearchParams(EMPTY_FILTERS))
  }

  // Decide si CatalogFilters muestra el botón «Limpiar filtros».
  const hasActiveFilters =
    filters.q.trim() !== '' ||
    filters.category !== null ||
    filters.zone !== null ||
    filters.onlyAvailable ||
    filters.paymentMode !== null

  return { filters, updateFilters, clearFilters, hasActiveFilters }
}
