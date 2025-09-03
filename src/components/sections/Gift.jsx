import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FadeInUp from '@components/animations/FadeInUp';
import { packages } from '@data/packages';
import analytics from '@services/analytics';

const Gift = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const { 
    register, 
    handleSubmit, 
    watch,
    reset,
    formState: { errors } 
  } = useForm();

  const deliveryDate = watch('deliveryDate');

  useEffect(() => {
    analytics.trackPageView('Gift');
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Track form submission
      analytics.trackFormSubmission('gift_purchase');
      analytics.trackEvent('gift_purchase_initiated', {
        package: data.package,
        recipient_location: data.recipientCity,
        delivery_date: data.deliveryDate
      });

      // Simulate API call to process gift order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would:
      // 1. Process payment via Stripe
      // 2. Send confirmation emails
      // 3. Schedule delivery
      // 4. Create order in backend system
      
      console.log('Gift order data:', data);
      
      setShowSuccess(true);
      reset();
      
      // Track successful submission
      analytics.trackEvent('gift_purchase_completed', {
        package: data.package,
        order_value: packages.find(p => p.id === data.package)?.price || 0
      });
      
    } catch (error) {
      console.error('Gift order error:', error);
      alert('Sorry, there was an error processing your gift order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7); // Minimum 7 days advance notice
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(11, 31); // End of year
    return maxDate.toISOString().split('T')[0];
  };

  if (showSuccess) {
    return (
      <section id="gift" className="section gift-section">
        <div className="container">
          <FadeInUp>
            <div className="gift-success">
              <div className="success-icon">🎁</div>
              <h2>Gift Order Confirmed!</h2>
              <p>Your thoughtful gift has been successfully ordered. The recipient will receive an email notification about their special surprise!</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowSuccess(false)}
              >
                Send Another Gift
              </button>
            </div>
          </FadeInUp>
        </div>
      </section>
    );
  }

  return (
    <section id="gift" className="section gift-section">
      <div className="container">
        <FadeInUp>
          <h2 className="section-title cursive">Send the Gift of Autumn Joy</h2>
          <p className="section-subtitle">
            Surprise someone special with a magical pumpkin display that brings seasonal warmth to their home
          </p>
        </FadeInUp>

        <div className="gift-content">
          <FadeInUp delay={200}>
            <div className="gift-benefits">
              <div className="benefit">
                <div className="benefit-icon">💝</div>
                <h3>Perfect for Any Occasion</h3>
                <p>Housewarming, birthdays, holidays, or just because</p>
              </div>
              <div className="benefit">
                <div className="benefit-icon">📧</div>
                <h3>Instant Delivery</h3>
                <p>Beautiful digital gift certificate sent immediately</p>
              </div>
              <div className="benefit">
                <div className="benefit-icon">⏰</div>
                <h3>Flexible Scheduling</h3>
                <p>Recipient can schedule installation when convenient</p>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={400}>
            <form onSubmit={handleSubmit(onSubmit)} className="gift-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="senderEmail">Your Email *</label>
                  <input
                    id="senderEmail"
                    type="email"
                    {...register('senderEmail', { 
                      required: 'Your email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    placeholder="your.email@example.com"
                  />
                  {errors.senderEmail && (
                    <span className="error">{errors.senderEmail.message}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="recipientName">Recipient's Name *</label>
                  <input
                    id="recipientName"
                    type="text"
                    {...register('recipientName', { 
                      required: 'Recipient name is required' 
                    })}
                    placeholder="Enter recipient's full name"
                  />
                  {errors.recipientName && (
                    <span className="error">{errors.recipientName.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="recipientEmail">Recipient's Email *</label>
                  <input
                    id="recipientEmail"
                    type="email"
                    {...register('recipientEmail', { 
                      required: 'Recipient email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    placeholder="recipient@example.com"
                  />
                  {errors.recipientEmail && (
                    <span className="error">{errors.recipientEmail.message}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="recipientAddress">Recipient's Address *</label>
                <textarea
                  id="recipientAddress"
                  {...register('recipientAddress', { 
                    required: 'Recipient address is required' 
                  })}
                  placeholder="Enter full address for display installation"
                  rows="3"
                />
                {errors.recipientAddress && (
                  <span className="error">{errors.recipientAddress.message}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="package">Select Package *</label>
                  <select
                    id="package"
                    {...register('package', { 
                      required: 'Please select a package' 
                    })}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                  >
                    <option value="">Choose a package...</option>
                    {packages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.title} - ${pkg.price}
                      </option>
                    ))}
                  </select>
                  {errors.package && (
                    <span className="error">{errors.package.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="deliveryDate">Preferred Delivery Date *</label>
                  <input
                    id="deliveryDate"
                    type="date"
                    min={getMinDate()}
                    max={getMaxDate()}
                    {...register('deliveryDate', { 
                      required: 'Please select a delivery date' 
                    })}
                  />
                  {errors.deliveryDate && (
                    <span className="error">{errors.deliveryDate.message}</span>
                  )}
                  <small>Minimum 7 days advance notice required</small>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="personalMessage">Personal Message</label>
                <textarea
                  id="personalMessage"
                  {...register('personalMessage')}
                  placeholder="Add a personal message for the recipient (optional)"
                  rows="4"
                  maxLength="500"
                />
                <small>Maximum 500 characters</small>
              </div>

              <div className="form-group">
                <label htmlFor="occasion">Occasion (Optional)</label>
                <select id="occasion" {...register('occasion')}>
                  <option value="">Select occasion...</option>
                  <option value="birthday">Birthday</option>
                  <option value="housewarming">Housewarming</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="holiday">Holiday</option>
                  <option value="thanksgiving">Thanksgiving</option>
                  <option value="just-because">Just Because</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {selectedPackage && (
                <div className="package-preview">
                  <h4>Selected Package Details:</h4>
                  {packages.filter(pkg => pkg.id === selectedPackage).map(pkg => (
                    <div key={pkg.id} className="selected-package">
                      <div className="package-info">
                        <span className="package-emoji">{pkg.emoji}</span>
                        <div>
                          <h5>{pkg.title}</h5>
                          <p>{pkg.description}</p>
                          <div className="package-price">${pkg.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button 
                type="submit" 
                className={`btn btn-primary btn-large ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing Gift Order...' : 'Send Gift'}
              </button>
            </form>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

export default Gift;