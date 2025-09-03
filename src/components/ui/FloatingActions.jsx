import { useState, useEffect } from 'react'
import { useScrollPosition } from '@hooks/useScrollPosition'
import analytics from '@services/analytics'

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const scrollPosition = useScrollPosition()

  useEffect(() => {
    setShowScrollTop(scrollPosition > 300)
  }, [scrollPosition])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    analytics.trackEvent('scroll_to_top', { source: 'floating_button' })
  }

  const openChat = () => {
    analytics.trackEvent('chat_opened', { source: 'floating_button' })
    // Initialize chat widget (Intercom, Drift, etc.)
    if (window.Intercom) {
      window.Intercom('show')
    } else {
      alert('Chat support coming soon! Please email us at hello@harvestandglow.com')
    }
  }

  const callPhone = () => {
    analytics.trackEvent('phone_clicked', { source: 'floating_button' })
    window.location.href = 'tel:+18015554569'
  }

  return (
    <div className="floating-actions">
      <button 
        className="floating-btn chat-btn"
        onClick={openChat}
        title="Chat with us"
        aria-label="Open live chat"
      >
        💬
      </button>
      
      <button 
        className="floating-btn phone-btn"
        onClick={callPhone}
        title="Call us"
        aria-label="Call Harvest & Glow"
      >
        📞
      </button>
      
      {showScrollTop && (
        <button 
          className="floating-btn scroll-top-btn"
          onClick={scrollToTop}
          title="Back to top"
          aria-label="Scroll to top of page"
        >
          ↑
        </button>
      )}
    </div>
  )
}

export default FloatingActions