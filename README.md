# Florería Valentina · Sitio web

Sitio estático (HTML + CSS + JS, sin dependencias). Para verlo, abre `index.html` o súbelo tal cual a cualquier hosting (Netlify, Vercel, GitHub Pages, cPanel…).

## Qué editar

| Quiero cambiar… | Archivo |
|---|---|
| Productos, precios, fotos, ocasiones, categorías | `js/data.js` |
| Datos de contacto, WhatsApp, horario, redes | `js/data.js` → `NEGOCIO` |
| Franjas horarias, comunas, sugerencias de dedicatoria | `js/data.js` (al final) |
| Logo | reemplaza `img/logo.png` (vertical) y `img/logo-horizontal.png` (header) |
| Fotos | `img/productos/` (idealmente 4:5, ~900 px de alto, JPG) |
| Colores y tipografías | `css/styles.css` → bloque `:root` |

Precios: números sin puntos (`25000` = $25.000).

## Flujo
Tienda → carrito (persistente en el navegador) → formulario de entrega → pantalla de confirmación → WhatsApp (`wa.me/56932802792`) con el pedido ya redactado. No hay pago en línea.
