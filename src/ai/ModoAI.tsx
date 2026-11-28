/**
 * ModoAI.tsx — Interfaz de recomendaciones inteligentes.
 *
 * Responsabilidades:
 * - Recoger las preferencias del usuario.
 * - Validar los datos mediante Zod.
 * - Solicitar recomendaciones al backend.
 * - Gestionar los estados de la interfaz.
 * - Mostrar las experiencias originales del catálogo.
 */

import { useRef, useState, type FormEvent } from 'react'

import { ZONES } from '../data/mockExperiences.ts'
import { ExperienceCard } from '../catalog/ExperienceCard.tsx'

import {
  aiPreferencesSchema,
  type AIRequest,
  type AIResponse,
} from './aiSchemas.ts'

import {
  buildAIRequest,
  resolveRecommendations,
} from './aiRules.ts'

import { requestRecommendations } from './aiService.ts'

type ModoAIProps = {
  catalogSearch: string
  now: Date
}

// Estados posibles del recomendador.
type AIState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'empty' }
  | {
      status: 'success'
      request: AIRequest
      response: AIResponse
    }
  | { status: 'error'; message: string }

export function ModoAI({
  catalogSearch,
  now,
}: ModoAIProps) {
  const [interests, setInterests] = useState('')
  const [budget, setBudget] = useState('')
  const [zone, setZone] = useState('')

  const [state, setState] = useState<AIState>({
    status: 'idle',
  })

  const submitting = useRef(false)
  const isLoading = state.status === 'loading'

  // Procesa el formulario al solicitar recomendaciones.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Evita solicitudes simultáneas desde el formulario.
    if (submitting.current) return

    const preferences = aiPreferencesSchema.safeParse({
      interests,
      maxBudget: budget.trim() === ''
        ? null
        : Number(budget),
      zone: zone === '' ? null : zone,
    })

    // Muestra errores sin consumir el servicio.
    if (!preferences.success) {
      setState({
        status: 'error',
        message:
          preferences.error.issues[0]?.message ??
          'Revisa los datos introducidos.',
      })

      return
    }

    submitting.current = true

    setState({ status: 'loading' })

    try {
      // Prepara únicamente experiencias elegibles.
      const request = buildAIRequest(
        preferences.data,
        new Date(),
      )

      // Evita consultar Gemini si no existen coincidencias.
      if (request.experiences.length === 0) {
        setState({ status: 'empty' })
        return
      }

      // Consulta el backend de AWS Lambda.
      const response = await requestRecommendations(request)

      // Comprueba los resultados contra el catálogo original.
      const recommendations = resolveRecommendations(
        response,
        request,
        new Date(),
      )

      if (recommendations.length === 0) {
        setState({ status: 'empty' })
        return
      }

      setState({
        status: 'success',
        request,
        response,
      })
    } catch (error) {
      setState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'No se pudieron generar recomendaciones.',
      })
    } finally {
      submitting.current = false
    }
  }

  // Restablece el formulario y sus resultados.
  function handleReset() {
    if (submitting.current) return

    setInterests('')
    setBudget('')
    setZone('')
    setState({ status: 'idle' })
  }

  // Deriva las recomendaciones desde el catálogo actual.
  // No duplica los datos de las experiencias en el estado.
  function renderRecommendations() {
    if (state.status !== 'success') return null

    try {
      const recommendations = resolveRecommendations(
        state.response,
        state.request,
        now,
      )

      return (
        <div className="modo-ai__results">
          <h3>Experiencias seleccionadas para ti</h3>

          <p className="modo-ai__results-description">
            Estas experiencias se ajustan a tus preferencias.
          </p>

          <ul className="card-grid modo-ai__results-grid">
            {recommendations.map(({ item, reason }) => (
              <li
                key={item.experience.id}
                className="modo-ai__recommendation"
              >
                <ExperienceCard
                  item={item}
                  catalogSearch={catalogSearch}
                />

                <div className="modo-ai__reason">
                  <strong>
                    ✦ ¿Por qué te la recomendamos?
                  </strong>

                  <p>{reason}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    } catch {
      return (
        <div className="modo-ai__message modo-ai__message--error" role="alert">
          La disponibilidad ha cambiado.
          Solicita nuevas recomendaciones.
        </div>
      )
    }
  }

  return (
    <section
      className="modo-ai"
      aria-labelledby="modo-ai-title"
      aria-busy={isLoading}
    >
      <div className="modo-ai__header">
        <span className="modo-ai__badge">
          ✦ MODO AI
        </span>

        <h2 id="modo-ai-title" className="modo-ai__title">
          Tu próximo plan empieza aquí.
        </h2>

        <p className="modo-ai__description">
          Cuéntanos qué te gusta y descubre experiencias
          en Quito seleccionadas especialmente para ti.
        </p>
      </div>

      <form
        className="modo-ai__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="modo-ai__field">
          <label htmlFor="ai-interests">
            ¿Qué te gustaría hacer?
          </label>

          <textarea
            id="ai-interests"
            value={interests}
            onChange={(event) =>
              setInterests(event.target.value)
            }
            placeholder="Por ejemplo: quiero aprender algo creativo y disfrutar de una tarde tranquila..."
            maxLength={500}
            rows={4}
            disabled={isLoading}
            required
            aria-describedby="ai-character-count"
          />

          <span
            id="ai-character-count"
            className="modo-ai__counter"
          >
            {interests.length}/500 caracteres
          </span>
        </div>

        <div className="modo-ai__preferences">
          <div className="modo-ai__field">
            <label htmlFor="ai-budget">
              Presupuesto máximo por persona (USD)
            </label>

            <input
              id="ai-budget"
              type="number"
              min="1"
              max="1000"
              step="any"
              placeholder="Sin límite"
              value={budget}
              onChange={(event) =>
                setBudget(event.target.value)
              }
              disabled={isLoading}
            />
          </div>

          <div className="modo-ai__field">
            <label htmlFor="ai-zone">
              Zona de preferencia
            </label>

            <select
              id="ai-zone"
              value={zone}
              onChange={(event) =>
                setZone(event.target.value)
              }
              disabled={isLoading}
            >
              <option value="">
                Cualquier zona
              </option>

              {ZONES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="modo-ai__actions">
          <button
            type="submit"
            className="button button--primary modo-ai__submit"
            disabled={isLoading}
          >
            {isLoading
              ? 'Buscando experiencias para ti...'
              : '✦ Encontrar experiencias para mí'}
          </button>

          <button
            type="button"
            className="modo-ai__reset"
            onClick={handleReset}
            disabled={isLoading}
          >
            Limpiar
          </button>
        </div>
      </form>

      <p className="modo-ai__provider">
        ✦ Potenciado por Google Gemini
      </p>

      {/* Estados del recomendador. */}
      <div aria-live="polite">
        {state.status === 'loading' && (
          <div
            className="modo-ai__message modo-ai__message--loading"
            role="status"
          >
            <span
              className="modo-ai__spinner"
              aria-hidden="true"
            />

            <p>
              Estamos analizando tus preferencias
              y buscando las mejores experiencias para ti.
            </p>
          </div>
        )}

        {state.status === 'empty' && (
          <div className="modo-ai__message modo-ai__message--empty">
            <strong>No encontramos coincidencias.</strong>

            <p>
              Prueba modificando tus intereses,
              presupuesto o zona de preferencia.
            </p>
          </div>
        )}

        {state.status === 'error' && (
          <div
            className="modo-ai__message modo-ai__message--error"
            role="alert"
          >
            <strong>
              No se pudo completar la solicitud.
            </strong>

            <p>{state.message}</p>
          </div>
        )}

        {renderRecommendations()}
      </div>
    </section>
  )
}
