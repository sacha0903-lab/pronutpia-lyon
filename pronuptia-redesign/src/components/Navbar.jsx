import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Accueil', path: '/' },
  {
    label: 'Robes de Mariée',
    path: '/collections',
    children: [
      { label: 'Collection 2026', path: '/collections/2026' },
      { label: 'Collection 2025', path: '/collections/2025' },
      { label: 'Collection 2024', path: '/collections/2024' },
      { label: 'Lifestyle 2026', path: '/lifestyle' },
    ],
  },
  {
    label: 'La Maison',
    path: '/la-maison-pronuptia',
    children: [
      { label: 'Notre Histoire', path: '/la-maison-pronuptia' },
      { label: 'Miss France', path: '/la-maison-pronuptia/miss-france' },
    ],
  },
  { label: 'Presse', path: '/presse' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navBg = scrolled || mobileOpen || !isHome
    ? 'bg-cream/95 backdrop-blur-md shadow-[0_1px_0_var(--color-border)]'
    : 'bg-transparent'

  const textColor = scrolled || !isHome ? 'text-charcoal' : 'text-white'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[72px] lg:h-[80px]">

            {/* Logo */}
            <Link to="/" className="relative z-10 flex items-center gap-3">
              <img
                src="/logo-pronuptia.webp"
                alt="Pronuptia Paris"
                className={`h-10 lg:h-12 w-auto transition-all duration-500 ${
                  (scrolled || !isHome) && !mobileOpen ? '' : 'brightness-0 invert'
                }`}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`label-upper transition-colors duration-300 hover:text-gold ${textColor} ${location.pathname === link.path ? '!text-gold' : ''}`}
                  >
                    {link.label}
                  </Link>
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-3"
                      >
                        <div className="bg-white shadow-lg min-w-[220px] py-4">
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="block px-6 py-2.5 text-[12px] font-sans font-normal tracking-[0.1em] uppercase text-charcoal-light hover:text-gold hover:bg-cream transition-all duration-200"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/nos-revendeurs"
                className="btn-gold !py-2.5 !px-6 !text-[10px]"
              >
                Prendre Rendez-vous
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden relative z-10 w-8 h-8 flex flex-col justify-center items-center gap-1.5 ${mobileOpen ? 'text-charcoal' : textColor}`}
              aria-label="Menu"
            >
              <span className={`block w-6 h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
              <span className={`block w-6 h-[1.5px] bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[1.5px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream pt-[72px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="h-full overflow-y-auto px-6 py-8"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      className="block py-3 font-serif text-[28px] text-charcoal hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="pl-4 pb-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block py-2 text-[13px] tracking-[0.1em] uppercase text-muted hover:text-gold transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3">
                <Link to="/nos-revendeurs" className="btn-gold text-center">
                  Prendre Rendez-vous
                </Link>
                <Link to="/nos-revendeurs" className="btn-secondary text-center">
                  Trouver une Boutique
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-6 text-muted">
                <a href="https://www.instagram.com/pronuptiaparis/" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.facebook.com/PronuptiaOfficiel/" target="_blank" rel="noopener noreferrer" className="hover:text-charcoal transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
