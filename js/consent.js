/* =====================================================
   PRONUPTIA LYON — CONSENTEMENT COOKIES (RGPD)
   Google Consent Mode v2.

   Ce fichier doit être chargé de façon SYNCHRONE dans le <head>,
   AVANT le script gtag.js, pour que le refus par défaut soit
   enregistré avant tout dépôt de cookie.

   Tant que la visiteuse n'a rien choisi, Google n'écrit aucun
   cookie de mesure ni de publicité.
   ===================================================== */
(function () {
  'use strict';

  var STORAGE_KEY  = 'pronuptia_consent_v1';
  var VALIDITY_MS  = 182 * 24 * 60 * 60 * 1000;   // 6 mois (recommandation CNIL)
  var POLICY_URL   = '/politique-confidentialite.html';

  /* ─── Socle gtag ─── */
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function () { window.dataLayer.push(arguments); };
  }

  /* ─── 1. Refus par défaut (avant tout chargement Google) ─── */
  gtag('consent', 'default', {
    ad_storage:              'denied',
    ad_user_data:            'denied',
    ad_personalization:      'denied',
    analytics_storage:       'denied',
    personalization_storage: 'denied',
    functionality_storage:   'granted',
    security_storage:        'granted',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);

  /* ─── Stockage du choix ─── */
  function read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || typeof s.date !== 'number') return null;
      if (Date.now() - s.date > VALIDITY_MS) return null;   // expiré : on redemande
      return s;
    } catch (e) { return null; }
  }

  function save(analytics, ads) {
    var state = { analytics: !!analytics, ads: !!ads, date: Date.now() };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
    return state;
  }

  function apply(state) {
    var ads = state.ads ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage:              ads,
      ad_user_data:            ads,
      ad_personalization:      ads,
      analytics_storage:       state.analytics ? 'granted' : 'denied',
      personalization_storage: ads
    });
  }

  var current = read();
  if (current) apply(current);

  /* ─── API publique ─── */
  var api = {
    isResolved: function () { return !!read(); },
    get: read,
    open: function () { ui.open(); }
  };
  window.PronuptiaConsent = api;

  function resolve(analytics, ads) {
    var state = save(analytics, ads);
    apply(state);
    ui.close();
    if (typeof gtag === 'function') {
      gtag('event', 'choix_cookies', {
        analytics: state.analytics ? 'oui' : 'non',
        publicite: state.ads ? 'oui' : 'non'
      });
    }
    try {
      document.dispatchEvent(new CustomEvent('consent:resolved', { detail: state }));
    } catch (e) {
      var ev = document.createEvent('Event');
      ev.initEvent('consent:resolved', true, true);
      document.dispatchEvent(ev);
    }
  }

  /* ─── Interface ─── */
  var ui = (function () {
    var root = null;

    var markup =
      '<div class="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-text">' +
        '<div class="cookie-inner">' +
          '<div class="cookie-copy">' +
            '<p class="cookie-eyebrow">Confidentialité</p>' +
            '<h2 class="cookie-title" id="cookie-title">Un mot sur les cookies</h2>' +
            '<p class="cookie-text" id="cookie-text">Nous utilisons des cookies pour mesurer la fréquentation du site et améliorer nos campagnes. Vous êtes libre de les accepter ou de les refuser — votre visite reste identique dans les deux cas. ' +
              '<a href="' + POLICY_URL + '">En savoir plus</a>' +
            '</p>' +
          '</div>' +
          '<div class="cookie-actions">' +
            '<button type="button" class="cookie-btn cookie-btn--accept" data-act="accept">Tout accepter</button>' +
            '<button type="button" class="cookie-btn cookie-btn--refuse" data-act="refuse">Tout refuser</button>' +
            '<button type="button" class="cookie-link" data-act="custom">Personnaliser</button>' +
          '</div>' +
        '</div>' +

        '<div class="cookie-prefs" hidden>' +
          '<label class="cookie-pref">' +
            '<span class="cookie-pref-copy">' +
              '<span class="cookie-pref-name">Nécessaires</span>' +
              '<span class="cookie-pref-desc">Indispensables au fonctionnement du site. Toujours actifs.</span>' +
            '</span>' +
            '<input type="checkbox" checked disabled>' +
            '<span class="cookie-switch" aria-hidden="true"></span>' +
          '</label>' +
          '<label class="cookie-pref">' +
            '<span class="cookie-pref-copy">' +
              '<span class="cookie-pref-name">Mesure d’audience</span>' +
              '<span class="cookie-pref-desc">Nous aide à comprendre quelles pages vous intéressent (Google Analytics).</span>' +
            '</span>' +
            '<input type="checkbox" data-pref="analytics">' +
            '<span class="cookie-switch" aria-hidden="true"></span>' +
          '</label>' +
          '<label class="cookie-pref">' +
            '<span class="cookie-pref-copy">' +
              '<span class="cookie-pref-name">Publicité</span>' +
              '<span class="cookie-pref-desc">Permet de savoir si nos annonces vous ont menée jusqu’ici (Google Ads).</span>' +
            '</span>' +
            '<input type="checkbox" data-pref="ads">' +
            '<span class="cookie-switch" aria-hidden="true"></span>' +
          '</label>' +
          '<button type="button" class="cookie-btn cookie-btn--accept cookie-save" data-act="save">Enregistrer mes choix</button>' +
        '</div>' +
      '</div>';

    function build() {
      if (root) return root;
      var wrap = document.createElement('div');
      wrap.innerHTML = markup;
      root = wrap.firstChild;

      root.addEventListener('click', function (e) {
        var b = e.target.closest ? e.target.closest('[data-act]') : null;
        if (!b) return;
        var act = b.getAttribute('data-act');
        if (act === 'accept')      resolve(true, true);
        else if (act === 'refuse') resolve(false, false);
        else if (act === 'custom') togglePrefs();
        else if (act === 'save') {
          resolve(
            root.querySelector('[data-pref="analytics"]').checked,
            root.querySelector('[data-pref="ads"]').checked
          );
        }
      });

      document.body.appendChild(root);
      return root;
    }

    function togglePrefs() {
      var panel = root.querySelector('.cookie-prefs');
      var open  = panel.hasAttribute('hidden');
      if (open) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
      root.classList.toggle('has-prefs', open);
    }

    return {
      open: function () {
        build();
        var saved = read();
        root.querySelector('[data-pref="analytics"]').checked = !!(saved && saved.analytics);
        root.querySelector('[data-pref="ads"]').checked       = !!(saved && saved.ads);
        // Rouverte depuis le footer : on montre directement le détail.
        if (saved) {
          root.querySelector('.cookie-prefs').removeAttribute('hidden');
          root.classList.add('has-prefs');
        }
        // Reflow forcé plutôt que requestAnimationFrame : garantit la
        // transition même si l'onglet est ouvert en arrière-plan.
        void root.offsetHeight;
        root.classList.add('is-open');
      },
      close: function () {
        if (!root) return;
        root.classList.remove('is-open');
        setTimeout(function () {
          if (root && root.parentNode) { root.parentNode.removeChild(root); root = null; }
        }, 500);
      }
    };
  })();

  /* ─── Lien « Gérer les cookies » dans le pied de page ─── */
  function addFooterLink() {
    var legal = document.querySelector('.footer-legal');
    if (!legal || legal.querySelector('.cookie-manage')) return;
    var a = document.createElement('a');
    a.href = '#';
    a.className = 'cookie-manage';
    a.textContent = 'Gérer les cookies';
    a.addEventListener('click', function (e) { e.preventDefault(); ui.open(); });
    legal.appendChild(a);
  }

  function init() {
    addFooterLink();
    if (!read()) ui.open();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
