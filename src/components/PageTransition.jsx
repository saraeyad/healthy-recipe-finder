import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function PageTransition({ children }) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState('entering')

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('exiting')
    }
  }, [location, displayLocation])

  useEffect(() => {
    if (transitionStage === 'exiting') {
      const timer = setTimeout(() => {
        setDisplayLocation(location)
        setTransitionStage('entering')
        window.scrollTo({ top: 0, behavior: 'auto' })
      }, 160)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [transitionStage, location])

  return (
    <div
      key={displayLocation.pathname}
      className={transitionStage === 'entering' ? 'animate-page-in' : 'opacity-0'}
      style={{ pointerEvents: transitionStage === 'entering' ? 'auto' : 'none' }}
    >
      {children}
    </div>
  )
}

export default PageTransition
