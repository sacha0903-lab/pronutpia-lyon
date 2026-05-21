import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { pressOutlets } from '../data/collections'

export default function Press() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[72px] lg:pt-[80px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="label-upper mb-4">Médias</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[64px] font-light mb-4">
              Presse
            </h1>
            <p className="text-muted max-w-xl mx-auto text-sm lg:text-base">
              Pronuptia dans les médias. Découvrez nos dernières apparitions
              et couvertures presse.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Grid */}
      <section className="pb-20 lg:pb-32">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {pressOutlets.map((outlet, i) => (
              <ScrollReveal key={outlet.name} delay={i * 0.05}>
                <a
                  href={outlet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative overflow-hidden bg-cream-dark"
                >
                  {/* Image fill */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={outlet.image}
                      alt={outlet.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay gradient + label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <p className="font-serif text-lg lg:text-xl text-white font-light tracking-wide">
                      {outlet.name}
                    </p>
                    <p className="text-[11px] text-white/50 uppercase tracking-[0.12em] mt-1 flex items-center gap-1.5">
                      Lire l'article
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Press */}
      <section className="py-16 lg:py-24 bg-cream-dark text-center">
        <ScrollReveal>
          <div className="max-w-lg mx-auto px-6">
            <p className="label-upper mb-4">Contact Presse</p>
            <h2 className="font-serif text-2xl lg:text-3xl mb-4">
              Demandes média
            </h2>
            <p className="text-muted text-sm mb-6">
              Pour toute demande presse, collaboration ou information média,
              n'hésitez pas à nous contacter.
            </p>
            <a href="mailto:info@alexis-mariage.fr" className="btn-primary">
              Contact Presse
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
