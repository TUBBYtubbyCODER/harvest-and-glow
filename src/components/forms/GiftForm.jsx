import { useState } from 'react'
import Button from '@components/common/Button'
import { validateEmail } from '@utils/helpers'
import { packages } from '@data/packages'
import { createCheckoutSession } from '@services/stripe'
import analytics from '@services/analytics'

const GiftForm = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    recipientAddress: '',
    senderName: '',
    senderEmail: '',
    message: '',
    selectedPackage: '',
    deliveryDate: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.recipientName.trim()) {
      newErrors.recipientName = 'Recipient name is required'
    }
    
    if (!formData.recipientEmail.trim()) {
      newErrors.recipientEmail = 'Recipient email is required'
    } else if (!validateEmail(formData.recipientEmail)) {
      newErrors.recipientEmail = 'Please enter a valid email address'
    }
    
    if (!formData.recipientAddress.trim()) {
      newErrors.recipientAddress = 'Delivery address is required'
    }
    
    if (!formData.senderName.trim()) {
      newErrors.senderName = 'Your name is required'
    }
    
    if (!formData.senderEmail.trim()) {
      newErrors.senderEmail = 'Your email is required'
    } else if (!validateEmail(formData.senderEmail)) {
      newErrors.senderEmail = 'Please enter a valid email address'
    }
    
    if (!formData.selectedPackage) {
      newErrors.selectedPackage = 'Please select a package'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      const selectedPkg = packages.find(pkg => pkg.id === formData.selectedPackage)
      
      analytics.trackEvent('gift_purchase_initiated', {
        package_id: formData.selectedPackage,
        package_price: selectedPkg.price,
        recipient_domain: formData.recipientEmail.split('@')[1]
      })

      await createCheckoutSession(
        selectedPkg.stripeProductId,
        `${window.location.origin}/gift-success?package=${formData.selectedPackage}`,
        `${window.location.origin}/gift-cancel`
      )
    } catch (error) {
      console.error('Gift order error:', error)
      alert('Sorry, there was an error processing your gift order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <form className="gift-form" onSubmit={handleSubmit}>
      <div className="form-sections">
        <div className="form-section">
          <h3>Recipient Information</h3>
          
          <div className="form-group">
            <label htmlFor="recipientName">Full Name *</label>
            <input
              type="text"
              id="recipientName"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleInputChange}
              className={errors.recipientName ? 'error' : ''}
              required
            />
            {errors.recipientName && <span className="error-message">{errors.recipientName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="recipientEmail">Email Address *</label>
            <input
              type="email"
              id="recipientEmail"
              name="recipientEmail"
              value={formData.recipientEmail}
              onChange={handleInputChange}
              className={errors.recipientEmail ? 'error' : ''}
              required
            />
            {errors.recipientEmail && <span className="error-message">{errors.recipientEmail}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="recipientAddress">Delivery Address *</label>
            <textarea
              id="recipientAddress"
              name="recipientAddress"
              rows="3"
              value={formData.recipientAddress}
              onChange={handleInputChange}
              className={errors.recipientAddress ? 'error' : ''}
              placeholder="Street address, city, state, ZIP code"
              required
            />
            {errors.recipientAddress && <span className="error-message">{errors.recipientAddress}</span>}
          </div>
        </div>

        <div className="form-section">
          <h3>Your Information</h3>
          
          <div className="form-group">
            <label htmlFor="senderName">Your Name *</label>
            <input
              type="text"
              id="senderName"
              name="senderName"
              value={formData.senderName}
              onChange={handleInputChange}
              className={errors.senderName ? 'error' : ''}
              required
            />
            {errors.senderName && <span className="error-message">{errors.senderName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="senderEmail">Your Email *</label>
            <input
              type="email"
              id="senderEmail"
              name="senderEmail"
              value={formData.senderEmail}
              onChange={handleInputChange}
              className={errors.senderEmail ? 'error' : ''}
              required
            />
            {errors.senderEmail && <span className="error-message">{errors.senderEmail}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="selectedPackage">Choose Package *</label>
            <select
              id="selectedPackage"
              name="selectedPackage"
              value={formData.selectedPackage}
              onChange={handleInputChange}
              className={errors.selectedPackage ? 'error' : ''}
              required
            >
              <option value="">Select a package</option>
              {packages.map(pkg => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.title} - ${pkg.price}
                </option>
              ))}
            </select>
            {errors.selectedPackage && <span className="error-message">{errors.selectedPackage}</span>}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="deliveryDate">Preferred Delivery Date</label>
        <input
          type="date"
          id="deliveryDate"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleInputChange}
          min={today}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Personal Message</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          placeholder="Add a heartfelt message to make this gift extra special..."
          value={formData.message}
          onChange={handleInputChange}
        />
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        size="large"
        fullWidth
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Processing...' : '🎁 Send Gift & Process Payment'}
      </Button>
    </form>
  )
}

export default GiftForm