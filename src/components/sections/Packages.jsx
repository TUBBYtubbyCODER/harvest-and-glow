import PackageCard from '@components/cards/PackageCard'
import FadeInUp from '@components/animations/FadeInUp'
import { packages } from '@data/packages'

const Packages = () => {
  return (
    <section id="packages" className="section packages-section">
      <div className="container">
        <FadeInUp>
          <h2 className="section-title cursive">Our Magical Packages</h2>
        </FadeInUp>
        
        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <FadeInUp key={pkg.id} delay={index * 0.1}>
              <PackageCard {...pkg} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Packages