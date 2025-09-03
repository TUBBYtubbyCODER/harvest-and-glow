import FadeInUp from '@components/animations/FadeInUp'
import FeatureCard from '@components/cards/FeatureCard'

const Sourcing = () => {
  const features = [
    {
      icon: '🚜',
      title: 'Local Farm Partnerships',
      description: 'We work exclusively with trusted Salt Lake Valley farms to source the freshest, most beautiful pumpkins. Each pumpkin is hand-selected for quality, ensuring your display looks stunning from setup to season\'s end.'
    },
    {
      icon: '🎃',
      title: 'Premium Quality',
      description: 'Every pumpkin meets our strict standards for size, shape, and longevity. We inspect each one personally, ensuring only the most photogenic and durable pumpkins make it to your porch display.'
    },
    {
      icon: '🌱',
      title: 'Sustainable Practices',
      description: 'Supporting local agriculture while minimizing environmental impact. After your display, we offer composting services to give your pumpkins a second life nourishing next season\'s harvest.'
    }
  ]

  return (
    <section className="section sourcing-section">
      <div className="container">
        <FadeInUp>
          <h2 className="section-title cursive">Farm Fresh Promise</h2>
        </FadeInUp>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <FadeInUp key={index} delay={index * 0.1}>
              <FeatureCard {...feature} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sourcing
