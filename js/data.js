/* =====================================================================
   FLORERÍA VALENTINA · DATOS DEL SITIO
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar para cambiar productos,
   precios, fotos, categorías, ocasiones o datos de contacto.

   · Precios: número entero en pesos, SIN puntos (25000 = $25.000).
   · Fotos: ruta a la imagen dentro de /img/productos. La primera foto
     es la principal; las siguientes aparecen en la galería del detalle.
   · ocasiones: ids de la lista OCASIONES (puede tener varias).
   · tamanos (opcional): si el producto viene en varios tamaños, cada uno
     con su propio precio. El precio "desde" es el del primer tamaño.
   · destacado: true → aparece en "Más vendidos" del inicio.
   · extra: tipo de extra para "Hazlo aún más especial"
     ('bombones' | 'globos' | 'peluches' | 'tazones').
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
  logo: 'img/logo.png',                       // versión vertical (footer, confirmación)
  logoHorizontal: 'img/logo-horizontal.png',  // versión horizontal (header)
  mapaEmbed: 'https://www.google.com/maps?q=Papudo+Norte+1001,+Los+Andes,+Chile&output=embed',
};

const OCASIONES = [
  { id: 'cumpleanos',     nombre: 'Cumpleaños',     emoji: '🎂', desc: 'Para celebrar un año más',        foto: 'img/productos/arreglo-cumpleanos.jpg' },
  { id: 'amor',           nombre: 'Amor',           emoji: '❤️', desc: 'Para decir te amo sin palabras',  foto: 'img/productos/caja-corazon-dulce.jpg' },
  { id: 'aniversario',    nombre: 'Aniversario',    emoji: '💕', desc: 'Para celebrar lo que construyen', foto: 'img/productos/rosas-rojas.jpg' },
  { id: 'nacimiento',     nombre: 'Nacimiento',     emoji: '👶', desc: 'Para dar la bienvenida',          foto: 'img/productos/bienvenida-princesa.jpg' },
  { id: 'agradecimiento', nombre: 'Agradecimiento', emoji: '🌷', desc: 'Para decir gracias',              foto: 'img/productos/gerberas-alegres.jpg' },
  { id: 'condolencias',   nombre: 'Condolencias',   emoji: '🤍', desc: 'Para acompañar con respeto',      foto: 'img/productos/corona-paz-eterna.jpg' },
  { id: 'otra',           nombre: 'Otra ocasión',   emoji: '✨', desc: 'Graduaciones, días especiales y más', foto: 'img/productos/arreglo-graduacion.jpg' },
];

const CATEGORIAS = [
  { id: 'ramos',          nombre: 'Ramos florales',   desc: 'Rosas, girasoles, gerberas y mixtos',          foto: 'img/productos/ramo-valentina.jpg' },
  { id: 'cajas',          nombre: 'Cajas florales',   desc: 'Cajas corazón y sombrereras con bombones',     foto: 'img/productos/caja-corazon-dulce.jpg' },
  { id: 'arreglos',       nombre: 'Arreglos florales',desc: 'En base, con globos y peluches',               foto: 'img/productos/arreglo-sol-radiante.jpg' },
  { id: 'nacimientos',    nombre: 'Nacimientos',      desc: 'Para dar la bienvenida al bebé',               foto: 'img/productos/bienvenida-princesa.jpg' },
  { id: 'condolencias',   nombre: 'Condolencias',     desc: 'Coronas, cubre urnas y arreglos de pie',       foto: 'img/productos/corona-paz-eterna.jpg' },
  { id: 'personalizados', nombre: 'Personalizados',   desc: 'Rosas azules, graduaciones, fotos y globos',   foto: 'img/productos/sombrerera-azul-girasoles.jpg' },
  { id: 'extras',         nombre: 'Extras',           desc: 'Bombones, peluches, globos y más',             foto: 'img/productos/ferrero-corazon.jpg' },
];

const P = 'img/productos/';

const PRODUCTOS = [
  /* ---------------- RAMOS FLORALES ---------------- */
  { id: 'ramo-valentina', nombre: 'Ramo Valentina', categoria: 'ramos',
    ocasiones: ['amor', 'aniversario', 'cumpleanos'],
    precio: 25000, destacado: true,
    desc: 'Rosas rojas y blancas con paniculata, nuestro clásico de la casa.',
    fotos: [P + 'ramo-valentina.jpg', P + 'ramo-valentina-2.jpg'],
    tamanos: [{ nombre: '12 rosas', precio: 25000 }, { nombre: '18 rosas', precio: 33000 }, { nombre: '24 rosas', precio: 42000 }] },

  { id: 'rosas-rojas-clasicas', nombre: 'Rosas Rojas Clásicas', categoria: 'ramos',
    ocasiones: ['amor', 'aniversario', 'cumpleanos'],
    precio: 22000, destacado: true,
    desc: 'Rosas rojas envueltas en papel negro, elegancia pura.',
    fotos: [P + 'rosas-rojas.jpg', P + 'rosas-rojas-2.jpg'],
    tamanos: [{ nombre: '12 rosas', precio: 22000 }, { nombre: '24 rosas', precio: 38000 }] },

  { id: 'rosas-rosadas', nombre: 'Rosas Rosadas Dulzura', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'agradecimiento', 'amor'],
    precio: 20000,
    desc: 'Rosas rosadas suaves con follaje fresco y paniculata.',
    fotos: [P + 'rosas-rosadas.jpg'] },

  { id: 'girasoles-del-sol', nombre: 'Girasoles del Sol', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'agradecimiento', 'otra'],
    precio: 18000, destacado: true,
    desc: 'Girasoles luminosos con toques rosados, pura alegría.',
    fotos: [P + 'girasoles-del-sol.jpg', P + 'girasoles-del-sol-2.jpg'],
    tamanos: [{ nombre: 'Mediano', precio: 18000 }, { nombre: 'Grande', precio: 26000 }] },

  { id: 'sol-y-pasion', nombre: 'Sol y Pasión', categoria: 'ramos',
    ocasiones: ['amor', 'cumpleanos', 'aniversario'],
    precio: 28000,
    desc: 'Girasoles y rosas rojas en un ramo lleno de energía.',
    fotos: [P + 'sol-y-pasion.jpg', P + 'sol-y-pasion-2.jpg'] },

  { id: 'gerberas-alegres', nombre: 'Gerberas Alegres', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'agradecimiento', 'otra'],
    precio: 16000, destacado: true,
    desc: 'Gerberas en tonos rosados, frescas y coloridas.',
    fotos: [P + 'gerberas-alegres.jpg', P + 'gerberas-alegres-2.jpg', P + 'gerberas-alegres-3.jpg'] },

  { id: 'jardin-primaveral', nombre: 'Jardín Primaveral', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'agradecimiento', 'otra'],
    precio: 19000,
    desc: 'Ramo mixto de gerberas, rosas y flores de estación.',
    fotos: [P + 'jardin-primaveral.jpg', P + 'jardin-primaveral-2.jpg'] },

  { id: 'encanto-rosa', nombre: 'Encanto Rosa', categoria: 'ramos',
    ocasiones: ['cumpleanos', 'amor', 'agradecimiento'],
    precio: 21000,
    desc: 'Rosas, lisianthus y flores blancas en papel rosado.',
    fotos: [P + 'encanto-rosa.jpg', P + 'encanto-rosa-2.jpg'] },

  /* ---------------- CAJAS FLORALES ---------------- */
  { id: 'caja-corazon-dulce', nombre: 'Caja Corazón Dulce', categoria: 'cajas',
    ocasiones: ['amor', 'aniversario', 'cumpleanos'],
    precio: 32000, destacado: true,
    desc: 'Caja corazón con rosas rojas y bombones Ferrero Rocher.',
    fotos: [P + 'caja-corazon-dulce.jpg', P + 'caja-corazon-dulce-2.jpg'] },

  { id: 'caja-corazon-pasion', nombre: 'Corazón Pasión', categoria: 'cajas',
    ocasiones: ['amor', 'aniversario'],
    precio: 45000,
    desc: 'Gran corazón de rosas rojas con Ferrero, para sorprender.',
    fotos: [P + 'caja-corazon-pasion.jpg'] },

  { id: 'caja-sol-chocolate', nombre: 'Sol y Chocolate', categoria: 'cajas',
    ocasiones: ['cumpleanos', 'amor', 'agradecimiento'],
    precio: 35000,
    desc: 'Girasol, rosas rojas y un cajón de bombones Ferrero.',
    fotos: [P + 'caja-sol-chocolate.jpg', P + 'caja-sol-chocolate-2.jpg'] },

  { id: 'sombrerera-clasica', nombre: 'Sombrerera Clásica', categoria: 'cajas',
    ocasiones: ['amor', 'aniversario', 'cumpleanos'],
    precio: 30000,
    desc: 'Sombrerera blanca con rosas rojas y bombones.',
    fotos: [P + 'sombrerera-clasica.jpg', P + 'sombrerera-clasica-2.jpg'] },

  { id: 'corazon-girasoles', nombre: 'Corazón de Girasoles', categoria: 'cajas',
    ocasiones: ['cumpleanos', 'aniversario', 'agradecimiento'],
    precio: 34000,
    desc: 'Caja corazón con girasoles, rosa roja y Ferrero.',
    fotos: [P + 'corazon-girasoles.jpg'] },

  { id: 'sombrerera-dorada', nombre: 'Sombrerera Dorada', categoria: 'cajas',
    ocasiones: ['cumpleanos', 'agradecimiento', 'otra'],
    precio: 36000,
    desc: 'Girasoles en sombrerera negra con corazón de Ferrero.',
    fotos: [P + 'sombrerera-dorada.jpg'] },

  /* ---------------- ARREGLOS FLORALES ---------------- */
  { id: 'arreglo-sol-radiante', nombre: 'Arreglo Sol Radiante', categoria: 'arreglos',
    ocasiones: ['cumpleanos', 'aniversario', 'agradecimiento'],
    precio: 38000, destacado: true,
    desc: 'Girasoles, rosas rojas y bombones en base alta.',
    fotos: [P + 'arreglo-sol-radiante.jpg'] },

  { id: 'arreglo-romance', nombre: 'Arreglo Romance', categoria: 'arreglos',
    ocasiones: ['amor', 'aniversario', 'cumpleanos'],
    precio: 32000,
    desc: 'Rosas rosadas y fucsias con paniculata en base.',
    fotos: [P + 'arreglo-romance.jpg'] },

  { id: 'arreglo-te-amo', nombre: 'Te Amo con Peluche', categoria: 'arreglos',
    ocasiones: ['amor', 'aniversario'],
    precio: 42000,
    desc: 'Rosas, gerberas, peluche y globos "Te amo".',
    fotos: [P + 'arreglo-te-amo.jpg'] },

  { id: 'arreglo-cumpleanos', nombre: 'Feliz Cumpleaños', categoria: 'arreglos',
    ocasiones: ['cumpleanos'],
    precio: 30000,
    desc: 'Arreglo alto con rosas y globo de cumpleaños.',
    fotos: [P + 'arreglo-cumpleanos.jpg'] },

  { id: 'arreglo-celebracion', nombre: 'Arreglo Celebración', categoria: 'arreglos',
    ocasiones: ['cumpleanos', 'agradecimiento', 'otra'],
    precio: 34000,
    desc: 'Rosas blancas, liliums y alstroemerias con globo.',
    fotos: [P + 'arreglo-celebracion.jpg'] },

  { id: 'arreglo-primavera', nombre: 'Arreglo Primavera', categoria: 'arreglos',
    ocasiones: ['agradecimiento', 'cumpleanos', 'otra'],
    precio: 28000,
    desc: 'Crisantemos blancos, amarillos y rosas rojas.',
    fotos: [P + 'arreglo-primavera.jpg'] },

  /* ---------------- NACIMIENTOS ---------------- */
  { id: 'bienvenida-bebe', nombre: 'Bienvenida Bebé', categoria: 'nacimientos',
    ocasiones: ['nacimiento'],
    precio: 30000, destacado: true,
    desc: 'Flores blancas, peluche y globo en tonos celeste.',
    fotos: [P + 'bienvenida-bebe.jpg'] },

  { id: 'llego-mi-principe', nombre: 'Llegó mi Príncipe', categoria: 'nacimientos',
    ocasiones: ['nacimiento'],
    precio: 35000,
    desc: 'Caja celeste con oso, flores blancas y globo.',
    fotos: [P + 'llego-mi-principe.jpg'] },

  { id: 'es-un-nino', nombre: 'Es un Niño', categoria: 'nacimientos',
    ocasiones: ['nacimiento'],
    precio: 26000,
    desc: 'Arreglo pequeño con globo celeste y osito.',
    fotos: [P + 'es-un-nino.jpg'] },

  { id: 'bienvenida-princesa', nombre: 'Bienvenida Princesa', categoria: 'nacimientos',
    ocasiones: ['nacimiento'],
    precio: 30000,
    desc: 'Rosas y gerberas rosadas con globo "It\'s a girl".',
    fotos: [P + 'bienvenida-princesa.jpg', P + 'bienvenida-princesa-2.jpg'] },

  { id: 'dulce-bebita', nombre: 'Dulce Bebita', categoria: 'nacimientos',
    ocasiones: ['nacimiento'],
    precio: 36000,
    desc: 'Caja rosada con peluche, flores y globo de bebé.',
    fotos: [P + 'dulce-bebita.jpg'] },

  { id: 'llego-la-bebe', nombre: 'Llegó la Bebé', categoria: 'nacimientos',
    ocasiones: ['nacimiento'],
    precio: 32000,
    desc: 'Rosas rosadas y liliums con letrero de bienvenida.',
    fotos: [P + 'llego-la-bebe.jpg'] },

  /* ---------------- CONDOLENCIAS ---------------- */
  { id: 'corona-paz-eterna', nombre: 'Corona Paz Eterna', categoria: 'condolencias',
    ocasiones: ['condolencias'],
    precio: 55000,
    desc: 'Corona de flores blancas con cinta personalizada.',
    fotos: [P + 'corona-paz-eterna.jpg'] },

  { id: 'corona-recuerdo', nombre: 'Corona Recuerdo', categoria: 'condolencias',
    ocasiones: ['condolencias'],
    precio: 60000,
    desc: 'Corona en blanco y amarillo con cinta de despedida.',
    fotos: [P + 'corona-recuerdo.jpg'] },

  { id: 'corona-serenidad', nombre: 'Corona Serenidad', categoria: 'condolencias',
    ocasiones: ['condolencias'],
    precio: 58000,
    desc: 'Liliums, margaritas y rosas en corona sobre atril.',
    fotos: [P + 'corona-serenidad.jpg'] },

  { id: 'pie-esperanza', nombre: 'Arreglo de Pie Esperanza', categoria: 'condolencias',
    ocasiones: ['condolencias'],
    precio: 50000,
    desc: 'Liliums blancos y girasoles en arreglo alto.',
    fotos: [P + 'pie-esperanza.jpg', P + 'pie-esperanza-2.jpg'] },

  { id: 'pie-luz', nombre: 'Arreglo de Pie Luz', categoria: 'condolencias',
    ocasiones: ['condolencias'],
    precio: 48000,
    desc: 'Arreglo sobre pedestal en tonos amarillos y blancos.',
    fotos: [P + 'pie-luz.jpg', P + 'pie-luz-2.jpg'] },

  { id: 'cubre-urna-consuelo', nombre: 'Cubre Urna Consuelo', categoria: 'condolencias',
    ocasiones: ['condolencias'],
    precio: 45000,
    desc: 'Flores blancas y suaves para acompañar la despedida.',
    fotos: [P + 'cubre-urna-consuelo.jpg', P + 'cubre-urna-consuelo-2.jpg'] },

  /* ---------------- PERSONALIZADOS ---------------- */
  { id: 'sombrerera-azul-girasoles', nombre: 'Azul y Girasoles', categoria: 'personalizados',
    ocasiones: ['cumpleanos', 'otra', 'agradecimiento'],
    precio: 40000, destacado: true,
    desc: 'Sombrerera con rosas azules y girasoles.',
    fotos: [P + 'sombrerera-azul-girasoles.jpg', P + 'sombrerera-azul-girasoles-2.jpg'] },

  { id: 'caja-azul-sol', nombre: 'Caja Azul y Sol', categoria: 'personalizados',
    ocasiones: ['cumpleanos', 'otra'],
    precio: 28000,
    desc: 'Caja negra con rosas azules y girasoles.',
    fotos: [P + 'caja-azul-sol.jpg'] },

  { id: 'corazon-azul-ferrero', nombre: 'Corazón Azul', categoria: 'personalizados',
    ocasiones: ['amor', 'aniversario', 'otra'],
    precio: 42000,
    desc: 'Caja corazón de rosas azules con Ferrero Rocher.',
    fotos: [P + 'corazon-azul-ferrero.jpg'] },

  { id: 'arreglo-graduacion', nombre: 'Arreglo Graduación', categoria: 'personalizados',
    ocasiones: ['otra'],
    precio: 32000,
    desc: 'Rosas azules y blancas con birrete y globo estrella.',
    fotos: [P + 'arreglo-graduacion.jpg'] },

  { id: 'caja-recuerdos-fotos', nombre: 'Caja Recuerdos', categoria: 'personalizados',
    ocasiones: ['amor', 'aniversario', 'cumpleanos'],
    precio: 45000,
    desc: 'Rosas azules, bombones, globo y tus fotos impresas.',
    fotos: [P + 'caja-recuerdos-fotos.jpg'] },

  { id: 'globo-personalizado', nombre: 'Globo con Nombre', categoria: 'personalizados',
    ocasiones: ['cumpleanos', 'amor', 'otra'],
    precio: 38000,
    desc: 'Globo burbuja con nombre, rosas azules y peluche.',
    fotos: [P + 'globo-personalizado.jpg'] },

  { id: 'caja-papa', nombre: 'Caja Para Él', categoria: 'personalizados',
    ocasiones: ['cumpleanos', 'otra'],
    precio: 35000,
    desc: 'Rosas azules, cervezas y bombones en caja de madera.',
    fotos: [P + 'caja-papa.jpg'] },

  /* ---------------- EXTRAS ---------------- */
  { id: 'ferrero-corazon', nombre: 'Ferrero Rocher corazón', categoria: 'extras', extra: 'bombones',
    ocasiones: ['amor', 'aniversario', 'cumpleanos'],
    precio: 9000, sinDesde: true,
    desc: 'Caja corazón de 8 bombones Ferrero Rocher.',
    fotos: [P + 'ferrero-corazon.jpg'] },

  { id: 'ferrero-8', nombre: 'Ferrero Rocher caja de 8', categoria: 'extras', extra: 'bombones',
    ocasiones: ['cumpleanos', 'agradecimiento', 'otra'],
    precio: 7000, sinDesde: true,
    desc: 'Caja clásica de 8 bombones Ferrero Rocher.',
    fotos: [P + 'ferrero-8.jpg'] },

  { id: 'globo-cumpleanos', nombre: 'Globo Feliz cumpleaños', categoria: 'extras', extra: 'globos',
    ocasiones: ['cumpleanos'],
    precio: 4500, sinDesde: true,
    desc: 'Globo metalizado con helio.',
    fotos: [P + 'globo-cumpleanos.jpg'] },

  { id: 'globo-aniversario', nombre: 'Globos Aniversario y corazón', categoria: 'extras', extra: 'globos',
    ocasiones: ['aniversario', 'amor'],
    precio: 6500, sinDesde: true,
    desc: 'Globo "Feliz aniversario" más globo corazón rojo.',
    fotos: [P + 'globo-aniversario.jpg'] },

  { id: 'globo-mama', nombre: 'Globo Feliz día mamá', categoria: 'extras', extra: 'globos',
    ocasiones: ['otra'],
    precio: 4500, sinDesde: true,
    desc: 'Globo corazón metalizado con helio.',
    fotos: [P + 'globo-mama.jpg'] },

  { id: 'peluche-te-amo', nombre: 'Oso "Te amo"', categoria: 'extras', extra: 'peluches',
    ocasiones: ['amor', 'aniversario'],
    precio: 10000, sinDesde: true,
    desc: 'Oso de peluche con corazón "Te amo".',
    fotos: [P + 'peluche-te-amo-blanco.jpg', P + 'peluche-te-amo.jpg'] },

  { id: 'peluche-te-quiero', nombre: 'Oso "Te quiero"', categoria: 'extras', extra: 'peluches',
    ocasiones: ['amor', 'cumpleanos', 'agradecimiento'],
    precio: 10000, sinDesde: true,
    desc: 'Oso de peluche con corazón "Te quiero".',
    fotos: [P + 'peluche-te-quiero.jpg'] },

  { id: 'tazon-personalizado', nombre: 'Tazón personalizado', categoria: 'extras', extra: 'tazones',
    ocasiones: ['cumpleanos', 'amor', 'agradecimiento', 'otra'],
    precio: 8000, sinDesde: true, textoPersonalizado: true,
    desc: 'Tazón con el nombre, frase o foto que quieras.',
    fotos: [P + 'tazon.svg'] },

  { id: 'chupete-chocolate', nombre: 'Chupete de chocolate', categoria: 'extras', extra: 'bombones',
    ocasiones: ['cumpleanos', 'amor', 'otra'],
    precio: 3500, sinDesde: true,
    desc: 'Chupete corazón de chocolate con decoración.',
    fotos: [P + 'chupete-chocolate.jpg'] },
];

// Franjas horarias de entrega
const FRANJAS = ['08:30 – 11:00', '11:00 – 14:00', '14:00 – 17:30'];

// Comunas de despacho (el costo se confirma por WhatsApp)
const COMUNAS = ['Los Andes', 'San Esteban', 'Calle Larga', 'Rinconada', 'San Felipe', 'Otra comuna'];

// Sugerencias rápidas para la dedicatoria
const DEDICATORIAS = ['Feliz cumpleaños', 'Te amo', 'Con cariño', 'Mis condolencias'];
