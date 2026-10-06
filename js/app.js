/* =====================================================================
   FLORERÍA VALENTINA · LÓGICA DEL SITIO
   Router por hash, carrito en localStorage, checkout y cierre por WhatsApp.
   Los productos y datos del negocio se editan en js/data.js
   ===================================================================== */
(function () {
  'use strict';

  /* ---------------- Utilidades ---------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const app = $('#app');

  const fmt = (n) => '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const byId = Object.fromEntries(PRODUCTOS.map((p) => [p.id, p]));
  const ocasionById = Object.fromEntries(OCASIONES.map((o) => [o.id, o]));
  const categoriaById = Object.fromEntries(CATEGORIAS.map((c) => [c.id, c]));

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* modo privado */ }
    },
    del(key) { try { localStorage.removeItem(key); } catch { /* */ } },
  };

  const waLink = (text) => `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(text)}`;

  /* ---------------- Íconos (línea fina) ---------------- */
  const ICONS = {
    flower: '<circle cx="12" cy="12" r="2.2"/><path d="M12 9.8c-1.6-2.6-1-5.3 0-6.3 1 1 1.6 3.7 0 6.3zM14.2 12c2.6-1.6 5.3-1 6.3 0-1 1-3.7 1.6-6.3 0zM12 14.2c1.6 2.6 1 5.3 0 6.3-1-1-1.6-3.7 0-6.3zM9.8 12c-2.6 1.6-5.3 1-6.3 0 1-1 3.7-1.6 6.3 0z"/>',
    bouquet: '<path d="M8 13l4 8 4-8"/><path d="M6.5 13h11"/><circle cx="9" cy="8.5" r="2.5"/><circle cx="15" cy="8.5" r="2.5"/><circle cx="12" cy="5" r="2.5"/>',
    form: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M8.5 10h7M8.5 14h7M8.5 18h4"/>',
    chat: '<path d="M4 18.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7.5L4 20z"/><path d="M8 9h8M8 12.5h5"/>',
    gift: '<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M3 9h18M12 9v11M12 9c-1-3-5-4.5-5.5-2S10 9 12 9zm0 0c1-3 5-4.5 5.5-2S14 9 12 9z"/>',
    truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    phone: '<path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/>',
    facebook: '<path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V9a.5.5 0 0 1 .5-.5z"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
    store: '<path d="M4 9.5V20h16V9.5M3 9.5l1.5-5h15l1.5 5M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M10 20v-5h4v5"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    alert: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v5M12 16h.01"/>',
  };
  const icon = (name, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
  const WA_ICON = $('.wa-float svg').outerHTML;

  /* ---------------- Carrito ---------------- */
  let cart = store.get('fv_cart', []).filter((it) => byId[it.id]);

  const unitPrice = (it) => {
    const p = byId[it.id];
    const t = p.tamanos && p.tamanos.find((s) => s.nombre === it.size);
    return t ? t.precio : p.precio;
  };
  const cartCount = () => cart.reduce((n, it) => n + it.qty, 0);
  const cartTotal = () => cart.reduce((n, it) => n + unitPrice(it) * it.qty, 0);
  const isExtra = (p) => p.categoria === 'extras';

  const cleanPerso = (perso) => {
    if (!perso) return null;
    const out = {};
    Object.entries(perso).forEach(([k, v]) => { if (v && String(v).trim()) out[k] = String(v).trim(); });
    return Object.keys(out).length ? out : null;
  };

  function saveCart() {
    store.set('fv_cart', cart);
    updateCartBadge(true);
  }

  function addToCart(id, { size = null, perso = null, qty = 1 } = {}) {
    const p = byId[id];
    if (!size && p.tamanos) size = p.tamanos[0].nombre;
    perso = cleanPerso(perso);
    const key = JSON.stringify([id, size, perso]);
    const existing = cart.find((it) => JSON.stringify([it.id, it.size, it.perso]) === key);
    if (existing) existing.qty += qty;
    else cart.push({ uid: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), id, size, perso, qty });
    saveCart();
  }

  function updateCartBadge(bump) {
    const el = $('#cartCount');
    const n = cartCount();
    el.textContent = n;
    el.toggleAttribute('data-empty', n === 0);
    $('.cart-btn').setAttribute('aria-label', `Ver carrito, ${n} ${n === 1 ? 'producto' : 'productos'}`);
    if (bump) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); setTimeout(() => el.classList.remove('bump'), 250); }
  }

  const PERSO_LABELS = {
    colores: 'Colores', favoritas: 'Flores favoritas', evitar: 'Evitar',
    presupuesto: 'Presupuesto', notas: 'Notas',
  };
  const persoText = (perso, sep = ' | ') => perso
    ? Object.entries(perso).map(([k, v]) => `${PERSO_LABELS[k] || k}: ${v}`).join(sep)
    : '';

  /* ---------------- Toast ---------------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 2400);
  }

  /* ---------------- Modal ---------------- */
  const modal = $('#modal');
  const panel = $('#modalPanel');
  let lastFocus = null;

  function openModal(html, { wide = false } = {}) {
    lastFocus = document.activeElement;
    panel.className = 'modal-panel' + (wide ? ' modal-panel--wide' : '');
    panel.innerHTML = `<button class="icon-btn modal-close" data-close aria-label="Cerrar">${icon('close')}</button>` + html;
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    const first = panel.querySelector('input:not([type="radio"]), select, textarea');
    (first && window.innerWidth >= 640 ? first : panel).focus({ preventScroll: true });
  }
  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    panel.innerHTML = '';
    document.body.classList.remove('no-scroll');
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }
  modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab' && !modal.hidden) {
      const f = $$('button, [href], input, select, textarea', panel).filter((el) => !el.disabled && el.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------------- Componentes ---------------- */
  const priceHTML = (p) => p.sinDesde
    ? `<p class="price">${fmt(p.precio)}</p>`
    : `<p class="price"><small>desde</small>${fmt(p.precio)}</p>`;

  function productCard(p) {
    const tags = p.ocasiones.slice(0, 2).map((o) => `<span class="tag">${esc(ocasionById[o].etiqueta || ocasionById[o].nombre)}</span>`).join('');
    return `
      <article class="card reveal">
        <a class="card-img" href="#/producto/${p.id}" aria-label="${esc(p.nombre)}">
          <img src="${p.fotos[0]}" alt="${esc(p.nombre)}" loading="lazy" width="720" height="900">
          ${isExtra(p) ? '' : `<div class="card-tags">${tags}</div>`}
        </a>
        <div class="card-body">
          <h3 class="card-title"><a href="#/producto/${p.id}">${esc(p.nombre)}</a></h3>
          <p class="card-desc">${esc(p.desc)}</p>
          ${priceHTML(p)}
          <div class="card-actions">
            <button class="btn" data-add="${p.id}">Agregar al carrito</button>
            <button class="btn btn--outline" data-customize="${p.id}">Personalizar</button>
          </div>
        </div>
      </article>`;
  }

  const EXTRA_KIND = { bombones: 'Bombones', globos: 'Globos', peluches: 'Peluches' };
  const EXTRA_ORDER = ['bombones', 'globos', 'peluches'];
  const upsellItems = () => PRODUCTOS
    .filter((p) => EXTRA_ORDER.includes(p.extra))
    .sort((a, b) => EXTRA_ORDER.indexOf(a.extra) - EXTRA_ORDER.indexOf(b.extra));

  function upsellHTML({ wrap = false } = {}) {
    const items = upsellItems().map((p) => `
      <div class="upsell-item">
        <img src="${p.fotos[0]}" alt="" loading="lazy" width="300" height="300">
        <span class="u-kind">${EXTRA_KIND[p.extra]}</span>
        <span class="u-name">${esc(p.nombre)}</span>
        <span class="u-price">${fmt(p.precio)}</span>
        <div class="u-actions">
          <button class="btn btn--sm" data-upsell-add="${p.id}">+ Agregar</button>
        </div>
      </div>`).join('');
    const inner = `
      <div class="upsell">
        <div class="upsell-head">
          <h3><span class="spark" aria-hidden="true">✦</span> Hazlo aún más especial</h3>
          <p>Agrega un detalle a tu pedido.</p>
        </div>
        <div class="upsell-row" role="list" aria-label="Extras para agregar">${items}</div>
      </div>`;
    return wrap ? `<section class="section-upsell">${inner}</section>` : inner;
  }

  // Aviso de elaboración artesanal (producto, carrito, checkout, cómo comprar, políticas)
  const NATURE_NOTE = `
    <aside class="nature-note">
      ${icon('flower')}
      <div>
        <strong class="nature-note-title">Aviso importante</strong>
        <p>${esc(AVISOS.artesanal)}</p>
      </div>
    </aside>`;
  // Aviso breve de disponibilidad de flores (tienda, inicio, modales, confirmación, footer)
  const flowerNote = (cls = '') => `<p class="flower-note ${cls}">${icon('flower')}<span>${esc(AVISOS.flores)}</span></p>`;
  const cartHasFlowers = () => cart.some((it) => !isExtra(byId[it.id]));

  const COLOR_SUGERENCIAS = ['Rojos', 'Rosados', 'Blancos', 'Amarillos', 'Pasteles', 'Azules'];
  const PRESUPUESTOS = ['El precio indicado', 'Hasta $25.000', '$25.000 – $40.000', '$40.000 – $60.000', 'Más de $60.000'];

  function persoFields(v = {}, px = 'pf') {
    return `
      <div class="form-grid">
        <div class="field">
          <label for="${px}-colores">Colores preferidos <span class="opt">(opcional)</span></label>
          <input class="input" id="${px}-colores" name="colores" value="${esc(v.colores)}" placeholder="Ej: tonos rosados y blancos" maxlength="80">
          <div class="quick" data-append="${px}-colores">
            ${COLOR_SUGERENCIAS.map((c) => `<button type="button" class="chip">${c}</button>`).join('')}
          </div>
        </div>
        <div class="form-grid form-grid--2">
          <div class="field">
            <label for="${px}-favoritas">Flores favoritas <span class="opt">(opcional)</span></label>
            <input class="input" id="${px}-favoritas" name="favoritas" value="${esc(v.favoritas)}" placeholder="Ej: rosas, girasoles" maxlength="80">
          </div>
          <div class="field">
            <label for="${px}-evitar">Flores a evitar <span class="opt">(opcional)</span></label>
            <input class="input" id="${px}-evitar" name="evitar" value="${esc(v.evitar)}" placeholder="Ej: lirios (alergia)" maxlength="80">
          </div>
        </div>
        <div class="field">
          <label for="${px}-presupuesto">Presupuesto aproximado</label>
          <select id="${px}-presupuesto" name="presupuesto">
            ${PRESUPUESTOS.map((p) => `<option ${v.presupuesto === p ? 'selected' : ''}>${p}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label for="${px}-notas">Notas o ideas <span class="opt">(opcional)</span></label>
          <textarea class="textarea" id="${px}-notas" name="notas" maxlength="300" placeholder="Cuéntanos lo que imaginas, el estilo de la persona o cualquier detalle.">${esc(v.notas)}</textarea>
        </div>
      </div>`;
  }

  function readPerso(root) {
    const get = (n) => { const el = root.querySelector(`[name="${n}"]`); return el ? el.value.trim() : ''; };
    const perso = { colores: get('colores'), favoritas: get('favoritas'), evitar: get('evitar'), presupuesto: get('presupuesto'), notas: get('notas') };
    // "El precio indicado" no aporta información al pedido si no hay nada más
    if (perso.presupuesto === PRESUPUESTOS[0]) perso.presupuesto = '';
    return cleanPerso(perso);
  }

  function sizeOptions(p, selected, name = 'size') {
    if (!p.tamanos) return '';
    return `
      <span class="field-label" id="${name}-lbl">Tamaño</span>
      <div class="size-options" role="radiogroup" aria-labelledby="${name}-lbl">
        ${p.tamanos.map((t, i) => `
          <label class="size-opt">
            <input type="radio" name="${name}" value="${esc(t.nombre)}" ${(selected ? selected === t.nombre : i === 0) ? 'checked' : ''}>
            <span>${esc(t.nombre)}<small>${fmt(t.precio)}</small></span>
          </label>`).join('')}
      </div>`;
  }

  /* ---------------- Modales de producto ---------------- */
  function openAddedModal(id) {
    const p = byId[id];
    openModal(`
      <div class="added-head">${icon('check')} Agregado a tu pedido</div>
      <div class="modal-product">
        <img src="${p.fotos[0]}" alt="">
        <div><strong>${esc(p.nombre)}</strong><span>${p.sinDesde ? '' : 'desde '}${fmt(p.precio)}</span></div>
      </div>
      ${upsellHTML()}
      <div class="modal-actions">
        <a class="btn" href="#/carrito">Ver carrito</a>
        <button class="btn btn--outline" data-close>Seguir comprando</button>
      </div>`, { wide: true });
  }

  function openCustomizeModal(id, editUid = null) {
    const p = byId[id];
    const item = editUid ? cart.find((it) => it.uid === editUid) : null;
    const v = (item && item.perso) || {};
    openModal(`
      <h2 id="modalTitle">Personaliza tu arreglo</h2>
      <p class="modal-sub">Cuéntanos tus preferencias y lo armamos para ti.</p>
      <div class="modal-product">
        <img src="${p.fotos[0]}" alt="">
        <div><strong>${esc(p.nombre)}</strong><span>${p.sinDesde ? '' : 'desde '}${fmt(p.precio)}</span></div>
      </div>
      <form id="persoForm" novalidate>
        ${sizeOptions(p, item && item.size, 'm-size')}
        ${p.tamanos ? '<div style="height:18px"></div>' : ''}
        ${persoFields(v, 'pm')}
        ${isExtra(p) ? '' : flowerNote('flower-note--start flower-note--gap')}
        <div class="modal-actions">
          <button class="btn" type="submit">${item ? 'Guardar cambios' : 'Guardar y agregar'}</button>
          <button class="btn btn--outline" type="button" data-close>Cancelar</button>
        </div>
      </form>`);
    $('#persoForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.currentTarget;
      const perso = readPerso(f);
      const sizeEl = f.querySelector('[name="m-size"]:checked');
      const size = sizeEl ? sizeEl.value : null;
      if (item) {
        item.perso = perso; if (size) item.size = size;
        saveCart(); closeModal(); render(); toast('Personalización guardada');
      } else {
        addToCart(id, { size, perso });
        closeModal();
        if (isExtra(p)) toast(`${p.nombre} agregado`); else openAddedModal(id);
      }
    });
  }

  function markUpsellDone(id) {
    $$(`[data-upsell-add="${id}"]`).forEach((b) => {
      const label = b.textContent;
      b.classList.add('is-done');
      b.textContent = '✓ Agregado';
      setTimeout(() => { b.classList.remove('is-done'); b.textContent = label; }, 1600);
    });
  }

  /* ---------------- Eventos globales (delegación) ---------------- */
  document.addEventListener('click', (e) => {
    const t = e.target;
    let el;

    if ((el = t.closest('[data-add]'))) {
      const p = byId[el.dataset.add];
      addToCart(p.id);
      if (isExtra(p)) toast(`${p.nombre} agregado al carrito`);
      else openAddedModal(p.id);
      return;
    }
    if ((el = t.closest('[data-customize]'))) { openCustomizeModal(el.dataset.customize); return; }
    if ((el = t.closest('[data-upsell-add]'))) {
      const p = byId[el.dataset.upsellAdd];
      addToCart(p.id);
      renderCartPreserveScroll();
      markUpsellDone(p.id);
      return;
    }
    if ((el = t.closest('[data-edit]'))) {
      const it = cart.find((i) => i.uid === el.dataset.edit);
      if (it) openCustomizeModal(it.id, it.uid);
      return;
    }
    if ((el = t.closest('[data-qty]'))) {
      const it = cart.find((i) => i.uid === el.dataset.qty);
      if (!it) return;
      it.qty += Number(el.dataset.delta);
      if (it.qty < 1) cart = cart.filter((i) => i !== it);
      saveCart(); renderCartPreserveScroll();
      return;
    }
    if ((el = t.closest('[data-remove]'))) {
      const it = cart.find((i) => i.uid === el.dataset.remove);
      cart = cart.filter((i) => i.uid !== el.dataset.remove);
      saveCart(); renderCartPreserveScroll();
      if (it) toast(`Quitaste ${byId[it.id].nombre}`);
      return;
    }
    // Chips que agregan texto a un campo (colores, dedicatoria, observaciones)
    if ((el = t.closest('[data-append] .chip'))) {
      const wrap = el.closest('[data-append]');
      const field = document.getElementById(wrap.dataset.append);
      const val = el.textContent.trim();
      const sep = wrap.dataset.sep || ', ';
      if (!field.value.trim()) field.value = val;
      else if (!field.value.includes(val)) field.value = field.value.trim().replace(/[,.]$/, '') + sep + val;
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.focus();
      return;
    }
  });

  /* ---------------- Páginas ---------------- */
  const STEPS = [
    { icon: 'bouquet', t: 'Elige tu arreglo', d: 'Busca por categoría o tipo y agrégalo al carrito.' },
    { icon: 'form', t: 'Completa los datos de entrega', d: 'Quién envía, quién recibe, fecha y dedicatoria.' },
    { icon: 'chat', t: 'Confirma por WhatsApp', d: 'Te llega el pedido armado; confirmamos stock y pago.' },
    { icon: 'gift', t: 'Recibe o retira tu pedido', d: 'Despachamos en Los Andes o lo retiras en tienda.' },
  ];
  const stepsHTML = () => `
    <div class="steps">
      ${STEPS.map((s, i) => `
        <div class="step reveal">
          <div class="step-icon">${icon(s.icon)}<span class="step-num">${i + 1}</span></div>
          <div><h3>${s.t}</h3><p>${s.d}</p></div>
        </div>`).join('')}
    </div>`;

  const trustHTML = () => `
    <div class="trust">
      <div class="trust-item reveal">${icon('truck')}<div><h3>Despacho y retiro en Los Andes</h3><p>Llevamos tu regalo a domicilio o lo retiras en ${esc(NEGOCIO.direccion.split(',')[0])}.</p></div></div>
      <div class="trust-item reveal">${icon('card')}<div><h3>Efectivo, transferencia y tarjetas</h3><p>Coordinamos el pago por WhatsApp, sin pagos en línea.</p></div></div>
      <div class="trust-item reveal">${icon('clock')}<div><h3>Atención de lunes a domingo</h3><p>De 08:30 a 17:30 hrs, horario continuado.</p></div></div>
    </div>`;

  function pageHome() {
    const destacados = PRODUCTOS.filter((p) => p.destacado).slice(0, 8);
    return `
      <section class="hero">
        <div class="container hero-inner">
          <div class="hero-text">
            <span class="eyebrow">Florería en Los Andes</span>
            <h1>Flores que dicen <em>lo que sientes</em></h1>
            <p>Ramos, cajas y arreglos hechos a mano. Elige tu regalo en pocos clics, envíanos tu pedido y finalizamos la compra contigo por WhatsApp.</p>
            <a href="#/tienda" class="btn btn--lg">Ver arreglos</a>
            <div class="hero-meta">
              <span>${icon('truck')} Despacho en Los Andes</span>
              <span>${icon('store')} Retiro en tienda</span>
            </div>
          </div>
          <div class="hero-img">
            <img src="img/productos/hero.jpg" alt="Ramo de girasoles y rosas rojas de Florería Valentina" width="750" height="1000" fetchpriority="high">
          </div>
        </div>
      </section>

      <section class="occasions" aria-labelledby="oc-title">
        <div class="container">
          <div class="section-head">
            <h2 class="section-title section-title--plain" id="oc-title">Categorías</h2>
            <p class="section-sub">Elige una y te mostramos los arreglos ideales.</p>
          </div>
          <div class="occasion-grid">
            ${OCASIONES.map((o) => `
              <a class="occasion-card" href="#/tienda?ocasion=${o.id}">
                <span class="emo" aria-hidden="true">${o.emoji}</span>
                <span class="oc-text">${esc(o.nombre)}<small>${esc(o.desc)}</small></span>
              </a>`).join('')}
          </div>
        </div>
      </section>

      <section class="section section--cream" aria-labelledby="cat-title">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Catálogo</span>
            <h2 class="section-title" id="cat-title">Explora por tipo</h2>
          </div>
          <div class="cat-scroller">
            ${CATEGORIAS.map((c) => `
              <a class="cat-card reveal" href="#/tienda?cat=${c.id}">
                <div class="img"><img src="${c.foto}" alt="" loading="lazy" width="720" height="900"></div>
                <h3>${esc(c.nombre)}</h3>
                <p>${esc(c.desc)}</p>
              </a>`).join('')}
          </div>
        </div>
      </section>

      <section class="section" aria-labelledby="how-title">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Fácil y rápido</span>
            <h2 class="section-title" id="how-title">Cómo comprar</h2>
          </div>
          ${stepsHTML()}
        </div>
      </section>

      <section class="section section--cream" aria-labelledby="best-title">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Favoritos de nuestros clientes</span>
            <h2 class="section-title" id="best-title">Más vendidos</h2>
          </div>
          <div class="product-grid">${destacados.map(productCard).join('')}</div>
          ${flowerNote('flower-note--gap')}
          <div style="text-align:center;margin-top:36px"><a class="btn btn--outline" href="#/tienda">Ver toda la tienda</a></div>
        </div>
      </section>

      <section class="section" aria-label="Por qué comprar con nosotros">
        <div class="container">${trustHTML()}</div>
      </section>`;
  }

  /* ----- Tienda ----- */
  function filterProducts({ ocasion, cat, orden }) {
    let list = PRODUCTOS.filter((p) => (!ocasion || p.ocasiones.includes(ocasion)) && (!cat || p.categoria === cat));
    if (!cat && !ocasion) list = list.filter((p) => !isExtra(p)).concat(list.filter(isExtra)); // extras al final
    if (orden === 'asc') list = [...list].sort((a, b) => a.precio - b.precio);
    if (orden === 'desc') list = [...list].sort((a, b) => b.precio - a.precio);
    return list;
  }

  function shopHeading({ ocasion, cat }) {
    if (ocasion && !cat) return { t: ocasionById[ocasion].nombre, s: ocasionById[ocasion].desc };
    if (cat && !ocasion) return { t: categoriaById[cat].nombre, s: categoriaById[cat].desc };
    if (cat && ocasion) return { t: categoriaById[cat].nombre, s: `Para ${ocasionById[ocasion].nombre.toLowerCase()}` };
    return { t: 'Tienda', s: 'Todos nuestros arreglos, listos para regalar.' };
  }

  function pageShop(params) {
    const f = {
      ocasion: ocasionById[params.get('ocasion')] ? params.get('ocasion') : '',
      cat: categoriaById[params.get('cat')] ? params.get('cat') : '',
      orden: params.get('orden') || '',
    };
    const h = shopHeading(f);
    return {
      title: h.t,
      html: `
        <section class="page-head">
          <div class="container">
            <p class="crumbs"><a href="#/">Inicio</a> / Tienda</p>
            <h1 id="shopTitle">${esc(h.t)}</h1>
            <p id="shopSub">${esc(h.s)}</p>
          </div>
        </section>
        <div class="filters">
          <div class="container">
            <div class="filter-row" role="group" aria-label="Filtrar por categoría">
              <button class="chip" data-f="ocasion" data-v="" aria-pressed="${!f.ocasion}">Todas las categorías</button>
              ${OCASIONES.map((o) => `<button class="chip" data-f="ocasion" data-v="${o.id}" aria-pressed="${f.ocasion === o.id}"><span aria-hidden="true">${o.emoji}</span> ${esc(o.nombre)}</button>`).join('')}
            </div>
            <div class="filter-row" role="group" aria-label="Filtrar por tipo">
              <button class="chip chip--rose" data-f="cat" data-v="" aria-pressed="${!f.cat}">Todos los tipos</button>
              ${CATEGORIAS.map((c) => `<button class="chip chip--rose" data-f="cat" data-v="${c.id}" aria-pressed="${f.cat === c.id}">${esc(c.nombre)}</button>`).join('')}
            </div>
          </div>
        </div>
        <div class="container">
          <div class="filter-bar">
            <span id="shopCount" aria-live="polite"></span>
            <label><span class="sr-only">Ordenar</span>
              <select class="select" id="sortSel">
                <option value="">Destacados</option>
                <option value="asc" ${f.orden === 'asc' ? 'selected' : ''}>Menor precio</option>
                <option value="desc" ${f.orden === 'desc' ? 'selected' : ''}>Mayor precio</option>
              </select>
            </label>
          </div>
          ${flowerNote('flower-note--start flower-note--shop')}
          <div class="product-grid" id="shopGrid"></div>
          <div style="height:60px"></div>
        </div>`,
      mount() {
        const draw = () => {
          const list = filterProducts(f);
          const oc = f.ocasion && !f.cat ? ocasionById[f.ocasion] : null; // categoría aún sin productos publicados
          $('#shopGrid').innerHTML = list.length
            ? list.map(productCard).join('')
            : oc
            ? `<div class="empty" style="grid-column:1/-1"><h2>${esc(oc.nombre)} a pedido</h2><p>Los arreglos de esta categoría los preparamos a pedido. Escríbenos y lo diseñamos contigo.</p><a class="btn" href="${waLink(`Hola, quisiera cotizar un arreglo de la categoría ${oc.nombre} 🌸`)}" target="_blank" rel="noopener">Cotizar por WhatsApp</a></div>`
            : `<div class="empty" style="grid-column:1/-1"><h2>Sin resultados</h2><p>No tenemos arreglos con esa combinación, pero podemos crearlo para ti.</p><a class="btn" href="${waLink('Hola, quisiera un arreglo personalizado 🌸')}" target="_blank" rel="noopener">Pedir uno a medida</a></div>`;
          $('#shopCount').textContent = `${list.length} ${list.length === 1 ? 'producto' : 'productos'}`;
          const h2 = shopHeading(f);
          $('#shopTitle').textContent = h2.t; $('#shopSub').textContent = h2.s;
          document.title = `${h2.t} · ${NEGOCIO.nombre}`;
          const qs = new URLSearchParams(Object.entries(f).filter(([, v]) => v)).toString();
          history.replaceState(null, '', '#/tienda' + (qs ? '?' + qs : ''));
          observeReveal();
        };
        $$('.filters .chip').forEach((b) => b.addEventListener('click', () => {
          f[b.dataset.f] = b.dataset.v;
          $$(`.filters [data-f="${b.dataset.f}"]`).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
          draw();
        }));
        $('#sortSel').addEventListener('change', (e) => { f.orden = e.target.value; draw(); });
        draw();
        const act = $('.filters .chip[aria-pressed="true"]:not([data-v=""])');
        if (act) act.scrollIntoView({ block: 'nearest', inline: 'center' });
      },
    };
  }

  /* ----- Ocasiones ----- */
  function pageOccasions() {
    return {
      title: 'Categorías',
      html: `
        <section class="page-head">
          <div class="container">
            <p class="crumbs"><a href="#/">Inicio</a> / Categorías</p>
            <h1>Categorías</h1>
            <p>¿No sabes qué regalar? Empieza por el motivo.</p>
          </div>
        </section>
        <section class="section">
          <div class="container">
            <div class="occasion-tiles">
              ${OCASIONES.map((o) => {
                const n = PRODUCTOS.filter((p) => p.ocasiones.includes(o.id) && !isExtra(p)).length;
                return `
                <a class="occasion-tile reveal" href="#/tienda?ocasion=${o.id}">
                  <div class="img"><img src="${o.foto}" alt="" loading="lazy" width="720" height="900"></div>
                  <h3>${esc(o.nombre)}</h3>
                  <p>${esc(o.desc)}</p>
                  <p class="count">${n ? `${n} ${n === 1 ? 'arreglo' : 'arreglos'}` : 'A pedido'}</p>
                </a>`;
              }).join('')}
            </div>
          </div>
        </section>`,
    };
  }

  /* ----- Detalle de producto ----- */
  function pageProduct(id) {
    const p = byId[id];
    if (!p) return pageNotFound();
    const related = PRODUCTOS.filter((x) => x.categoria === p.categoria && x.id !== p.id).slice(0, 4);
    const cat = categoriaById[p.categoria];
    return {
      title: p.nombre,
      html: `
        <div class="container">
          <div class="detail">
            <div class="gallery">
              <div class="gallery-main" id="galMain" tabindex="0" aria-label="Galería de fotos">
                ${p.fotos.map((src, i) => `<img src="${src}" alt="${esc(p.nombre)}${p.fotos.length > 1 ? ` – foto ${i + 1}` : ''}" width="720" height="900" ${i ? 'loading="lazy"' : ''}>`).join('')}
              </div>
              ${p.fotos.length > 1 ? `
                <div class="gallery-dots" aria-hidden="true">${p.fotos.map((_, i) => `<span class="${i ? '' : 'on'}"></span>`).join('')}</div>
                <div class="thumbs">${p.fotos.map((src, i) => `<button class="${i ? '' : 'on'}" data-thumb="${i}" aria-label="Ver foto ${i + 1}"><img src="${src}" alt=""></button>`).join('')}</div>` : ''}
            </div>

            <div class="detail-info">
              <p class="crumbs"><a href="#/">Inicio</a> / <a href="#/tienda?cat=${cat.id}">${esc(cat.nombre)}</a></p>
              <h1>${esc(p.nombre)}</h1>
              <div class="tags">${p.ocasiones.map((o) => `<a class="tag" href="#/tienda?ocasion=${o}" style="text-decoration:none">${esc(ocasionById[o].nombre)}</a>`).join('')}</div>
              <p class="detail-price" id="dPrice">${p.sinDesde ? '' : '<small>desde </small>'}${fmt(p.precio)}</p>
              <p class="detail-desc">${esc(p.detalle || p.desc)}</p>

              <form id="buyForm" novalidate>
                ${sizeOptions(p)}
                <details class="customize" id="customize">
                  <summary>
                    <span>¿Quieres personalizarlo?<span class="hint">Colores, tipo de flor, presupuesto o ideas.</span></span>
                    <span class="plus" aria-hidden="true">+</span>
                  </summary>
                  <div class="customize-body">${persoFields()}</div>
                </details>
                <div class="buy-row">
                  <div class="qty" aria-label="Cantidad">
                    <button type="button" data-dq="-1" aria-label="Quitar uno">−</button>
                    <span id="dQty">1</span>
                    <button type="button" data-dq="1" aria-label="Agregar uno">+</button>
                  </div>
                  <button type="submit" class="btn btn--lg">Agregar al carrito</button>
                </div>
              </form>

              ${isExtra(p) ? '' : NATURE_NOTE}

              <div class="detail-perks">
                <div>${icon('truck')} Despacho a domicilio en Los Andes y alrededores</div>
                <div>${icon('store')} Retiro en tienda, ${esc(NEGOCIO.direccion)}</div>
                <div>${icon('chat')} Confirmas stock y pago por WhatsApp, sin pagar en línea</div>
              </div>
            </div>
          </div>

          ${related.length ? `
          <section class="section" style="padding-top:10px" aria-labelledby="rel-title">
            <div class="section-head"><h2 class="section-title" id="rel-title">También te puede gustar</h2></div>
            <div class="product-grid">${related.map(productCard).join('')}</div>
          </section>` : ''}
        </div>`,
      mount() {
        let qty = 1;
        const form = $('#buyForm');
        const priceEl = $('#dPrice');
        form.addEventListener('change', (e) => {
          if (e.target.name === 'size') {
            const t = p.tamanos.find((s) => s.nombre === e.target.value);
            priceEl.innerHTML = fmt(t.precio);
          }
        });
        $$('[data-dq]', form).forEach((b) => b.addEventListener('click', () => {
          qty = Math.max(1, Math.min(20, qty + Number(b.dataset.dq)));
          $('#dQty').textContent = qty;
        }));
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const sizeEl = form.querySelector('[name="size"]:checked');
          addToCart(p.id, { size: sizeEl ? sizeEl.value : null, perso: readPerso(form), qty });
          if (isExtra(p)) toast(`${p.nombre} agregado al carrito`); else openAddedModal(p.id);
        });
        // galería
        const main = $('#galMain');
        const imgs = $$('img', main);
        if (imgs.length > 1) {
          main.addEventListener('scroll', () => {
            const i = Math.round(main.scrollLeft / main.clientWidth);
            $$('.gallery-dots span').forEach((d, j) => d.classList.toggle('on', i === j));
            $$('.thumbs button').forEach((d, j) => d.classList.toggle('on', i === j));
          }, { passive: true });
          $$('[data-thumb]').forEach((b) => b.addEventListener('click', () => {
            main.scrollTo({ left: main.clientWidth * Number(b.dataset.thumb), behavior: 'smooth' });
          }));
        }
      },
    };
  }

  /* ----- Carrito ----- */
  function cartItemHTML(it) {
    const p = byId[it.id];
    const unit = unitPrice(it);
    const meta = [it.size, p.sinDesde ? fmt(unit) + ' c/u' : 'desde ' + fmt(unit) + ' c/u'].filter(Boolean).join(' · ');
    const perso = it.perso
      ? `<div class="perso">${Object.entries(it.perso).map(([k, v]) => `<b>${PERSO_LABELS[k] || k}:</b> ${esc(v)}`).join('<br>')}</div>`
      : '';
    const canCustomize = !isExtra(p);
    return `
      <div class="cart-item">
        <a href="#/producto/${p.id}"><img src="${p.fotos[0]}" alt="${esc(p.nombre)}" width="84" height="104"></a>
        <div>
          <h3><a href="#/producto/${p.id}">${esc(p.nombre)}</a></h3>
          <p class="meta">${esc(meta)}</p>
          ${perso}
          <div class="links">
            ${canCustomize ? `<button class="link-btn" data-edit="${it.uid}">${it.perso ? 'Editar personalización' : 'Personalizar'}</button>` : ''}
            <button class="link-btn link-btn--muted" data-remove="${it.uid}">Quitar</button>
          </div>
          <div class="row">
            <div class="qty qty--sm" aria-label="Cantidad de ${esc(p.nombre)}">
              <button data-qty="${it.uid}" data-delta="-1" aria-label="Quitar uno">−</button>
              <span>${it.qty}</span>
              <button data-qty="${it.uid}" data-delta="1" aria-label="Agregar uno">+</button>
            </div>
            <span class="sub">${fmt(unit * it.qty)}</span>
          </div>
        </div>
      </div>`;
  }

  function pageCart() {
    if (!cart.length) {
      return {
        title: 'Carrito',
        html: `
          <div class="container">
            <div class="empty">
              <h2>Tu carrito está vacío</h2>
              <p>Elige un arreglo por ocasión o explora la tienda.</p>
              <a class="btn" href="#/tienda">Ver arreglos</a>
            </div>
            <div class="occasion-grid" style="max-width:760px;margin:0 auto 70px">
              ${OCASIONES.map((o) => `<a class="occasion-card" href="#/tienda?ocasion=${o.id}"><span class="emo" aria-hidden="true">${o.emoji}</span><span class="oc-text">${esc(o.nombre)}</span></a>`).join('')}
            </div>
          </div>`,
      };
    }
    const hasDesde = cart.some((it) => !byId[it.id].sinDesde);
    return {
      title: 'Carrito',
      mobileBar: true,
      html: `
        <section class="page-head"><div class="container"><h1>Tu pedido</h1><p>${cartCount()} ${cartCount() === 1 ? 'producto' : 'productos'}</p></div></section>
        <div class="container">
          <div class="cart-layout">
            <div>
              <div class="cart-list">${cart.map(cartItemHTML).join('')}</div>
              ${cartHasFlowers() ? NATURE_NOTE : ''}
              ${upsellHTML({ wrap: true })}
            </div>
            <aside class="summary" aria-label="Resumen">
              <h2>Resumen</h2>
              <div class="summary-line"><span>Productos</span><span>${fmt(cartTotal())}</span></div>
              <div class="summary-line"><span>Despacho</span><span style="color:var(--muted)">A confirmar</span></div>
              <div class="summary-line total"><span>Total estimado</span><span>${fmt(cartTotal())}</span></div>
              <p class="note">${hasDesde ? 'Los precios son "desde" y pueden ajustarse según tamaño y personalización. ' : ''}El costo de despacho y el pago se confirman por WhatsApp.</p>
              <a class="btn btn--block btn--lg" href="#/checkout">Finalizar pedido</a>
              <a class="btn btn--block btn--outline" href="#/tienda" style="margin-top:10px">Seguir comprando</a>
            </aside>
          </div>
        </div>
        <div class="mobile-bar">
          <div class="mb-total">Total estimado<strong>${fmt(cartTotal())}</strong></div>
          <a class="btn" href="#/checkout">Finalizar pedido</a>
        </div>`,
    };
  }

  function renderCartPreserveScroll() {
    if (currentRoute !== 'carrito') return;
    const y = window.scrollY;
    const row = $('.upsell-row');
    const x = row ? row.scrollLeft : 0;
    render({ keepScroll: true });
    window.scrollTo(0, y);
    const row2 = $('.upsell-row');
    if (row2) row2.scrollLeft = x;
  }

  /* ----- Checkout ----- */
  const pad = (n) => String(n).padStart(2, '0');
  const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const slotStart = (s) => { const [h, m] = s.split('–')[0].trim().split(':').map(Number); return h * 60 + m; };
  const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
  const todayHasSlots = () => FRANJAS.some((s) => slotStart(s) > nowMin());
  const minDate = () => { const d = new Date(); if (!todayHasSlots()) d.setDate(d.getDate() + 1); return isoDate(d); };
  const displayDate = (iso) => { const [y, m, d] = iso.split('-'); return `${d}/${m}/${y}`; };
  const weekday = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });

  const phoneDigits = (s) => String(s).replace(/\D/g, '');
  const validPhone = (s) => { const d = phoneDigits(s).replace(/^56/, ''); return d.length === 9 || d.length === 8; };
  const prettyPhone = (s) => {
    let d = phoneDigits(s).replace(/^56/, '');
    if (d.length === 9 && d[0] === '9') return `+56 9 ${d.slice(1, 5)} ${d.slice(5)}`;
    if (d.length === 8) return `+56 9 ${d.slice(0, 4)} ${d.slice(4)}`;
    return s.trim();
  };

  const DRAFT_KEY = 'fv_checkout';

  function pageCheckout() {
    if (!cart.length) return { redirect: '#/carrito' };
    const d = store.get(DRAFT_KEY, {});
    const entrega = d.entrega || 'despacho';
    const min = minDate();
    const fecha = d.fecha && d.fecha >= min ? d.fecha : '';
    const today = isoDate(new Date());
    const tomorrow = (() => { const t = new Date(); t.setDate(t.getDate() + 1); return isoDate(t); })();

    const field = (id, label, attrs = '', opt = false, err = '') => `
      <div class="field" data-field="${id}">
        <label for="${id}">${label}${opt ? ' <span class="opt">(opcional)</span>' : ''}</label>
        <input class="input" id="${id}" name="${id}" value="${esc(d[id])}" ${attrs}>
        <p class="field-error">${icon('alert')} <span>${err}</span></p>
      </div>`;

    return {
      title: 'Finalizar pedido',
      html: `
        <section class="page-head"><div class="container"><p class="crumbs"><a href="#/carrito">Carrito</a> / Datos de entrega</p><h1>Finalizar pedido</h1><p>Completa los datos y te llevamos a WhatsApp con todo listo.</p></div></section>
        <div class="container">
          <form class="checkout-layout" id="coForm" novalidate>
            <div>
              <section class="co-section">
                <div class="co-title"><span class="n">1</span><h2>¿Quién envía?</h2></div>
                <div class="form-grid form-grid--2">
                  ${field('envia_nombre', 'Tu nombre', 'autocomplete="name" maxlength="60" placeholder="Ej: Camila Rojas"', false, 'Cuéntanos tu nombre.')}
                  ${field('envia_tel', 'Tu teléfono', 'type="tel" inputmode="tel" autocomplete="tel" maxlength="16" placeholder="9 1234 5678"', false, 'Revisa el número, debe tener 9 dígitos (ej: 9 1234 5678).')}
                </div>
              </section>

              <section class="co-section">
                <div class="co-title"><span class="n">2</span><h2>¿Quién recibe?</h2></div>
                <div class="form-grid form-grid--2">
                  ${field('recibe_nombre', 'Nombre de quien recibe', 'maxlength="60" placeholder="Ej: Javiera"', false, 'Indícanos a quién va dirigido.')}
                  ${field('recibe_tel', 'Teléfono de quien recibe', 'type="tel" inputmode="tel" maxlength="16" placeholder="9 1234 5678"', false, 'Necesitamos un teléfono de contacto para la entrega.')}
                </div>
                <label class="check"><input type="checkbox" id="soyYo" ${d.soyYo ? 'checked' : ''}> Lo recibo o retiro yo</label>
              </section>

              <section class="co-section">
                <div class="co-title"><span class="n">3</span><h2>Entrega</h2></div>
                <div class="radio-cards" role="radiogroup" aria-label="Tipo de entrega">
                  <label class="radio-card"><input type="radio" name="entrega" value="despacho" ${entrega === 'despacho' ? 'checked' : ''}><span>${icon('truck')}Despacho a domicilio<small>Costo según comuna</small></span></label>
                  <label class="radio-card"><input type="radio" name="entrega" value="retiro" ${entrega === 'retiro' ? 'checked' : ''}><span>${icon('store')}Retiro en tienda<small>Sin costo</small></span></label>
                </div>
                <div id="despachoFields" class="form-grid" style="margin-top:16px" ${entrega === 'retiro' ? 'hidden' : ''}>
                  ${field('direccion', 'Dirección', 'autocomplete="street-address" maxlength="120" placeholder="Calle, número, depto o block"', false, 'Escribe la dirección de entrega.')}
                  <div class="field" data-field="comuna">
                    <label for="comuna">Comuna</label>
                    <select id="comuna" name="comuna">
                      <option value="">Selecciona una comuna</option>
                      ${COMUNAS.map((c) => `<option ${d.comuna === c ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                    <p class="field-error">${icon('alert')} <span>Elige la comuna para calcular el despacho.</span></p>
                  </div>
                </div>
                <div id="retiroInfo" class="pickup-box" ${entrega === 'despacho' ? 'hidden' : ''}>
                  Retiras en <b>${esc(NEGOCIO.direccion)}</b>.<br>${esc(NEGOCIO.horario)}, ${NEGOCIO.horarioNota.toLowerCase()}.
                </div>
              </section>

              <section class="co-section">
                <div class="co-title"><span class="n">4</span><h2>Fecha de entrega</h2></div>
                <div class="field" data-field="fecha">
                  <div class="date-quick">
                    ${todayHasSlots() ? `<button type="button" class="chip" data-date="${today}">Hoy</button>` : ''}
                    <button type="button" class="chip" data-date="${tomorrow}">Mañana</button>
                  </div>
                  <label for="fecha" class="sr-only">Fecha</label>
                  <input class="input" type="date" id="fecha" name="fecha" min="${min}" value="${fecha}">
                  <p class="field-help" id="fechaTxt">${fecha ? esc(weekday(fecha)) : ''}</p>
                  <p class="field-error">${icon('alert')} <span>Elige el día de entrega.</span></p>
                </div>
              </section>

              <section class="co-section">
                <div class="co-title"><span class="n">5</span><h2>Franja horaria</h2></div>
                <div class="field" data-field="franja">
                  <div class="slots" role="radiogroup" aria-label="Franja horaria" id="slots">
                    ${FRANJAS.map((s) => `<label class="radio-card"><input type="radio" name="franja" value="${s}" ${d.franja === s ? 'checked' : ''}><span>${s}</span></label>`).join('')}
                  </div>
                  <p class="field-error">${icon('alert')} <span>Elige un horario.</span></p>
                </div>
              </section>

              <section class="co-section">
                <div class="co-title"><span class="n">6</span><h2>Dedicatoria</h2><span class="opt">Opcional</span></div>
                <div class="field">
                  <label for="dedicatoria" class="sr-only">Mensaje para la tarjeta</label>
                  <div class="quick" data-append="dedicatoria" data-sep=". " style="margin-bottom:6px">
                    ${DEDICATORIAS.map((t) => `<button type="button" class="chip">${t}</button>`).join('')}
                  </div>
                  <textarea class="textarea" id="dedicatoria" name="dedicatoria" maxlength="200" placeholder="Escribe el mensaje que irá en la tarjeta. Incluye la firma si quieres, ej: “Con amor, Pedro”.">${esc(d.dedicatoria)}</textarea>
                  <p class="counter" id="dedCount">0/200</p>
                </div>
              </section>

              <section class="co-section">
                <div class="co-title"><span class="n">7</span><h2>Observaciones</h2><span class="opt">Opcional</span></div>
                <div class="field">
                  <label for="observaciones" class="sr-only">Observaciones</label>
                  <div class="quick" data-append="observaciones" style="margin-bottom:6px">
                    <button type="button" class="chip">Llamar antes</button>
                    <button type="button" class="chip">Es sorpresa</button>
                    <button type="button" class="chip">Dejar en conserjería</button>
                  </div>
                  <textarea class="textarea" id="observaciones" name="observaciones" maxlength="250" placeholder="Algo que debamos saber para la entrega.">${esc(d.observaciones)}</textarea>
                </div>
              </section>
              ${cartHasFlowers() ? NATURE_NOTE : ''}
              <p class="form-alert" id="formAlert" role="alert">Nos faltan algunos datos. Revisa los campos marcados, por favor.</p>
            </div>

            <aside class="summary" aria-label="Resumen del pedido">
              <h2>Tu pedido</h2>
              <div class="summary-items">
                ${cart.map((it) => `<div><span>${esc(byId[it.id].nombre)}${it.size ? ` (${esc(it.size)})` : ''} x${it.qty}</span><span>${fmt(unitPrice(it) * it.qty)}</span></div>`).join('')}
              </div>
              <div class="summary-line total"><span>Total estimado</span><span>${fmt(cartTotal())}</span></div>
              <p class="note">Aún no pagas nada. Confirmamos disponibilidad, despacho y forma de pago por WhatsApp.</p>
              <button class="btn btn--block btn--lg" type="submit">Continuar</button>
              <a href="#/carrito" class="btn btn--block btn--outline" style="margin-top:10px">Volver al carrito</a>
              <p class="legal-note">Al continuar aceptas nuestros <a href="#/terminos-y-condiciones">Términos y condiciones</a> y las políticas de <a href="#/cambios-y-cancelaciones">Cambios y cancelaciones</a>, <a href="#/despachos">Despachos</a> y <a href="#/politica-de-privacidad">Privacidad</a>.</p>
            </aside>
          </form>
        </div>`,
      mount: mountCheckout,
    };
  }

  function mountCheckout() {
    const form = $('#coForm');
    const val = (n) => (form.elements[n] ? String(form.elements[n].value || '').trim() : '');
    const radio = (n) => { const r = form.querySelector(`[name="${n}"]:checked`); return r ? r.value : ''; };

    const saveDraft = () => {
      store.set(DRAFT_KEY, {
        envia_nombre: val('envia_nombre'), envia_tel: val('envia_tel'),
        recibe_nombre: val('recibe_nombre'), recibe_tel: val('recibe_tel'),
        soyYo: $('#soyYo').checked, entrega: radio('entrega'),
        direccion: val('direccion'), comuna: val('comuna'),
        fecha: val('fecha'), franja: radio('franja'),
        dedicatoria: form.elements.dedicatoria.value, observaciones: form.elements.observaciones.value,
      });
    };

    const setErr = (name, on) => {
      const f = form.querySelector(`[data-field="${name}"]`);
      if (f) f.classList.toggle('has-error', on);
    };

    // Lo recibo yo: copia los datos de quien envía
    const soyYo = $('#soyYo');
    const syncSoyYo = () => {
      const on = soyYo.checked;
      ['nombre', 'tel'].forEach((k) => {
        const r = form.elements['recibe_' + k];
        if (on) { r.value = val('envia_' + k); setErr('recibe_' + k, false); }
        r.readOnly = on;
      });
    };
    soyYo.addEventListener('change', () => { syncSoyYo(); saveDraft(); });
    ['envia_nombre', 'envia_tel'].forEach((n) => form.elements[n].addEventListener('input', () => { if (soyYo.checked) syncSoyYo(); }));
    if (soyYo.checked) syncSoyYo();

    // Entrega
    const syncEntrega = () => {
      const desp = radio('entrega') === 'despacho';
      $('#despachoFields').hidden = !desp;
      $('#retiroInfo').hidden = desp;
    };
    form.addEventListener('change', (e) => {
      if (e.target.name === 'entrega') syncEntrega();
      if (e.target.name === 'franja') setErr('franja', false);
      if (e.target.name === 'comuna') setErr('comuna', false);
    });

    // Fecha y franjas (en el día de hoy se bloquean las franjas que ya comenzaron)
    const fecha = form.elements.fecha;
    const syncSlots = () => {
      const isToday = fecha.value === isoDate(new Date());
      $$('#slots input').forEach((r) => {
        r.disabled = isToday && slotStart(r.value) <= nowMin();
        if (r.disabled && r.checked) r.checked = false;
      });
      $('#fechaTxt').textContent = fecha.value ? weekday(fecha.value) : '';
      $$('[data-date]').forEach((b) => b.classList.toggle('is-active', b.dataset.date === fecha.value));
    };
    fecha.addEventListener('change', () => {
      if (fecha.value && fecha.value < fecha.min) fecha.value = fecha.min;
      setErr('fecha', false); syncSlots();
    });
    $$('[data-date]').forEach((b) => b.addEventListener('click', () => {
      fecha.value = b.dataset.date; setErr('fecha', false); syncSlots(); saveDraft();
    }));
    syncSlots();

    // Contador de dedicatoria
    const ded = form.elements.dedicatoria;
    const syncCount = () => {
      const n = ded.value.length;
      const c = $('#dedCount');
      c.textContent = `${n}/200`;
      c.classList.toggle('near', n > 170);
    };
    ded.addEventListener('input', syncCount);
    syncCount();

    form.addEventListener('input', (e) => {
      const f = e.target.closest('[data-field]');
      if (f) f.classList.remove('has-error');
      saveDraft();
    });
    form.addEventListener('change', saveDraft);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const desp = radio('entrega') === 'despacho';
      const checks = [
        ['envia_nombre', val('envia_nombre').length >= 2],
        ['envia_tel', validPhone(val('envia_tel'))],
        ['recibe_nombre', val('recibe_nombre').length >= 2],
        ['recibe_tel', !desp && !val('recibe_tel') ? true : validPhone(val('recibe_tel'))],
        ['direccion', !desp || val('direccion').length >= 4],
        ['comuna', !desp || !!val('comuna')],
        ['fecha', !!val('fecha') && val('fecha') >= fecha.min],
        ['franja', !!radio('franja')],
      ];
      let firstBad = null;
      checks.forEach(([name, ok]) => {
        setErr(name, !ok);
        if (!ok && !firstBad) firstBad = name;
      });
      $('#formAlert').classList.toggle('show', !!firstBad);
      if (firstBad) {
        const box = form.querySelector(`[data-field="${firstBad}"]`);
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const inp = box.querySelector('input:not([disabled]), select');
        if (inp) setTimeout(() => inp.focus({ preventScroll: true }), 350);
        return;
      }
      const order = {
        items: cart.map((it) => ({ ...it })),
        total: cartTotal(),
        envia: { nombre: val('envia_nombre'), tel: prettyPhone(val('envia_tel')) },
        recibe: { nombre: val('recibe_nombre'), tel: val('recibe_tel') ? prettyPhone(val('recibe_tel')) : '' },
        entrega: desp ? 'despacho' : 'retiro',
        direccion: val('direccion'), comuna: val('comuna'),
        fecha: val('fecha'), franja: radio('franja'),
        dedicatoria: val('dedicatoria'), observaciones: val('observaciones'),
      };
      store.set('fv_last_order', { message: buildMessage(order), total: order.total, sent: false });
      location.hash = '#/confirmacion';
    });
  }

  /* ----- Mensaje de WhatsApp ----- */
  function buildMessage(o) {
    const L = [];
    L.push('🌸 NUEVO PEDIDO – Florería Valentina');
    L.push('🛍️ Productos:');
    o.items.forEach((it) => {
      const p = byId[it.id];
      const name = p.nombre + (it.size ? ` (${it.size})` : '');
      const price = (p.sinDesde ? '' : 'desde ') + fmt(unitPrice(it) * it.qty);
      L.push(`- ${name} x${it.qty} – ${price}`);
      if (it.perso) L.push(`  Personalización: ${persoText(it.perso)}`);
    });
    L.push(`💰 Total estimado: ${fmt(o.total)}`);
    L.push('');
    L.push(`👤 Envía: ${o.envia.nombre} – ${o.envia.tel}`);
    L.push(`🎁 Recibe: ${o.recibe.nombre} – ${o.recibe.tel || 'Sin teléfono'}`);
    L.push(`🚚 Entrega: ${o.entrega === 'despacho' ? 'Despacho' : 'Retiro'}`);
    L.push(`📍 Dirección: ${o.entrega === 'despacho' ? `${o.direccion}, ${o.comuna}` : `Retiro en tienda (${NEGOCIO.direccion})`}`);
    L.push(`📅 Fecha: ${displayDate(o.fecha)}`);
    L.push(`🕐 Horario: ${o.franja.replace(' – ', '–')}`);
    L.push(`💌 Dedicatoria: ${o.dedicatoria ? `"${o.dedicatoria.replace(/\s*\n\s*/g, ' / ')}"` : 'Sin dedicatoria'}`);
    L.push(`📝 Observaciones: ${o.observaciones ? o.observaciones.replace(/\s*\n\s*/g, ' / ') : 'Sin observaciones'}`);
    return L.join('\n');
  }

  /* ----- Confirmación ----- */
  function pageConfirm() {
    const last = store.get('fv_last_order', null);
    if (!last) return { redirect: '#/' };
    return {
      title: 'Pedido casi listo',
      hideWaFloat: true,
      html: `
        <div class="container">
          <div class="confirm page-enter">
            <svg class="confirm-flower" viewBox="0 0 64 64" fill="none" stroke="#C97B94" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">
              <path d="M32 58V30"/><path d="M32 44c-6 0-11-4-12-10 6 0 11 4 12 10zM32 40c5 0 9-3 10-8-5 0-9 3-10 8z" stroke="#1F5C5C"/>
              <path d="M32 30c-7 0-11-6-11-13 4 0 7 2 8 4 0-5 3-9 3-9s3 4 3 9c1-2 4-4 8-4 0 7-4 13-11 13z"/>
            </svg>
            <h1>¡Tu pedido está casi listo!</h1>
            <p class="lead">Continúa por WhatsApp para confirmar disponibilidad, despacho y coordinar el pago.</p>
            <a class="btn btn--wa btn--lg btn--block" id="waGo" href="${waLink(last.message)}" target="_blank" rel="noopener">${WA_ICON} Continuar por WhatsApp</a>
            <p class="pay-note">Medios de pago: efectivo, transferencia o tarjeta.</p>
            ${flowerNote('flower-note--gap')}

            <details class="order-preview">
              <summary>Ver el mensaje de tu pedido <span aria-hidden="true">+</span></summary>
              <pre>${esc(last.message)}</pre>
            </details>

            <div class="confirm-links">
              ${last.sent ? '' : '<a class="link-btn" href="#/checkout">Modificar datos</a>'}
              <a class="link-btn link-btn--muted" href="#/">Volver al inicio</a>
            </div>
          </div>
        </div>`,
      mount() {
        $('#waGo').addEventListener('click', () => {
          // El pedido ya salió: vaciamos el carrito y dejamos guardados los datos de quien envía.
          const last2 = store.get('fv_last_order', {});
          store.set('fv_last_order', { ...last2, sent: true });
          const d = store.get(DRAFT_KEY, {});
          store.set(DRAFT_KEY, { envia_nombre: d.envia_nombre, envia_tel: d.envia_tel });
          cart = [];
          saveCart();
        });
      },
    };
  }

  /* ----- Cómo comprar ----- */
  const FAQ = [
    ['¿Hacen despacho?', `Sí. Despachamos en Los Andes y comunas cercanas como San Esteban, Calle Larga, Rinconada y San Felipe. El costo depende de la comuna y te lo confirmamos por WhatsApp. También puedes retirar sin costo en ${NEGOCIO.direccion}.`],
    ['¿Puedo personalizar mi arreglo?', 'Claro. En cada producto puedes tocar “Personalizar” e indicarnos colores, flores favoritas o a evitar, presupuesto e ideas. También hacemos arreglos 100% a medida: escríbenos y lo diseñamos contigo.'],
    ['¿Qué pasa si no hay una flor?', 'Las flores son productos naturales y su disponibilidad cambia según la temporada. Si falta alguna variedad, te avisamos y la reemplazamos por otra de igual o mayor valor, manteniendo el estilo del arreglo.'],
    ['¿Cómo pago?', 'No hay pagos en línea. Cuando confirmemos tu pedido por WhatsApp puedes pagar con transferencia, efectivo o tarjeta (en tienda o al coordinar el pedido).'],
    ['¿Con cuánta anticipación debo pedir?', 'Idealmente con un día de anticipación, sobre todo en fechas especiales. Para pedidos del mismo día, escríbenos y vemos disponibilidad.'],
  ];

  function pageHowTo() {
    return {
      title: 'Cómo comprar',
      html: `
        <section class="page-head"><div class="container"><p class="crumbs"><a href="#/">Inicio</a> / Cómo comprar</p><h1>Cómo comprar</h1><p>Cuatro pasos y tu regalo está en camino.</p></div></section>
        <section class="section"><div class="container">${stepsHTML()}
          <div class="note-wrap">${NATURE_NOTE}</div>
          <div style="text-align:center;margin-top:34px"><a class="btn btn--lg" href="#/tienda">Elegir mi arreglo</a></div>
        </div></section>
        <section class="section section--cream">
          <div class="container">
            <div class="section-head"><span class="eyebrow">Dudas frecuentes</span><h2 class="section-title">Preguntas</h2></div>
            <div class="faq">
              ${FAQ.map(([q, a]) => `<details><summary>${q}<span class="plus" aria-hidden="true">+</span></summary><p>${esc(a)}</p></details>`).join('')}
            </div>
            <p style="text-align:center;margin-top:30px;color:var(--muted)">¿Otra pregunta? <a href="${waLink('Hola, tengo una consulta 🌸')}" target="_blank" rel="noopener" class="link-btn" style="font-size:15px">Escríbenos por WhatsApp</a></p>
          </div>
        </section>`,
    };
  }

  /* ----- Contacto ----- */
  function contactList() {
    return `
      <div class="contact-list">
        <div>${icon('pin')}<div><p class="k">Dirección</p><p class="v">${esc(NEGOCIO.direccion)}</p></div></div>
        <div>${icon('clock')}<div><p class="k">Horario</p><p class="v">${esc(NEGOCIO.horario)}</p><p style="font-size:13px;color:var(--muted)">${esc(NEGOCIO.horarioNota)}</p></div></div>
        <div>${icon('phone')}<div><p class="k">WhatsApp</p><p class="v"><a href="${waLink('Hola, tengo una consulta 🌸')}" target="_blank" rel="noopener">${esc(NEGOCIO.whatsappVisible)}</a></p></div></div>
        <div>${icon('instagram')}<div><p class="k">Instagram</p><p class="v"><a href="https://instagram.com/${NEGOCIO.instagram}" target="_blank" rel="noopener">@${esc(NEGOCIO.instagram)}</a></p></div></div>
        <div>${icon('facebook')}<div><p class="k">Facebook</p><p class="v"><a href="${NEGOCIO.facebookUrl}" target="_blank" rel="noopener">${esc(NEGOCIO.facebook)}</a></p></div></div>
        <div>${icon('mail')}<div><p class="k">Email</p><p class="v"><a href="mailto:${NEGOCIO.email}">${esc(NEGOCIO.email)}</a></p></div></div>
        <div>${icon('card')}<div><p class="k">Medios de pago</p><p class="v">Efectivo, transferencia y tarjetas</p></div></div>
      </div>`;
  }

  function pageContact() {
    return {
      title: 'Contacto',
      html: `
        <section class="page-head"><div class="container"><p class="crumbs"><a href="#/">Inicio</a> / Contacto</p><h1>Contacto</h1><p>Estamos para ayudarte a elegir el regalo perfecto.</p></div></section>
        <section class="section">
          <div class="container contact-grid">
            <div>
              ${contactList()}
              <a class="btn btn--wa btn--lg btn--block" style="margin-top:24px" href="${waLink('Hola, tengo una consulta 🌸')}" target="_blank" rel="noopener">${WA_ICON} Escríbenos por WhatsApp</a>
            </div>
            <div class="map">
              <iframe src="${NEGOCIO.mapaEmbed}" title="Mapa: ${esc(NEGOCIO.direccion)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </section>`,
    };
  }

  /* ----- Políticas (el contenido se edita en js/politicas.js) ----- */
  const politicaById = Object.fromEntries(POLITICAS.map((p) => [p.id, p]));

  function pagePolicy(pol) {
    const block = (c) => (Array.isArray(c)
      ? `<ul>${c.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>`
      : `<p>${esc(c)}</p>`);
    return {
      title: pol.titulo,
      html: `
        <section class="page-head"><div class="container"><p class="crumbs"><a href="#/">Inicio</a> / ${esc(pol.titulo)}</p><h1>${esc(pol.titulo)}</h1><p>${esc(pol.resumen)}</p></div></section>
        <section class="section">
          <div class="container">
            <article class="policy">
              <p class="policy-date">Última actualización: ${esc(POLITICAS_ACTUALIZACION)}</p>
              ${pol.aviso ? NATURE_NOTE : ''}
              ${pol.secciones.map((s, i) => `
                <section class="policy-section">
                  <h2><span class="n">${i + 1}</span>${esc(s.t)}</h2>
                  ${s.c.map(block).join('')}
                  ${s.ver ? `<p><a class="link-btn" href="#/${s.ver}">Ver ${esc(politicaById[s.ver].titulo)}</a></p>` : ''}
                </section>`).join('')}
              <div class="policy-contact">
                <h2>¿Tienes dudas?</h2>
                <p>Escríbenos y te ayudamos antes de confirmar tu pedido.</p>
                <a class="btn btn--wa" href="${waLink('Hola, tengo una consulta 🌸')}" target="_blank" rel="noopener">${WA_ICON} Escríbenos por WhatsApp</a>
              </div>
              <nav class="policy-nav" aria-label="Otras políticas">
                ${POLITICAS.filter((x) => x.id !== pol.id).map((x) => `<a href="#/${x.id}">${esc(x.titulo)}</a>`).join('')}
              </nav>
            </article>
          </div>
        </section>`,
    };
  }

  function pageNotFound() {
    return {
      title: 'Página no encontrada',
      html: `<div class="container"><div class="empty"><h2>No encontramos esta página</h2><p>Puede que el producto ya no esté disponible.</p><a class="btn" href="#/tienda">Ir a la tienda</a></div></div>`,
    };
  }

  /* ---------------- Footer ---------------- */
  function renderFooter() {
    $('#footer').innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="${NEGOCIO.logo}" alt="${esc(NEGOCIO.nombre)}" width="120" loading="lazy">
            <p>Ramos, cajas y arreglos florales hechos a mano en ${esc(NEGOCIO.ciudad)}. Despacho a domicilio y retiro en tienda.</p>
          </div>
          <div>
            <h3>Tienda</h3>
            <ul>
              ${CATEGORIAS.map((c) => `<li><a href="#/tienda?cat=${c.id}">${esc(c.nombre)}</a></li>`).join('')}
            </ul>
          </div>
          <div>
            <h3>Visítanos</h3>
            <ul>
              <li>${esc(NEGOCIO.direccion)}</li>
              <li>${esc(NEGOCIO.horario)}</li>
              <li>${esc(NEGOCIO.horarioNota)}</li>
              <li>Pago: efectivo, transferencia y tarjetas</li>
            </ul>
          </div>
          <div>
            <h3>Contacto</h3>
            <ul>
              <li><a href="${waLink('Hola, tengo una consulta 🌸')}" target="_blank" rel="noopener">WhatsApp ${esc(NEGOCIO.whatsappVisible)}</a></li>
              <li><a href="https://instagram.com/${NEGOCIO.instagram}" target="_blank" rel="noopener">Instagram @${esc(NEGOCIO.instagram)}</a></li>
              <li><a href="${NEGOCIO.facebookUrl}" target="_blank" rel="noopener">Facebook ${esc(NEGOCIO.facebook)}</a></li>
              <li><a href="mailto:${NEGOCIO.email}">${esc(NEGOCIO.email)}</a></li>
            </ul>
          </div>
        </div>
        <nav class="footer-legal" aria-label="Políticas">
          ${POLITICAS.map((p) => `<a href="#/${p.id}">${esc(p.titulo)}</a>`).join('')}
        </nav>
        ${flowerNote('flower-note--start flower-note--footer')}
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${esc(NEGOCIO.nombre)} · ${esc(NEGOCIO.ciudad)}, Chile</span>
          <span><a href="#/como-comprar">Cómo comprar</a> · <a href="#/contacto">Contacto</a></span>
        </div>
      </div>`;
  }

  /* ---------------- Animación de aparición ---------------- */
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      }), { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
    : null;
  function observeReveal() {
    $$('.reveal:not(.is-visible)').forEach((el) => (io ? io.observe(el) : el.classList.add('is-visible')));
  }

  /* ---------------- Router ---------------- */
  let currentRoute = '';

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, '');
    const [path, qs] = raw.split('?');
    return { parts: path.split('/').filter(Boolean), params: new URLSearchParams(qs || '') };
  }

  function render({ keepScroll = false } = {}) {
    const { parts, params } = parseHash();
    const route = parts[0] || '';
    let page;
    switch (route) {
      case '': page = { title: '', html: pageHome() }; break;
      case 'tienda': page = pageShop(params); break;
      case 'categorias':
      case 'ocasiones': page = pageOccasions(); break;
      case 'producto': page = pageProduct(parts[1]); break;
      case 'carrito': page = pageCart(); break;
      case 'checkout': page = pageCheckout(); break;
      case 'confirmacion': page = pageConfirm(); break;
      case 'como-comprar': page = pageHowTo(); break;
      case 'contacto': page = pageContact(); break;
      default: page = politicaById[route] ? pagePolicy(politicaById[route]) : pageNotFound();
    }
    if (page.redirect) { location.replace(page.redirect); return; }

    currentRoute = route;
    app.innerHTML = page.html;
    if (!keepScroll) {
      app.classList.remove('page-enter');
      void app.offsetWidth;
      app.classList.add('page-enter');
    }
    document.title = page.title ? `${page.title} · ${NEGOCIO.nombre}` : `${NEGOCIO.nombre} · Flores a domicilio en Los Andes`;
    document.body.classList.toggle('has-mobile-bar', !!page.mobileBar);
    document.body.classList.toggle('hide-wa-float', !!page.hideWaFloat);

    $$('.main-nav a').forEach((a) => {
      const on = a.dataset.nav === route || (route === 'producto' && a.dataset.nav === 'tienda');
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    closeMenu();
    if (page.mount) page.mount();
    observeReveal();
    if (!keepScroll) {
      window.scrollTo(0, 0);
      if (route) app.focus({ preventScroll: true });
    }
  }

  window.addEventListener('hashchange', () => { closeModal(); render(); });

  /* ---------------- Menú móvil ---------------- */
  const menuBtn = $('#menuToggle');
  const nav = $('#mainNav');
  function closeMenu() { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !e.target.closest('#mainNav, #menuToggle')) closeMenu();
  });

  // Sincroniza el carrito entre pestañas
  window.addEventListener('storage', (e) => {
    if (e.key === 'fv_cart') {
      cart = store.get('fv_cart', []).filter((it) => byId[it.id]);
      updateCartBadge(false);
      if (currentRoute === 'carrito') renderCartPreserveScroll();
    }
  });

  /* ---------------- Inicio ---------------- */
  $('#logoImg').src = NEGOCIO.logoHorizontal;
  $('#waFloat').href = waLink('Hola Florería Valentina, tengo una consulta 🌸');
  renderFooter();
  updateCartBadge(false);
  render();
})();
