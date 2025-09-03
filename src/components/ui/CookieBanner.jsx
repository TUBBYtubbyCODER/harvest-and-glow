import { useState, useEffect } from 'react'
import Button from '@components/common/Button'
import { useLocalStorage } from '@hooks/useLocalStorage'
import analytics from '@services/analytics'

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false)
  const [cookieConsent, setCookieConsent] = useLocalStorage('cookieConsent', null)

  useEffect(() => {
    if (!cookieConsent) {
      // Show banner after 2 seconds
      const timer = setTimeout(() => setShowBanner(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [cookieConsent])

  const acceptCookies = () => {
    setCookieConsent('accepted')
    setShowBanner(false)
    analytics.trackEvent('cookie_consent', { action: 'accepted' })
  }

  const declineCookies = () => {
    setCookieConsent('declined')
    setShowBanner(false)
    analytics.trackEvent('cookie_consent', { action: 'declined' })
  }

  if (!showBanner || cookieConsent) return null

  return (
    <div className={`cookie-banner ${showBanner ? 'show' : ''}`}>
      <div className="cookie-content">
        <strong>🍪 We use cookies</strong> to enhance your browsing experience 
        and analyze site traffic. By continuing to use our site, you consent to 
        our use of cookies. 
        <a href="/privacy" target="_blank"> Learn more</a>
      </div>
      
      <div className="cookie-actions">
        <Button 
          variant="primary" 
          size="small"
          onClick={acceptCookies}
        >
          Accept
        </Button>
        <Button 
          variant="outline" 
          size="small"
          onClick={declineCookies}
        >
          Decline
        </Button>
      </div>
    </div>
  )
}

export default CookieBanner
