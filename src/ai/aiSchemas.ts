/**
 * aiSchemas.ts — Esquemas de validación de MODO AI.
 *
 * Responsabilidades:
 * - Validar las preferencias del usuario.
 * - Validar las experiencias enviadas al backend.
 * - Validar las recomendaciones recibidas de Gemini.
 * - Derivar tipos de TypeScript mediante Zod.
 */

import { z } from 'zod/v4'

// Zonas y categorías existentes en el catálogo de MODO.
export const aiZoneSchema = z.enum([
  'north',
  'center',
  'south',
  'valleys',
])

export const aiCategorySchema = z.enum([
  'gastronomy',
  'culture',
  'nature',
  'arts',
])

// Valida las preferencias introducidas por el usuario.
export const aiPreferencesSchema = z.object({
  interests: z
    .string()
    .trim()
    .min(10, {
      error: 'Describe tus intereses con al menos 10 caracteres.',
    })
    .max(500, {
      error: 'La descripción no puede superar los 500 caracteres.',
    }),

  maxBudget: z
    .number()
    .positive({
      error: 'El presupuesto debe ser mayor que cero.',
    })
    .max(1000, {
      error: 'El presupuesto máximo permitido es de 1000 USD.',
    })
    .nullable(),

  zone: aiZoneSchema.nullable(),
})

// Valida cada experiencia enviada a AWS Lambda.
export const aiExperienceSchema = z.object({
  id: z.string().trim().min(1).max(100),

  name: z.string().trim().min(1).max(150),

  description: z.string().trim().min(1).max(1000),

  category: aiCategorySchema,

  zone: aiZoneSchema,

  sector: z.string().trim().min(1).max(100),

  durationMinutes: z.number().int().positive().max(1440),

  price: z.number().nonnegative().max(10000),

  startsAt: z.iso.datetime({ offset: true }),

  availableSeats: z.number().int().positive().max(10000),
})

// Valida la solicitud completa antes de enviarla al backend.
export const aiRequestSchema = aiPreferencesSchema.extend({
  experiences: z
    .array(aiExperienceSchema)
    .max(7)
    .refine(
      (experiences) =>
        new Set(experiences.map((item) => item.id)).size ===
        experiences.length,
      {
        error: 'No se permiten experiencias duplicadas.',
      },
    ),
})

// Valida cada recomendación generada por Gemini.
export const aiRecommendationSchema = z.object({
  experienceId: z.string().trim().min(1).max(100),

  reason: z
    .string()
    .trim()
    .min(1)
    .max(300),
})

// Valida la respuesta completa del backend.
export const aiResponseSchema = z.object({
  recommendations: z
    .array(aiRecommendationSchema)
    .max(3)
    .refine(
      (recommendations) =>
        new Set(
          recommendations.map((item) => item.experienceId),
        ).size === recommendations.length,
      {
        error: 'No se permiten recomendaciones duplicadas.',
      },
    ),
})

// Valida los errores controlados del backend.
export const aiErrorSchema = z.object({
  error: z.object({
    code: z.string().min(1),
    message: z.string().min(1),
  }),
})

// Tipos de TypeScript derivados de los esquemas de Zod.
export type AIPreferences = z.infer<typeof aiPreferencesSchema>

export type AIExperience = z.infer<typeof aiExperienceSchema>

export type AIRequest = z.infer<typeof aiRequestSchema>

export type AIRecommendation = z.infer<
  typeof aiRecommendationSchema
>

export type AIResponse = z.infer<typeof aiResponseSchema>

export type AIError = z.infer<typeof aiErrorSchema>
