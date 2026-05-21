import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { collections } from '../data/collections'

export default function Collections() {
  const { year } = useParams()
  const collection = collections[year]

  if (!collection) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h1 className="font-serif text-4xl mb-8">Nos Collections</h1>
          <p className="text-muted mb-12">Découvrez l'ensemble de nos collections de robes de mariée.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(collections).map((col) => (
              <Link key={col.year} to={`/collections/${col.year}`} className="group block">
                <div className="img-zoom aspect-[3/4] bg-cream-dark mb-4">
                  <img src={col.heroImage} alt={col.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-serif text-2xl group-hover:text-gold transition-colors">{col.name}</h3>
                <p className="text-sm text-muted mt-1">{col.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

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
          <img
            src={collection.heroImage}
            alt={collection.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
        </motion.div>
        <div className="relative h-full flex flex-col justify-end pb-12 lg:pb-16 px-6 lg:px-12 max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p className="label-upper !text-gold-light mb-3">Collection {collection.year}</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light mb-3">
              {collection.tagline}
            </h1>
            <p className="text-white/60 max-w-xl text-sm lg:text-base">{collection.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Collection Navigation */}
      <div className="border-b border-border sticky top-[72px] lg:top-[80px] bg-cream/95 backdrop-blur-md z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center gap-6 overflow-x-auto py-4">
          {Object.values(collections).map((col) => (
            <Link
              key={col.year}
              to={`/collections/${col.year}`}
              className={`label-upper whitespace-nowrap transition-colors ${col.year === year ? '!text-gold' : 'hover:!text-charcoal'}`}
            >
              {col.name}
            </Link>
          ))}
          <Link to="/lifestyle" className="label-upper whitespace-nowrap hover:!text-charcoal transition-colors">
            Lifestyle 2026
          </Link>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {collection.dresses.map((dress, i) => (
              <ScrollReveal key={dress.slug} delay={(i % 3) * 0.1}>
                <Link to={`/collections/${year}/${dress.slug}`} className="group block">
                  <div className="img-zoom aspect-[3/4] bg-cream-dark mb-4">
                    <img
                      src={dress.image}
                      alt={dress.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-serif text-lg lg:text-xl text-charcoal group-hover:text-gold transition-colors">
                        {dress.name}
                      </h3>
                      <p className="text-xs text-muted mt-0.5">{collection.name}</p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Photo Credit */}
          <p className="text-center text-xs text-muted mt-16">
            Photographies : Yves Lavallette
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-charcoal text-white text-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-serif text-3xl lg:text-5xl font-light mb-4">
              Essayez cette collection en boutique
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-10 text-sm">
              Prenez rendez-vous dans la boutique Pronuptia la plus proche
              pour découvrir ces modèles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/nos-revendeurs" className="btn-gold text-center">Prendre Rendez-vous</Link>
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
