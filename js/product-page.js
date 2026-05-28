/* product-page.js — rendu dynamique de la fiche produit (robe individuelle)
   URL attendue : product.html?col=amelie&i=0
   Chargé sur collections/product.html uniquement. */

(async function () {
  'use strict';

  // Bloque le loader jusqu'à ce que le contenu soit prêt
  window._waitForAsync = true;

  const NAV_ORDER = [
    'amelie', 'pronuptia', 'libelle', 'randy-fenoli',
    'modeca-courtes', 'modeca-papillon', 'eddy-k', 'justin-alexander'
  ];
  const FOOTER_ORDER = [
    'amelie', 'pronuptia', 'justin-alexander', 'randy-fenoli',
    'libelle', 'modeca-papillon', 'eddy-k'
  ];

  // ── Helpers ───────────────────────────────────────────────────────────────
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
  const el = id => document.getElementById(id);

  // ── Lecture des paramètres URL ────────────────────────────────────────────
  const params  = new URLSearchParams(location.search);
  const colSlug = params.get('col');
  const dressIdx = Math.max(0, parseInt(params.get('i') ?? '0', 10));

  if (!colSlug) { window._pageReady?.(); return; }

  // ── Phase 1 : fetch critique ──────────────────────────────────────────────
  let settings, col;
  try {
    [settings, col] = await Promise.all([
      fetch('/_data/settings.json').then(r => { if (!r.ok) throw r; return r.json(); }),
      fetch(`/_data/collections/${colSlug}.json`).then(r => { if (!r.ok) throw r; return r.json(); })
    ]);
  } catch (err) {
    console.warn('[product-page] Erreur chargement JSON :', err);
    window._pageReady?.();
    return;
  }

  if (!col?.dresses?.length) { window._pageReady?.(); return; }

  const dress = col.dresses[dressIdx] ?? col.dresses[0];
  const dIdx  = col.dresses.indexOf(dress);

  // Mise à jour du titre de la page
  document.title = `${dress.name} — ${col.title} — Pronuptia Lyon`;

  // ── Canonical + Open Graph dynamiques ────────────────────────────────────
  const canonicalUrl = `https://pronuptia-lyon.fr/collections/product.html?col=${encodeURIComponent(colSlug)}&i=${dIdx}`;
  const ogTitle = `${dress.name} — ${col.title} — Pronuptia Lyon`;
  const rawDesc = dress.description
    ? String(dress.description).replace(/\s+/g, ' ').trim().slice(0, 155)
    : `Découvrez ${dress.name}, robe de la collection ${col.title} disponible chez Pronuptia Lyon.`;

  const canonEl = document.querySelector('link[rel="canonical"]');
  if (canonEl) canonEl.setAttribute('href', canonicalUrl);

  ['og:url', 'og:title', 'og:description'].forEach(prop => {
    const m = document.querySelector(`meta[property="${prop}"]`);
    if (!m) return;
    if (prop === 'og:url')         m.setAttribute('content', canonicalUrl);
    else if (prop === 'og:title')  m.setAttribute('content', ogTitle);
    else                           m.setAttribute('content', rawDesc);
  });

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', rawDesc);

  if (dress.main_photo) {
    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', `https://pronuptia-lyon.fr${toWebp(dress.main_photo)}`);
  }

  // ── Construction du tableau de photos ────────────────────────────────────
  const photos = [dress.main_photo, ...(dress.additional_photos ?? [])]
    .filter(Boolean)
    .map(toWebp);

  // État de l'interface
  let currentPhoto = 0;
  let zoomPhoto    = 0;

  // ── Navigation entre robes (prev / next dans la collection) ───────────────
  const prevDress = dIdx > 0 ? col.dresses[dIdx - 1] : null;
  const nextDress = dIdx < col.dresses.length - 1 ? col.dresses[dIdx + 1] : null;

  function dressNavCard(d, idx, dir) {
    const href  = `product?col=${encodeURIComponent(colSlug)}&i=${idx}`;
    const thumb = d.main_photo
      ? `<img class="dress-nav__thumb" src="${escA(toWebp(d.main_photo))}" alt="${escA(d.name)}" loading="lazy">`
      : `<div class="dress-nav__thumb dress-nav__thumb--placeholder"></div>`;
    const arrow = dir === 'prev' ? '←' : '→';
    const label = dir === 'prev' ? 'Modèle précédent' : 'Modèle suivant';
    return `
      <a href="${escA(href)}" class="dress-nav__link dress-nav__${dir}">
        ${dir === 'prev' ? `<span class="dress-nav__arrow">${arrow}</span>` : ''}
        ${thumb}
        <div class="dress-nav__meta">
          <span class="dress-nav__label">${esc(label)}</span>
          <strong class="dress-nav__name">${esc(d.name)}</strong>
        </div>
        ${dir === 'next' ? `<span class="dress-nav__arrow">${arrow}</span>` : ''}
      </a>`;
  }

  // ── Miniatures ────────────────────────────────────────────────────────────
  const thumbsHtml = photos.length > 1
    ? photos.map((src, i) =>
        `<button class="pg-thumb${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Photo ${i + 1}">
           <img src="${escA(src)}" alt="${escA(dress.name)} — photo ${i + 1}" loading="lazy">
         </button>`
      ).join('')
    : '';

  // ── Rendu HTML du produit ─────────────────────────────────────────────────
  const main = el('product-main');
  if (!main) { window._pageReady?.(); return; }

  main.innerHTML = `
    <section class="product-section">
      <div class="container">

        <!-- Fil d'Ariane -->
        <nav class="breadcrumb">
          <a href="../index.html">Accueil</a>
          <span class="breadcrumb-sep">›</span>
          <a href="../galerie.html">Collections</a>
          <span class="breadcrumb-sep">›</span>
          <a href="${escA(colSlug)}.html">${esc(col.title)}</a>
          <span class="breadcrumb-sep">›</span>
          <span>${esc(dress.name)}</span>
        </nav>

        <div class="product-layout">

          <!-- ── GALERIE ── -->
          <div class="product-gallery">

            <div class="product-gallery__main" id="pg-main" title="Cliquer pour agrandir">
              <img id="pg-img"
                   src="${escA(photos[0] ?? '')}"
                   alt="${escA(dress.name)} — ${escA(col.title)}">

              ${photos.length > 1 ? `
                <button class="pg-nav-btn pg-nav-btn--prev" id="pg-prev" aria-label="Photo précédente">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button class="pg-nav-btn pg-nav-btn--next" id="pg-next" aria-label="Photo suivante">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                <div class="pg-count" id="pg-count">1 / ${photos.length}</div>
              ` : ''}

              <button class="pg-zoom-btn" id="pg-zoom-btn" aria-label="Agrandir la photo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
            </div>

            ${photos.length > 1 ? `<div class="product-gallery__thumbs" id="pg-thumbs">${thumbsHtml}</div>` : ''}
          </div>

          <!-- ── INFOS ── -->
          <div class="product-info">
            <div class="product-info__eyebrow">${esc(col.title)}</div>
            <h1 class="product-info__name">${esc(dress.name)}</h1>
            <div class="product-info__rule"></div>
            ${dress.description
              ? `<p class="product-info__desc">${esc(dress.description)}</p>`
              : ''}
            <a href="../rendez-vous.html" class="btn btn--dark product-info__cta">
              <span>Réserver mon essayage</span>
            </a>
            <a href="${escA(colSlug)}.html" class="product-back">
              ← Retour à ${esc(col.title)}
            </a>
          </div>

        </div>

        <!-- ── NAVIGATION ENTRE ROBES ── -->
        ${prevDress || nextDress ? `
          <div class="dress-nav">
            ${prevDress ? dressNavCard(prevDress, dIdx - 1, 'prev') : '<span></span>'}
            ${nextDress ? dressNavCard(nextDress, dIdx + 1, 'next') : '<span></span>'}
          </div>
        ` : ''}

      </div>
    </section>`;

  // ── Slider ────────────────────────────────────────────────────────────────
  const pgImg    = el('pg-img');
  const pgCount  = el('pg-count');
  const pgThumbs = el('pg-thumbs');

  function showPhoto(idx) {
    currentPhoto = ((idx % photos.length) + photos.length) % photos.length;
    if (pgImg) {
      pgImg.style.opacity = '0';
      setTimeout(() => {
        pgImg.src = photos[currentPhoto];
        pgImg.alt = `${dress.name} — photo ${currentPhoto + 1}`;
        pgImg.style.opacity = '1';
      }, 120);
    }
    if (pgCount) pgCount.textContent = `${currentPhoto + 1} / ${photos.length}`;
    if (pgThumbs) {
      pgThumbs.querySelectorAll('.pg-thumb').forEach((t, i) => {
        t.classList.toggle('active', i === currentPhoto);
      });
      const activeThumb = pgThumbs.querySelectorAll('.pg-thumb')[currentPhoto];
      if (activeThumb) {
        // Scroll only the thumb strip horizontally — never touch page vertical scroll
        const left = activeThumb.offsetLeft - (pgThumbs.offsetWidth - activeThumb.offsetWidth) / 2;
        pgThumbs.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
      }
    }
    zoomPhoto = currentPhoto;
  }

  el('pg-prev')?.addEventListener('click', e => { e.stopPropagation(); showPhoto(currentPhoto - 1); });
  el('pg-next')?.addEventListener('click', e => { e.stopPropagation(); showPhoto(currentPhoto + 1); });

  pgThumbs?.querySelectorAll('.pg-thumb').forEach(btn => {
    btn.addEventListener('click', () => showPhoto(parseInt(btn.dataset.index, 10)));
  });

  // Swipe tactile sur l'image principale
  const pgMain = el('pg-main');
  if (pgMain && photos.length > 1) {
    let touchStartX = 0;
    pgMain.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    pgMain.addEventListener('touchend', e => {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 40) showPhoto(delta < 0 ? currentPhoto + 1 : currentPhoto - 1);
    }, { passive: true });
  }

  // ── Zoom modal ────────────────────────────────────────────────────────────
  const zoomModal   = el('product-zoom');
  const zoomImgEl   = el('zoom-img');
  const zoomCounter = el('zoom-counter');

  function openZoom(idx) {
    zoomPhoto = ((idx % photos.length) + photos.length) % photos.length;
    if (zoomImgEl) { zoomImgEl.src = photos[zoomPhoto]; zoomImgEl.alt = dress.name; }
    if (zoomCounter && photos.length > 1) zoomCounter.textContent = `${zoomPhoto + 1} / ${photos.length}`;
    zoomModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeZoom() {
    zoomModal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showZoomPhoto(idx) {
    zoomPhoto = ((idx % photos.length) + photos.length) % photos.length;
    if (zoomImgEl) zoomImgEl.src = photos[zoomPhoto];
    if (zoomCounter && photos.length > 1) zoomCounter.textContent = `${zoomPhoto + 1} / ${photos.length}`;
  }

  // Clic sur l'image principale ou le bouton zoom → ouvre le zoom
  pgMain?.addEventListener('click', e => {
    if (e.target.closest('.pg-nav-btn') || e.target.closest('.pg-zoom-btn')) return;
    openZoom(currentPhoto);
  });
  el('pg-zoom-btn')?.addEventListener('click', e => { e.stopPropagation(); openZoom(currentPhoto); });

  el('zoom-close')?.addEventListener('click', closeZoom);
  el('zoom-prev')?.addEventListener('click', () => showZoomPhoto(zoomPhoto - 1));
  el('zoom-next')?.addEventListener('click', () => showZoomPhoto(zoomPhoto + 1));
  zoomModal?.addEventListener('click', e => { if (e.target === zoomModal || e.target.classList.contains('zoom-img-wrap')) closeZoom(); });

  // Clavier (flèches + Escape) pour le zoom
  document.addEventListener('keydown', e => {
    if (!zoomModal?.classList.contains('open')) return;
    if (e.key === 'Escape')     closeZoom();
    if (e.key === 'ArrowLeft')  showZoomPhoto(zoomPhoto - 1);
    if (e.key === 'ArrowRight') showZoomPhoto(zoomPhoto + 1);
  });

  // Swipe dans le zoom modal (mobile)
  if (zoomModal && photos.length > 1) {
    let tzX = 0;
    zoomModal.addEventListener('touchstart', e => { tzX = e.changedTouches[0].clientX; }, { passive: true });
    zoomModal.addEventListener('touchend', e => {
      const delta = e.changedTouches[0].clientX - tzX;
      if (Math.abs(delta) > 40) showZoomPhoto(delta < 0 ? zoomPhoto + 1 : zoomPhoto - 1);
    }, { passive: true });
  }

  // ── Transition CSS sur l'image principale ─────────────────────────────────
  if (pgImg) pgImg.style.transition = 'opacity 0.12s ease';

  // ── Footer ────────────────────────────────────────────────────────────────
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

  // ── Phase 2 : navigation + footer (arrière-plan) ─────────────────────────
  const otherSlugs = NAV_ORDER.filter(s => s !== colSlug);
  Promise.all(
    otherSlugs.map(s =>
      fetch(`/_data/collections/${s}.json`).then(r => r.ok ? r.json() : null).catch(() => null)
    )
  ).then(results => {
    const colMap = { [colSlug]: col };
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
