import { useIntersectionObserver } from '@hooks/useIntersectionObserver'

const FadeInUp = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  threshold = 0.1,
  className = '' 
}) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin: '0px 0px -50px 0px'
  })

  const style = {
    opacity: isIntersecting ? 1 : 0,
    transform: isIntersecting ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`
  }

  return (
    <div ref={ref} style={style} className={`fade-in-up ${className}`}>
      {children}
    </div>
  )
}

export default FadeInUp
