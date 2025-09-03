import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FadeInUp from '@components/animations/FadeInUp';
import analytics from '@services/analytics';

const Newsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Track newsletter signup
      analytics.trackEvent('newsletter_signup', {
        email: data.email,
        interests: data.interests
      });

      // Simulate API call to add subscriber
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would:
      // 1. Add email to mailing list service (Mailchimp, ConvertKit, etc.)
      // 2. Send welcome email
      // 3. Set up automated email sequence
      
      console.log('Newsletter signup:', data);
      
      setIsSubscribed(true);
      reset();
      
    } catch (error) {
      console.error('Newsletter signup error:', error);
      alert('Sorry, there was an error subscribing to our newsletter. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <section className="section newsletter-section">
        <div className="container">
          <FadeInUp>
            <div className="newsletter-success">
              <div className="success-icon">📧</div>
              <h3>Welcome to our autumn community!</h3>
              <p>You'll receive our first seasonal inspiration email within the next few days.</p>
            </div>
          </FadeInUp>
        </div>
      </section>
    );
  }

  return (
    <section className="section newsletter-section">
      <div className="container">
        <FadeInUp>
          <div className="newsletter-content">
            <div className="newsletter-info">
              <h3 className="cursive">Stay Connected with Seasonal Magic</h3>
              <p>Join our community of autumn enthusiasts and receive:</p>
              <ul className="newsletter-benefits">
                <li>Early access to seasonal packages</li>
                <li>Exclusive DIY autumn decorating tips</li>
                <li>Local pumpkin patch recommendations</li>
                <li>Special subscriber-only discounts</li>
                <li>Seasonal home styling inspiration</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="newsletter-form">
              <div className="form-group">
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>

              <div className="interests-group">
                <label>I'm interested in: (Optional)</label>
                <div className="interests-checkboxes">
                  <label className="checkbox-label">
                    <input type="checkbox" {...register('interests')} value="packages" />
                    Service packages
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" {...register('interests')} value="diy" />
                    DIY tips
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" {...register('interests')} value="events" />
                    Special events
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
              
              <small className="privacy-note">
                We respect your privacy. Unsubscribe anytime with one click.
              </small>
            </form>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default Newsletter;