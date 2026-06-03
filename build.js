'use strict';

const fs   = require('fs');
const path = require('path');

// ── Helpers ───────────────────────────────────────────────────────────────────

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Convert absolute asset path (/assets/...) to relative (../assets/...)
// Collection pages live in collections/ so assets are one level up.
function rel(p) {
  return p ? p.replace(/^\//, '../') : '';
}

// ── Collection order ──────────────────────────────────────────────────────────

// Order used in the navigation dropdown
const NAV_ORDER = [
  'amelie', 'pronuptia', 'libelle', 'randy-fenoli',
  'modeca-courtes', 'modeca-papillon', 'eddy-k', 'justin-alexander'
];

// Order used in the footer (modeca-courtes excluded, justin-alexander moved up)
const FOOTER_ORDER = [
  'amelie', 'pronuptia', 'justin-alexander', 'randy-fenoli',
  'libelle', 'modeca-papillon', 'eddy-k'
];

// ── Load data ─────────────────────────────────────────────────────────────────

const DATA_DIR = path.join(__dirname, '_data');

const settings = JSON.parse(
  fs.readFileSync(path.join(DATA_DIR, 'settings.json'), 'utf-8')
);

const bySlug = {};
for (const slug of NAV_ORDER) {
  bySlug[slug] = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, 'collections', `${slug}.json`), 'utf-8')
  );
}

const navCollections    = NAV_ORDER.map(s => bySlug[s]);
const footerCollections = FOOTER_ORDER.map(s => bySlug[s]);

// ── Partials ──────────────────────────────────────────────────────────────────

function navDropdown() {
  return navCollections.map(c => {
    const n = c.dresses.length;
    return `            <a href="${c.slug}.html">${escapeHtml(c.nav_label)} <span class="dd-count">${n} robe${n > 1 ? 's' : ''}</span></a>`;
  }).join('\n');
}

function heroSection(c) {
  const n = c.dresses.length;
  const count = `${n} robe${n > 1 ? 's' : ''}`;
  if (c.hero_image) {
    return `  <!-- PAGE HERO -->
  <section class="page-hero">
    <div class="page-hero__bg">
      <img src="${escapeAttr(rel(c.hero_image))}" alt="${escapeAttr(c.title)}" style="width:100%;height:100%;object-fit:cover;object-position:top center;position:absolute;inset:0;">
    </div>
    <div class="page-hero__overlay"></div>
    <div class="page-hero__content">
      <span class="eyebrow">${count}</span>
      <h1><em>${escapeHtml(c.title)}</em></h1>
    </div>
  </section>`;
  }
  return `  <!-- PAGE HERO -->
  <section class="page-hero">
    <div class="page-hero__bg">
      <div style="width:100%;height:100%;background:${escapeAttr(c.hero_gradient)};position:absolute;inset:0;"></div>
    </div>
    <div class="page-hero__overlay"></div>
    <div class="page-hero__content">
      <span class="eyebrow">${count}</span>
      <h1><em>${escapeHtml(c.title)}</em></h1>
    </div>
  </section>`;
}

function collectionIntro(c) {
  const n = c.dresses.length;
  const count = `${n} robe${n > 1 ? 's' : ''} disponible${n > 1 ? 's' : ''}`;
  const logoLine = c.logo
    ? `        <img src="${escapeAttr(rel(c.logo))}" alt="${escapeAttr(c.title)}" class="collection-intro__logo">\n`
    : '';
  return `  <!-- COLLECTION INTRO -->
  <div class="container">
    <div class="collection-intro">
      <div>
${logoLine}        <div class="collection-intro__brand">${escapeHtml(c.title)}</div>
        <div class="collection-intro__count eyebrow">${count}</div>
      </div>
      <div>
        <p class="collection-intro__desc">${escapeHtml(c.description)}</p>
        <a href="../rendez-vous.html" class="btn btn--dark"><span>Essayer en boutique</span></a>
      </div>
    </div>
  </div>`;
}

function dressCard(dress, brand, idx) {
  const delay     = `reveal-d${(idx % 4) + 1}`;
  const brandAttr = escapeAttr(brand);
  const nameAttr  = escapeAttr(dress.name);

  let dataAttrs = `data-lightbox data-brand="${brandAttr}" data-name="${nameAttr}"`;

  if (dress.additional_photos && dress.additional_photos.length > 0) {
    const photos = dress.additional_photos.map(p => rel(p)).join(',');
    dataAttrs += ` data-photos="${escapeAttr(photos)}"`;
  }

  if (dress.description) {
    dataAttrs += ` data-description="${escapeAttr(dress.description)}"`;
  }

  dataAttrs += ` data-full="${escapeAttr(dress.main_photo ? rel(dress.main_photo) : '')}"`;

  let imgContent;
  if (dress.main_photo) {
    imgContent = `          <img src="${escapeAttr(rel(dress.main_photo))}" alt="${escapeAttr(dress.name)} — ${escapeAttr(brand)}" loading="lazy">`;
  } else {
    imgContent = `          <div class="dress-card__placeholder" style="background:${escapeAttr(dress.placeholder_color)};">
            <svg class="dress-icon-svg" viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="40" cy="14" rx="11" ry="13" fill="currentColor" opacity="0.3"/>
              <path d="M29 27 C32 35 48 35 51 27 L68 70 L75 130 L5 130 L12 70 Z" fill="currentColor" opacity="0.2"/>
              <path d="M29 27 C32 36 48 36 51 27" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.5"/>
            </svg>
          </div>`;
  }

  return `      <div class="dress-card reveal ${delay}" ${dataAttrs}>
        <div class="dress-card__img-wrap">
${imgContent}
          <div class="dress-card__overlay"><div class="dress-card__overlay-txt">Agrandir</div></div>
        </div>
        <div class="dress-card__info">
          <div class="dress-card__brand">${escapeHtml(brand)}</div>
          <div class="dress-card__name">${escapeHtml(dress.name)}</div>
        </div>
      </div>`;
}

function dressGrid(c) {
  const cards = c.dresses.map((d, i) => dressCard(d, c.title, i)).join('\n\n');
  return `  <!-- DRESS GRID -->
  <div class="container">
    <div class="collection-dresses-grid">

${cards}

    </div>
  </div>`;
}

function footerHours() {
  return settings.hours.map(h =>
    `                    <div class="hours-row"><span class="day">${escapeHtml(h.days)}</span><span>${escapeHtml(h.hours)}</span></div>`
  ).join('\n');
}

function footerLinks() {
  return footerCollections.map(c =>
    `              <a href="${c.slug}.html">${escapeHtml(c.nav_label)}</a>`
  ).join('\n');
}

// ── Shell template (contenu rendu dynamiquement par collection-page.js) ───────
// Le build génère uniquement le squelette HTML avec les meta SEO et la nav.
// Tout le contenu (robes, horaires, intro…) est chargé depuis les JSON au runtime.

function generatePage(c) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(c.title)} — Pronuptia Lyon</title>
  <meta name="description" content="${escapeAttr(c.meta_description)}">
  <link rel="canonical" href="https://pronuptia-lyon.fr/collections/${c.slug}.html">
  <meta property="og:type"        content="website">
  <meta property="og:url"         content="https://pronuptia-lyon.fr/collections/${c.slug}.html">
  <meta property="og:title"       content="${escapeAttr(c.title)} — Pronuptia Lyon">
  <meta property="og:description" content="${escapeAttr(c.meta_description)}">
  <meta property="og:image"       content="https://pronuptia-lyon.fr/assets/images/og-cover.jpg">
  <meta property="og:locale"      content="fr_FR">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css?v=3">
</head>
<body>

  <!-- PAGE LOADER -->
  <div id="page-loader">
    <div class="loader-logo">Pronuptia Lyon</div>
    <div class="loader-line"></div>
  </div>

  <!-- HEADER -->
  <header id="site-header" class="site-header is-transparent">
    <div class="header-inner container">
      <a href="../index.html" class="site-logo">
        <img src="../assets/images/logos/pronuptia.webp?v=3" alt="Pronuptia" class="site-logo__img">
        <span class="logo-sub">Lyon</span>
      </a>
      <nav class="main-nav">
        <a href="../index.html" class="nav-link">Accueil</a>
        <div class="nav-item--dropdown">
          <a href="../galerie.html" class="nav-link active">Collections</a>
          <div class="nav-dropdown" id="nav-dropdown">
${navDropdown()}
          </div>
        </div>
        <a href="../galerie.html" class="nav-link">Galerie</a>
        <a href="../coups-de-coeur.html" class="nav-link">Coups de cœur</a>
        <a href="../a-propos.html" class="nav-link">À Propos</a>
        <a href="../rendez-vous.html" class="nav-link">Contact</a>
      </nav>
      <button class="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu">
      <nav class="mobile-nav">
        <a href="../index.html" class="mobile-nav-link">Accueil</a>
        <a href="../galerie.html" class="mobile-nav-link active">Collections</a>
        <a href="../galerie.html" class="mobile-nav-link">Galerie</a>
        <a href="../coups-de-coeur.html" class="mobile-nav-link">Coups de cœur</a>
        <a href="../a-propos.html" class="mobile-nav-link">À Propos</a>
        <a href="../rendez-vous.html" class="mobile-nav-link">Contact</a>
      </nav>
    </div>
  </header>

  <!-- PAGE HERO — rendu par collection-page.js -->
  <section class="page-hero" id="page-hero"></section>

  <!-- BREADCRUMB -->
  <div class="container">
    <nav class="breadcrumb">
      <a href="../index.html">Accueil</a>
      <span class="breadcrumb-sep">›</span>
      <a href="../galerie.html">Collections</a>
      <span class="breadcrumb-sep">›</span>
      <span id="breadcrumb-title"></span>
    </nav>
  </div>

  <!-- COLLECTION INTRO — rendu par collection-page.js -->
  <div class="container">
    <div class="collection-intro" id="collection-intro"></div>
  </div>

  <!-- STYLE FILTERS — rendu par collection-page.js -->
  <div class="container">
    <div class="collection-style-filters" id="style-filters" style="display:none; margin-top: 32px;"></div>
  </div>

  <!-- DRESS GRID — rendu par collection-page.js -->
  <div class="container">
    <div class="collection-dresses-grid" id="dress-grid"></div>
  </div>

  <!-- CTA SECTION -->
  <section class="section-cta">
    <div class="container">
      <span class="eyebrow">Votre robe vous attend</span>
      <h2>Essayez cette collection<br><em>en boutique</em></h2>
      <p id="cta-text"></p>
      <a href="../rendez-vous.html" class="btn btn--outline"><span>Prendre rendez-vous</span></a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="site-footer">
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-brand-logo">
              <span class="logo-main" style="font-size:1.5rem;">Pronuptia</span>
              <div class="logo-divider" style="margin:5px 0;"></div>
              <span class="logo-sub">Lyon</span>
            </div>
            <p class="footer-tagline" id="footer-tagline"></p>
            <div class="footer-social">
              <a href="#" id="footer-ig" aria-label="Instagram">ig</a>
              <a href="#" id="footer-fb" aria-label="Facebook">fb</a>
              <a href="#" id="footer-pt" aria-label="Pinterest">pt</a>
            </div>
          </div>
          <div>
            <div class="footer-col-title">Collections</div>
            <div class="footer-col-links" id="footer-collection-links">
${footerLinks()}
            </div>
          </div>
          <div>
            <div class="footer-col-title">La boutique</div>
            <div class="footer-col-links">
              <a href="../index.html">Accueil</a>
              <a href="../galerie.html">Galerie</a>
              <a href="../a-propos.html">À Propos</a>
              <a href="../rendez-vous.html">Prendre rendez-vous</a>
            </div>
          </div>
          <div>
            <div class="footer-col-title">Nous trouver</div>
            <div class="footer-contact-items">
              <div class="footer-contact-item">
                <div class="fci-icon">📍</div>
                <div class="fci-text"><strong>Adresse</strong><span id="footer-address"></span></div>
              </div>
              <div class="footer-contact-item">
                <div class="fci-icon">📞</div>
                <div class="fci-text"><strong>Téléphone</strong><span id="footer-phone"></span></div>
              </div>
              <div class="footer-contact-item">
                <div class="fci-icon">🕐</div>
                <div class="fci-text"><strong>Horaires</strong>
                  <div class="hours-list" id="footer-hours"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-inner">
          <p class="footer-copy">© 2025 Pronuptia Lyon — Tous droits réservés</p>
          <div class="footer-legal"><a href="#">Mentions légales</a><a href="#">Confidentialité</a></div>
        </div>
      </div>
    </div>
  </footer>

  <!-- LIGHTBOX -->
  <div id="lightbox" role="dialog" aria-modal="true" aria-label="Visionneuse">
    <button class="lightbox-close" id="lb-close" aria-label="Fermer">✕</button>
    <button class="lightbox-prev" id="lb-prev" aria-label="Précédent">‹</button>
    <button class="lightbox-next" id="lb-next" aria-label="Suivant">›</button>
    <img class="lightbox-img" id="lb-img" src="" alt="">
    <div class="lightbox-caption">
      <span class="brand" id="lb-brand"></span>
      <span class="name" id="lb-name"></span>
      <p class="lightbox-description" id="lb-description"></p>
    </div>
  </div>

  <script src="../js/main.js?v=3"></script>
  <script src="../js/collection-page.js?v=1"></script>
</body>
</html>`;
}

// ── Run ───────────────────────────────────────────────────────────────────────

const OUT_DIR = path.join(__dirname, 'collections');

for (const slug of NAV_ORDER) {
  const c   = bySlug[slug];
  const out = path.join(OUT_DIR, `${c.slug}.html`);
  fs.writeFileSync(out, generatePage(c), 'utf-8');
  console.log(`✓ collections/${c.slug}.html  (${c.dresses.length} robes)`);
}

console.log(`\n✓ Build terminé — ${NAV_ORDER.length} shells générés`);
