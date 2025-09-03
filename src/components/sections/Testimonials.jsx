import { useState, useEffect } from 'react';
import FadeInUp from '@components/animations/FadeInUp';
import analytics from '@services/analytics';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const testimonials = [
    {
      id: 1,
      content: "Harvest & Glow transformed our front porch into something magical! The neighbors still stop to take photos weeks later. The quality and attention to detail is incredible.",
      author: "Sarah M.",
      location: "Cottonwood Heights",
      rating: 5,
      package: "Deluxe Dreams"
    },
    {
      id: 2,
      content: "As a busy mom of three, this service was a lifesaver. They handled everything while I focused on family time. The display exceeded all my expectations!",
      author: "Jennifer L.",
      location: "Park City",
      rating: 5,
      package: "Harvest Walkway"
    },
    {
      id: 3,
      content: "The custom carving of our family photo on the pumpkins brought tears to my eyes. This isn't just decoration – it's art that captures precious memories.",
      author: "Amanda R.",
      location: "Draper",
      rating: 5,
      package: "Custom Glow Experience"
    },
    {
      id: 4,
      content: "Professional service from start to finish. The team was respectful, creative, and the final result was beyond what we imagined. Worth every penny!",
      author: "Michael T.",
      location: "Millcreek",
      rating: 5,
      package: "Classic Charm"
    }
  ];

  useEffect(() => {
    analytics.trackPageView('Testimonials');
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length, isPaused]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    analytics.trackEvent('testimonial_interaction', {
      action: 'manual_navigation',
      testimonial_id: testimonials[index].id
    });
  };

  const renderStars = (rating) => {
    return Array(rating).fill().map((_, i) => (
      <span key={i} className="star">⭐</span>
    ));
  };

  return (
    <section className="section testimonials-section">
      <div className="container">
        <FadeInUp>
          <h2 className="section-title cursive">What Our Families Say</h2>
        </FadeInUp>
        
        <div 
          className="testimonials"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <FadeInUp delay={200}>
            <div className="testimonial-card">
              <div className="testimonial-rating">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              
              <div className="testimonial-content">
                "{testimonials[currentTestimonial].content}"
              </div>
              
              <div className="testimonial-author">
                <div className="author-name">
                  — {testimonials[currentTestimonial].author}
                </div>
                <div className="author-location">
                  {testimonials[currentTestimonial].location}
                </div>
                <div className="author-package">
                  {testimonials[currentTestimonial].package} Package
                </div>
              </div>
            </div>
          </FadeInUp>
          
          {/* Navigation dots */}
          <div className="testimonial-nav">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`nav-dot ${index === currentTestimonial ? 'active' : ''}`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            className="testimonial-arrow prev"
            onClick={() => goToTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
          >
            ❮
          </button>
          <button 
            className="testimonial-arrow next"
            onClick={() => goToTestimonial((currentTestimonial + 1) % testimonials.length)}
            aria-label="Next testimonial"
          >
            ❯
          </button>
        </div>
        
        <FadeInUp delay={400}>
          <div className="testimonials-cta">
            <p>Join hundreds of satisfied customers</p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                analytics.trackEvent('cta_clicked', { 
                  button: 'Book Now', 
                  location: 'testimonials' 
                });
                document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book Your Display Today
            </button>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default Testimonials;