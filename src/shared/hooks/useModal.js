import { useEffect, useState, useRef } from 'react'

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef(null)
  const buttonRef = useRef(null)

  const show = () => setIsVisible(true)
  const hide = () => setIsVisible(false)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        hide()
      }
    }

    const handleOverlayClick = (e) => {
      if (
        modalRef.current &&
        buttonRef.current &&
        !modalRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        hide()
      }
    }

    if (isVisible) {
      modalRef.current?.focus()
      document.addEventListener('mousedown', handleOverlayClick)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isVisible])

  return {
    isVisible,
    show,
    hide,
    modalRef,
    buttonRef,
  }
}
