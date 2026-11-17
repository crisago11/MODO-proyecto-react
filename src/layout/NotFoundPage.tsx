/*
 * NotFoundPage.tsx — Página «no encontrada».
 *
 * Para qué sirve: se muestra cuando la URL no coincide con ninguna ruta de MODO.
 * Responsabilidad: avisar al usuario y ofrecer un enlace de vuelta al catálogo ("/").
 * Usa y se relaciona con: App.tsx (ruta path="*"); se pinta dentro de PublicLayout.tsx.
 * Concepto React: componente de función sin props ni estado; enlace interno con <Link>.
 */
import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="message-panel">
      <h1>Página no encontrada</h1>
      <p>La dirección que has abierto no existe en MODO.</p>
      <Link to="/" className="button button--primary">
        Ir al catálogo
      </Link>
    </section>
  )
}
