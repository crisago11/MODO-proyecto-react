/*
 * PublicLayout.tsx — Marco común de las páginas públicas.
 *
 * Para qué sirve: pinta la cabecera con el logo de MODO, el pie de página y, en medio,
 * la página que corresponde a la URL.
 * Responsabilidad: solo estructura visual compartida (header, main, footer); sin estado ni datos.
 * Usa y se relaciona con: App.tsx lo usa como ruta layout; en su <Outlet /> aparecen
 * catalog/CatalogPage.tsx, experience/ExperienceDetailPage.tsx o NotFoundPage.tsx.
 * El logo es public/brand/modo-logo-color.svg.
 * Concepto React: layout de rutas con <Outlet /> y navegación con <Link> (cambia de página
 * sin recargar el navegador).
 */
import { Link, Outlet } from 'react-router'

export function PublicLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container site-header__inner">
          {/* Logo oficial del brand kit MODO (versión color, sin tagline en el header). */}
        <Link to="/" className="brand" aria-label="MODO, ir al catálogo">
          <img src="/brand/modo-logo-color.svg" alt="MODO" width={346} height={70} className="brand__logo" />
          <span className="brand__version">v2.0</span>
        </Link>
          <p className="site-header__tagline">Experiencias en Quito</p>
        </div>
      </header>
      <main className="container site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          <p className="site-footer__tagline">Experiencias que te mueven</p>
          <p>MODO · Proyecto académico del bootcamp Full Stack. Demostración con datos simulados.</p>
        </div>
      </footer>
    </div>
  )
}
