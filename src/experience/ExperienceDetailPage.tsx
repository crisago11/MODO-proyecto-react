/*
 * ExperienceDetailPage.tsx — Detalle de una experiencia ("/experiencias/:experienceId").
 *
 * Para qué sirve: muestra la información completa: descripción, qué incluye, fechas futuras
 * con plazas y precio por sesión, zona, duración, modalidad de pago y organizador.
 * Responsabilidad: buscar la experiencia por el id de la URL; si no existe o no tiene fechas
 * futuras, mostrar «Experiencia no encontrada»; si no está agotada, ofrecer «Reservar»
 * (solo abre un aviso) y «Me interesa» (abre un formulario de demostración que no envía nada).
 * Usa y se relaciona con: App.tsx (ruta); funciones de catalog/catalogRules.ts;
 * catalog/useNow.ts; data/mockExperiences.ts, ReserveNoticeModal.tsx e InterestFormModal.tsx. Lee el catalogSearch
 * que envía catalog/ExperienceCard.tsx para volver al catálogo con los mismos filtros.
 * Concepto React/TS: useParams (parámetro de ruta), useLocation().state, useState para abrir
 * y cerrar cada modal, return temprano para el caso sin datos y estrechamiento de `unknown`.
 */
import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import {
  findPublicExperience,
  formatDuration,
  formatPrice,
  formatSessionDate,
  formatSessionTime,
  getAvailableSeats,
  getCategoryLabel,
  getFutureSessions,
  getPaymentModeLabel,
  getZoneLabel,
  isSoldOut,
} from '../catalog/catalogRules.ts'
import { useNow } from '../catalog/useNow.ts'
import { mockExperiences } from '../data/mockExperiences.ts'
import { ReserveNoticeModal } from './ReserveNoticeModal.tsx'
import { InterestFormModal } from './InterestFormModal.tsx'

/** Lee con seguridad el `state` de navegación: es `unknown` y falta si se abre la URL directamente. */
function readCatalogSearch(state: unknown): string {
  if (typeof state === 'object' && state !== null && 'catalogSearch' in state) {
    const value = (state as { catalogSearch: unknown }).catalogSearch
    if (typeof value === 'string') return value
  }
  return ''
}

export function ExperienceDetailPage() {
  const { experienceId } = useParams()
  const location = useLocation()
  // Volver al catálogo con los mismos filtros con los que se abrió el detalle.
  const backTo = { pathname: '/', search: readCatalogSearch(location.state) }

  const now = useNow()
  // Estado local: ¿está abierto el aviso de reserva?
  const [noticeOpened, setNoticeOpened] = useState(false)
  // Estado local: ¿está abierto el formulario demostrativo «Me interesa»?
  const [interestOpened, setInterestOpened] = useState(false)
  const experience = findPublicExperience(mockExperiences, experienceId, now)

  if (experience === undefined) {
    return (
      <section className="message-panel">
        <h1>Experiencia no encontrada</h1>
        <p>La experiencia que buscas no existe o ya no tiene fechas disponibles.</p>
        <Link to={backTo} className="button button--primary">
          Ir al catálogo
        </Link>
      </section>
    )
  }

  const futureSessions = getFutureSessions(experience, now)
  const soldOut = isSoldOut(experience, now)

  return (
    <article className="detail">
      <Link to={backTo} className="back-link">
        ← Volver al catálogo
      </Link>

      <div className="detail__layout">
        <div className="detail__main">
          <img className="detail__image" src={experience.imageUrl} alt={`Imagen ilustrativa: ${experience.name}`} width={800} height={500} />
          <p className="card__eyebrow">{getCategoryLabel(experience.category)}</p>
          <h1 className="detail__title">{experience.name}</h1>
          <p className="detail__description">{experience.description}</p>

          <h2 className="section-title">Qué incluye</h2>
          <ul className="includes-list">
            {experience.includes.map((included) => (
              <li key={included}>{included}</li>
            ))}
          </ul>

          <h2 className="section-title">Fechas y horarios</h2>
          <ul className="session-list">
            {futureSessions.map((session) => {
              const seats = getAvailableSeats(session)
              return (
                <li key={session.id} className="session">
                  <span className="session__date">{formatSessionDate(session.startsAt)}</span>
                  <span className="session__time">{formatSessionTime(session.startsAt)}</span>
                  {seats > 0 ? (
                    <span className="session__seats">
                      {seats === 1 ? '1 plaza disponible' : `${seats} plazas disponibles`}
                    </span>
                  ) : (
                    <span className="badge badge--sold-out">Agotado</span>
                  )}
                  {/* RF2-18: cada sesión tiene su propio precio en USD (no hay precio único de experiencia). */}
                  <span className="session__price">
                    {formatPrice(session.price)} <span>por persona</span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <aside className="detail__aside" aria-label="Resumen de la experiencia">
          <dl className="facts">
            <div>
              <dt>Zona y sector</dt>
              <dd>
                {getZoneLabel(experience.zone)} · {experience.sector}
              </dd>
            </div>
            <div>
              <dt>Duración</dt>
              <dd>{formatDuration(experience.durationMinutes)}</dd>
            </div>
            <div>
              <dt>Modalidad de pago</dt>
              <dd>{getPaymentModeLabel(experience.paymentMode)}</dd>
            </div>
            <div>
              <dt>Organiza</dt>
              <dd>{experience.organizer}</dd>
            </div>
          </dl>
          {soldOut ? (
            // CA6: experiencia agotada → sin botón «Reservar».
            <p className="badge badge--sold-out badge--block">Agotado</p>
          ) : (
            <>
              <button type="button" className="button button--primary button--block" onClick={() => setNoticeOpened(true)}>
                Reservar
              </button>
              {/* Formulario de demostración: valida en local, no envía ni guarda datos. */}
              <button type="button" className="button button--ghost button--block" onClick={() => setInterestOpened(true)}>
                Me interesa
              </button>
            </>
          )}
        </aside>
      </div>

      <ReserveNoticeModal opened={noticeOpened} onClose={() => setNoticeOpened(false)} />
      <InterestFormModal
        opened={interestOpened}
        onClose={() => setInterestOpened(false)}
        experienceName={experience.name}
      />
    </article>
  )
}
