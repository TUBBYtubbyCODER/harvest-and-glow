import GiftForm from '@components/forms/GiftForm'
import FadeInUp from '@components/animations/FadeInUp'

const Gift = () => {
  return (
    <section id="gift" className="section gift-section">
      <div className="container">
        <FadeInUp>
          <h2 className="section-title cursive">Give the Gift of Autumn Joy</h2>
        </FadeInUp>
        
        <FadeInUp delay={0.2}>
          <p className="section-subtitle">
            Surprise someone special with a magical pumpkin display that will 
            brighten their entire season
          </p>
        </FadeInUp>
        
        <FadeInUp delay={0.4}>
          <GiftForm />
        </FadeInUp>
      </div>
    </section>
  )
}
