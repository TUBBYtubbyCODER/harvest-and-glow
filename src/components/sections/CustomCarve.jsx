import { useState, useRef } from 'react'
import Button from '@components/common/Button'
import FadeInUp from '@components/animations/FadeInUp'
import UploadForm from '@components/forms/UploadForm'
import { useFileUpload } from '@hooks/useFileUpload'
import analytics from '@services/analytics'

const CustomCarve = () => {
  const { files, uploadFile, removeFile, clearFiles } = useFileUpload()
  const [dragOver, setDragOver] = useState(false)

  const handleScheduleConsultation = () => {
    analytics.trackEvent('consultation_click', { 
      section: 'custom_carve',
      uploaded_files: files.length 
    })
    // Integration with Calendly or similar would go here
    window.open('https://calendly.com/harvestandglow/consultation', '_blank')
  }

  return (
    <section id="custom" className="section custom-carve-section">
      <div className="container">
        <FadeInUp>
          <h2 className="section-title cursive">Custom Carve Magic</h2>
        </FadeInUp>
        
        <FadeInUp delay={0.2}>
          <p className="section-subtitle">
            Upload your favorite family photos, pet pictures, or special designs 
            for custom pumpkin carving
          </p>
        </FadeInUp>

        <div className="custom-carve-content">
          <FadeInUp delay={0.4}>
            <UploadForm 
              files={files}
              onFileUpload={uploadFile}
              onFileRemove={removeFile}
              dragOver={dragOver}
              setDragOver={setDragOver}
            />
          </FadeInUp>

          <FadeInUp delay={0.6}>
            <div className="consultation-cta">
              <Button 
                variant="primary"
                size="large"
                onClick={handleScheduleConsultation}
              >
                Schedule Design Consultation
              </Button>
              <p className="consultation-note">
                Free 30-minute consultation to discuss your vision and get pricing
              </p>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}

export default CustomCarve
