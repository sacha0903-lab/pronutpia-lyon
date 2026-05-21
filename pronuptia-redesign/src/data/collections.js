// Bridal placeholder images for design demo
// In production, replace with actual Pronuptia product photos
const img = (id, w = 800, h = 1100) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`

const bridalImages = [
  img('1519741497674-611481863552'),  // 0 wedding dress
  img('1522673607200-164d1b6ce486'),  // 1 bride
  img('1515934751635-c81c6bc9a2d8'),  // 2 white dress
  img('1509914398892-963f53e6e2f1'),  // 3 fashion
  img('1524504388940-b1c1722653e1'),  // 4 elegant
  img('1560185127-6a8c3bfa0fc6'),  // 5 fashion portrait
  img('1515372039744-b8f02a3ae446'),  // 6 white fabric
  img('1566206091558-7f218b696731'),  // 7 fashion editorial
  img('1544005313-94ddf0286df2'),  // 8 portrait
  img('1558171813-4c2ab4e32e5e'),  // 9 elegant dress
  img('1596783074918-c84cb06531ca'),  // 10 fashion
  img('1585241936939-be4099591252'),  // 11 minimalist fashion
  img('1469334031218-e382a71b716b'),  // 12 wedding
  img('1507003211169-0a1dd7228f2d'),  // 13 portrait
  img('1539109136881-3be0616acf4b'),  // 14 dress
  img('1549298916-b5bf6d8f43df'),  // 15 wedding venue
  img('1518611507436-f9221403cca2'),  // 16 bride portrait
  img('1529636798458-92182e662485'),  // 17 wedding details
  img('1512438889819-3e6d3db4592e'),  // 18 romantic
  img('1583939003579-730e3918a45a'),  // 19 dress detail
  img('1519741497674-611481863552'),  // 20 repeat
  img('1522673607200-164d1b6ce486'),  // 21 repeat
  img('1515934751635-c81c6bc9a2d8'),  // 22 repeat
  img('1509914398892-963f53e6e2f1'),  // 23 repeat
]

const heroImg1 = img('1519741497674-611481863552', 1920, 1080)
const heroImg2 = img('1469334031218-e382a71b716b', 1920, 1080)
const heroImg3 = img('1509914398892-963f53e6e2f1', 1920, 1080)

export const collections = {
  '2026': {
    year: '2026',
    name: 'Pronuptia 2026',
    tagline: 'Raffinement & Romantisme',
    description: 'Notre collection 2026 sublime les courbes féminines avec des décolletés subtils et des dentelles délicates. Chaque robe est une invitation à l\'élégance intemporelle.',
    heroImage: heroImg1,
    dresses: [
      { name: 'Quadira', slug: 'quadira', image: bridalImages[0] },
      { name: 'Quadisha', slug: 'quadisha', image: bridalImages[1] },
      { name: 'Qual', slug: 'qual', image: bridalImages[2] },
      { name: 'Quamar', slug: 'quamar', image: bridalImages[3] },
      { name: 'Quanda', slug: 'quanda', image: bridalImages[4] },
      { name: 'Quara', slug: 'quara', image: bridalImages[5] },
      { name: 'Quarine', slug: 'quarine', image: bridalImages[6] },
      { name: 'Quasira', slug: 'quasira', image: bridalImages[7] },
      { name: 'Quasquara', slug: 'quasquara', image: bridalImages[8] },
      { name: 'Quassis', slug: 'quassis', image: bridalImages[9] },
      { name: 'Quaylan', slug: 'quaylan', image: bridalImages[10] },
      { name: 'Quazar', slug: 'quazar', image: bridalImages[11] },
      { name: 'Quebec', slug: 'quebec', image: bridalImages[12] },
      { name: 'Queen', slug: 'queen', image: bridalImages[13] },
      { name: 'Quelea', slug: 'quelea', image: bridalImages[14] },
      { name: 'Quella', slug: 'quella', image: bridalImages[15] },
      { name: 'Quelna', slug: 'quelna', image: bridalImages[16] },
      { name: 'Queloise', slug: 'queloise', image: bridalImages[17] },
      { name: 'Quenby', slug: 'quenby', image: bridalImages[18] },
      { name: 'Quendra', slug: 'quendra', image: bridalImages[19] },
      { name: 'Quenisha', slug: 'quenisha', image: bridalImages[20] },
      { name: 'Quensas', slug: 'quensas', image: bridalImages[21] },
      { name: 'Quenza', slug: 'quenza', image: bridalImages[22] },
      { name: 'Querida', slug: 'querida', image: bridalImages[23] },
    ],
  },
  '2025': {
    year: '2025',
    name: 'Pronuptia 2025',
    tagline: 'Grâce & Intemporalité',
    description: 'Une collection qui célèbre la grâce féminine à travers des silhouettes fluides et des détails précieux. L\'art de la mariée sublimé.',
    heroImage: heroImg2,
    dresses: [
      { name: 'Yaffa', slug: 'yaffa', image: bridalImages[3] },
      { name: 'Yahel', slug: 'yahel', image: bridalImages[5] },
      { name: 'Yal', slug: 'yal', image: bridalImages[7] },
      { name: 'Yamaya', slug: 'yamaya', image: bridalImages[9] },
      { name: 'Yame', slug: 'yame', image: bridalImages[11] },
      { name: 'Yana', slug: 'yana', image: bridalImages[1] },
      { name: 'Yanaelle', slug: 'yanaelle', image: bridalImages[13] },
      { name: 'Yannique', slug: 'yannique', image: bridalImages[15] },
      { name: 'Yarenne', slug: 'yarenne', image: bridalImages[17] },
      { name: 'Yariss', slug: 'yariss', image: bridalImages[19] },
      { name: 'Yarkel', slug: 'yarkel', image: bridalImages[2] },
      { name: 'Yassia', slug: 'yassia', image: bridalImages[4] },
    ],
  },
  '2024': {
    year: '2024',
    name: 'Pronuptia 2024',
    tagline: 'Éclat & Élégance',
    description: 'Des robes qui capturent la lumière et magnifient chaque mariée. Une collection pensée pour les femmes d\'aujourd\'hui.',
    heroImage: heroImg3,
    dresses: [
      { name: 'Envie', slug: 'envie', image: bridalImages[6] },
      { name: 'Enea', slug: 'enea', image: bridalImages[8] },
      { name: 'Elissandre', slug: 'elissandre', image: bridalImages[10] },
      { name: 'Edelyne', slug: 'edelyne', image: bridalImages[12] },
      { name: 'Embellie', slug: 'embellie', image: bridalImages[14] },
      { name: 'Eglantine', slug: 'eglantine', image: bridalImages[16] },
      { name: 'Elicha', slug: 'elicha', image: bridalImages[18] },
      { name: 'Elga', slug: 'elga', image: bridalImages[0] },
    ],
  },
}

export const lifestyleImages = [
  bridalImages[2],
  bridalImages[5],
  bridalImages[8],
  bridalImages[11],
]

export const pressOutlets = [
  { name: 'BFMTV', url: 'https://www.youtube.com/watch?v=eYAiXQ-pN8k', image: '/press/morning-business.png' },
  { name: 'Les Échos', url: 'https://www.lesechos.fr/pme-regions/auvergne-rhone-alpes/mariages-les-professionnels-se-preparent-au-rattrapage-des-noces-1326988', image: '/press/les-echos.png' },
  { name: 'Europe 1', url: 'https://www.youtube.com/watch?v=_Z-1m98p3wI&cbrd=1', image: '/press/europe-1.png' },
  { name: 'Ouest France', url: 'https://www.ouest-france.fr/pays-de-la-loire/laval-53000/apres-son-rachat-aupres-du-tribunal-de-commerce-de-laval-il-veut-faire-renaitre-pronuptia-7144665', image: '/press/ouest-france.png' },
  { name: 'BFM Business', url: 'https://www.youtube.com/watch?v=5vmbEu2rjqo', image: '/press/bfm-business.png' },
  { name: 'Fashion Network', url: 'https://fr.fashionnetwork.com/news/Pronuptia-la-marque-relancee-par-le-groupe-alexis-mariage,1265822.html', image: '/press/fashion-network.png' },
  { name: 'Gala', url: 'https://www.gala.fr/', image: '/press/gala.png' },
  { name: 'Mariages.net', url: 'https://www.mariages.net/articles/miss-france-2022-robe--c10137', image: '/press/mariages-net.png' },
  { name: '66 Minutes', url: 'https://www.facebook.com/watch/?v=388208182753004', image: '/press/66-minutes.png' },
]
