import { useState } from 'react'
import Button from '@components/common/Button'
import { formatPrice } from '@utils/helpers'
import { createCheckoutSession } from '@services/stripe'
import analytics from '@services/analytics'

const PackageCard = ({ 
  id, 
  title, 
  price, 
  description, 
  features, 
  emoji, 
  popular = false,
  stripeProductId 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleBooking = async () => {
    setLoading(true)
    analytics.trackEvent('package_booking_click', { 
      package_id: id,
      package_name: title,
      price: price
    })

    try {
      await createCheckoutSession(
        stripeProductId,
        `${window.location.origin}/success?package=${id}`,
        `${window.location.origin}/cancel`
      )
    } catch (error) {
      console.error('Booking error:', error)
      alert('Sorry, there was an error processing your request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className={`package-card ${popular ? 'popular' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {popular && <div className="popular-badge">Most Popular</div>}
      
      <div className="package-image">
        <span 
          className="package-emoji"
          style={{ 
            fontSize: isHovered ? '5rem' : '4rem',
            transition: 'all 0.3s ease' 
          }}
        >
          {emoji}
        </span>
      </div>
      
      <div className="package-content">
        <h3 className="package-title cursive">{title}</h3>
        <div className="package-price">{formatPrice(price)}</div>
        <p className="package-description">{description}</p>
        
        <ul className="package-features">
          {features.map((feature, index) => (
            <li key={index}>✓ {feature}</li>
          ))}
        </ul>
        
        <Button 
          variant="primary"
          onClick={handleBooking}
          disabled={loading}
          className="package-cta"
          fullWidth
        >
          {loading ? 'Processing...' : 'Book Now'}
        </Button>
      </div>
    </div>
  )
}

export default PackageCard