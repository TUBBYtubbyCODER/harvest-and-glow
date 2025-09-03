import { useEffect } from 'react';
import FadeInUp from '@components/animations/FadeInUp';
import analytics from '@services/analytics';

const Story = () => {
  useEffect(() => {
    analytics.trackPageView('Story');
  }, []);

  return (
    <section id="story" className="section">
      <div className="container">
        <FadeInUp>
          <div className="story">
            <div className="story-content">
              <h2 className="section-title cursive">Our Autumn Story</h2>
              <p>
                Born from a deep love of fall traditions and community connection, Harvest & Glow began when our founders realized that busy families shouldn't have to choose between beautiful seasonal displays and precious family time.
              </p>
              <p>
                We partner with local Salt Lake Valley farms to source the freshest, most beautiful pumpkins, ensuring each display tells a story of seasonal abundance and craftsmanship. Our designs don't just decorate your porch – they create gathering spaces where memories are made.
              </p>
              <p>
                From intimate family moments to neighborhood admiration, we believe every home deserves to glow with the warmth of autumn. Let us handle the details while you focus on what matters most – enjoying the season with those you love.
              </p>
              
              <div className="story-stats">
                <div className="stat">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Homes Transformed</div>
                </div>
                <div className="stat">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Years of Excellence</div>
                </div>
                <div className="stat">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Local Farm Partners</div>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default Story;