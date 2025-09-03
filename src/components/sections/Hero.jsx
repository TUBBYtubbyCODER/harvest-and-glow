import { useState, useEffect } from 'react';
import analytics from '@services/analytics';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    analytics.trackPageView('Hero');
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCTAClick = (buttonType, targetSection) => {
    analytics.trackEvent('cta_clicked', {
      button: buttonType,
      location: 'hero',
      target_section: targetSection
    });
    scrollToSection(targetSection);
  };

  return (
    <section id="home" className="hero">
      <div className={`hero-content ${loaded ? 'loaded' : ''}`}>
        <h1 className="cursive">Brighten Your Neighborhood</h1>
        <p>With effortless seasonal charm and luxury pumpkin displays that create magical autumn memories</p>
        <div className="cta-buttons">
          <button 
            className="btn btn-primary glow-effect"
            onClick={() => handleCTAClick('Book Your Display', 'packages')}
          >
            Book Your Display
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleCTAClick('Send as Gift', 'gift')}
          >
            Send as Gift
          </button>
        </div>
        
        {/* Trust indicators */}
        <div className="hero-trust">
          <div className="trust-item">
            <span className="trust-icon">🏆</span>
            <span>Premium Quality</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">📍</span>
            <span>Salt Lake City</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">⭐</span>
            <span>100+ Happy Families</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;