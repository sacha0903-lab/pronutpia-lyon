import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { collections } from '../data/collections'

const col2026 = collections['2026']
const featuredDresses = col2026.dresses.slice(0, 6)

export default function Home() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={col2026.heroImage}
            className="w-full h-full object-cover object-[center_25%]"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/65" />
        </motion.div>

        <div className="relative h-full flex flex-col justify-end pb-16 lg:pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="label-upper !text-gold-light mb-4">Collection 2026</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[80px] text-white font-light leading-[1.05] mb-6 max-w-3xl">
              Raffinement<br />& Romantisme
            </h1>
            <p className="text-white/70 text-base lg:text-lg max-w-xl mb-10 font-light">
              Des robes qui subliment chaque mariée avec des dentelles délicates
              et des silhouettes intemporelles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/nos-revendeurs" className="btn-white text-center">
                Prendre Rendez-vous
              </Link>
              <Link to="/collections/2026" className="btn-secondary !border-white/50 !text-white hover:!bg-white hover:!text-charcoal text-center">
                Découvrir la Collection
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-10 bg-white/40"
          />
        </motion.div>
      </section>

      {/* ─── Brand Introduction ─── */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="divider-ornament mb-6">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path d="M12 3l1.5 4.5H18l-3.5 2.5L16 14.5 12 11.5 8 14.5l1.5-4.5L6 7.5h4.5z" />
                </svg>
              </div>
              <p className="label-upper mb-6">Depuis 1958</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-8 leading-[1.15]">
                L'art de la robe de mariée à la française
              </h2>
              <p className="text-muted text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
                Pronuptia a créé la première robe de mariée en prêt-à-porter.
                Depuis plus de six décennies, notre maison perpétue un savoir-faire
                d'exception au service de l'élégance et du rêve.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Featured Collection Grid ─── */}
      <section className="pb-20 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <p className="label-upper mb-3">Nouvelle Collection</p>
                <h2 className="font-serif text-3xl lg:text-[42px]">Pronuptia 2026</h2>
              </div>
              <Link
                to="/collections/2026"
                className="label-upper !text-charcoal hover:!text-gold transition-colors group flex items-center gap-2"
              >
                Voir toute la collection
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {featuredDresses.map((dress, i) => (
              <ScrollReveal key={dress.slug} delay={i * 0.1}>
                <Link to={`/collections/2026/${dress.slug}`} className="group block">
                  <div className="img-zoom aspect-[3/4] bg-cream-dark mb-4">
                    <img
                      src={dress.image}
                      alt={dress.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="font-serif text-lg lg:text-xl text-charcoal group-hover:text-gold transition-colors">
                    {dress.name}
                  </p>
                  <p className="text-xs text-muted mt-1 tracking-wider uppercase">Collection 2026</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Full Width Editorial Band ─── */}
      <section className="relative h-[60vh] min-h-[400px] lg:h-[70vh] overflow-hidden">
        <img
          src={col2026.dresses[8]?.image || col2026.heroImage}
          alt="Pronuptia Editorial"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ScrollReveal>
            <div className="text-center px-6">
              <p className="label-upper !text-gold-light mb-4">L'excellence à la française</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light mb-6 max-w-2xl mx-auto leading-[1.1]">
                Trouvez la robe de vos rêves
              </h2>
              <p className="text-white/60 mb-10 max-w-lg mx-auto text-sm lg:text-base">
                Nos conseillères vous accueillent pour un moment
                d'exception dans nos boutiques partenaires.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/nos-revendeurs" className="btn-white text-center">
                  Trouver une Boutique
                </Link>
                <Link to="/nos-revendeurs" className="btn-secondary !border-white/50 !text-white hover:!bg-white hover:!text-charcoal text-center">
                  Prendre Rendez-vous
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Style Categories ─── */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="label-upper mb-3">Votre Style</p>
              <h2 className="font-serif text-3xl lg:text-[42px]">Trouvez votre silhouette</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { name: 'Princesse', desc: 'Jupe ample et taille marquée', image: col2026.dresses[0].image },
              { name: 'Bohème', desc: 'Fluide et romantique', image: col2026.dresses[3].image },
              { name: 'Sirène', desc: 'Épouse les courbes', image: col2026.dresses[6].image },
              { name: 'Courte', desc: 'Moderne et audacieuse', image: col2026.dresses[9].image },
            ].map((style, i) => (
              <ScrollReveal key={style.name} delay={i * 0.1}>
                <Link to="/collections/2026" className="group block">
                  <div className="img-zoom aspect-[3/4] bg-cream-dark mb-4 relative">
                    <img
                      src={style.image}
                      alt={style.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="font-serif text-xl lg:text-2xl text-charcoal group-hover:text-gold transition-colors">
                    {style.name}
                  </h3>
                  <p className="text-xs text-muted mt-1">{style.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Heritage Teaser ─── */}
      <section className="py-20 lg:py-32 bg-cream-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="img-zoom aspect-[4/5] bg-cream">
                <img
                  src={col2026.dresses[2]?.image || col2026.heroImage}
                  alt="La Maison Pronuptia"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="lg:max-w-lg">
                <p className="label-upper mb-4">Notre Héritage</p>
                <h2 className="font-serif text-3xl lg:text-[42px] mb-6 leading-[1.15]">
                  La Maison Pronuptia
                </h2>
                <p className="text-muted leading-relaxed mb-4">
                  Fondée en 1958 par Marie et Henri Micmacher, Pronuptia a révolutionné
                  le monde du mariage en créant la première robe de mariée en prêt-à-porter.
                </p>
                <p className="text-muted leading-relaxed mb-8">
                  De Jean-Paul Gaultier à Christian Lacroix, les plus grands noms
                  de la mode française ont collaboré avec notre maison.
                </p>
                <Link to="/la-maison-pronuptia" className="btn-secondary">
                  Découvrir notre histoire
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Appointment CTA Strip ─── */}
      <section className="py-20 lg:py-28 bg-charcoal text-white text-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="divider-ornament mb-6">
              <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path d="M12 3l1.5 4.5H18l-3.5 2.5L16 14.5 12 11.5 8 14.5l1.5-4.5L6 7.5h4.5z" />
              </svg>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-4">
              Vivez l'expérience Pronuptia
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-10 text-sm lg:text-base">
              Nos conseillères vous attendent dans nos boutiques partenaires
              pour vous accompagner dans le choix de votre robe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/nos-revendeurs" className="btn-gold text-center">
                Prendre Rendez-vous
              </Link>
              <Link to="/nos-revendeurs" className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-charcoal text-center">
                Trouver une Boutique
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
