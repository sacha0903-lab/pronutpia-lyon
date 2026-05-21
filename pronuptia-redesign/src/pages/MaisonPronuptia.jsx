import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { collections } from '../data/collections'

const col = collections['2026']

const timeline = [
  { year: '1958', title: 'La Naissance', desc: 'Marie et Henri Micmacher fondent Pronuptia et créent la première robe de mariée en prêt-à-porter, démocratisant la mode nuptiale en France.' },
  { year: '1978', title: 'Le Mans 24h', desc: 'Pronuptia devient sponsor officiel des 24 Heures du Mans, affirmant son audace et son esprit avant-gardiste.' },
  { year: '1987', title: 'Jean-Paul Gaultier', desc: 'Le créateur dessine une collection exclusive, présentée lors de la Nuit Blanche du Mariage.' },
  { year: '1989', title: 'Thierry Mugler', desc: 'L\'enfant terrible de la mode crée quatre modèles d\'exception, dévoilés au cinéma Le Rex.' },
  { year: '1997', title: 'Christian Lacroix', desc: 'Huit modèles cousus main, chacun nécessitant trois mois de travail. L\'apogée du savoir-faire.' },
  { year: '2008', title: 'Noce d\'Or', desc: 'Pour ses 50 ans, Elizabeth Barboza crée une robe exclusive limitée à 50 exemplaires.' },
  { year: '2014', title: 'Miss France', desc: 'Pronuptia devient partenaire officiel du concours Miss France, habillant les candidates les plus élégantes.' },
  { year: '2023', title: 'Renaissance', desc: 'La maison renaît avec une nouvelle vision, perpétuant l\'héritage tout en embrassant la modernité.' },
]

export default function MaisonPronuptia() {
  const location = useLocation()
  const isMissFrance = location.pathname.includes('miss-france')

  if (isMissFrance) {
    return <MissFrance />
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] lg:h-[60vh] overflow-hidden bg-charcoal">
        <div className="absolute inset-0 opacity-30">
          <img src={col.dresses[4]?.image || col.heroImage} alt="La Maison Pronuptia" className="w-full h-full object-cover" />
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="divider-ornament mb-6">
              <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path d="M12 3l1.5 4.5H18l-3.5 2.5L16 14.5 12 11.5 8 14.5l1.5-4.5L6 7.5h4.5z" />
              </svg>
            </div>
            <p className="label-upper !text-gold-light mb-4">Notre Histoire</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[72px] text-white font-light leading-[1.1]">
              La Maison Pronuptia
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl lg:text-[42px] mb-8 leading-[1.15]">
                Plus de six décennies d'élégance
              </h2>
              <p className="text-muted leading-relaxed text-base lg:text-lg">
                Pronuptia a marqué l'histoire de la mode nuptiale française en créant
                la première robe de mariée en prêt-à-porter. Des plus grands créateurs
                de haute couture aux boutiques qui illuminent les vitrines de France,
                notre maison porte un héritage d'exception.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Designer Collaboration Banner */}
      <section className="py-16 bg-cream-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="label-upper text-center mb-8">Collaborations Prestigieuses</p>
            <div className="flex flex-wrap justify-center gap-8 lg:gap-14 text-charcoal/40">
              {['Jean-Paul Gaultier', 'Christian Lacroix', 'Thierry Mugler', 'Olivier Lapidus', 'Balenciaga'].map((name) => (
                <span key={name} className="font-serif text-xl lg:text-2xl italic">{name}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="label-upper mb-3">Depuis 1958</p>
              <h2 className="font-serif text-3xl lg:text-[42px]">Notre Parcours</h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" />

            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={0.05}>
                <div className={`relative flex items-start gap-8 mb-16 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 lg:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-1/2 mt-2 z-10" />

                  {/* Content */}
                  <div className={`pl-12 lg:pl-0 lg:w-1/2 ${i % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <span className="font-serif text-3xl lg:text-4xl text-gold/60">{item.year}</span>
                    <h3 className="font-serif text-xl lg:text-2xl mt-2 mb-3">{item.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Today Section */}
      <section className="py-20 lg:py-32 bg-charcoal text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="img-zoom aspect-[4/5] bg-charcoal-light">
                <img
                  src={col.dresses[10]?.image || col.heroImage}
                  alt="Pronuptia Aujourd'hui"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <p className="label-upper !text-gold mb-4">Aujourd'hui</p>
                <h2 className="font-serif text-3xl lg:text-[42px] mb-6 leading-[1.15]">
                  L'héritage continue
                </h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  Issue d'une famille du secteur nuptial depuis plusieurs générations,
                  la nouvelle direction insuffle une énergie contemporaine à la maison
                  tout en respectant son ADN d'excellence.
                </p>
                <p className="text-white/60 leading-relaxed mb-8">
                  Pronuptia reste fidèle à sa mission : rendre le rêve
                  de la robe de mariée accessible à toutes les femmes,
                  avec l'exigence de qualité qui fait notre signature.
                </p>
                <Link to="/collections/2026" className="btn-gold">
                  Découvrir la Collection
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}

function MissFrance() {
  const col = collections['2026']

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] lg:h-[55vh] overflow-hidden bg-charcoal">
        <div className="absolute inset-0 opacity-25">
          <img src={col.dresses[7]?.image || col.heroImage} alt="Miss France" className="w-full h-full object-cover" />
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p className="label-upper !text-gold-light mb-4">Partenariat</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[64px] text-white font-light">
              Pronuptia & Miss France
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl lg:text-[42px] mb-6">Un événement unique</h2>
              <p className="text-muted leading-relaxed text-base lg:text-lg">
                Pronuptia est fier d'être partenaire officiel du concours Miss France,
                habillant les candidates avec des créations d'exception qui célèbrent
                l'élégance et la beauté de la femme française.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-cream-dark p-8 lg:p-12 mb-12">
              <p className="label-upper mb-4">Collaboration 2022</p>
              <h3 className="font-serif text-2xl lg:text-3xl mb-4">Nicolas Fafiotte pour Pronuptia</h3>
              <p className="text-muted leading-relaxed mb-4">
                Pour le concours Miss France 2022, le créateur Nicolas Fafiotte a dessiné
                des robes de gala exclusives, fabriquées par les ateliers Pronuptia.
              </p>
              <p className="text-muted leading-relaxed">
                La robe de la Miss : un tissu or rose à sequins, décolleté en V,
                fente élégante, silhouette fourreau et cape assortie.
                Distribuée dans une trentaine de boutiques partenaires.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center">
              <Link to="/nos-revendeurs" className="btn-primary">Découvrir la robe en boutique</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
