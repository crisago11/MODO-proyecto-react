/*
 * CatalogPage.tsx — Página principal: catálogo de experiencias (CU-01).
 *
 * Para qué sirve: es la portada de MODO ("/"): presentación, filtros y tarjetas.
 * Responsabilidad: juntar las piezas. Lee los filtros (useCatalogFilters) y el instante
 * actual (useNow), calcula el listado con getCatalog y muestra las tarjetas o, si no hay
 * resultados, un mensaje con el botón «Limpiar filtros».
 * Usa y se relaciona con: data/mockExperiences.ts (datos), catalogRules.ts (getCatalog),
 * useCatalogFilters.ts, useNow.ts, CatalogFilters.tsx (formulario) y ExperienceCard.tsx
 * (tarjeta). App.tsx la asigna a la ruta índice.
 * Concepto React: componente contenedor que pasa datos y callbacks a sus hijos por props;
 * estado derivado (el listado se calcula en el render, sin useState ni useEffect);
 * renderizado condicional con ternario y listas con map + key.
 */
import { useLocation } from 'react-router'
import { mockExperiences } from '../data/mockExperiences.ts'
import { CatalogFilters } from './CatalogFilters.tsx'
import { ExperienceCard } from './ExperienceCard.tsx'
import { getCatalog } from './catalogRules.ts'
import { useCatalogFilters } from './useCatalogFilters.ts'
import { useNow } from './useNow.ts'

export function CatalogPage() {
  const { filters, updateFilters, clearFilters, hasActiveFilters } = useCatalogFilters()
  const location = useLocation()
  const now = useNow()

  // El listado se calcula en cada render a partir de los datos simulados, los filtros de la URL y el instante actual.
  const items = getCatalog(mockExperiences, filters, now)

  return (
    <>
      <section className="catalog-intro">
        <p className="catalog-intro__eyebrow">¿En qué MODO estás hoy?</p>
        <h1 className="catalog-intro__title">¿Qué te provoca hacer hoy?</h1>
        <p className="catalog-intro__lead">
          Descubre talleres, recorridos y actividades en el Distrito Metropolitano de Quito.
        </p>
      </section>

      <CatalogFilters
        filters={filters}
        onChange={updateFilters}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <p className="results-count" aria-live="polite">
        {items.length === 1 ? '1 experiencia' : `${items.length} experiencias`}
      </p>

      {items.length === 0 ? (
        <section className="message-panel">
          <img src="/brand/modo-symbol-color.svg" alt="" width={100} height={70} className="message-panel__symbol" />
          <h2>No hay experiencias que coincidan</h2>
          <p>Prueba con otro texto de búsqueda o cambia los filtros.</p>
          <button type="button" className="button button--primary" onClick={clearFilters}>
            Limpiar filtros
          </button>
        </section>
      ) : (
        <ul className="card-grid">
          {items.map((item) => (
            <li key={item.experience.id}>
              <ExperienceCard item={item} catalogSearch={location.search} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
