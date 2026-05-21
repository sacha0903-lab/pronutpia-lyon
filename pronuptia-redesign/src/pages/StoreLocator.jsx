import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import L from 'leaflet'
import ScrollReveal from '../components/ScrollReveal'
import { stores, featuredStores, regions } from '../data/stores'

// Custom gold marker icon
const goldIcon = new L.DivIcon({
  html: `<div style="width:28px;height:28px;background:#c9a96e;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.2);"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  className: '',
})

const featuredIcon = new L.DivIcon({
  html: `<div style="width:36px;height:36px;background:#1a1a1a;border:3px solid #c9a96e;border-radius:50%;box-shadow:0 2px 12px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;background:#c9a96e;border-radius:50%;"></div></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  className: '',
})

export default function StoreLocator() {
  const [search, setSearch] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [activeStore, setActiveStore] = useState(null)

  const filteredStores = useMemo(() => {
    let result = stores
    if (selectedRegion) result = result.filter(s => s.region === selectedRegion)
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(s =>
        s.city.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q)
      )
    }
    return result
  }, [search, selectedRegion])

  return (
    <>
      {/* Hero */}
      <section className="pt-[72px] lg:pt-[80px] bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="label-upper !text-gold mb-4">Nos Boutiques</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[64px] text-white font-light mb-4">
              Trouvez votre boutique
            </h1>
            <p className="text-white/50 max-w-xl mx-auto text-sm lg:text-base">
              Découvrez les boutiques partenaires Pronuptia près de chez vous
              et prenez rendez-vous pour essayer nos collections.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="sticky top-[72px] lg:top-[80px] z-30 bg-cream border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par ville ou code postal..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-border text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-3 bg-white border border-border text-sm text-charcoal focus:outline-none focus:border-gold cursor-pointer"
          >
            <option value="">Toutes les régions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Map + List */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Map */}
          <div className="h-[400px] lg:h-[600px] border border-border">
            <MapContainer
              center={[46.8, 2.5]}
              zoom={6}
              className="w-full h-full"
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
              />
              {filteredStores.map((store, i) => (
                <Marker
                  key={i}
                  position={[store.lat, store.lng]}
                  icon={store.featured ? featuredIcon : goldIcon}
                  eventHandlers={{ click: () => setActiveStore(store) }}
                >
                  <Popup>
                    <div>
                      <p className="font-semibold text-sm">{store.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{store.address}</p>
                      <p className="text-xs text-gray-500">{store.phone}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Store List */}
          <div className="lg:h-[600px] overflow-y-auto">
            {/* Featured Stores */}
            <div className="mb-6">
              <p className="label-upper mb-4">Boutiques Phares</p>
              {featuredStores.map((store, i) => (
                <div key={i} className="p-5 bg-charcoal text-white mb-3">
                  <h3 className="font-serif text-lg mb-1">{store.name}</h3>
                  <p className="text-white/50 text-xs mb-1">{store.address}</p>
                  <p className="text-white/50 text-xs mb-3">{store.phone}</p>
                  <a
                    href={store.website || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-upper !text-[10px] !text-gold hover:!text-gold-light transition-colors"
                  >
                    Prendre Rendez-vous &rarr;
                  </a>
                </div>
              ))}
            </div>

            {/* All Stores */}
            <p className="label-upper mb-4">{filteredStores.length} Boutiques</p>
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {filteredStores.map((store, i) => (
                  <motion.div
                    key={`${store.name}-${store.city}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`p-4 border border-border hover:border-gold/50 transition-colors cursor-pointer ${activeStore === store ? 'border-gold bg-cream-dark' : ''}`}
                    onClick={() => setActiveStore(store)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif text-base">{store.name}</h4>
                        <p className="text-xs text-muted mt-0.5">{store.city} — {store.region}</p>
                      </div>
                      <span className="text-xs text-muted">{store.phone}</span>
                    </div>
                    <p className="text-xs text-muted mt-1">{store.address}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-cream-dark text-center">
        <ScrollReveal>
          <div className="max-w-xl mx-auto px-6">
            <h2 className="font-serif text-3xl lg:text-4xl mb-4">
              Une question ?
            </h2>
            <p className="text-muted text-sm mb-8">
              Notre équipe est à votre disposition pour vous aider à trouver
              la boutique idéale et organiser votre essayage.
            </p>
            <Link to="/contact" className="btn-primary">Nous Contacter</Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
