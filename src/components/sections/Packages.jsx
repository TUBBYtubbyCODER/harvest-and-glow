import PackageCard from "@components/cards/PackageCard";
import FadeInUp from "@components/animations/FadeInUp";
import { packages } from "@data/packages";

const Packages = () => {
  return (
    <section id="packages" className="section packages-section">
      <div className="container">
        <FadeInUp>
          <h2 className="section-title cursive">Our Magical Packages</h2>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.2rem', 
            marginBottom: '3rem', 
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            From elegant simplicity to complete porch transformations, we have the perfect package to bring autumn magic to your home.
          </p>
        </FadeInUp>
        
        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <FadeInUp key={pkg.id} delay={index * 200}>
              <PackageCard {...pkg} />
            </FadeInUp>
          ))}
        </div>
        
        <FadeInUp delay={600}>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              Not sure which package is right for you?
            </p>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                // In production, this would open a consultation booking modal
                alert('Consultation booking feature coming soon! For now, please call (801) 555-GLOW');
              }}
            >
              Schedule Free Consultation
            </button>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default Packages;