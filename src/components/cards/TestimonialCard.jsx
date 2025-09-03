const TestimonialCard = ({ content, author, rating = 5, image }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-rating">
        {Array.from({ length: 5 }, (_, i) => (
          <span 
            key={i} 
            className={`star ${i < rating ? 'filled' : ''}`}
            aria-hidden="true"
          >
            ⭐
          </span>
        ))}
      </div>
      
      <blockquote className="testimonial-content">
        "{content}"
      </blockquote>
      
      <div className="testimonial-author">
        {image && (
          <img 
            src={image} 
            alt={author}
            className="author-image"
            loading="lazy"
          />
        )}
        <cite>— {author}</cite>
      </div>
    </div>
  )
}

export default TestimonialCard
