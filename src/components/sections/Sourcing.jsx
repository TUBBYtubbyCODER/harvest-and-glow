import { useEffect } from 'react';
import FadeInUp from '@components/animations/FadeInUp';
import analytics from '@services/analytics';

const Sourcing = () => {
  useEffect(() => {
    analytics.trackPageView('Sourcing');
  }, []);

  const farmPartners = [
    {
      name: "Oakridge Family Farm",
      location: "Draper, UT",
      specialty: "Heritage pumpkin varieties",
      established: "1987"
    },
    {
      name: "Mountain View Pumpkins",
      location: "Park City, UT", 
      specialty: "Organic giant pumpkins",
      established: "1995"
    },
    {
      name: "Harvest Moon Farm",
      location: "Salt Lake Valley, UT",
      specialty: "Decorative gourds",
      established: "2001"
    }
  ];

  return (
    <section className="section sourcing-section">
      <div className="container">
        <FadeInUp>
          <h2 className="section-title cursive">Fresh from Local Farms</h2>
          <p className="section-subtitle">
            We partner with trusted Salt Lake Valley farms to source the freshest, most beautiful pumpkins for your displays
          </p>
        </FadeInUp>

        <div className="sourcing-content">
          <FadeInUp delay={200}>
            <div className="sourcing-promise">
              <div className="promise-grid">
                <div className="promise-item">
                  <div className="promise-icon">🌱</div>
                  <h3>Farm Fresh</h3>
                  <p>Harvested at peak ripeness within 48 hours of your installation</p>
                </div>
                <div className="promise-item">
                  <div className="promise-icon">🏔️</div>
                  <h3>Locally Sourced</h3>
                  <p>Supporting Utah family farms within 50 miles of Salt Lake City</p>
                </div>
                <div className="promise-item">
                  <div className="promise-icon">🎃</div>
                  <h3>Hand Selected</h3>
                  <p>Each pumpkin chosen for perfect shape, color, and carving quality</p>
                </div>
                <div className="promise-item">
                  <div className="promise-icon">🌿</div>
                  <h3>Sustainable</h3>
                  <p>Eco-friendly practices and responsible sourcing methods</p>
                </div>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={400}>
            <div className="farm-partners">
              <h3>Our Trusted Farm Partners</h3>
              <div className="partners-grid">
                {farmPartners.map((farm, index) => (
                  <div key={index} className="partner-card">
                    <div className="farm-icon">🚜</div>
                    <h4>{farm.name}</h4>
                    <p className="farm-location">{farm.location}</p>
                    <p className="farm-specialty">{farm.specialty}</p>
                    <span className="farm-established">Est. {farm.established}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={600}>
            <div className="quality-process">
              <h3>Our Quality Process</h3>
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Farm Visit</h4>
                    <p>We personally visit each farm to select the best pumpkins</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Quality Check</h4>
                    <p>Each pumpkin inspected for firmness, color, and stem integrity</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Careful Transport</h4>
                    <p>Temperature-controlled transport to preserve freshness</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Installation</h4>
                    <p>Professional arrangement and setup at your home</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={800}>
            <div className="seasonal-info">
              <h3>Seasonal Availability</h3>
              <div className="season-timeline">
                <div className="timeline-item">
                  <div className="timeline-date">September</div>
                  <div className="timeline-content">
                    <strong>Early Season</strong>
                    <p>Small to medium pumpkins, perfect for elegant displays</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">October</div>
                  <div className="timeline-content">
                    <strong>Peak Season</strong>
                    <p>Full variety available, including giant pumpkins and unique shapes</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-date">November</div>
                  <div className="timeline-content">
                    <strong>Extended Season</strong>
                    <p>Limited selection of premium pumpkins for Thanksgiving displays</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

export default Sourcing;