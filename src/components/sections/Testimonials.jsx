import { useState, useEffect } from 'react'
import TestimonialCard from '@components/cards/TestimonialCard'
import FadeInUp from '@components/animations/FadeInUp'
import { testimonials } from '@data/testimonials'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  return (
    <section className="section testimonials-section">
      <div className="container">
        <FadeInUp>
          <h2 className="section-title cursive">What Our Families Say</h2>
        </FadeInUp>
        
        <div className="testimonials-carousel">
          <TestimonialCard {...testimonials[currentIndex]} />
          
          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
