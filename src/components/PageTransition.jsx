import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function PageTransition({ children }) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState('entering')

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('exiting')
    }
  }, [location, displayLocation])

  useEffect(() => {
    if (transitionStage === 'exiting') {
      const timer = setTimeout(() => {
        setDisplayLocation(location)
        setTransitionStage('entering')
      }, 150)

      return () => clearTimeout(timer)
    }
  }, [transitionStage, location])

  return (
    <div
      className={`transition-opacity duration-300 ${
        transitionStage === 'entering' ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        pointerEvents: transitionStage === 'entering' ? 'auto' : 'none'
      }}
    >
      {children}
    </div>
  )
}

export default PageTransition

