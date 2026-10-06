/* =====================================================================
   FLORERÍA VALENTINA · POLÍTICAS
   ---------------------------------------------------------------------
   Contenido de las páginas de políticas (enlazadas desde el pie de página).
   Cada política tiene su propia dirección: index.html#/<id>

   · titulo / resumen: encabezado de la página.
   · aviso: true → muestra el aviso de elaboración artesanal al inicio.
   · secciones: cada una con un título (t) y su contenido (c).
     En "c", un texto entre comillas es un párrafo y una lista entre
     corchetes [ ] se muestra como viñetas.
   · ver (opcional): id de otra política para enlazarla al final.
   ===================================================================== */

const POLITICAS_ACTUALIZACION = 'octubre de 2026';

const ZONAS_DESPACHO = COMUNAS.filter((c) => c !== 'Otra comuna').join(', ');

const POLITICAS = [
  /* ---------------- CAMBIOS Y CANCELACIONES ---------------- */
  { id: 'cambios-y-cancelaciones', titulo: 'Cambios y cancelaciones',
    resumen: 'Cómo modificar o cancelar un pedido de flores naturales hechas a pedido.',
    aviso: true,
    secciones: [
      { t: 'Productos perecibles y hechos a pedido', c: [
        'Nuestros arreglos se elaboran con flores naturales, compradas y preparadas especialmente para cada pedido. Por tratarse de productos perecibles y, en muchos casos, personalizados, no pueden volver a venderse una vez elaborados.',
        'Por esta razón no realizamos cambios ni devoluciones por gusto o arrepentimiento, ni aplica el derecho a retracto, conforme a lo previsto en la Ley N° 19.496 para bienes que se deterioran con rapidez o que se confeccionan según las indicaciones del cliente.',
      ] },
      { t: 'Modificar un pedido', c: [
        'Puedes pedir cambios en tu pedido (fecha, franja horaria, dirección, dedicatoria, colores o extras) escribiéndonos por WhatsApp hasta 24 horas antes de la entrega.',
        'Los cambios quedan sujetos a disponibilidad de flores y de horarios. Si el cambio modifica el valor del pedido o el costo de despacho, te lo informaremos antes de aplicarlo.',
        'Con menos de 24 horas haremos lo posible por ayudarte, pero no podemos garantizar el cambio si el arreglo ya está en preparación.',
      ] },
      { t: 'Cancelar un pedido', c: [
        [
          'Con 24 horas o más de anticipación a la entrega: puedes cancelar y te devolvemos el total pagado.',
          'Con menos de 24 horas, o si el arreglo ya fue elaborado: no es posible cancelar ni reembolsar, porque las flores ya fueron compradas y preparadas para ti. Podemos reprogramar la entrega, sujeto a disponibilidad.',
          'Pedidos personalizados (fotos impresas, globos o cintas con nombre, diseños a medida): no pueden cancelarse una vez iniciada su elaboración.',
        ],
        'Las cancelaciones se solicitan por WhatsApp, indicando el nombre de quien hizo el pedido y la fecha de entrega.',
      ] },
      { t: 'Si tu pedido llega con un problema', c: [
        'Revisa el arreglo al recibirlo. Si llegó dañado, en mal estado o no corresponde a lo que pediste, escríbenos por WhatsApp dentro de las 24 horas siguientes a la entrega, con fotos del arreglo.',
        'Revisaremos tu caso y, según corresponda, repondremos el arreglo o te devolveremos el dinero. Esto no limita los derechos que la ley reconoce a los consumidores.',
      ] },
      { t: 'Qué no se considera una falla', c: [
        [
          'El reemplazo de una flor, follaje o detalle por otro equivalente cuando no hay disponibilidad de temporada, manteniendo el estilo, la tonalidad y el valor del diseño elegido.',
          'Diferencias leves de tono o tamaño respecto de las fotos, que son referenciales: cada flor es única.',
          'El marchitamiento natural de las flores con el paso de los días, o el daño causado por falta de agua, calor, sol directo o manipulación posterior a la entrega.',
        ],
      ] },
      { t: 'Reembolsos', c: [
        'Cuando corresponda una devolución de dinero, la realizamos por transferencia o por el mismo medio de pago utilizado, en el menor plazo posible una vez acordada contigo.',
      ] },
    ] },

  /* ---------------- DESPACHOS ---------------- */
  { id: 'despachos', titulo: 'Despachos',
    resumen: 'Zonas, horarios y condiciones de entrega a domicilio y retiro en tienda.',
    secciones: [
      { t: 'Zonas de despacho', c: [
        `Despachamos a domicilio en ${ZONAS_DESPACHO}. Si necesitas una entrega en otra comuna, escríbenos por WhatsApp y te confirmamos si es posible.`,
      ] },
      { t: 'Costo de despacho', c: [
        'El costo de despacho depende de la comuna y de la dirección de entrega. No está incluido en el precio de los productos y te lo confirmamos por WhatsApp antes de que pagues.',
        `El retiro en tienda no tiene costo: ${NEGOCIO.direccion}.`,
      ] },
      { t: 'Días y horarios de entrega', c: [
        `Entregamos de ${NEGOCIO.horario.charAt(0).toLowerCase() + NEGOCIO.horario.slice(1)}, en las siguientes franjas horarias:`,
        FRANJAS.map((f) => `${f} hrs`),
        'La entrega se realiza dentro de la franja elegida. No podemos comprometer una hora exacta, ya que depende de la ruta de reparto y del tránsito.',
      ] },
      { t: 'Anticipación', c: [
        'Te recomendamos pedir con al menos un día de anticipación. Los pedidos para el mismo día quedan sujetos a disponibilidad de flores y de reparto.',
        'En fechas de alta demanda (San Valentín, Día de la Madre, Navidad y otras) recomendamos reservar con varios días de anticipación; en esos días las franjas horarias pueden ampliarse.',
      ] },
      { t: 'Datos de entrega', c: [
        'Quien compra es responsable de entregar la dirección completa y correcta (calle, número, departamento, block o referencias) y un teléfono de contacto de quien recibe.',
        'Si la dirección está incompleta o es incorrecta y eso impide la entrega, un nuevo despacho puede tener un costo adicional.',
      ] },
      { t: 'Si no hay nadie para recibir', c: [
        'Al llegar llamaremos a quien recibe y, si no contesta, a quien hizo el pedido. Con tu autorización, podemos dejar el arreglo con otra persona adulta en el domicilio o en conserjería.',
        'Si no es posible entregar, el arreglo vuelve a la tienda, donde puedes retirarlo o coordinar un nuevo despacho, que puede tener un costo adicional.',
        'Al tratarse de flores naturales, no podemos garantizar su frescura si la entrega se retrasa por causas ajenas a la florería.',
      ] },
      { t: 'Entregas en clínicas, empresas, velatorios y cementerios', c: [
        'En clínicas, hospitales, empresas, colegios y condominios, la entrega se hace en recepción, portería o donde lo permitan las normas del lugar.',
        'Para arreglos de condolencias, indícanos el lugar y la hora del servicio para coordinar la entrega con la anticipación necesaria.',
      ] },
      { t: 'Retiro en tienda', c: [
        `Puedes retirar tu pedido en ${NEGOCIO.direccion}, en la fecha y franja que elegiste. ${NEGOCIO.horario}, ${NEGOCIO.horarioNota.toLowerCase()}.`,
      ] },
      { t: 'Situaciones fuera de nuestro control', c: [
        'Ante cortes de camino, mal tiempo u otras situaciones de fuerza mayor que impidan cumplir con la entrega, te contactaremos para reprogramarla.',
      ] },
    ] },

  /* ---------------- POLÍTICA DE PRIVACIDAD ---------------- */
  { id: 'politica-de-privacidad', titulo: 'Política de privacidad',
    resumen: 'Qué datos nos entregas al hacer un pedido y cómo los usamos.',
    secciones: [
      { t: 'Quiénes somos', c: [
        `${NEGOCIO.nombre}, con tienda en ${NEGOCIO.direccion}, es responsable de los datos personales que nos entregas a través de este sitio y de WhatsApp. Para cualquier consulta sobre tus datos puedes escribirnos a ${NEGOCIO.email}.`,
      ] },
      { t: 'Qué datos recopilamos', c: [
        'Solo los datos que tú ingresas al hacer un pedido:',
        [
          'Nombre y teléfono de quien compra.',
          'Nombre y teléfono de quien recibe.',
          'Dirección y comuna de entrega, fecha y franja horaria.',
          'Dedicatoria, observaciones y preferencias de personalización del arreglo.',
        ],
      ] },
      { t: 'Para qué los usamos', c: [
        [
          'Preparar tu pedido y confirmar disponibilidad, valor y forma de pago.',
          'Coordinar y realizar la entrega o el retiro en tienda.',
          'Contactarte ante cualquier duda o inconveniente con tu pedido.',
        ],
        'No usamos tus datos para enviarte publicidad sin tu consentimiento, y no vendemos ni cedemos tus datos a terceros.',
      ] },
      { t: 'Cómo funciona este sitio', c: [
        'El carrito y los datos del formulario se guardan únicamente en tu propio navegador, para que no los pierdas si cierras la página. Puedes eliminarlos borrando los datos de navegación.',
        'Tu pedido nos llega solo cuando presionas “Continuar por WhatsApp” y envías el mensaje. Este sitio no procesa pagos en línea ni almacena datos de tarjetas.',
        'No usamos cookies publicitarias ni de seguimiento.',
      ] },
      { t: 'Servicios de terceros', c: [
        [
          'WhatsApp: el pedido se envía y coordina por WhatsApp, servicio que se rige por sus propias condiciones y política de privacidad.',
          'Google: el sitio carga tipografías de Google Fonts y, en la página de Contacto, un mapa de Google Maps.',
          'Reparto: quien realiza el despacho recibe solo los datos necesarios para entregar (nombre, teléfono y dirección de quien recibe).',
        ],
      ] },
      { t: 'Datos de quien recibe', c: [
        'Al entregarnos los datos de otra persona (quien recibe el regalo), declaras que puedes compartirlos para este fin. Los usamos exclusivamente para coordinar y realizar la entrega.',
      ] },
      { t: 'Cuánto tiempo los conservamos', c: [
        'Conservamos los datos del pedido el tiempo necesario para gestionarlo, atender consultas o reclamos posteriores y cumplir con nuestras obligaciones legales y tributarias.',
      ] },
      { t: 'Tus derechos', c: [
        `De acuerdo con la Ley N° 19.628 sobre Protección de la Vida Privada, puedes solicitar conocer, corregir o eliminar tus datos personales, u oponerte a su uso, escribiéndonos a ${NEGOCIO.email} o por WhatsApp al ${NEGOCIO.whatsappVisible}.`,
      ] },
      { t: 'Cambios a esta política', c: [
        'Podemos actualizar esta política para reflejar cambios en el sitio o en la normativa. La versión vigente es siempre la publicada en esta página.',
      ] },
    ] },

  /* ---------------- TÉRMINOS Y CONDICIONES DE COMPRA ---------------- */
  { id: 'terminos-y-condiciones', titulo: 'Términos y condiciones de compra',
    resumen: 'Las condiciones que aplican a los pedidos realizados en este sitio.',
    aviso: true,
    secciones: [
      { t: 'Aspectos generales', c: [
        `Estos términos regulan los pedidos realizados a ${NEGOCIO.nombre}, con tienda en ${NEGOCIO.direccion}, a través de este sitio y de WhatsApp. Al enviar un pedido declaras haberlos leído y aceptado, junto con las políticas de Cambios y cancelaciones, Despachos y Privacidad.`,
      ] },
      { t: 'Cómo se realiza la compra', c: [
        [
          'Eliges tus productos en el sitio y completas los datos de entrega.',
          'Nos envías el pedido por WhatsApp.',
          'Confirmamos la disponibilidad de flores, la fecha, el valor total y el costo de despacho.',
          'Finalizamos la compra contigo por WhatsApp, coordinando el pago.',
        ],
        'El pedido enviado desde el sitio es una solicitud de compra. La compra queda confirmada cuando te confirmamos por WhatsApp la disponibilidad y el valor total, y se acuerda el pago.',
      ] },
      { t: 'Precios', c: [
        'Los precios se expresan en pesos chilenos. Los precios indicados como “desde” corresponden a la versión base del arreglo y pueden variar según el tamaño y la personalización solicitada.',
        'El total que muestra el sitio es estimado y no incluye el despacho. El valor final se confirma por WhatsApp antes del pago.',
      ] },
      { t: 'Medios de pago', c: [
        `Aceptamos ${NEGOCIO.mediosPago}. Este sitio no procesa pagos en línea: el pago se coordina directamente con la florería por WhatsApp o en la tienda.`,
      ] },
      { t: 'Productos naturales y elaboración artesanal', c: [
        AVISOS.artesanal,
        'Las fotografías del sitio son referenciales. Por tratarse de flores naturales y de un trabajo hecho a mano, cada arreglo es único y puede presentar diferencias leves respecto de la imagen.',
        'Si una flor o un complemento del arreglo no está disponible, lo reemplazamos por otro de igual o mayor valor. Cuando el cambio sea relevante para el diseño, te avisaremos antes de elaborarlo.',
        'La duración de las flores depende de su variedad y de los cuidados que reciban después de la entrega (agua limpia, lugar fresco, lejos del sol directo y de fuentes de calor).',
      ] },
      { t: 'Pedidos personalizados', c: [
        'En los arreglos personalizados trabajamos con las indicaciones que nos entregas (colores, flores, nombres, textos o fotos). Revísalas antes de enviar el pedido: no podemos hacernos responsables de errores en la información entregada.',
        'El texto de la dedicatoria se escribe tal como lo envías. Nos reservamos el derecho de no incluir mensajes ofensivos.',
      ] },
      { t: 'Despachos', ver: 'despachos', c: [
        'Las zonas, horarios, costos y condiciones de entrega se detallan en nuestra política de Despachos.',
      ] },
      { t: 'Cambios, cancelaciones y devoluciones', ver: 'cambios-y-cancelaciones', c: [
        'Por tratarse de productos perecibles y hechos a pedido, los cambios y cancelaciones tienen condiciones especiales, detalladas en nuestra política de Cambios y cancelaciones.',
      ] },
      { t: 'Datos personales', ver: 'politica-de-privacidad', c: [
        'Los datos que nos entregas se usan únicamente para gestionar y entregar tu pedido, según nuestra Política de privacidad.',
      ] },
      { t: 'Contenido del sitio', c: [
        `Las fotografías, textos y diseños de este sitio pertenecen a ${NEGOCIO.nombre} y no pueden utilizarse con fines comerciales sin autorización.`,
      ] },
      { t: 'Legislación aplicable', c: [
        'Estos términos se rigen por las leyes de la República de Chile, en especial por la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores. Nada de lo aquí indicado limita los derechos que esa ley te reconoce.',
        'Podemos actualizar estos términos; a cada pedido se le aplica la versión publicada al momento de realizarlo.',
      ] },
    ] },
];
