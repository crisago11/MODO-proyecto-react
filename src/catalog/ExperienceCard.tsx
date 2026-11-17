/*
 * ExperienceCard.tsx — Tarjeta de una experiencia en el catálogo.
 *
 * Para qué sirve: resume una experiencia: imagen, disponibilidad, categoría, nombre (enlace
 * al detalle), zona y sector, próxima fecha, precio y modalidad de pago.
 * Responsabilidad: solo presentar un CatalogItem ya calculado; no decide ninguna regla.
 * Usa y se relaciona con: CatalogPage.tsx la pinta por cada elemento del listado. Usa el
 * tipo CatalogItem y las funciones de etiquetas, formato y precio de catalogRules.ts. Su
 * <Link> abre experience/ExperienceDetailPage.tsx y envía catalogSearch en el `state`.
 * Concepto React/TS: props tipadas y desestructuradas, clase CSS condicional y `state` de
 * navegación de React Router para pasar datos a otra página sin ponerlos en la URL.
 */
import { Link } from 'react-router'
import {
  formatPrice,
  formatSessionDate,
  formatSessionTime,
  getCardPrice,
  getCategoryLabel,
  getPaymentModeLabel,
  getZoneLabel,
  type CatalogItem,
} from './catalogRules.ts'

type ExperienceCardProps = {
  item: CatalogItem
  /** Búsqueda actual (?q=...) para que el detalle pueda volver al catálogo con los mismos filtros. */
  catalogSearch: string
}

export function ExperienceCard({ item, catalogSearch }: ExperienceCardProps) {
  const { experience, nextSession, soldOut } = item

  return (
    <article className={soldOut ? 'card card--sold-out' : 'card'}>
      <div className="card__media">
        <img src={experience.imageUrl} alt="" loading="lazy" width={800} height={500} />
        {/* Disponibilidad visible sobre la imagen; solo usa el valor soldOut ya calculado por catalogRules. */}
        {soldOut ? (
          <span className="badge badge--sold-out card__badge">Agotado</span>
        ) : (
          <span className="badge badge--available card__badge">Plazas disponibles</span>
        )}
      </div>
      <div className="card__body">
        <p className="card__eyebrow">{getCategoryLabel(experience.category)}</p>
        <h2 className="card__title">
          <Link
            to={`/experiencias/${experience.id}`}
            state={{ catalogSearch }}
            className="card__link"
          >
            {experience.name}
          </Link>
        </h2>
        <p className="card__meta">
          {getZoneLabel(experience.zone)} · {experience.sector}
        </p>
        <p className="card__meta">
          <span className="visually-hidden">Próxima fecha: </span>
          {formatSessionDate(nextSession.startsAt)}, {formatSessionTime(nextSession.startsAt)}
        </p>
        <div className="card__footer">
          <span className="card__price">
            <span className="visually-hidden">Precio por persona de esta fecha: </span>
            {formatPrice(getCardPrice(item))}
          </span>
          <span className="tag">{getPaymentModeLabel(experience.paymentMode)}</span>
        </div>
      </div>
    </article>
  )
}
