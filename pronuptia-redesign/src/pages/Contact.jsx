import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'

const subjectOptions = [
  { value: 'rdv', label: 'Prise de rendez-vous' },
  { value: 'collection', label: 'Question collection' },
  { value: 'boutique', label: 'Devenir revendeur' },
  { value: 'presse', label: 'Presse / Média' },
  { value: 'autre', label: 'Autre' },
]

function CustomSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-3.5 bg-white border text-sm text-left flex items-center justify-between focus:outline-none transition-colors ${
          open ? 'border-gold' : 'border-border'
        }`}
      >
        <span className={selected ? 'text-charcoal' : 'text-muted'}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-border shadow-lg"
          >
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-sm text-left hover:bg-cream-dark transition-colors ${
                    value === option.value ? 'text-gold' : 'text-charcoal'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-[72px] lg:pt-[80px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="label-upper mb-4">Contact</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[64px] font-light mb-4">
              Nous Contacter
            </h1>
            <p className="text-muted max-w-xl mx-auto text-sm lg:text-base">
              Notre équipe est à votre écoute pour répondre à toutes vos questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-20 lg:pb-32">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[1fr,320px] gap-12 lg:gap-20">
            {/* Form */}
            <ScrollReveal>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label-upper block mb-2">Nom</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-white border border-border text-sm focus:outline-none focus:border-gold transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="label-upper block mb-2">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-white border border-border text-sm focus:outline-none focus:border-gold transition-colors"
                      placeholder="votre@email.fr"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label-upper block mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-white border border-border text-sm focus:outline-none focus:border-gold transition-colors"
                      placeholder="06 00 00 00 00"
                    />
                  </div>
                  <div>
                    <label className="label-upper block mb-2">Sujet</label>
                    <CustomSelect
                      value={form.subject}
                      onChange={(val) => setForm({ ...form, subject: val })}
                      options={subjectOptions}
                      placeholder="Choisir un sujet"
                    />
                  </div>
                </div>

                <div>
                  <label className="label-upper block mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3.5 bg-white border border-border text-sm focus:outline-none focus:border-gold resize-none transition-colors"
                    placeholder="Votre message..."
                  />
                </div>

                <button type="submit" className="btn-primary">
                  Envoyer
                </button>
              </form>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal delay={0.2}>
              <div className="lg:pt-8">
                <div className="mb-10">
                  <p className="label-upper mb-3">Siège Social</p>
                  <p className="text-sm text-muted leading-relaxed">
                    7 rue Théodore Honoré<br />
                    94130 Nogent-sur-Marne
                  </p>
                </div>

                <div className="mb-10">
                  <p className="label-upper mb-3">Contact</p>
                  <div className="space-y-2">
                    <a href="mailto:info@alexis-mariage.fr" className="block text-sm text-muted hover:text-gold transition-colors">
                      info@alexis-mariage.fr
                    </a>
                    <a href="tel:0142779263" className="block text-sm text-muted hover:text-gold transition-colors">
                      01 42 77 92 63
                    </a>
                  </div>
                </div>

                <div className="mb-10">
                  <p className="label-upper mb-3">Réseaux Sociaux</p>
                  <div className="space-y-2">
                    <a href="https://www.instagram.com/pronuptiaparis/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted hover:text-gold transition-colors">
                      Instagram @pronuptiaparis
                    </a>
                    <a href="https://www.facebook.com/PronuptiaOfficiel/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted hover:text-gold transition-colors">
                      Facebook /PronuptiaOfficiel
                    </a>
                  </div>
                </div>

                <div className="p-6 bg-cream-dark border border-border">
                  <p className="label-upper mb-2">Essayage en boutique</p>
                  <p className="text-sm text-muted mb-4">
                    Pour prendre rendez-vous ou trouver une boutique,
                    consultez notre carte des revendeurs.
                  </p>
                  <Link to="/nos-revendeurs" className="label-upper !text-gold hover:!text-gold-dark transition-colors">
                    Trouver une boutique &rarr;
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
