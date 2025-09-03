import analytics from '@services/analytics';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleContactClick = (method) => {
    analytics.trackEvent('contact_clicked', {
      method,
      location: 'footer'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="cursive">Harvest & Glow</h3>
            <p>Bringing effortless seasonal charm to Salt Lake City homes since 2021</p>
            <div className="footer-social">
              <a 
                href="#" 
                onClick={() => handleContactClick('instagram')}
                aria-label="Follow us on Instagram"
              >
                📷
              </a>
              <a 
                href="#" 
                onClick={() => handleContactClick('facebook')}
                aria-label="Follow us on Facebook"
              >
                📘
              </a>
              <a 
                href="#" 
                onClick={() => handleContactClick('pinterest')}
                aria-label="Follow us on Pinterest"
              >
                📌
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#packages">Package Options</a></li>
              <li><a href="#custom">Custom Carving</a></li>
              <li><a href="#gift">Gift Certificates</a></li>
              <li><a href="#story">About Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Service Areas</h4>
            <ul>
              <li>Salt Lake City</li>
              <li>Park City</li>
              <li>Cottonwood Heights</li>
              <li>Draper</li>
              <li>Millcreek</li>
              <li>And surrounding areas</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span>📧</span>
                <a 
                  href="mailto:info@harvestandglow.com"
                  onClick={() => handleContactClick('email')}
                >
                  info@harvestandglow.com
                </a>
              </div>
              <div className="contact-item">
                <span>📞</span>
                <a 
                  href="tel:8015554569"
                  onClick={() => handleContactClick('phone')}
                >
                  (801) 555-GLOW
                </a>
              </div>
              <div className="contact-item">
                <span>📍</span>
                <span>Salt Lake City, UT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>&copy; {currentYear} Harvest & Glow. All rights reserved.</span>
            <div className="legal-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/accessibility">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;