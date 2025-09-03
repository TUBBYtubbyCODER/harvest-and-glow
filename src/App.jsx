import { useEffect } from 'react'
import Header from '@components/common/Header'
import Hero from '@components/sections/Hero'
import Packages from '@components/sections/Packages'
import Story from '@components/sections/Story'
import Testimonials from '@components/sections/Testimonials'
import Newsletter from '@components/sections/Newsletter'
import Sourcing from '@components/sections/Sourcing'
import CustomCarve from '@components/sections/CustomCarve'
import Gift from '@components/sections/Gift'
import Footer from '@components/common/Footer'
import FloatingActions from '@components/ui/FloatingActions'
import CookieBanner from '@components/ui/CookieBanner'
import SEOHead from '@components/common/SEOHead'
import { useScrollAnimations } from '@hooks/useScrollAnimations'
import analytics from '@services/analytics'

function App() {
  useScrollAnimations()

  useEffect(() => {
    // Initialize analytics
    analytics.trackPageView('/')

    // Smooth scrolling for navigation links
    const handleNavClick = (e) => {
      if (e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(e.target.getAttribute('href'))
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }

    document.addEventListener('click', handleNavClick)
    return () => document.removeEventListener('click', handleNavClick)
  }, [])

  return (
    <div className="App">
      <SEOHead 
        title="Luxury Porch Pumpkin Decorating"
        description="Transform your home with luxury pumpkin displays. Harvest & Glow brings effortless seasonal charm to Salt Lake City's most discerning homes."
        keywords="pumpkin decorating, luxury autumn decor, Salt Lake City, porch displays, seasonal decorating"
        url="https://harvestandglow.com"
        image="https://harvestandglow.com/images/hero/hero-pumpkin-display.jpg"
      />
      <Header />
      <Hero />
      <Packages />
      <Story />
      <Testimonials />
      <Newsletter />
      <Sourcing />
      <CustomCarve />
      <Gift />
      <Footer />
      <FloatingActions />
      <CookieBanner />
    </div>
  )
}

export default App
