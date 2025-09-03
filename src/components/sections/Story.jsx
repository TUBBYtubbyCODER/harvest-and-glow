import FadeInUp from '@components/animations/FadeInUp'

const Story = () => {
  return (
    <section id="story" className="section story-section">
      <div className="container">
        <div className="story">
          <div className="story-content">
            <FadeInUp>
              <h2 className="section-title cursive">Our Autumn Story</h2>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <p>
                Born from a deep love of fall traditions and community connection, 
                Harvest & Glow began when our founders realized that busy families 
                shouldn't have to choose between beautiful seasonal displays and 
                precious family time.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.4}>
              <p>
                We partner with local Salt Lake Valley farms to source the freshest, 
                most beautiful pumpkins, ensuring each display tells a story of seasonal 
                abundance and craftsmanship. Our designs don't just decorate your porch – 
                they create gathering spaces where memories are made.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.6}>
              <p>
                From intimate family moments to neighborhood admiration, we believe 
                every home deserves to glow with the warmth of autumn. Let us handle 
                the details while you focus on what matters most – enjoying the season 
                with those you love.
              </p>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story