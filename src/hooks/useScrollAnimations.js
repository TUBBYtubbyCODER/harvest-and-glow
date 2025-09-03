import { useEffect } from 'react'

export const useScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('.section, .fade-in-up')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])
}
