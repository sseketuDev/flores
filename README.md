# Florería Valentina · Sitio web

Sitio estático (HTML + CSS + JS, sin dependencias). Para verlo, abre `index.html` o súbelo tal cual a cualquier hosting (Netlify, Vercel, GitHub Pages, cPanel…).

## Qué editar

| Quiero cambiar… | Archivo |
|---|---|
| Productos, precios, fotos, ocasiones, categorías | `js/data.js` |
| Datos de contacto, WhatsApp, horario, redes | `js/data.js` → `NEGOCIO` |
| Avisos de disponibilidad y elaboración artesanal | `js/data.js` → `AVISOS` |
| Franjas horarias, comunas, sugerencias de dedicatoria | `js/data.js` (al final) |
| Políticas (cambios, despachos, privacidad, términos) | `js/politicas.js` |
| Logo | reemplaza `img/logo.png` (vertical) y `img/logo-horizontal.png` (header) |
| Fotos | `img/productos/` (idealmente 4:5, ~900 px de alto, JPG) |
| Colores y tipografías | `css/styles.css` → bloque `:root` |

Precios: números sin puntos (`25000` = $25.000).

## Actualizar fotos, descripciones y precios de un arreglo

Todo está en `js/data.js`, un bloque por producto:

- **Foto:** guarda la imagen editada en `img/productos/` con el mismo nombre de archivo y se reemplaza sola. Si usas otro nombre, cámbialo en `fotos` (la primera es la principal).
- **Descripción:** `desc` es el texto corto de la tarjeta; `detalle` (opcional) es el texto completo que se muestra en la página del producto.
- **Precio:** `precio` y, si el arreglo tiene tamaños, el precio de cada uno en `tamanos`.

Al inicio de `js/data.js` hay una plantilla para copiar al agregar un producto nuevo.

## Políticas

Cada política tiene su propia dirección y está enlazada en el pie de página:

- `#/cambios-y-cancelaciones`
- `#/despachos`
- `#/politica-de-privacidad`
- `#/terminos-y-condiciones`

## Flujo
Tienda → carrito (persistente en el navegador) → formulario de entrega → pantalla de confirmación → WhatsApp (`wa.me/56932802792`) con el pedido ya redactado. No hay pago en línea.
