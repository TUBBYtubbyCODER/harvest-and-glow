import { useEffect, useRef, useState } from 'react';

const FadeInUp = ({ 
  children, 
  delay = 0, 
  duration = 600,
  threshold = 0.1,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold, isVisible]);

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
  };

  return (
    <div 
      ref={elementRef}
      className={`fade-in-up ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

export default FadeInUp;