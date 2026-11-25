/*
 * App.tsx — Mapa de rutas de MODO.
 *
 * Para qué sirve: decide qué página se ve según la URL del navegador.
 * Responsabilidad: declarar las rutas: "/" → catálogo, "/experiencias/:experienceId" →
 * detalle y cualquier otra dirección → página no encontrada. Todas comparten PublicLayout.
 * Usa y se relaciona con: layout/PublicLayout.tsx, catalog/CatalogPage.tsx,
 * experience/ExperienceDetailPage.tsx y layout/NotFoundPage.tsx. Lo monta main.tsx.
 * Concepto React: rutas declarativas con React Router. Una ruta padre sin `path` (layout)
 * pinta a sus rutas hijas dentro de su <Outlet />; `:experienceId` es un parámetro de URL.
 */
import { BrowserRouter, Route, Routes } from 'react-router'
import { CatalogPage } from './catalog/CatalogPage.tsx'
import { ExperienceDetailPage } from './experience/ExperienceDetailPage.tsx'
import { NotFoundPage } from './layout/NotFoundPage.tsx'
import { PublicLayout } from './layout/PublicLayout.tsx'

// Rutas declarativas (TD-06): BrowserRouter + Routes + Route, sin loaders ni actions.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<CatalogPage />} />
          <Route path="experiencias/:experienceId" element={<ExperienceDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

// Error controlado para el taller de integración continua
export const pruebaCI: number = 123;