/*
 * CatalogPage.tsx — Página principal: catálogo de experiencias (CU-01).
 *
 * Responsabilidades:
 * - Mostrar la presentación de MODO.
 * - Integrar el recomendador inteligente MODO AI.
 * - Gestionar los filtros del catálogo.
 * - Mostrar las experiencias disponibles.
 *
 * El recomendador funciona independientemente de los filtros
 * tradicionales y reutiliza las reglas existentes del catálogo.
 */

import { useLocation } from 'react-router'
import { mockExperiences } from '../data/mockExperiences.ts'
import { CatalogFilters } from './CatalogFilters.tsx'
import { ExperienceCard } from './ExperienceCard.tsx'
import { getCatalog } from './catalogRules.ts'
import { useCatalogFilters } from './useCatalogFilters.ts'
import { useNow } from './useNow.ts'

// Integración del recomendador inteligente.
import { ModoAI } from '../ai/ModoAI.tsx'

export function CatalogPage() {
  const {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  } = useCatalogFilters()

  const location = useLocation()
  const now = useNow()

  // Calcula el catálogo a partir de los filtros actuales.
  const items = getCatalog(mockExperiences, filters, now)

  return (
    <>
      <section className="catalog-intro">
        <p className="catalog-intro__eyebrow">
          ¿En qué MODO estás hoy?
        </p>

        <h1 className="catalog-intro__title">
          Descubre Quito a tu manera.
        </h1>

        <p className="catalog-intro__lead">
          Descubre talleres, recorridos y actividades en el
          Distrito Metropolitano de Quito.
        </p>
      </section>

      {/* Nuevo recomendador de inteligencia artificial. */}
      <ModoAI
        catalogSearch={location.search}
        now={now}
      />

     {/* Filtros tradicionales del catálogo. */}
      <h2 className="catalog-section-title">
        Explora todas las experiencias
      </h2>

      <CatalogFilters
        filters={filters}
        onChange={updateFilters}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <p className="results-count" aria-live="polite">
        {items.length === 1
          ? '1 experiencia'
          : `${items.length} experiencias`}
      </p>

      {items.length === 0 ? (
        <section className="message-panel">
          <img
            src="/brand/modo-symbol-color.svg"
            alt=""
            width={100}
            height={70}
            className="message-panel__symbol"
          />

          <h2>No hay experiencias que coincidan</h2>

          <p>
            Prueba con otro texto de búsqueda o cambia los filtros.
          </p>

          <button
            type="button"
            className="button button--primary"
            onClick={clearFilters}
          >
            Limpiar filtros
          </button>
        </section>
      ) : (
        <ul className="card-grid">
          {items.map((item) => (
            <li key={item.experience.id}>
              <ExperienceCard
                item={item}
                catalogSearch={location.search}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
