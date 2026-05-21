import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collections from './pages/Collections'
import DressDetail from './pages/DressDetail'
import Lifestyle from './pages/Lifestyle'
import MaisonPronuptia from './pages/MaisonPronuptia'
import StoreLocator from './pages/StoreLocator'
import Press from './pages/Press'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import LegalNotices from './pages/LegalNotices'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:year" element={<Collections />} />
          <Route path="/collections/:year/:slug" element={<DressDetail />} />
          <Route path="/robes-de-mariees" element={<Collections />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/lifestyle-2026" element={<Lifestyle />} />
          <Route path="/la-maison-pronuptia" element={<MaisonPronuptia />} />
          <Route path="/la-maison-pronuptia/miss-france" element={<MaisonPronuptia />} />
          <Route path="/nos-revendeurs" element={<StoreLocator />} />
          <Route path="/presse" element={<Press />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/nous-contacter" element={<Contact />} />
          <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
          <Route path="/mentions-legales" element={<LegalNotices />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
