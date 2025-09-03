export const subscribeToNewsletter = async (email) => {
  try {
    const response = await fetch('/.netlify/functions/newsletter-signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error('Subscription failed')
    }

    return await response.json()
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    throw error
  }
}
