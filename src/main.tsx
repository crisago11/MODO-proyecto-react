/*
 * main.tsx — Punto de entrada de la aplicación MODO.
 *
 * Para qué sirve: arranca React dentro del <div id="root"> de index.html.
 * Responsabilidad: montar <App /> envuelto en StrictMode y MantineProvider, y cargar los
 * estilos globales (primero los de Mantine y después ./index.css).
 * Usa y se relaciona con: App.tsx (las rutas). MantineProvider da el tema que necesita
 * el Modal de experience/ReserveNoticeModal.tsx.
 * Concepto React/TS: createRoot(...).render(...) monta el árbol de componentes; StrictMode
 * añade comprobaciones extra solo en desarrollo; el `!` de TypeScript afirma que
 * getElementById('root') no devuelve null.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
// Estilos de Mantine ANTES de los propios para que estos puedan sobrescribirlos.
import '@mantine/core/styles.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Tema oscuro de Mantine (Modal) alineado con la identidad MODO; los colores se ajustan en index.css. */}
    <MantineProvider defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>,
)
