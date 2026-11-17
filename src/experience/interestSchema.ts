/*
 * interestSchema.ts — Reglas de validación del formulario demostrativo «Me interesa».
 *
 * Para qué sirve: describe con Zod qué datos son válidos (nombre, correo y plazas de interés)
 * y qué mensaje en español se muestra cuando no lo son.
 * Responsabilidad: solo validar; no guarda ni envía nada. El esquema no modifica los valores
 * que recibe el formulario (Mantine solo usa los errores).
 * Usa y se relaciona con: zod ('zod/v4'); lo consume experience/InterestFormModal.tsx a través
 * de schemaResolver de @mantine/form.
 * Concepto TS: el tipo InterestValues se deduce del esquema con z.infer, así el tipo y las
 * reglas no pueden desincronizarse.
 */
import { z } from 'zod/v4'

/*
 * Opciones del selector de plazas. Se guardan como texto porque un <select> siempre entrega
 * texto. El límite 1–4 es una decisión de interfaz de esta demo, no una regla de MODO.
 */
export const SEAT_OPTIONS = ['1', '2', '3', '4'] as const

/** Esquema del formulario: cada campo con su mensaje de error en español. */
export const interestSchema = z.object({
  name: z.string().trim().min(1, { error: 'Escribe tu nombre.' }),
  email: z
    .string()
    .trim()
    .min(1, { error: 'Escribe tu correo electrónico.' })
    // pipe: solo si no está vacío se comprueba el formato (dos mensajes distintos).
    .pipe(z.email({ error: 'Escribe un correo con un formato válido (ej.: nombre@correo.com).' })),
  seats: z.enum(SEAT_OPTIONS, { error: 'Elige entre 1 y 4 plazas.' }),
})

/** Valores del formulario: { name: string; email: string; seats: '1' | '2' | '3' | '4' }. */
export type InterestValues = z.infer<typeof interestSchema>
