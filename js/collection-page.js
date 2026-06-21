/* collection-page.js — rendu dynamique depuis les JSON _data/
   Chargé sur chaque page collections/*.html
   Aucun build nécessaire : le CMS commit le JSON → la page le lit au chargement.

   Stratégie de chargement en 2 phases :
   - Phase 1 (critique)     : settings + collection courante seulement (2 requêtes)
                              → page rendue + loader libéré immédiatement
   - Phase 2 (arrière-plan) : autres collections en parallèle
                              → nav dropdown + footer liens remplis sans bloquer */

(async function () {
  'use strict';

  // Empêche le loader de se fermer avant que le contenu soit prêt
  window._waitForAsync = true;

  const NAV_ORDER = [
    'amelie', 'amelie-bella', 'pronuptia', 'libelle', 'randy-fenoli',
    'modeca-papillon', 'eddy-k', 'justin-alexander'
  ];
  const FOOTER_ORDER = [
    'amelie', 'amelie-bella', 'pronuptia', 'justin-alexander', 'randy-fenoli',
    'libelle', 'modeca-papillon', 'eddy-k'
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
  function toWebp(path) {
    return path ? path.replace(/\.jpg$/i, '.webp') : path;
  }
  function picture(jpgSrc, alt, attrs) {
    const webpSrc = toWebp(jpgSrc);
    const attrsStr = attrs ? ` ${attrs}` : '';
    return `<picture><source srcset="${escA(webpSrc)}" type="image/webp"><img src="${escA(jpgSrc)}" alt="${escA(alt)}"${attrsStr}></picture>`;
  }

  const el = id => document.getElementById(id);

  // ── Phase 1 : fetches critiques ──────────────────────────────────────────
  let settings, col;
  try {
    [settings, col] = await Promise.all([
      fetch('/_data/settings.json').then(r => { if (!r.ok) throw r; return r.json(); }),
      fetch(`/_data/collections/${slug}.json`).then(r => { if (!r.ok) throw r; return r.json(); })
    ]);
  } catch (err) {
    console.warn('[collection-page] Erreur chargement JSON :', err);
    window._pageReady?.();
    return;
  }

  if (!col) {
    console.warn('[collection-page] Collection inconnue :', slug);
    window._pageReady?.();
    return;
  }

  const n    = col.dresses.length;
  const nStr = `${n} robe${n > 1 ? 's' : ''}`;

  // ── Hero ─────────────────────────────────────────────────────────────────
  const hero = el('page-hero');
  if (hero) {
    const bg = col.hero_image
      ? picture(col.hero_image, col.title, 'style="width:100%;height:100%;object-fit:cover;object-position:top center;position:absolute;inset:0;"')
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
    const brandBlock = col.logo
      ? `<img src="${escA(col.logo)}" alt="${escA(col.title)}" class="collection-intro__logo" data-slug="${escA(slug)}">`
      : `<div class="collection-intro__brand">${esc(col.title)}</div>`;
    intro.innerHTML = `
      <div>
        ${brandBlock}
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

  // ── Filtres silhouettes ───────────────────────────────────────────────────
  const styles = [...new Set(col.dresses.map(d => d.style).filter(Boolean))].sort();
  const styleFilterEl = el('style-filters');
  if (styleFilterEl && styles.length > 1) {
    styleFilterEl.innerHTML =
      `<button class="style-filter-btn active" data-style="all">Toutes</button>` +
      styles.map(s => `<button class="style-filter-btn" data-style="${escA(s)}">${esc(s)}</button>`).join('');
    styleFilterEl.style.display = '';
  } else if (styleFilterEl) {
    styleFilterEl.style.display = 'none';
  }

  // ── Grille de robes ──────────────────────────────────────────────────────
  const grid = el('dress-grid');
  if (grid) {
    grid.innerHTML = col.dresses.map((d, i) => {
      const delay = `reveal-d${(i % 4) + 1}`;
      const href  = `product?col=${encodeURIComponent(slug)}&i=${i}`;
      const styleAttr = d.style ? ` data-style="${escA(d.style)}"` : '';

      const img = d.main_photo
        ? picture(d.main_photo, `${d.name} — ${col.title}`, 'loading="lazy"')
        : `<div class="dress-card__placeholder" style="background:${escA(d.placeholder_color)};">
            <svg class="dress-icon-svg" viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="40" cy="14" rx="11" ry="13" fill="currentColor" opacity="0.3"/>
              <path d="M29 27 C32 35 48 35 51 27 L68 70 L75 130 L5 130 L12 70 Z" fill="currentColor" opacity="0.2"/>
              <path d="M29 27 C32 36 48 36 51 27" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
            </svg>
          </div>`;

      return `
      <a href="${escA(href)}" class="dress-card reveal ${delay}"${styleAttr}>
        <div class="dress-card__img-wrap">
          ${img}
          <div class="dress-card__overlay"><div class="dress-card__overlay-txt">Voir le modèle</div></div>
        </div>
        <div class="dress-card__info">
          <div class="dress-card__name">${esc(d.name)}</div>
        </div>
      </a>`;
    }).join('');

    // Réinitialiser reveal pour les nouveaux éléments
    if (window.revealObserver) {
      grid.querySelectorAll('.reveal').forEach(e => window.revealObserver.observe(e));
    }

    // Activer les filtres de style
    if (styleFilterEl) {
      styleFilterEl.addEventListener('click', e => {
        const btn = e.target.closest('.style-filter-btn');
        if (!btn) return;
        styleFilterEl.querySelectorAll('.style-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.style;
        grid.querySelectorAll('.dress-card').forEach(card => {
          const match = filter === 'all' || card.dataset.style === filter;
          card.style.display = match ? '' : 'none';
        });
      });
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

  // ── Libérer le loader ────────────────────────────────────────────────────
  window._pageReady?.();

  // ── Phase 2 : fetches secondaires en arrière-plan ────────────────────────
  const otherSlugs = NAV_ORDER.filter(s => s !== slug);
  Promise.all(
    otherSlugs.map(s =>
      fetch(`/_data/collections/${s}.json`)
        .then(r => r.ok ? r.json() : null)
        .catch(() => null)
    )
  ).then(results => {
    const colMap = { [slug]: col };
    otherSlugs.forEach((s, i) => { if (results[i]) colMap[s] = results[i]; });

    const navDropdown = el('nav-dropdown');
    if (navDropdown) {
      navDropdown.innerHTML = NAV_ORDER.map(s => {
        const c = colMap[s];
        if (!c) return '';
        const cnt = c.dresses.length;
        return `<a href="${s}.html">${esc(c.nav_label || c.title)} <span class="dd-count">${cnt} robe${cnt > 1 ? 's' : ''}</span></a>`;
      }).join('');
    }

    const footerLinks = el('footer-collection-links');
    if (footerLinks) {
      footerLinks.innerHTML = FOOTER_ORDER.map(s => {
        const c = colMap[s];
        if (!c) return '';
        return `<a href="${s}.html">${esc(c.nav_label || c.title)}</a>`;
      }).join('');
    }
  });

})();
