/* settings.js — charge _data/settings.json et met à jour les éléments
   de la page identifiés par des ID (téléphone, horaires, etc.).
   Utilisé par index.html, a-propos.html, rendez-vous.html,
   galerie.html, coups-de-coeur.html. */
(async function () {
  'use strict';
  try {
    const r = await fetch('/_data/settings.json');
    if (!r.ok) return;
    const s = await r.json();

    const el = id => document.getElementById(id);
    function esc(v) {
      return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function hoursHtml(hours) {
      return (hours ?? []).map(h =>
        `<div class="hours-row"><span class="day">${esc(h.days)}</span><span>${esc(h.hours)}</span></div>`
      ).join('');
    }

    // Numéros de téléphone (texte simple)
    ['footer-phone', 'mobile-phone'].forEach(id => {
      const e = el(id);
      if (e) e.textContent = s.phone ?? '';
    });

    // Liens téléphone (met à jour texte + href)
    ['sidebar-phone', 'contact-phone-link'].forEach(id => {
      const e = el(id);
      if (!e) return;
      e.textContent = s.phone ?? '';
      if (s.phone) e.href = 'tel:' + s.phone.replace(/\s+/g, '');
    });

    // Adresse
    const addr = el('footer-address');
    if (addr) addr.innerHTML = `${esc(s.address)}<br>${esc(s.city)}`;

    // Tagline
    const tl = el('footer-tagline');
    if (tl) tl.textContent = s.tagline ?? '';

    // Réseaux sociaux
    if (el('footer-ig') && s.instagram) el('footer-ig').href = s.instagram;
    if (el('footer-fb') && s.facebook)  el('footer-fb').href = s.facebook;
    if (el('footer-pt') && s.pinterest) el('footer-pt').href = s.pinterest;

    // Horaires
    ['footer-hours', 'sidebar-hours'].forEach(id => {
      const e = el(id);
      if (e) e.innerHTML = hoursHtml(s.hours);
    });

  } catch (_) {
    // Silently fail — les valeurs par défaut restent visibles
  }
})();
