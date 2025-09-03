class Analytics {
  constructor() {
    this.isEnabled = import.meta.env.VITE_GOOGLE_ANALYTICS_ID
    if (this.isEnabled) {
      this.init()
    }
  }

  init() {
    // Load Google Analytics
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
      send_page_view: false // We'll send this manually
    })

    window.gtag = gtag
  }

  trackEvent(eventName, parameters = {}) {
    if (this.isEnabled && window.gtag) {
      window.gtag('event', eventName, {
        event_category: parameters.category || 'engagement',
        event_label: parameters.label,
        value: parameters.value,
        ...parameters
      })
    }
    
    // Also log to console in development
    if (import.meta.env.DEV) {
      console.log('Analytics Event:', eventName, parameters)
    }
  }

  trackPageView(path) {
    if (this.isEnabled && window.gtag) {
      window.gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
        page_path: path,
      })
    }
  }

  trackPurchase(transactionId, value, currency = 'USD', items = []) {
    if (this.isEnabled && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency,
        items: items
      })
    }
  }
}

export default new Analytics()
