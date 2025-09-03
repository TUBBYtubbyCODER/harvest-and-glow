import { useState, useEffect } from 'react';
import analytics from '@services/analytics';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made cookie choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after 2 seconds to not interrupt initial page load
      setTimeout(() => setShowBanner(true), 2000);
    } else {
      // Apply saved preferences
      const savedPreferences = JSON.parse(cookieConsent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true
    };
    
    savePreferences(allAccepted);
    analytics.trackEvent('cookie_consent', {
      action: 'accept_all',
      preferences: allAccepted
    });
  };

  const handleAcceptSelected = () => {
    savePreferences(preferences);
    analytics.trackEvent('cookie_consent', {
      action: 'accept_selected',
      preferences
    });
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false
    };
    
    savePreferences(essentialOnly);
    analytics.trackEvent('cookie_consent', {
      action: 'reject_all',
      preferences: essentialOnly
    });
  };

  const savePreferences = (prefs) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setShowBanner(false);
    
    // Apply analytics preferences
    if (prefs.analytics) {
      // Enable analytics tracking
      console.log('Analytics tracking enabled');
    }
    
    if (prefs.marketing) {
      // Enable marketing tracking
      console.log('Marketing tracking enabled');
    }
  };

  const handlePreferenceChange = (type) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <div className="cookie-header">
          <h3>We value your privacy</h3>
          <button 
            className="close-btn"
            onClick={handleRejectAll}
            aria-label="Close cookie banner"
          >
            ×
          </button>
        </div>
        
        <p>
          We use cookies to enhance your browsing experience, serve personalized content, 
          and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
        </p>

        {showDetails && (
          <div className="cookie-details">
            <div className="cookie-category">
              <label className="cookie-toggle">
                <input
                  type="checkbox"
                  checked={preferences.essential}
                  onChange={() => handlePreferenceChange('essential')}
                  disabled
                />
                <span className="toggle-label">
                  <strong>Essential Cookies</strong> (Required)
                </span>
              </label>
              <p>These cookies are necessary for the website to function properly.</p>
            </div>
            
            <div className="cookie-category">
              <label className="cookie-toggle">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => handlePreferenceChange('analytics')}
                />
                <span className="toggle-label">
                  <strong>Analytics Cookies</strong>
                </span>
              </label>
              <p>Help us understand how visitors interact with our website.</p>
            </div>
            
            <div className="cookie-category">
              <label className="cookie-toggle">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={() => handlePreferenceChange('marketing')}
                />
                <span className="toggle-label">
                  <strong>Marketing Cookies</strong>
                </span>
              </label>
              <p>Used to deliver relevant advertisements and track ad performance.</p>
            </div>
          </div>
        )}

        <div className="cookie-actions">
          <button 
            className="btn-link"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Customize Settings'}
          </button>
          
          <div className="action-buttons">
            <button 
              className="btn btn-secondary"
              onClick={handleRejectAll}
            >
              Reject All
            </button>
            
            {showDetails && (
              <button 
                className="btn btn-primary"
                onClick={handleAcceptSelected}
              >
                Accept Selected
              </button>
            )}
            
            <button 
              className="btn btn-primary"
              onClick={handleAcceptAll}
            >
              Accept All
            </button>
          </div>
        </div>
        
        <div className="cookie-links">
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a href="/cookies" target="_blank" rel="noopener noreferrer">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;