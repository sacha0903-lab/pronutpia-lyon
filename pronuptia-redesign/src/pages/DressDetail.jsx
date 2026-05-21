import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { collections } from '../data/collections'

export default function DressDetail() {
  const { year, slug } = useParams()
  const collection = collections[year]

  if (!collection) {
    return <Navigate to="/collections" replace />
  }

  const dress = collection.dresses.find((d) => d.slug === slug)

  if (!dress) {
    return <Navigate to={`/collections/${year}`} replace />
  }

  const currentIndex = collection.dresses.indexOf(dress)
  const prevDress = collection.dresses[currentIndex - 1]
  const nextDress = collection.dresses[currentIndex + 1]

  return (
    <>
      {/* Hero Image */}
      <section className="pt-[72px] lg:pt-[80px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-8 lg:pt-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[3/4] bg-cream-dark overflow-hidden">
                <img
                  src={dress.image}
                  alt={dress.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-[120px] lg:py-8"
            >
              <Link
                to={`/collections/${year}`}
                className="label-upper !text-muted hover:!text-charcoal transition-colors inline-flex items-center gap-2 mb-6"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                {collection.name}
              </Link>

              <div className="divider-ornament mb-6">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path d="M12 3l1.5 4.5H18l-3.5 2.5L16 14.5 12 11.5 8 14.5l1.5-4.5L6 7.5h4.5z" />
                </svg>
              </div>

              <p className="label-upper mb-3">Collection {collection.year}</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-[64px] font-light mb-6 leading-[1.1]">
                {dress.name}
              </h1>

              <p className="text-muted leading-relaxed text-base lg:text-lg mb-8 max-w-lg">
                Modèle {dress.name} de la collection {collection.name}.
                Une création qui allie raffinement et modernité,
                sublimant la silhouette avec des lignes épurées
                et des détails délicats.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-charcoal">Fabrication française</p>
                    <p className="text-xs text-muted mt-0.5">Confectionnée dans nos ateliers partenaires</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-charcoal">Essayage en boutique</p>
                    <p className="text-xs text-muted mt-0.5">Disponible dans nos boutiques partenaires</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/nos-revendeurs" className="btn-primary text-center">
                  Prendre Rendez-vous
                </Link>
                <Link to="/nos-revendeurs" className="btn-secondary text-center">
                  Trouver une Boutique
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation between dresses */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="border-t border-border pt-12">
            <div className="flex justify-between items-center">
              {prevDress ? (
                <Link
                  to={`/collections/${year}/${prevDress.slug}`}
                  className="group flex items-center gap-3"
                >
                  <svg className="w-5 h-5 text-muted group-hover:text-charcoal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                  </svg>
                  <div>
                    <p className="text-xs text-muted">Précédent</p>
                    <p className="font-serif text-lg group-hover:text-gold transition-colors">{prevDress.name}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextDress ? (
                <Link
                  to={`/collections/${year}/${nextDress.slug}`}
                  className="group flex items-center gap-3 text-right"
                >
                  <div>
                    <p className="text-xs text-muted">Suivant</p>
                    <p className="font-serif text-lg group-hover:text-gold transition-colors">{nextDress.name}</p>
                  </div>
                  <svg className="w-5 h-5 text-muted group-hover:text-charcoal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-charcoal text-white text-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-serif text-3xl lg:text-5xl font-light mb-4">
              Essayez ce modèle en boutique
            </h2>
            <p className="text-white/50 max-w-xl mx-auto mb-10 text-sm">
              Prenez rendez-vous dans la boutique Pronuptia la plus proche
              pour découvrir le modèle {dress.name}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/nos-revendeurs" className="btn-gold text-center">Prendre Rendez-vous</Link>
              <Link to={`/collections/${year}`} className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-charcoal text-center">
                Voir toute la Collection
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
