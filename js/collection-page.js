/* collection-page.js — rendu dynamique depuis les JSON _data/
   Chargé sur chaque page collections/*.html
   Aucun build nécessaire : le CMS commit le JSON → la page le lit au chargement. */

(async function () {
  'use strict';

  // Empêche le loader de se fermer avant que le contenu soit prêt
  window._waitForAsync = true;

  const NAV_ORDER = [
    'amelie', 'pronuptia', 'libelle', 'randy-fenoli',
    'modeca-courtes', 'modeca-papillon', 'terre-alice', 'eddy-k', 'justin-alexander'
  ];
  const FOOTER_ORDER = [
    'amelie', 'pronuptia', 'justin-alexander', 'randy-fenoli',
    'libelle', 'modeca-papillon', 'terre-alice', 'eddy-k'
  ];

  const slug = location.pathname.replace(/.*\//, '').replace(/\.html$/, '');

  // ── Escape helpers ────────────────────────────────────────────────────────
  function esc(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escA(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ── Fetch : settings + toutes les collections en parallèle ───────────────
  let settings, navCols;
  try {
    const results = await Promise.all([
      fetch('/_data/settings.json').then(r => { if (!r.ok) throw r; return r.json(); }),
      ...NAV_ORDER.map(s =>
        fetch(`/_data/collections/${s}.json`).then(r => { if (!r.ok) throw r; return r.json(); })
      )
    ]);
    settings = results[0];
    navCols  = results.slice(1);          // dans l'ordre de NAV_ORDER
  } catch (err) {
    console.warn('[collection-page] Erreur chargement JSON :', err);
    window._pageReady?.();
    return;
  }

  const col    = navCols[NAV_ORDER.indexOf(slug)];
  const footerCols = FOOTER_ORDER.map(s => navCols[NAV_ORDER.indexOf(s)]);

  if (!col) {
    console.warn('[collection-page] Collection inconnue :', slug);
    window._pageReady?.();
    return;
  }

  const n    = col.dresses.length;
  const nStr = `${n} robe${n > 1 ? 's' : ''}`;
  const el   = id => document.getElementById(id);

  // ── Navigation dropdown ──────────────────────────────────────────────────
  const navDropdown = el('nav-dropdown');
  if (navDropdown) {
    navDropdown.innerHTML = navCols.map((c, i) => {
      const cnt = c.dresses.length;
      return `<a href="${NAV_ORDER[i]}.html">${esc(c.nav_label || c.title)} <span class="dd-count">${cnt} robe${cnt > 1 ? 's' : ''}</span></a>`;
    }).join('');
  }

  // ── Hero ─────────────────────────────────────────────────────────────────
  const hero = el('page-hero');
  if (hero) {
    const bg = col.hero_image
      ? `<img src="${escA(col.hero_image)}" alt="${escA(col.title)}" style="width:100%;height:100%;object-fit:cover;object-position:top center;position:absolute;inset:0;">`
      : `<div style="width:100%;height:100%;background:${escA(col.hero_gradient)};position:absolute;inset:0;"></div>`;
    hero.innerHTML = `
      <div class="page-hero__bg">${bg}</div>
      <div class="page-hero__overlay"></div>
      <div class="page-hero__content">
        <span class="eyebrow">${nStr}</span>
        <h1><em>${esc(col.title)}</em></h1>
      </div>`;
  }

  // ── Breadcrumb ───────────────────────────────────────────────────────────
  const bt = el('breadcrumb-title');
  if (bt) bt.textContent = col.title;

  // ── Collection intro ─────────────────────────────────────────────────────
  const intro = el('collection-intro');
  if (intro) {
    const logo = col.logo
      ? `<img src="${escA(col.logo)}" alt="${escA(col.title)}" class="collection-intro__logo">`
      : '';
    intro.innerHTML = `
      <div>
        ${logo}
        <div class="collection-intro__brand">${esc(col.title)}</div>
        <div class="collection-intro__count eyebrow">${n} robe${n > 1 ? 's disponibles' : ' disponible'}</div>
      </div>
      <div>
        <p class="collection-intro__desc">${esc(col.description)}</p>
        <a href="../rendez-vous.html" class="btn btn--dark"><span>Essayer en boutique</span></a>
      </div>`;
  }

  // ── CTA paragraph ────────────────────────────────────────────────────────
  const ctaTxt = el('cta-text');
  if (ctaTxt) {
    ctaTxt.textContent = `Prenez rendez-vous pour une consultation personnalisée et découvrez nos modèles ${col.title} dans notre boutique de Lyon.`;
  }

  // ── Grille de robes ──────────────────────────────────────────────────────
  const grid = el('dress-grid');
  if (grid) {
    grid.innerHTML = col.dresses.map((d, i) => {
      const delay = `reveal-d${(i % 4) + 1}`;
      let attrs = `data-lightbox data-brand="${escA(col.title)}" data-name="${escA(d.name)}"`;
      if (d.additional_photos?.length) attrs += ` data-photos="${escA(d.additional_photos.join(','))}"`;
      if (d.description)               attrs += ` data-description="${escA(d.description)}"`;
      attrs += ` data-full="${escA(d.main_photo ?? '')}"`;

      const img = d.main_photo
        ? `<img src="${escA(d.main_photo)}" alt="${escA(d.name)} — ${escA(col.title)}" loading="lazy">`
        : `<div class="dress-card__placeholder" style="background:${escA(d.placeholder_color)};">
            <svg class="dress-icon-svg" viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="40" cy="14" rx="11" ry="13" fill="currentColor" opacity="0.3"/>
              <path d="M29 27 C32 35 48 35 51 27 L68 70 L75 130 L5 130 L12 70 Z" fill="currentColor" opacity="0.2"/>
              <path d="M29 27 C32 36 48 36 51 27" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
            </svg>
          </div>`;

      return `
      <div class="dress-card reveal ${delay}" ${attrs}>
        <div class="dress-card__img-wrap">
          ${img}
          <div class="dress-card__overlay"><div class="dress-card__overlay-txt">Agrandir</div></div>
        </div>
        <div class="dress-card__info">
          <div class="dress-card__brand">${esc(col.title)}</div>
          <div class="dress-card__name">${esc(d.name)}</div>
        </div>
      </div>`;
    }).join('');

    // Réinitialiser lightbox et reveal pour les nouveaux éléments
    if (typeof window.initLightbox === 'function') window.initLightbox();
    if (window.revealObserver) {
      grid.querySelectorAll('.reveal').forEach(e => window.revealObserver.observe(e));
    }
  }

  // ── Footer — données boutique ─────────────────────────────────────────────
  if (el('footer-tagline')) el('footer-tagline').textContent  = settings.tagline ?? '';
  if (el('footer-address')) el('footer-address').innerHTML    = `${esc(settings.address)}<br>${esc(settings.city)}`;
  if (el('footer-phone'))   el('footer-phone').textContent    = settings.phone ?? '';
  if (el('footer-hours')) {
    el('footer-hours').innerHTML = (settings.hours ?? []).map(h =>
      `<div class="hours-row"><span class="day">${esc(h.days)}</span><span>${esc(h.hours)}</span></div>`
    ).join('');
  }
  if (el('footer-ig') && settings.instagram) el('footer-ig').href = settings.instagram;
  if (el('footer-fb') && settings.facebook)  el('footer-fb').href = settings.facebook;
  if (el('footer-pt') && settings.pinterest) el('footer-pt').href = settings.pinterest;

  // ── Footer — liens collections ────────────────────────────────────────────
  const footerLinks = el('footer-collection-links');
  if (footerLinks) {
    footerLinks.innerHTML = footerCols.map(c =>
      `<a href="${c.slug || FOOTER_ORDER[footerCols.indexOf(c)]}.html">${esc(c.nav_label || c.title)}</a>`
    ).join('');
  }

  // ── Signaler que la page est prête ───────────────────────────────────────
  window._pageReady?.();

})();
