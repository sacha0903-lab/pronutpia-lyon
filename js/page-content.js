/* page-content.js — charge _data/pages/home.json ou about.json
   et injecte les textes éditables dans les éléments identifiés par ID.
   Utilisé par index.html et a-propos.html. */
(async function () {
  'use strict';
  const el = id => document.getElementById(id);

  function fill(map) {
    for (const [id, val] of Object.entries(map)) {
      const e = el(id);
      if (e && val != null) e.textContent = val;
    }
  }

  try {
    // ── Page Accueil ────────────────────────────────────────────────
    if (el('home-intro-eyebrow')) {
      const r = await fetch('/_data/pages/home.json');
      if (r.ok) {
        const d = await r.json();
        fill({
          'home-intro-eyebrow': d.intro_eyebrow,
          'home-intro-title':   d.intro_title,
          'home-intro-text':    d.intro_text,
          'home-about-eyebrow': d.about_eyebrow,
          'home-about-title':   d.about_title,
          'home-about-text1':   d.about_text1,
          'home-about-text2':   d.about_text2,
          'home-cta-eyebrow':   d.cta_eyebrow,
          'home-cta-title':     d.cta_title,
          'home-cta-text':      d.cta_text,
        });
      }
    }

    // ── Page À propos ───────────────────────────────────────────────
    if (el('about-eyebrow')) {
      const r = await fetch('/_data/pages/about.json');
      if (r.ok) {
        const d = await r.json();
        fill({
          'about-eyebrow':   d.eyebrow,
          'about-title':     d.title,
          'about-p1':        d.p1,
          'about-p2':        d.p2,
          'about-p3':        d.p3,
          'about-p4':        d.p4,
          'about-p5':        d.p5,
          'about-blockquote': d.blockquote,
        });
      }
    }
  } catch (_) {
    // Silently fail — les textes par défaut restent visibles
  }
})();
