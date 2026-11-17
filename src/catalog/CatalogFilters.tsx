/*
 * CatalogFilters.tsx — Formulario de búsqueda y filtros del catálogo.
 *
 * Para qué sirve: permite buscar por texto y filtrar por categoría, zona, modalidad de pago
 * y «Solo con plazas disponibles».
 * Responsabilidad: mostrar los controles con los valores actuales y avisar al padre de cada
 * cambio. No filtra experiencias: eso lo hace getCatalog en catalogRules.ts.
 * Usa y se relaciona con: lo usa CatalogPage.tsx, que le pasa filters, onChange y onClear
 * desde useCatalogFilters.ts. Las opciones salen de CATEGORIES, ZONES y PAYMENT_MODES
 * (data/mockExperiences.ts) y el tipo de los filtros, de catalogRules.ts.
 * Concepto React/TS: componentes controlados (value + onChange), props tipadas, «levantar
 * el estado» al padre con callbacks y useState para un borrador local del texto.
 */
import { useState } from 'react'
import { useNavigationType } from 'react-router'
import { CATEGORIES, PAYMENT_MODES, ZONES } from '../data/mockExperiences.ts'
import type { CatalogFilters as Filters } from './catalogRules.ts'

/** Props: el padre (CatalogPage) envía los filtros actuales y recibe los cambios por callbacks. */
type CatalogFiltersProps = {
  filters: Filters
  onChange: (change: Partial<Filters>, options?: { replace?: boolean }) => void
  onClear: () => void
  hasActiveFilters: boolean
}

export function CatalogFilters({ filters, onChange, onClear, hasActiveFilters }: CatalogFiltersProps) {
  // Borrador local del texto para que la escritura sea fluida: la URL se actualiza
  // en una transición y, si el input leyera directamente la URL, se perderían teclas.
  // Si la URL cambia desde fuera (Atrás/Adelante = POP, «Limpiar filtros» = PUSH),
  // el borrador se ajusta durante el render (patrón de React «ajustar estado cuando
  // cambia una prop»), sin useEffect. Los cambios propios de la caja usan REPLACE y no
  // pisan el borrador.
  const navigationType = useNavigationType()
  const [draftQuery, setDraftQuery] = useState(filters.q)
  const [lastUrlQuery, setLastUrlQuery] = useState(filters.q)
  if (filters.q !== lastUrlQuery) {
    setLastUrlQuery(filters.q)
    if (navigationType !== 'REPLACE') setDraftQuery(filters.q)
  }

  // En los select, «Todas» (valor vacío) o un valor desconocido se convierte en null (= sin filtro).
  return (
    <form className="filters" role="search" aria-label="Buscar y filtrar experiencias" onSubmit={(event) => event.preventDefault()}>
      <div className="field field--search">
        <label htmlFor="filter-q">Buscar</label>
        <input
          id="filter-q"
          type="search"
          placeholder="Ej.: cacao, centro histórico…"
          value={draftQuery}
          onChange={(event) => {
            setDraftQuery(event.target.value)
            onChange({ q: event.target.value }, { replace: true })
          }}
        />
      </div>

      <div className="field">
        <label htmlFor="filter-category">Categoría</label>
        <select
          id="filter-category"
          value={filters.category ?? ''}
          onChange={(event) => onChange({ category: CATEGORIES.find((c) => c.id === event.target.value)?.id ?? null })}
        >
          <option value="">Todas</option>
          {CATEGORIES.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="filter-zone">Zona</label>
        <select
          id="filter-zone"
          value={filters.zone ?? ''}
          onChange={(event) => onChange({ zone: ZONES.find((z) => z.id === event.target.value)?.id ?? null })}
        >
          <option value="">Todas</option>
          {ZONES.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="filter-payment">Modalidad de pago</label>
        <select
          id="filter-payment"
          value={filters.paymentMode ?? ''}
          onChange={(event) =>
            onChange({ paymentMode: PAYMENT_MODES.find((m) => m.id === event.target.value)?.id ?? null })
          }
        >
          <option value="">Todas</option>
          {PAYMENT_MODES.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field field--checkbox">
        <input
          id="filter-available"
          type="checkbox"
          checked={filters.onlyAvailable}
          onChange={(event) => onChange({ onlyAvailable: event.target.checked })}
        />
        <label htmlFor="filter-available">Solo con plazas disponibles</label>
      </div>

      {hasActiveFilters && (
        <button type="button" className="button button--ghost filters__clear" onClick={onClear}>
          Limpiar filtros
        </button>
      )}
    </form>
  )
}
