/**
 * aiService.ts — Servicio de comunicación de MODO AI.
 *
 * Responsabilidades:
 * - Enviar solicitudes HTTP a AWS Lambda.
 * - Validar los datos antes de enviarlos.
 * - Validar las respuestas recibidas.
 * - Gestionar errores de conexión y del backend.
 * - Controlar el tiempo máximo de espera.
 *
 * Las credenciales de Gemini permanecen en AWS Lambda.
 */

import {
  aiRequestSchema,
  aiResponseSchema,
  aiErrorSchema,
  type AIRequest,
  type AIResponse,
} from './aiSchemas.ts'

const REQUEST_TIMEOUT = 25000

// Obtiene la URL pública del backend.
const API_URL = import.meta.env.VITE_MODO_AI_API_URL

// Error personalizado del servicio de inteligencia artificial.
export class AIServiceError extends Error {
  readonly code: string
  readonly status: number | null

  constructor(
    message: string,
    code: string,
    status: number | null = null,
  ) {
    super(message)

    this.name = 'AIServiceError'
    this.code = code
    this.status = status
  }
}

// Solicita recomendaciones personalizadas al backend.
export async function requestRecommendations(
  request: AIRequest,
): Promise<AIResponse> {
  // Valida la solicitud antes de enviarla.
  const validation = aiRequestSchema.safeParse(request)

  if (!validation.success) {
    throw new AIServiceError(
      'Los datos de la solicitud no son válidos.',
      'VALIDATION_ERROR',
    )
  }

  // Evita llamadas innecesarias si no existen experiencias.
  if (validation.data.experiences.length === 0) {
    return {
      recommendations: [],
    }
  }

  // Comprueba que la URL del backend esté configurada.
  if (!API_URL) {
    throw new AIServiceError(
      'El servicio MODO AI todavía no está configurado.',
      'CONFIGURATION_ERROR',
    )
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(validation.data),

      signal: AbortSignal.timeout(REQUEST_TIMEOUT),
    })

    // Intenta interpretar la respuesta como JSON.
    let payload: unknown

    try {
      payload = await response.json()
    } catch (error) {
      if (
        error instanceof Error &&
        (
          error.name === 'TimeoutError' ||
          error.name === 'AbortError'
        )
      ) {
        throw error
      }

      throw new AIServiceError(
        'El servicio devolvió una respuesta no válida.',
        'INVALID_RESPONSE',
        response.status,
      )
    }

    // Gestiona los errores HTTP.
    if (!response.ok) {
      const parsedError = aiErrorSchema.safeParse(payload)

      if (parsedError.success) {
        throw new AIServiceError(
          parsedError.data.error.message,
          parsedError.data.error.code,
          response.status,
        )
      }

      if (response.status === 403) {
        throw new AIServiceError(
          'El servicio de inteligencia artificial no está disponible públicamente.',
          'ACCESS_DENIED',
          403,
        )
      }

      if (response.status === 429) {
        throw new AIServiceError(
          'Se alcanzó el límite de solicitudes. Inténtalo más tarde.',
          'RATE_LIMIT',
          429,
        )
      }

      throw new AIServiceError(
        'No se pudieron generar recomendaciones.',
        'HTTP_ERROR',
        response.status,
      )
    }

    // Valida la estructura de las recomendaciones.
    const parsedResponse = aiResponseSchema.safeParse(payload)

    if (!parsedResponse.success) {
      throw new AIServiceError(
        'Las recomendaciones recibidas no son válidas.',
        'INVALID_AI_RESPONSE',
        response.status,
      )
    }

    // Devuelve únicamente los datos validados.
    return parsedResponse.data
  } catch (error) {
    // Conserva los errores controlados del servicio.
    if (error instanceof AIServiceError) {
      throw error
    }

    // Gestiona el tiempo máximo de espera.
    if (
      error instanceof Error &&
      (
        error.name === 'TimeoutError' ||
        error.name === 'AbortError'
      )
    ) {
      throw new AIServiceError(
        'El servicio tardó demasiado en responder. Inténtalo nuevamente.',
        'REQUEST_TIMEOUT',
      )
    }

    // Gestiona problemas de red o conexión.
    throw new AIServiceError(
      'No se pudo conectar con MODO AI. Inténtalo nuevamente.',
      'NETWORK_ERROR',
    )
  }
}
