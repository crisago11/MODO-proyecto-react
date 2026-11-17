/*
 * useNow.ts — Hook personalizado que da el instante actual (`now`) a las páginas.
 *
 * Para qué sirve: decidir qué sesiones son futuras con una hora fija mientras la página
 * está montada.
 * Responsabilidad: leer el reloj una sola vez y devolver siempre esa misma fecha.
 * Usa y se relaciona con: useState de React. Lo usan CatalogPage.tsx y
 * experience/ExperienceDetailPage.tsx, que pasan `now` a las funciones de catalogRules.ts.
 * Concepto React: inicializador perezoso de useState (`useState(() => ...)`): la función
 * solo se ejecuta en el primer render.
 */
import { useState } from 'react'

/** Devuelve la fecha fijada en el primer render; no se actualiza sola (no hay temporizador). */
export function useNow(): Date {
  const [now] = useState(() => new Date())
  return now
}
