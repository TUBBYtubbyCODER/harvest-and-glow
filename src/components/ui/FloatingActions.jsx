import { useState, useEffect } from 'react';
import analytics from '@services/analytics';

const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating actions after scrolling past hero
      setIsVisible(window.scrollY > 200);
      // Show scroll to top button after scrolling down significantly
      setShowScrollTop(window.scrollY > 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCallClick = () => {
    analytics.trackEvent('contact_clicked', {
      method: 'phone',
      location: 'floating_action'
    });
    window.location.href = 'tel:8015554569';
  };

  const handleEmailClick = () => {
    analytics.trackEvent('contact_clicked', {
      method: 'email',
      location: 'floating_action'
    });
    window.location.href = 'mailto:info@harvestandglow.com';
  };

  const scrollToTop = () => {
    analytics.trackEvent('navigation', {
      action: 'scroll_to_top',
      location: 'floating_action'
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId, buttonName) => {
    analytics.trackEvent('navigation', {
      action: 'scroll_to_section',
      section: sectionId,
      location: 'floating_action'
    });
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="floating-actions">
      {/* Main action buttons */}
      <div className="action-buttons">
        <button
          className="action-btn primary"
          onClick={() => scrollToSection('packages', 'Book Now')}
          title="View Packages"
        >
          Book Now
        </button>
        
        <button
          className="action-btn secondary"
          onClick={handleCallClick}
          title="Call us"
        >
          📞 Call
        </button>
        
        <button
          className="action-btn secondary"
          onClick={handleEmailClick}
          title="Email us"
        >
          📧 Email
        </button>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={scrollToTop}
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default FloatingActions;