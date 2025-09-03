import { useState } from 'react'
import analytics from '@services/analytics'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      // Newsletter service integration would go here
      analytics.trackEvent('newsletter_signup', { location: 'footer' })
      alert('Thanks for subscribing! 🎃')
      setEmail('')
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="cursive">Harvest & Glow</h3>
            <p>
              Bringing luxury autumn displays to Salt Lake City's most 
              discerning homes. Creating magical memories, one pumpkin at a time.
            </p>
          </div>

          <div className="footer-grid">
            <div className="footer-section">
              <h4>Contact</h4>
              <p>📧 hello@harvestandglow.com</p>
              <p>📱 (801) 555-GLOW</p>
              <p>📍 Salt Lake City, Utah</p>
            </div>

            <div className="footer-section">
              <h4>Services</h4>
              <p>Luxury Pumpkin Displays</p>
              <p>Custom Carving</p>
              <p>Gift Services</p>
              <p>Seasonal Maintenance</p>
            </div>

            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Pinterest">📌</a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="footer-newsletter">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2024 Harvest & Glow. All rights reserved. | 
            <a href="/privacy"> Privacy Policy</a> | 
            <a href="/terms"> Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
