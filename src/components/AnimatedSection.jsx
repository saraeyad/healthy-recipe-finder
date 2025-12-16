import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useEffect, useState } from 'react'

function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0,
  animation = 'fade-up',
  startVisible = false
}) {
  const [ref, isVisible] = useScrollAnimation({ once: true })
  const [shouldBeVisible, setShouldBeVisible] = useState(startVisible)

  useEffect(() => {
    if (startVisible) {
      setShouldBeVisible(true)
    } else if (isVisible) {
      setShouldBeVisible(true)
    }
  }, [isVisible, startVisible])

  const animationClasses = {
    'fade-up': 'opacity-0 translate-y-8',
    'fade-in': 'opacity-0',
    'slide-left': 'opacity-0 -translate-x-8',
    'slide-right': 'opacity-0 translate-x-8',
    'scale': 'opacity-0 scale-95',
  }

  const visibleClasses = {
    'fade-up': 'opacity-100 translate-y-0',
    'fade-in': 'opacity-100',
    'slide-left': 'opacity-100 translate-x-0',
    'slide-right': 'opacity-100 translate-x-0',
    'scale': 'opacity-100 scale-100',
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shouldBeVisible ? visibleClasses[animation] : animationClasses[animation]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default AnimatedSection

