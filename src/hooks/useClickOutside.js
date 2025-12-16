import { useEffect } from 'react'

export const useClickOutside = (refs, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = refs.every((ref) => {
        return ref.current && !ref.current.contains(event.target)
      })

      if (isOutside) {
        callback()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [refs, callback])
}

