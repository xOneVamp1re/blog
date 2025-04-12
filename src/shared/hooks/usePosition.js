import { useState, useEffect } from 'react'

export const usePosition = (ref, options = {}) => {
  const [position, setPosition] = useState({ left: 0, top: 0 })

  const updatePosition = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setPosition({
        left: rect.left + window.scrollX + options?.left,
        top: rect.bottom + window.scrollY - options?.top,
      })
    }
  }

  useEffect(() => {
    updatePosition()
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('resize', updatePosition)
    }
  }, [ref])

  return position
}
