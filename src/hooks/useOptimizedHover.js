import { useState, useCallback, useRef } from 'react'

export const useOptimizedHover = (delay = 50) => {
  const [isHovered, setIsHovered] = useState(false)
  const timeoutRef = useRef(null)

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, delay)
  }, [delay])

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    cleanup
  }
} 