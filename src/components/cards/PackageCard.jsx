import { useState } from 'react';
import analytics from '@services/analytics';

const PackageCard = ({ 
  id,
  title, 
  price, 
  originalPrice,
  description, 
  features, 
  emoji, 
  popular = false,
  highlights = [],
  deliveryTime,
  customizationLevel
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async () => {
    setIsLoading(true);
    
    // Track package selection
    analytics.trackPackageInterest(title, price);
    
    try {
      // In production, this would integrate with Stripe
      // For now, we'll show an alert
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      alert(`Booking ${title} package - Stripe integration will process this payment in production`);
      
      // Track successful booking intent
      analytics.trackEvent('booking_initiated', {
        package_id: id,
        package_name: title,
        package_price: price
      });
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`package-card ${popular ? 'popular' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {popular && (
        <div className="popular-badge">
          Most Popular
        </div>
      )}
      
      <div className="package-image">
        <span style={{ 
          fontSize: isHovered ? '5rem' : '4rem', 
          transition: 'all 0.3s ease' 
        }}>
          {emoji}
        </span>
      </div>
      
      <div className="package-content">
        <h3 className="package-title cursive">{title}</h3>
        
        <div className="package-pricing">
          <div className="package-price">${price}</div>
          {originalPrice && (
            <div className="original-price">${originalPrice}</div>
          )}
        </div>
        
        <p className="package-description">{description}</p>
        
        {highlights.length > 0 && (
          <div className="package-highlights">
            {highlights.map((highlight, index) => (
              <span key={index} className="highlight-tag">
                {highlight}
              </span>
            ))}
          </div>
        )}
        
        <ul className="package-features">
          {features.map((feature, index) => (
            <li key={index}>
              <span className="feature-check">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        
        <div className="package-meta">
          <div className="meta-item">
            <strong>Delivery:</strong> {deliveryTime}
          </div>
          <div className="meta-item">
            <strong>Customization:</strong> {customizationLevel}
          </div>
        </div>
        
        <button 
          className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
          onClick={handleBooking}
          disabled={isLoading}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {isLoading ? 'Processing...' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default PackageCard;