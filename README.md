# MODO · Experiencias en Quito

Proyecto académico del bootcamp Full Stack (React + TypeScript + Vite).

## MVP CU-01 · Explorar y consultar experiencias (MODO)

MVP de demostración del caso de uso CU-01 (`docs/use-cases/cu-01-explorar-consultar-experiencias.md`): catálogo público de experiencias en Quito con búsqueda, filtros combinables y detalle.

**Cómo ejecutarlo** (Node >= 22.22, pnpm 11):

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # comprobación de tipos + build de producción
pnpm lint
```

**Datos simulados (P17).** Todas las experiencias salen de `src/data/mockExperiences.ts`; no hay API, backend, autenticación, pagos ni reservas. Las fechas se generan relativas al día actual (hora de Quito) y las zonas y categorías son ilustrativas (preguntas abiertas de CU-01). La interfaz lo indica en el pie de página («Demostración con datos simulados»).

**Alcance incluido:** listado ordenado por la fecha disponible más próxima con las agotadas al final; las experiencias sin sesiones futuras se ocultan; búsqueda en nombre y descripción; filtros de categoría, zona, «Solo con plazas disponibles» y modalidad de pago, guardados en la URL (`?q=&category=&zone=&available=1&payment=`); estado vacío con «Limpiar filtros»; detalle en `/experiencias/:experienceId`; precio en USD por sesión (cada sesión tiene su precio: la tarjeta muestra el de la sesión cuya fecha muestra y el detalle el de cada sesión); botón «Reservar» que solo abre un aviso de que la reserva no está disponible en esta demostración.

**Formulario «Me interesa» (demostración):** en el detalle de una experiencia con plazas abre un formulario validado en el navegador con `@mantine/form` 9.4.1 y `zod` 4.4.3; muestra una confirmación local y no envía ni guarda ningún dato.

**Fuera de alcance:** filtros de fecha y rango de precios, sector como filtro, cambio de orden, registro y reservas (CU-02, CU-05, CU-06).

**Dependencias del MVP:** `react-router` 8.3.1 (rutas declarativas), `@mantine/core` / `@mantine/hooks` 9.4.1 (los dos modales: el aviso de reserva y el formulario demostrativo «Me interesa»), `@mantine/form` 9.4.1 (estado y validación del formulario) y `zod` 4.4.3 (esquema de validación, importado desde `zod/v4`).

**Identidad visual.** La interfaz usa el brand kit MODO v1.0: logo, isotipo y favicon copiados sin modificar en `public/brand/` y `public/favicon.svg`; los tokens de color, radios y foco viven como variables CSS al inicio de `src/index.css` (el Modal de Mantine usa el esquema oscuro con esas mismas variables). No se cargan fuentes externas (pila Satoshi → Inter → Helvetica Neue → Arial). Las imágenes de las experiencias son ilustraciones SVG locales (`public/images/experiences/`): faltan fotografías reales con permiso de uso.

## Plantilla original de Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
