import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { collections } from '../data/collections'

const col = collections['2026']
const images = col.dresses.slice(0, 8)

export default function Lifestyle() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] lg:h-[60vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img src={col.dresses[5]?.image || col.heroImage} alt="Lifestyle 2026" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
        </motion.div>
        <div className="relative h-full flex flex-col justify-end pb-12 lg:pb-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p className="label-upper !text-gold-light mb-3">Lifestyle</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light">
              Lifestyle 2026
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Editorial Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-center text-muted max-w-2xl mx-auto mb-16 text-sm lg:text-base">
              Notre collection 2026 capturée dans un esprit lifestyle.
              Des robes portées avec naturel et élégance,
              pour une mariée résolument contemporaine.
            </p>
          </ScrollReveal>

          {/* Masonry-like Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {images.map((img, i) => (
              <ScrollReveal key={img.slug} delay={(i % 2) * 0.15}>
                <div className={`img-zoom ${i % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'} bg-cream-dark`}>
                  <img
                    src={img.image}
                    alt={img.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="font-serif text-lg mt-3 text-charcoal">{img.name}</p>
              </ScrollReveal>
            ))}
          </div>

          <p className="text-center text-xs text-muted mt-16">
            Photographies : Yves Lavallette
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream-dark text-center">
        <ScrollReveal>
          <h2 className="font-serif text-3xl lg:text-4xl mb-8">Découvrez la collection complète</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/collections/2026" className="btn-primary">Voir la Collection 2026</Link>
            <Link to="/nos-revendeurs" className="btn-secondary">Prendre Rendez-vous</Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
