import { useState, useEffect } from 'react'
import Button from '@components/common/Button'
import FadeInUp from '@components/animations/FadeInUp'
import analytics from '@services/analytics'

const Hero = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const handleBookingClick = () => {
    analytics.trackEvent('hero_cta_click', { action: 'book_display' })
  }

  const handleGiftClick = () => {
    analytics.trackEvent('hero_cta_click', { action: 'send_gift' })
  }

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <picture>
          <source 
            srcSet="/images/hero/hero-pumpkin-display.webp" 
            type="image/webp" 
          />
          <img 
            src="/images/hero/hero-pumpkin-display.jpg"
            alt="Beautiful pumpkin display on elegant porch"
            loading="eager"
            className="hero-image"
          />
        </picture>
        <div className="hero-overlay"></div>
      </div>

      <div className={`hero-content ${loaded ? 'loaded' : ''}`}>
        <FadeInUp delay={0.2}>
          <h1 className="cursive hero-title">
            Brighten Your Neighborhood
          </h1>
        </FadeInUp>
        
        <FadeInUp delay={0.4}>
          <p className="hero-subtitle">
            With effortless seasonal charm and luxury pumpkin displays 
            that create magical autumn memories
          </p>
        </FadeInUp>
        
        <FadeInUp delay={0.6}>
          <div className="cta-buttons">
            <Button 
              href="#packages" 
              variant="primary"
              className="glow-effect"
              onClick={handleBookingClick}
            >
              Book Your Display
            </Button>
            <Button 
              href="#gift" 
              variant="secondary"
              onClick={handleGiftClick}
            >
              Send as Gift
            </Button>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}

export default Hero
