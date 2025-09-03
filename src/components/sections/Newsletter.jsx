import { useState } from 'react'
import Button from '@components/common/Button'
import FadeInUp from '@components/animations/FadeInUp'
import { validateEmail } from '@utils/helpers'
import { subscribeToNewsletter } from '@services/newsletter'
import analytics from '@services/analytics'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    
    try {
      await subscribeToNewsletter(email)
      setStatus('success')
      setMessage('Welcome to the Harvest & Glow family! 🎃')
      setEmail('')
      analytics.trackEvent('newsletter_signup', { 
        location: 'newsletter_section',
        email_domain: email.split('@')[1]
      })
    } catch (error) {
      setStatus('error')
      setMessage('Oops! Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <section className="section newsletter-section">
        <div className="container">
          <div className="newsletter-success">
            <FadeInUp>
              <h3 className="cursive">🎃 Thank you for subscribing!</h3>
              <p>You'll be the first to know about new seasonal offerings and exclusive discounts.</p>
            </FadeInUp>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section newsletter-section">
      <div className="container">
        <div className="newsletter">
          <FadeInUp>
            <h3 className="cursive newsletter-title">Stay in the Glow</h3>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="newsletter-subtitle">
              Get seasonal decorating tips, exclusive offers, and be first to 
              book limited holiday packages
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.4}>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={status === 'error' ? 'error' : ''}
                  required
                />
                <Button 
                  type="submit" 
                  variant="primary"
                  loading={status === 'loading'}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
              {message && (
                <div className={`form-message ${status}`}>
                  {message}
                </div>
              )}
            </form>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
