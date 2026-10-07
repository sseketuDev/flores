/* =====================================================================
   FLORERÍA VALENTINA · DATOS DEL SITIO
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar para cambiar productos,
   precios, fotos, categorías, ocasiones o datos de contacto.

   · Precios: número entero en pesos, SIN puntos (25000 = $25.000).
   · Fotos: ruta a la imagen dentro de /img/productos. La primera foto
     es la principal; las siguientes aparecen en la galería del detalle.
   · ocasiones: categorías principales en las que aparece el producto, con
     los ids de la lista OCASIONES (puede tener varias): 'amor' |
     'cumpleanos' | 'nacimiento' | 'novias' | 'condolencias' | 'toda-ocasion'.
   · tamanos (opcional): si el producto viene en varios tamaños, cada uno
     con su propio precio. El precio "desde" es el del primer tamaño.
     "tamanosLabel" (opcional) cambia el título "Tamaño" (ej: 'Flor').
   · destacado: true → aparece en "Más vendidos" del inicio.
   · extra: tipo de extra para "Hazlo aún más especial"
     ('bombones' | 'globos' | 'peluches').

   ACTUALIZAR UN PRODUCTO (foto, descripción o precio)
   ---------------------------------------------------------------------
   1. Foto: guarda la imagen editada en /img/productos con el MISMO nombre
      de archivo para reemplazarla sin tocar este archivo, o con un nombre
      nuevo y cámbialo en "fotos". Formato ideal: vertical 4:5 (por
      ejemplo 900 × 1125 px), JPG.
   2. Descripción: "desc" es el texto corto de la tarjeta (1 línea).
      "detalle" (opcional) es el texto completo de la página del producto;
      si no se indica, se muestra "desc". Usa \n para separar párrafos.
      "incluye" (opcional) es la lista de lo que trae el arreglo y "nota"
      (opcional) un aviso propio del producto (personalización, adicionales).
   3. Precio: cambia "precio" y, si tiene tamaños, el precio de cada uno
      en "tamanos" (el primero debe coincidir con "precio").

   Plantilla de producto:

   { id: 'identificador-unico', nombre: 'Nombre del arreglo', categoria: 'ramos',
     ocasiones: ['amor', 'cumpleanos'],
     precio: 25000, destacado: false,
     desc: 'Descripción corta para la tarjeta.',
     detalle: 'Descripción completa: flores, colores y presentación.',
     incluye: ['Rosas rojas', 'Gypsophila blanca', 'Cinta de satén'],
     nota: 'Aviso propio del producto (opcional).',
     fotos: [P + 'nombre-foto.jpg', P + 'nombre-foto-2.jpg'],
     tamanos: [{ nombre: 'Mediano', precio: 25000 }, { nombre: 'Grande', precio: 33000 }] },
   ===================================================================== */

const NEGOCIO = {
  nombre: 'Florería Valentina',
  direccion: '1299 Papudo Norte 1001, Los Andes',
  ciudad: 'Los Andes',
  horario: 'Lunes a domingo, de 08:30 a 17:30 hrs',
  horarioNota: 'Horario continuado',
  whatsapp: '56932802792',            // solo números, con código de país
  whatsappVisible: '+56 9 3280 2792',
  instagram: 'floreriavalentinacl',
  facebook: 'Floreria Valentina',
  facebookUrl: 'https://www.facebook.com/search/top?q=Floreria%20Valentina%20Los%20Andes',
  email: 'floreriavalentinacl@gmail.com',
  mediosPago: 'efectivo, transferencia o tarjeta',
  // Logos (PNG con fondo transparente). Reemplaza los archivos para actualizarlos.
  logo: 'img/logo.png',                       // versión vertical (hero, footer)
  logoHorizontal: 'img/logo-horizontal.png',  // versión horizontal (header)
  mapaEmbed: 'https://www.google.com/maps?q=Papudo+Norte+1001,+Los+Andes,+Chile&output=embed',
};

// Avisos que se muestran en tienda, producto, carrito, checkout y políticas
const AVISOS = {
  flores: 'Las flores pueden variar según disponibilidad, manteniendo estilo y valor del arreglo.',
  artesanal: 'Cada arreglo es elaborado artesanalmente. Algunas flores, follajes o detalles pueden variar según disponibilidad de temporada, manteniendo siempre el estilo, tonalidad y valor del diseño elegido.',
};

// Categorías principales del catálogo (inicio, filtros de la tienda y página Categorías).
// · etiqueta (opcional): nombre corto para la etiqueta sobre la foto del producto.
// · 'toda-ocasion' es la categoría general: úsala en los productos que no son
//   exclusivos de una ocasión (agradecimientos, felicitaciones, visitas, "porque sí").
const OCASIONES = [
  { id: 'amor',         nombre: 'Amor y aniversario',      etiqueta: 'Amor',         emoji: '❤️', desc: 'Ramos, cajas, corazones y arreglos románticos.',                                    foto: 'img/productos/corazon-encantado.jpg' },
  { id: 'cumpleanos',   nombre: 'Cumpleaños',                                        emoji: '🎂', desc: 'Opciones alegres, globos, chocolates y arreglos para celebrar.',                    foto: 'img/productos/un-detalle-especial.jpg' },
  { id: 'nacimiento',   nombre: 'Nacimientos',                                       emoji: '👶', desc: 'Arreglos delicados, con posibilidad de agregar globo y/o tarjeta.',                 foto: 'img/productos/dulce-bienvenida.jpg' },
  { id: 'novias',       nombre: 'Novias',                                            emoji: '👰🏻', desc: 'Ramos de novia, boutonnières, prendidos y otros arreglos para tu matrimonio.',       foto: 'img/productos/novias.jpg' },
  { id: 'condolencias', nombre: 'Condolencias / Fúnebres', etiqueta: 'Condolencias', emoji: '🤍', desc: 'Coronas, arreglos de condolencias y opciones para cementerio.',                     foto: 'img/productos/corona-paz-eterna.jpg' },
  { id: 'toda-ocasion', nombre: 'Toda ocasión',                                      emoji: '🌷', desc: 'Para agradecer, felicitar, visitar, tener un detalle o regalar “porque sí”.',       foto: 'img/productos/encanto-silvestre.jpg' },
];

const CATEGORIAS = [
  { id: 'ramos',        nombre: 'Ramos florales',    desc: 'Rosas, girasoles, liliums y ramos mixtos',       foto: 'img/productos/alegria-eterna.jpg' },
  { id: 'premium',      nombre: 'Colección Premium', desc: 'Arreglos abundantes para sorprender en grande',  foto: 'img/productos/amor-infinito.jpg' },
  { id: 'cajas',        nombre: 'Cajas florales',    desc: 'Corazones y sombrereras con Ferrero Rocher',     foto: 'img/productos/corazon-imperial.jpg' },
  { id: 'detalles',     nombre: 'Detalles florales', desc: 'Pequeños detalles para grandes momentos',        foto: 'img/productos/dulce-detalle.jpg' },
  { id: 'nacimientos',  nombre: 'Nacimientos',       desc: 'Para dar la bienvenida al bebé',                 foto: 'img/productos/pequena-bienvenida.jpg' },
  { id: 'condolencias', nombre: 'Condolencias',      desc: 'Coronas y arreglos fúnebres',                    foto: 'img/productos/consuelo-eterno.jpg' },
  { id: 'extras',       nombre: 'Extras',            desc: 'Globos, peluches y chocolates',                  foto: 'img/productos/ferrero-rocher.jpg' },
];

// Sección "Cotiza tu evento" del inicio
const EVENTOS = {
  titulo: 'Cotiza tu evento',
  bajada: '¿Tienes una celebración especial? Creamos propuestas florales personalizadas para acompañar tus momentos más importantes.',
  tipos: ['Matrimonios', 'Graduaciones', 'Aniversarios', 'Cumpleaños', 'Bautizos', 'Eventos corporativos', 'Celebraciones especiales'],
  texto: 'Diseñamos cada propuesta de acuerdo con el tipo de evento, cantidad de arreglos, estilo, colores y presupuesto disponible. Cuéntanos tu idea, la fecha del evento y lo que necesitas, y prepararemos una propuesta especialmente para ti.',
  frase: 'Tú imaginas el momento, nosotros lo llenamos de flores.',
  nota: 'Imágenes referenciales. Valores sujetos a cotización según requerimientos, disponibilidad de flores y temporada.',
  foto: 'img/productos/eventos.jpg',
};

const P = 'img/productos/';
const GLOBO_NOTA = 'Globo personalizable según la ocasión: Te Amo, Feliz Cumpleaños, Feliz Día, Felicitaciones, entre otras opciones disponibles.';
const BEBE_NOTA = 'Disponible en versión niño o niña, adaptando los tonos del globo, cintas y detalles decorativos según corresponda.';

const PRODUCTOS = [
  /* ---------------- RAMOS FLORALES ---------------- */
  { id: 'jardin-encantado', nombre: 'Jardín Encantado', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'amor', 'toda-ocasion'],
    precio: 28000, destacado: true,
    desc: 'Rosas rojas, ranúnculos rosados y gerbera naranja en papel verde pastel.',
    detalle: 'Un ramo alegre y lleno de color, elaborado con rosas rojas, ranúnculos rosados, gerbera naranja, gypsophila blanca y follaje verde decorativo, acompañado de una mariposa ornamental que le da un toque especial.\nPresentado en papel floral verde pastel con diseño decorativo, terminado con cinta rosada.',
    incluye: ['Rosas rojas', 'Ranúnculos rosados', 'Gerbera naranja', 'Gypsophila blanca', 'Follaje verde decorativo', 'Mariposa ornamental', 'Papel floral verde pastel', 'Cinta de satén rosada'],
    fotos: [P + 'jardin-encantado.jpg'] },

  { id: 'rayito-de-sol', nombre: 'Rayito de Sol', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'toda-ocasion'],
    precio: 20000,
    desc: 'Girasoles y gerbera roja en papel rojo y dorado.',
    detalle: 'Un ramo lleno de luz y color, elaborado con girasoles y gerbera roja, acompañados de gypsophila blanca y follaje verde decorativo. Incluye una mariposa ornamental, que aporta un detalle alegre y especial a la composición.\nPresentado en papel floral en tonos rojo y dorado, terminado con cinta de satén roja para complementar los tonos cálidos del arreglo.',
    incluye: ['Girasoles', 'Gerbera roja', 'Gypsophila blanca', 'Follaje verde decorativo', 'Mariposa ornamental', 'Papel floral rojo y dorado', 'Cinta de satén roja'],
    fotos: [P + 'rayito-de-sol.jpg'] },

  { id: 'dulce-encanto', nombre: 'Dulce Encanto', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'amor', 'toda-ocasion'],
    precio: 16000,
    desc: 'Lilium rosados y gerbera bicolor en tonos suaves.',
    detalle: 'Un delicado ramo floral en tonos rosados y suaves, elaborado con lilium rosados, gerbera bicolor en tonos crema y rosado, gypsophila blanca y follaje verde decorativo. Su composición se complementa con una mariposa ornamental rosada, aportando un detalle romántico y especial.\nPresentado en envoltorio transparente con detalle interior de papel decorativo tipo encaje en tono rosado, terminado con cinta de satén rosada.',
    incluye: ['Lilium rosados', 'Gerbera bicolor crema y rosada', 'Gypsophila blanca', 'Follaje verde decorativo', 'Mariposa ornamental', 'Envoltorio transparente', 'Papel decorativo rosado tipo encaje', 'Cinta de satén rosada'],
    fotos: [P + 'dulce-encanto.jpg'] },

  { id: 'explosion-de-alegria', nombre: 'Explosión de Alegría', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'toda-ocasion'],
    precio: 20000,
    desc: 'Girasol, gerbera roja, rosa bicolor y lilium en papel fucsia.',
    detalle: 'Un ramo vibrante y lleno de vida, elaborado con girasol, gerbera roja, rosa bicolor en tonos rosados, lilium y botones de lilium, acompañado de gypsophila blanca y abundante follaje verde decorativo.\nLa composición incorpora una mariposa ornamental verde, que complementa sus colores intensos y le entrega un detalle alegre y especial. Presentado en papel floral en tonos rosado y fucsia, terminado con cinta de satén fucsia y presentación Florería Valentina.',
    incluye: ['Girasol', 'Gerbera roja', 'Rosa bicolor rosada', 'Lilium y botones de lilium', 'Gypsophila blanca', 'Follaje verde decorativo', 'Mariposa ornamental verde', 'Papel floral rosado y fucsia', 'Cinta de satén fucsia'],
    fotos: [P + 'explosion-de-alegria.jpg'] },

  { id: 'alegria-eterna', nombre: 'Alegría Eterna', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'toda-ocasion'],
    precio: 25000, destacado: true,
    desc: 'Girasoles y rosas en tonos rojo y coral, cálido y abundante.',
    detalle: 'Un ramo cálido, abundante y lleno de energía, elaborado con girasoles y rosas en tonos rojo/coral, acompañados de gypsophila blanca y abundante follaje verde decorativo.\nSu combinación de tonos amarillos y rojizos crea una composición alegre y llamativa, complementada con una mariposa ornamental, ideal para sorprender en cumpleaños, celebraciones o simplemente regalar un momento especial.\nPresentado en papel floral color coral/naranjo con diseño tipográfico, terminado con cinta de satén roja y sello de Florería Valentina.',
    incluye: ['Girasoles', 'Rosas rojo/coral', 'Gypsophila blanca', 'Follaje verde decorativo', 'Mariposa ornamental', 'Papel floral decorativo', 'Cinta de satén roja'],
    fotos: [P + 'alegria-eterna.jpg'] },

  { id: 'cielo-de-primavera', nombre: 'Cielo de Primavera', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'toda-ocasion'],
    precio: 30000,
    desc: 'Lilium blanco, girasoles y rosas en azules, amarillos y blancos.',
    detalle: 'Un ramo lleno de color y personalidad, donde los tonos azules, amarillos y blancos crean una combinación alegre y elegante. Su composición destaca por un gran lilium blanco, acompañado de girasoles, rosas, alstroemerias, gypsophila, flores de complemento y abundante follaje verde.\nPresentado en un llamativo papel floral azul con terminaciones doradas, cinta decorativa a tono y una delicada mariposa ornamental, que completa su presentación.',
    incluye: ['Lilium blanco y botones de lilium', 'Girasoles', 'Rosas', 'Alstroemerias', 'Flores de complemento', 'Gypsophila blanca', 'Follaje verde', 'Mariposa ornamental', 'Papel floral azul con borde dorado', 'Cinta decorativa'],
    fotos: [P + 'cielo-de-primavera.jpg'] },

  { id: 'pasion', nombre: 'Pasión', categoria: 'ramos',
    ocasiones: ['amor', 'cumpleanos'],
    precio: 25000, destacado: true,
    desc: 'Rosas rojas con gypsophila en papel morado y dorado.',
    detalle: 'Un clásico romántico que nunca falla. Pasión está protagonizado por rosas rojas, acompañadas de delicada gypsophila blanca y abundante follaje verde, creando una composición elegante y llena de carácter.\nSu presentación en papel floral morado con terminaciones doradas realza el intenso color de las rosas, mientras una mariposa ornamental aporta un detalle especial al diseño.',
    incluye: ['Rosas rojas', 'Gypsophila blanca', 'Follaje verde decorativo', 'Mariposa ornamental', 'Papel floral morado con borde dorado', 'Cinta decorativa'],
    fotos: [P + 'pasion.jpg'] },

  { id: 'encanto-silvestre', nombre: 'Encanto Silvestre', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'toda-ocasion'],
    precio: 18000,
    desc: 'Lilium blanco, gerbera roja, rosa rosada y alstroemerias.',
    detalle: 'Un ramo alegre, fresco y lleno de detalles. Encanto Silvestre combina distintas flores y tonalidades para crear una composición delicada y colorida, ideal para cumpleaños, agradecimientos, celebraciones o simplemente para sorprender.\nEstá compuesto por lilium blanco, gerbera roja, rosa rosada, alstroemerias, gypsophila y follaje verde, acompañado de mariposa ornamental y presentado en papel floral blanco estampado.',
    incluye: ['Lilium', 'Gerbera', 'Rosa', 'Alstroemerias', 'Gypsophila', 'Follaje verde', 'Mariposa ornamental', 'Envoltorio floral decorativo'],
    fotos: [P + 'encanto-silvestre.jpg'] },

  { id: 'alegria', nombre: 'Alegría', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'toda-ocasion'],
    precio: 28000,
    desc: 'Girasoles, rosas fucsias y lisianthus morado, pura explosión de color.',
    detalle: 'Una explosión de color pensada para alegrar cualquier ocasión. Alegría combina tonos amarillos, morados, fucsias y blancos en una composición abundante, fresca y llena de vida.\nEl arreglo incluye girasoles, rosas fucsias, lisianthus morado, pequeñas flores tipo margarita, gypsophila y follaje verde, acompañado de mariposa ornamental. Su presentación en papel floral morado con terminaciones doradas complementa los colores del ramo y le da un acabado elegante.',
    incluye: ['Girasoles', 'Rosas fucsias', 'Lisianthus morado', 'Margaritas pequeñas', 'Gypsophila', 'Follaje verde', 'Mariposa ornamental', 'Envoltorio floral morado/dorado'],
    fotos: [P + 'alegria.jpg'] },

  { id: 'un-detalle-para-ti', nombre: 'Un Detalle para Ti', categoria: 'ramos',
    ocasiones: ['amor', 'toda-ocasion'],
    precio: 7000, sinDesde: true,
    desc: 'Una rosa roja o un girasol, un pequeño gesto lleno de cariño.',
    detalle: 'Un detalle sencillo y especial, protagonizado por una rosa roja o un girasol, acompañada de pequeñas flores blancas y follaje verde decorativo, creando una presentación delicada y romántica.\nPresentado en papel floral en tonos blanco y crema con detalles dorados, envoltorio translúcido y terminado con cinta roja, ideal para sorprender con un pequeño gesto lleno de cariño.',
    incluye: ['Rosa roja o girasol', 'Flores blancas de complemento', 'Follaje verde decorativo', 'Papel floral decorativo', 'Cinta roja'],
    fotos: [P + 'un-detalle-para-ti.jpg', P + 'un-detalle-para-ti-2.jpg'],
    tamanosLabel: 'Flor',
    tamanos: [{ nombre: 'Rosa roja', precio: 7000 }, { nombre: 'Girasol', precio: 7000 }] },

  /* ---------------- COLECCIÓN PREMIUM ---------------- */
  { id: 'amor-infinito', nombre: 'Amor Infinito', categoria: 'premium',
    ocasiones: ['amor'],
    precio: 75000, destacado: true,
    desc: 'Rosas rojas y crisantemos blancos en papel rojo con detalle perlado.',
    detalle: 'Una composición floral abundante, elegante y romántica, diseñada para sorprender en grande. Amor Infinito combina rosas rojas, crisantemos blancos y delicada gypsophila, logrando un contraste clásico y sofisticado entre rojo y blanco.\nEl arreglo se complementa con una mariposa ornamental, follaje decorativo y una cuidada presentación en papel floral translúcido rojo dispuesto en múltiples capas, con delicado detalle perlado blanco que realza todo el contorno del ramo.',
    incluye: ['Rosas rojas', 'Crisantemos blancos', 'Gypsophila blanca', 'Follaje decorativo', 'Mariposa ornamental', 'Papel floral translúcido rojo en capas', 'Detalle perlado decorativo'],
    fotos: [P + 'amor-infinito.jpg'] },

  { id: 'celebracion-deluxe', nombre: 'Celebración Deluxe', categoria: 'premium',
    ocasiones: ['cumpleanos', 'amor', 'toda-ocasion'],
    precio: 55000,
    desc: 'Rosas y hortensias en negro y dorado; personalizable con espumante y topper.',
    detalle: 'Un arreglo premium pensado para celebrar en grande. Combina rosas, hortensias, flores de complemento, gypsophila y follaje decorativo, en una presentación abundante con envoltorio negro y dorado.\nPuede personalizarse incorporando billetes entre las flores, espumante y topper para la ocasión, convirtiéndolo en un regalo completamente personalizado.',
    nota: 'El precio base corresponde exclusivamente al arreglo floral y su presentación. Los billetes, espumante y otros complementos se adicionan al valor del arreglo según la selección del cliente.',
    fotos: [P + 'celebracion-deluxe.jpg'] },

  { id: 'noche-eterna', nombre: 'Noche Eterna', categoria: 'premium',
    ocasiones: ['amor', 'toda-ocasion'],
    precio: 50000,
    desc: 'Rosas en tonalidad negra con gypsophila y terminaciones perladas.',
    detalle: 'Una propuesta elegante, sofisticada y completamente fuera de lo tradicional. Noche Eterna destaca por sus intensas rosas en tonalidad negra, acompañadas de abundante gypsophila blanca y follaje verde, creando un contraste espectacular.\nSu presentación se completa con envoltorio negro translúcido en capas, terminaciones perladas blancas y mariposa ornamental, dando vida a un arreglo imponente pensado para quienes buscan regalar algo diferente y especial.',
    incluye: ['Rosas en tonalidad negra', 'Gypsophila blanca', 'Follaje verde decorativo', 'Mariposa ornamental', 'Envoltorio negro translúcido en capas', 'Terminaciones perladas decorativas'],
    fotos: [P + 'noche-eterna.jpg'] },

  /* ---------------- CAJAS FLORALES ---------------- */
  { id: 'corazon-encantado', nombre: 'Corazón Encantado', categoria: 'cajas',
    ocasiones: ['amor', 'cumpleanos'],
    precio: 45000, destacado: true,
    desc: 'Caja corazón roja con rosas rojas y Ferrero Rocher al centro.',
    detalle: 'Elegante caja en forma de corazón, decorada con rosas rojas naturales y chocolates Ferrero Rocher al centro. Presentada en caja roja texturizada con tapa y lazo de cinta satinada, creando una composición romántica y sofisticada.\nIdeal para aniversarios, cumpleaños, declaraciones de amor y ocasiones especiales.',
    incluye: ['Rosas rojas naturales', 'Chocolates Ferrero Rocher', 'Caja rígida en forma de corazón', 'Lazo decorativo satinado'],
    fotos: [P + 'corazon-encantado.jpg'] },

  { id: 'caja-encanto-dorado', nombre: 'Caja Encanto Dorado', categoria: 'cajas',
    ocasiones: ['cumpleanos', 'amor', 'toda-ocasion'],
    precio: 25000, destacado: true,
    desc: 'Sombrerera negra y dorada con girasoles y corazón de Ferrero.',
    detalle: 'Elegante caja floral en tonos negro y dorado. Una combinación luminosa y elegante que mezcla flores y chocolates, ideal para sorprender en cumpleaños, aniversarios o simplemente regalar un detalle especial.',
    incluye: ['Girasoles naturales', 'Gypsophila blanca', 'Follaje verde decorativo', 'Chocolate Ferrero Rocher en formato corazón', 'Caja redonda tipo sombrerera', 'Cinta satinada dorada con lazo decorativo'],
    fotos: [P + 'caja-encanto-dorado.jpg'] },

  { id: 'caja-amor-eterno', nombre: 'Caja Amor Eterno', categoria: 'cajas',
    ocasiones: ['amor', 'cumpleanos'],
    precio: 45000,
    desc: 'Sombrerera blanca con rosas rojas y Ferrero Rocher.',
    detalle: 'Una composición clásica, romántica y elegante, preparada en caja floral redonda. Una combinación de rosas rojas y chocolates, ideal para aniversarios, cumpleaños, celebraciones románticas o para sorprender en una ocasión especial.',
    incluye: ['Rosas rojas naturales', 'Chocolates Ferrero Rocher', 'Gypsophila blanca', 'Follaje verde decorativo', 'Caja redonda tipo sombrerera', 'Cinta satinada roja decorativa'],
    fotos: [P + 'caja-amor-eterno.jpg'] },

  { id: 'caja-dulce-amanecer', nombre: 'Caja Dulce Amanecer', categoria: 'cajas',
    ocasiones: ['cumpleanos', 'toda-ocasion'],
    precio: 30000,
    desc: 'Girasoles en caja roja con cajón de Ferrero Rocher.',
    detalle: 'Una presentación alegre y delicada que combina flores naturales con un dulce detalle, presentada en caja floral con cajón.\nSu diseño con compartimento independiente permite mantener las flores y chocolates perfectamente presentados, convirtiéndola en una opción ideal para cumpleaños, agradecimientos, celebraciones o simplemente para sorprender a alguien especial.',
    incluye: ['Girasoles naturales', 'Gypsophila blanca', 'Follaje verde decorativo', 'Chocolates Ferrero Rocher', 'Caja floral con cajón para chocolates', 'Cinta decorativa con lazo'],
    fotos: [P + 'caja-dulce-amanecer.jpg'] },

  { id: 'corazon-imperial', nombre: 'Corazón Imperial', categoria: 'cajas',
    ocasiones: ['amor'],
    precio: 63000,
    desc: 'Gran caja corazón de rosas rojas y Ferrero Rocher.',
    detalle: 'Una presentación imponente y elegante, ideal para sorprender en grande. Caja floral en formato corazón de gran tamaño, con rosas rojas naturales y chocolates Ferrero Rocher, combinados en un diseño romántico y sofisticado.',
    incluye: ['Rosas rojas naturales', 'Chocolates Ferrero Rocher', 'Caja corazón de gran tamaño', 'Terminaciones decorativas', 'Tarjeta con dedicatoria incluida'],
    fotos: [P + 'corazon-imperial.jpg'] },

  { id: 'dulce-tentacion', nombre: 'Dulce Tentación', categoria: 'cajas',
    ocasiones: ['amor', 'cumpleanos'],
    precio: 45000,
    desc: 'Rosas rojas y girasol en caja negra con cajón de chocolates.',
    detalle: 'Una combinación llena de color y elegancia, presentada en una sofisticada caja floral con cajón de chocolates. El contraste de las rosas rojas con el girasol la convierte en un regalo alegre, romántico y muy especial.',
    incluye: ['Rosas rojas naturales', 'Girasol natural', 'Chocolates Ferrero Rocher', 'Caja floral con cajón', 'Cinta y lazo decorativo', 'Tarjeta con dedicatoria incluida'],
    fotos: [P + 'dulce-tentacion.jpg'] },

  /* ---------------- DETALLES FLORALES ---------------- */
  { id: 'dulce-detalle', nombre: 'Dulce Detalle', categoria: 'detalles',
    ocasiones: ['amor', 'cumpleanos', 'toda-ocasion'],
    precio: 15000, destacado: true,
    desc: 'Cajita estilo cartera con rosas, osito de peluche y globo.',
    detalle: 'Un detalle delicado y especial para sorprender en cualquier ocasión. Presentado en una linda cajita estilo cartera, combinando flores naturales con pequeños complementos que hacen de este arreglo un regalo completo y lleno de cariño.',
    incluye: ['Rosas naturales', 'Gypsophila', 'Osito de peluche', 'Globo decorativo', 'Presentación con lazo', 'Tarjeta para dedicatoria'],
    nota: GLOBO_NOTA,
    fotos: [P + 'dulce-detalle.jpg'] },

  { id: 'corazon-de-ternura', nombre: 'Corazón de Ternura', categoria: 'detalles',
    ocasiones: ['amor', 'cumpleanos', 'toda-ocasion'],
    precio: 15000,
    desc: 'Cajita cartera con diseño de corazón, rosas, peluche y globo.',
    detalle: 'Un detalle tierno y especial para sorprender en cualquier ocasión. Presentado en una delicada cajita estilo cartera con diseño de corazón, combina flores naturales, un adorable peluche y un globo decorativo que puede adaptarse al momento que quieras celebrar.',
    incluye: ['Rosas naturales', 'Gypsophila y follaje decorativo', 'Osito de peluche', 'Globo decorativo', 'Lazo decorativo', 'Tarjeta para dedicatoria'],
    nota: GLOBO_NOTA,
    fotos: [P + 'corazon-de-ternura.jpg'] },

  { id: 'pequena-alegria', nombre: 'Pequeña Alegría', categoria: 'detalles',
    ocasiones: ['amor', 'cumpleanos', 'toda-ocasion'],
    precio: 10000,
    desc: 'Cajita floral con asa de corazón, rosa, peluche y globo.',
    detalle: 'Un detalle pequeño, alegre y lleno de cariño, perfecto para sorprender sin necesidad de una ocasión especial. Presentado en una delicada cajita floral con estructura decorativa en forma de corazón, combina flores naturales, peluche y globo para crear un regalo bonito y especial.',
    incluye: ['Rosa natural', 'Flores naturales de complemento', 'Gypsophila y follaje decorativo', 'Osito de peluche', 'Globo decorativo', 'Lazo y terminaciones decorativas', 'Tarjeta para dedicatoria'],
    nota: GLOBO_NOTA,
    fotos: [P + 'pequena-alegria.jpg'] },

  { id: 'un-detalle-especial', nombre: 'Un Detalle Especial', categoria: 'detalles',
    ocasiones: ['cumpleanos', 'amor', 'toda-ocasion'],
    precio: 15000,
    desc: 'Diseño vertical con rosas, pequeño peluche y globo.',
    detalle: 'Un detalle sencillo, tierno y lleno de cariño para sorprender en cualquier momento. Su diseño vertical combina flores naturales, un pequeño peluche y un globo decorativo, logrando un regalo alegre y llamativo a un precio accesible.',
    incluye: ['Rosas naturales', 'Flores naturales de complemento', 'Follaje decorativo', 'Osito de peluche', 'Globo decorativo', 'Lazo y terminaciones decorativas', 'Tarjeta para dedicatoria'],
    nota: GLOBO_NOTA,
    fotos: [P + 'un-detalle-especial.jpg', P + 'un-detalle-especial-2.jpg'] },

  /* ---------------- NACIMIENTOS ---------------- */
  { id: 'dulce-bienvenida', nombre: 'Dulce Bienvenida', categoria: 'nacimientos',
    ocasiones: ['nacimiento'],
    precio: 25000, destacado: true,
    desc: 'Canasto con rosas blancas, osito y globo de bienvenida.',
    detalle: 'Un tierno arreglo floral creado para celebrar la llegada de un nuevo integrante a la familia. Combina flores en tonos blancos, azules y verdes, acompañado de un adorable osito y globo de bienvenida, logrando un regalo alegre, delicado y lleno de cariño para compartir en este momento tan especial.',
    incluye: ['Rosas blancas', 'Flores azules y blancas de complemento', 'Gypsophila', 'Claveles en tonos verdes', 'Follaje decorativo', 'Canasto', 'Osito de peluche', 'Globo “Es un niño”'],
    nota: BEBE_NOTA,
    fotos: [P + 'dulce-bienvenida.jpg'] },

  { id: 'pequena-bienvenida', nombre: 'Pequeña Bienvenida', categoria: 'nacimientos',
    ocasiones: ['nacimiento'],
    precio: 15000,
    desc: 'Caja decorativa con peluche, rosas y globo.',
    detalle: 'Un delicado detalle para celebrar la llegada de un nuevo integrante a la familia. Incluye un tierno peluche acompañado de rosas y delicados complementos florales, presentado en una elegante caja decorativa y coronado con un globo, creando un regalo dulce y especial para dar la bienvenida al recién nacido.',
    incluye: ['2 rosas', 'Flores de complemento', 'Follaje decorativo', 'Peluche', 'Globo', 'Caja decorativa con cinta'],
    nota: BEBE_NOTA,
    fotos: [P + 'pequena-bienvenida.jpg'] },

  /* ---------------- CONDOLENCIAS / FÚNEBRES ---------------- */
  { id: 'consuelo-eterno', nombre: 'Consuelo Eterno', categoria: 'condolencias',
    ocasiones: ['condolencias'],
    precio: 35000,
    desc: 'Arreglo alto con lilium y rosas rojas y blancas en base de madera.',
    detalle: 'Un arreglo floral de gran presencia, elaborado especialmente para expresar condolencias, respeto y acompañamiento en momentos de despedida. Combina lilium, rosas rojas y blancas, gerbera y delicadas flores de complemento, acompañado de abundante follaje verde y gypsophila.\nPresentado en una base de madera que realza su composición alta, elegante y solemne.',
    incluye: ['Lilium', 'Rosas rojas y blancas', 'Gerbera', 'Flores blancas de complemento', 'Gypsophila', 'Follaje verde decorativo', 'Base de madera'],
    fotos: [P + 'consuelo-eterno.jpg'] },

  { id: 'serenidad', nombre: 'Serenidad', categoria: 'condolencias',
    ocasiones: ['condolencias'],
    precio: 25000,
    desc: 'Arreglo en tonos blancos con rosas y margaritas.',
    detalle: 'Arreglo floral en tonos blancos, creado para expresar respeto, cariño y acompañamiento en momentos de despedida. Su composición combina rosas blancas, flores tipo margarita, delicada gypsophila y abundante follaje verde, logrando un diseño armonioso, sobrio y elegante.',
    incluye: ['Rosas blancas', 'Margaritas blancas', 'Gypsophila', 'Follaje verde decorativo', 'Base floral'],
    fotos: [P + 'serenidad.jpg'] },

  { id: 'luz-y-recuerdo', nombre: 'Luz y Recuerdo', categoria: 'condolencias',
    ocasiones: ['condolencias'],
    precio: 30000,
    desc: 'Arreglo de mesón en tonos blancos, amarillos y anaranjados.',
    detalle: 'Arreglo floral de mesón lleno de calidez y color, pensado para expresar cariño, compañía y un recuerdo especial en momentos de despedida. Su composición combina flores en tonos blancos, amarillos y anaranjados, creando un diseño abundante y armonioso acompañado de delicada gypsophila y follaje verde.',
    incluye: ['Rosas bicolor', 'Gerberas', 'Crisantemos blancos', 'Clavel', 'Gypsophila', 'Follaje verde decorativo', 'Base floral'],
    fotos: [P + 'luz-y-recuerdo.jpg'] },

  { id: 'corona-eterno-recuerdo', nombre: 'Corona Eterno Recuerdo', categoria: 'condolencias',
    ocasiones: ['condolencias'],
    precio: 80000,
    desc: 'Corona blanca con rosas rojas y lilium al centro, con atril.',
    detalle: 'Corona floral de gran presencia, diseñada para expresar respeto, cariño y acompañamiento en momentos de despedida. Su composición en tonos blancos se realza con rosas rojas y lilium como punto central, acompañados de abundante gypsophila y follaje verde, logrando un diseño solemne, elegante y armonioso.',
    incluye: ['Rosas rojas', 'Lilium blanco', 'Crisantemos blancos', 'Gypsophila', 'Abundante follaje verde decorativo', 'Estructura de corona con atril'],
    fotos: [P + 'corona-eterno-recuerdo.jpg'] },

  { id: 'corona-paz-eterna', nombre: 'Corona Paz Eterna', categoria: 'condolencias',
    ocasiones: ['condolencias'],
    precio: 80000,
    desc: 'Corona de rosas y crisantemos blancos, con atril.',
    detalle: 'Corona floral en tonos blancos, diseñada para transmitir paz, respeto y acompañamiento en momentos de despedida. Su abundante composición combina rosas y crisantemos blancos, delicada gypsophila y follaje verde, creando una presentación sobria, elegante y de gran presencia.',
    incluye: ['Rosas blancas', 'Crisantemos blancos', 'Gypsophila', 'Follaje verde decorativo', 'Estructura de corona con atril'],
    nota: 'Cinta personalizada no incluida. Disponible como adicional por $10.000.',
    fotos: [P + 'corona-paz-eterna.jpg'] },

  // En el catálogo figura como "Eterno Recuerdo" ($150.000), igual que la corona de $80.000;
  // se distingue con "Premium" para no tener dos productos con el mismo nombre.
  { id: 'corona-eterno-recuerdo-premium', nombre: 'Corona Eterno Recuerdo Premium', categoria: 'condolencias',
    ocasiones: ['condolencias'],
    precio: 150000,
    desc: 'Gran corona de rosas rojas, blancas y rosadas con lilium blanco.',
    detalle: 'Corona floral de gran presencia, elaborada para expresar amor, respeto y un recuerdo que permanece. Su composición combina rosas rojas, blancas y rosadas con lilium blanco, abundante gypsophila y follaje verde, creando un diseño elegante, armonioso y lleno de significado para acompañar momentos de despedida.',
    incluye: ['Rosas rojas', 'Rosas blancas', 'Rosas rosadas', 'Lilium blanco', 'Gypsophila', 'Follaje verde decorativo', 'Estructura de corona con atril'],
    fotos: [P + 'corona-eterno-recuerdo-premium.jpg'] },

  /* ---------------- EXTRAS ---------------- */
  { id: 'ferrero-rocher', nombre: 'Ferrero Rocher', categoria: 'extras', extra: 'bombones',
    ocasiones: ['amor', 'cumpleanos', 'toda-ocasion'],
    precio: 10000, sinDesde: true,
    desc: 'Caja de chocolates Ferrero Rocher.',
    detalle: 'Agrega un toque dulce a tu regalo con una caja de chocolates Ferrero Rocher, ideal para complementar cualquiera de nuestros arreglos florales y hacerlo aún más especial.',
    nota: 'Producto sujeto a disponibilidad de stock.',
    fotos: [P + 'ferrero-rocher.jpg'] },

  { id: 'globo-tematico', nombre: 'Globo temático', categoria: 'extras', extra: 'globos',
    ocasiones: ['cumpleanos', 'amor', 'nacimiento', 'toda-ocasion'],
    precio: 2000, sinDesde: true,
    desc: 'Globo con mensaje acorde a la ocasión.',
    detalle: 'Agrega un detalle especial a tu arreglo con un globo temático acorde a la ocasión. Contamos con diferentes diseños y mensajes para cumpleaños, nacimientos, aniversarios, celebraciones y fechas especiales.\nOpciones: Cumpleaños · Te Amo · Día de la Mamá · Día del Papá · Nacimientos · Felicitaciones y otros.',
    nota: 'Diseños sujetos a disponibilidad. Puedes consultar los modelos disponibles al momento de realizar tu pedido y escoger tu favorito.',
    fotos: [P + 'globo-tematico.jpg'] },

  { id: 'peluche', nombre: 'Peluche', categoria: 'extras', extra: 'peluches',
    ocasiones: ['amor', 'cumpleanos', 'toda-ocasion'],
    precio: 10000, sinDesde: true,
    desc: 'Tierno peluche para acompañar tu arreglo.',
    detalle: 'Complementa tu arreglo floral con un tierno peluche, ideal para hacer tu regalo aún más especial y personalizado.',
    nota: 'Modelos, colores y diseños sujetos a disponibilidad. Puedes consultar las opciones disponibles al momento de realizar tu pedido.',
    fotos: [P + 'peluche.jpg'] },
];

// Franjas horarias de entrega
const FRANJAS = ['08:30 – 11:00', '11:00 – 14:00', '14:00 – 17:30'];

// Comunas de despacho (el costo se confirma por WhatsApp)
const COMUNAS = ['Los Andes', 'San Esteban', 'Calle Larga', 'Rinconada', 'San Felipe', 'Otra comuna'];

// Sugerencias rápidas para la dedicatoria
const DEDICATORIAS = ['Feliz cumpleaños', 'Te amo', 'Con cariño', 'Mis condolencias'];
