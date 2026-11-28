/**
 * aiRules.ts — Reglas de recomendación de MODO AI.
 *
 * Responsabilidades:
 * - Obtener las experiencias elegibles del catálogo.
 * - Aplicar las restricciones del usuario.
 * - Preparar los datos enviados a AWS Lambda.
 * - Comprobar las recomendaciones recibidas.
 * - Reutilizar las reglas existentes del catálogo.
 */

import { mockExperiences } from '../data/mockExperiences.ts'

import {
  EMPTY_FILTERS,
  getCatalog,
  getCardPrice,
  getAvailableSeats,
  type CatalogItem,
} from '../catalog/catalogRules.ts'

import type {
  AIPreferences,
  AIExperience,
  AIRequest,
  AIResponse,
} from './aiSchemas.ts'

// Tipo utilizado para mostrar una recomendación en React.
export type AIRecommendationItem = {
  item: CatalogItem
  reason: string
}

// Obtiene experiencias disponibles según las preferencias.
export function getEligibleCatalogItems(
  preferences: AIPreferences,
  now: Date,
): CatalogItem[] {
  const items = getCatalog(
    mockExperiences,
    {
      ...EMPTY_FILTERS,
      zone: preferences.zone,
      onlyAvailable: true,
    },
    now,
  )

  // Aplica el presupuesto máximo por persona.
  return items.filter((item) => {
    const price = getCardPrice(item)

    return (
      preferences.maxBudget === null ||
      price <= preferences.maxBudget
    )
  })
}

// Reduce los datos del catálogo a los campos necesarios
// para generar recomendaciones.
export function toAIExperience(
  item: CatalogItem,
): AIExperience {
  const { experience, nextSession } = item

  return {
    id: experience.id,
    name: experience.name,
    description: experience.description,
    category: experience.category,
    zone: experience.zone,
    sector: experience.sector,
    durationMinutes: experience.durationMinutes,
    price: getCardPrice(item),
    startsAt: nextSession.startsAt,
    availableSeats: getAvailableSeats(nextSession),
  }
}

// Construye la solicitud que se enviará a AWS Lambda.
export function buildAIRequest(
  preferences: AIPreferences,
  now: Date,
): AIRequest {
  const items = getEligibleCatalogItems(
    preferences,
    now,
  )

  return {
    interests: preferences.interests.trim(),
    maxBudget: preferences.maxBudget,
    zone: preferences.zone,
    experiences: items.map(toAIExperience),
  }
}

// Relaciona las recomendaciones de Gemini con las
// experiencias originales del catálogo.
export function resolveRecommendations(
  response: AIResponse,
  request: AIRequest,
  now: Date,
): AIRecommendationItem[] {
  const eligibleItems = getEligibleCatalogItems(
    request,
    now,
  )

  const allowedIds = new Set(
    request.experiences.map((experience) => experience.id),
  )

  const receivedIds = new Set<string>()

  return response.recommendations.map((recommendation) => {
    if (
      !allowedIds.has(recommendation.experienceId) ||
      receivedIds.has(recommendation.experienceId)
    ) {
      throw new Error(
        'Se recibió una recomendación no válida.',
      )
    }

    receivedIds.add(recommendation.experienceId)

    const item = eligibleItems.find(
      (catalogItem) =>
        catalogItem.experience.id ===
        recommendation.experienceId,
    )

    if (!item) {
      throw new Error(
        'Una experiencia recomendada ya no está disponible. Inténtalo nuevamente.',
      )
    }

    return {
      item,
      reason: recommendation.reason,
    }
  })
}
