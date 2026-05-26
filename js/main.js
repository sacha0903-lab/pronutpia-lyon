/* =====================================================
   PRONUPTIA LYON — MAIN JAVASCRIPT
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── PAGE LOADER ─── */
  const loader = document.getElementById('page-loader');
  let loaderHidden = false;
  const doHideLoader = () => {
    if (!loader || loaderHidden) return;
    loaderHidden = true;
    loader.classList.add('loaded');
    setTimeout(() => loader.remove(), 400);
  };
  // collection-page.js pose window._waitForAsync = true avant de fetch le JSON
  // et appelle window._pageReady() quand le contenu est prêt.
  window._pageReady = doHideLoader;
  if (loader) {
    // Sécurité : masquer le loader après 800ms max quelle que soit la progression
    // du réseau (vidéo hero, images, fonts…). Évite tout blocage sur cold start.
    const maxTimer = setTimeout(doHideLoader, 800);
    window.addEventListener('load', () => {
      clearTimeout(maxTimer);
      if (!window._waitForAsync) doHideLoader();
    });
  }

  /* ─── AUTOPLAY VIDÉO HERO (tous navigateurs + Safari + mobile) ─── */
  // Safari ignore parfois l'attribut autoplay même avec muted+playsinline.
  // On force .play() explicitement, et on réessaie sur canplay si nécessaire
  // (cas Safari quand la vidéo n'a pas encore suffisamment bufférisé).
  const heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    heroVideo.play().catch(() => {
      // Échec immédiat (Safari pas prêt, ou politique autoplay) :
      // réessayer dès que la vidéo a assez de données pour démarrer.
      heroVideo.addEventListener('canplay', () => {
        heroVideo.play().catch(() => {
          // Toujours refusé (ex. Low Power Mode iOS) — le poster reste affiché
        });
      }, { once: true });
    });
  }

  /* ─── STICKY HEADER ─── */
  const header = document.getElementById('site-header');
  if (header) {
    // Only use transparent header on pages with a hero section (homepage)
    const hasHero = !!document.querySelector('.hero');
    let rafPending = false;
    const handleScroll = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        if (!hasHero || window.scrollY > 60) {
          header.classList.remove('is-transparent');
          header.classList.add('is-scrolled');
        } else {
          header.classList.add('is-transparent');
          header.classList.remove('is-scrolled');
        }
        rafPending = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ─── MOBILE MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── ACTIVE NAV LINK ─── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage)) link.classList.add('active');
  });

  /* ─── SCROLL REVEAL ─── */
  const revealObserver = window.revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ─── GALLERY FILTER ─── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
          const match = filter === 'all' || item.dataset.collection === filter;
          item.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          if (match) {
            item.style.display = '';
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.97)';
            setTimeout(() => {
              if (item.dataset.collection !== filter && filter !== 'all') {
                item.style.display = 'none';
              }
            }, 260);
          }
        });
      });
    });
  }

  /* ─── LIGHTBOX ─── */
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lb-img');
  const lbClose  = document.getElementById('lb-close');
  const lbBrand  = document.getElementById('lb-brand');
  const lbName   = document.getElementById('lb-name');
  const lbDesc   = document.getElementById('lb-description');
  const lbPrev   = document.getElementById('lb-prev');
  const lbNext   = document.getElementById('lb-next');

  // Flat array of all photos across all dress cards: {src, brand, name, description}
  let allPhotos    = [];
  let currentIndex = 0;

  const openLightbox = (index) => {
    if (!lightbox || !allPhotos.length) return;
    currentIndex = (index + allPhotos.length) % allPhotos.length;
    const photo = allPhotos[currentIndex];
    if (lbImg)   { lbImg.src = photo.src; lbImg.alt = photo.name; lbImg.style.display = photo.src ? '' : 'none'; }
    if (lbBrand) lbBrand.textContent = photo.brand;
    if (lbName)  lbName.textContent  = photo.name;
    if (lbDesc)  { lbDesc.textContent = photo.description || ''; lbDesc.style.display = photo.description ? '' : 'none'; }
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (lbImg) lbImg.src = '';
  };

  const showPrev = () => openLightbox(currentIndex - 1);
  const showNext = () => openLightbox(currentIndex + 1);

  // Build flat photo list: each card contributes its primary + extra angles
  const initLightbox = window.initLightbox = () => {
    allPhotos = [];
    document.querySelectorAll('[data-lightbox]').forEach(card => {
      const brand       = card.dataset.brand       || '';
      const name        = card.dataset.name        || '';
      const description = card.dataset.description || '';
      const full   = card.dataset.full  || card.querySelector('img')?.src || '';
      const extras = card.dataset.photos ? card.dataset.photos.split(',').map(s => s.trim()) : [];
      const srcs   = [full, ...extras].filter(Boolean);
      const startIndex = allPhotos.length;
      if (srcs.length) {
        srcs.forEach(src => allPhotos.push({ src, brand, name, description }));
      } else {
        // Carte placeholder sans photo : on l'enregistre quand même pour afficher la description
        allPhotos.push({ src: '', brand, name, description });
      }
      card.addEventListener('click', () => openLightbox(startIndex));
    });
  };
  initLightbox();

  if (lbClose)  lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)   lbPrev.addEventListener('click', showPrev);
  if (lbNext)   lbNext.addEventListener('click', showNext);
  if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  /* ─── SMOOTH COUNTER (stats) ─── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1400;
        const start  = performance.now();
        const tick   = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }

  /* ─── FORM VALIDATION + FORMSPREE ─── */
  const rdvForm = document.getElementById('rdv-form');
  if (rdvForm) {
    // Message de succès après redirection Formspree (?envoi=ok)
    if (window.location.search.includes('envoi=ok')) {
      const wrapper = document.getElementById('rdv-form-wrapper');
      if (wrapper) {
        wrapper.innerHTML = `
          <div style="text-align:center;padding:60px 20px;">
            <div style="font-size:3rem;margin-bottom:16px;color:#2d6a4f;">✓</div>
            <h3 style="margin-bottom:12px;">Demande envoyée !</h3>
            <p>Nous vous recontacterons sous 24h pour confirmer votre rendez-vous.</p>
          </div>`;
      }
    }

    rdvForm.addEventListener('submit', e => {
      const btn = rdvForm.querySelector('button[type="submit"]');
      const required = rdvForm.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderBottomColor = '#c0392b';
          field.addEventListener('input', () => {
            field.style.borderBottomColor = '';
          }, { once: true });
        }
      });

      if (!valid) { e.preventDefault(); return; }

      // Bloquer si Formspree non encore configuré
      if (rdvForm.action.includes('VOTRE_ID')) {
        e.preventDefault();
        alert('Formspree non configuré. Créez un compte sur formspree.io et remplacez VOTRE_ID dans rendez-vous.html.');
        return;
      }

      // Soumettre vers Formspree (envoi réel)
      if (btn) {
        btn.textContent = 'Envoi en cours…';
        btn.disabled = true;
      }
    });
  }

  /* ─── PARALLAX HERO (désactivé — remplacé par CSS scale au scroll) ─── */

  /* ─── NAVIGATION DROPDOWN KEYBOARD ─── */
  document.querySelectorAll('.nav-item--dropdown').forEach(item => {
    const trigger = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');
    if (!trigger || !dropdown) return;
    trigger.addEventListener('focus', () => {
      dropdown.style.opacity = '1';
      dropdown.style.visibility = 'visible';
      dropdown.style.transform = 'translateX(-50%) translateY(0)';
    });
    item.addEventListener('focusout', e => {
      if (!item.contains(e.relatedTarget)) {
        dropdown.style.opacity = '';
        dropdown.style.visibility = '';
        dropdown.style.transform = '';
      }
    });
  });

});
