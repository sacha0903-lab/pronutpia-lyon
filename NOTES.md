# Pronuptia Lyon — Notes de projet

## État : En cours — structure complète, photos à intégrer

---

## Structure des fichiers

```
site pronuptia/
├── index.html                  ✅ Homepage
├── a-propos.html               ✅ À propos
├── galerie.html                ✅ Galerie globale (67 robes, filtres)
├── rendez-vous.html            ✅ Formulaire prise de RDV
├── collections/
│   ├── amelie.html             ✅ Collection Amélie (19 robes)
│   ├── pronuptia.html          ✅ Collection Pronuptia (6 robes)
│   ├── libelle.html            ✅ Collection Libellé (6 robes)
│   ├── randy-fenoli.html       ✅ Randy Fenoli (4 robes)
│   ├── modeca-courtes.html     ✅ Robes Courtes Modeca (3 robes)
│   ├── modeca-papillon.html    ✅ Modeca + Le Papillon (16 robes)
│   ├── eddy-k.html             ✅ Eddy K (3 robes)
│   └── justin-alexander.html   ✅ Justin Alexander (10 robes)
├── assets/
│   └── hero.mp4                ✅ Vidéo hero (copiée depuis Desktop)
├── css/
│   └── style.css               ✅ Stylesheet complet
├── js/
│   └── main.js                 ✅ Interactions, lightbox, filtres
└── .claude/
    └── launch.json             ✅ Serveur local port 8766
```

---

## Infos boutique

- **Nom** : Pronuptia Lyon
- **Adresse** : 9 rue des Remparts d'Ainay, 69002 Lyon
- **Téléphone** : 04 78 37 12 58 (fictif)
- **Email** : contact@pronuptia-lyon.fr (fictif)
- **Horaires** : Mar–Ven 10h–19h / Sam 10h–18h30
- **Depuis** : 2004

---

## Collections (67 robes total)

| Collection            | Robes | Fichier                   |
|-----------------------|-------|---------------------------|
| Collection Amélie     | 19    | collections/amelie.html   |
| Pronuptia             | 6     | collections/pronuptia.html|
| Libellé               | 6     | collections/libelle.html  |
| Randy Fenoli          | 4     | collections/randy-fenoli.html |
| Robes Courtes Modeca  | 3     | collections/modeca-courtes.html |
| Modeca + Le Papillon  | 16    | collections/modeca-papillon.html |
| Eddy K                | 3     | collections/eddy-k.html   |
| Justin Alexander      | 10    | collections/justin-alexander.html |

---

## Palette de couleurs

```css
--c-burgundy:      #6B1A28   /* bordeaux principal */
--c-burgundy-dark: #4A1020   /* bordeaux foncé */
--c-gold:          #C4A882   /* or/champagne */
--c-gold-light:    #D4BFA0   /* or clair */
--c-ivory:         #FAF7F2   /* ivoire fond clair */
--c-cream:         #F0EAE0   /* crème sections */
--c-dark:          #0F0E17   /* quasi-noir */
--c-charcoal:      #1C1B26   /* anthracite */
```

**Fonts** : Cormorant Garamond (titres) + Montserrat (corps)

---

## À faire — prochaines étapes

### PRIORITÉ 1 — Photos des robes
- [ ] Partager un **lien public Dropbox** (clic droit dossier → Partager → Créer un lien)
- [ ] Intégrer les photos dans les 9 pages collections (remplacer les dégradés CSS)
- [ ] Intégrer les photos dans `galerie.html` (67 items)
- [ ] Intégrer les photos dans la section "Robes vedettes" de `index.html` (4 cartes)
- [ ] Intégrer la photo de la section "À propos" de `index.html`

### PRIORITÉ 2 — Logo
- [ ] Fournir le fichier logo Pronuptia (PNG ou SVG)
- [ ] Remplacer le logo texte dans header et footer

### PRIORITÉ 3 — Hébergement
- [ ] Choisir un hébergeur (OVH, Netlify, Ionos…)
- [ ] Déployer le site statique
- [ ] Configurer le nom de domaine

### PRIORITÉ 4 — Finitions (optionnelles)
- [ ] Formulaire RDV → connecter à un vrai service d'envoi d'email (Formspree, EmailJS…)
- [ ] Ajouter Google Analytics ou Matomo
- [ ] Optimiser les images (compression WebP)
- [ ] Ajouter balises SEO meta (description, Open Graph)

---

## Lancer le serveur local

```bash
cd "/Users/sachableines/site pronuptia"
python3 -m http.server 8766
```
Puis ouvrir : `http://localhost:8766`

---

## Source vidéo hero

Original : `/Users/sachableines/Desktop/IA marketing/Pronuptia/vidéo landingpage site.mp4`
Copie dans le projet : `assets/hero.mp4`
