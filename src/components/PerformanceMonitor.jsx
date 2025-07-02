import { useEffect, useState, useRef } from 'react'

const PerformanceMonitor = () => {
  const [fps, setFps] = useState(0)
  const [memory, setMemory] = useState(null)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const animationId = useRef(null)

  useEffect(() => {
    const measureFPS = () => {
      frameCount.current++
      const currentTime = performance.now()
      
      if (currentTime - lastTime.current >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / (currentTime - lastTime.current)))
        frameCount.current = 0
        lastTime.current = currentTime
        
        // Get memory info if available
        if ('memory' in performance) {
          setMemory({
            used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
            total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
            limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
          })
        }
      }
      
      animationId.current = requestAnimationFrame(measureFPS)
    }
    
    animationId.current = requestAnimationFrame(measureFPS)
    
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
    }
  }, [])

  // Only show in development
  if (import.meta.env.PROD) return null

  return (
    <div className="fixed top-4 left-4 z-[9999] bg-black/80 text-white p-3 rounded-lg font-mono text-xs backdrop-blur-sm border border-gray-600">
      <div className="space-y-1">
        <div className={`font-bold ${fps >= 50 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
          FPS: {fps}
        </div>
        {memory && (
          <div className="text-gray-300">
            <div>Memory: {memory.used}MB / {memory.total}MB</div>
            <div className="w-20 bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${(memory.used / memory.limit) * 100}%` }}
              />
            </div>
          </div>
        )}
        <div className="text-gray-400 text-xs">
          {navigator.hardwareConcurrency || 'Unknown'} cores
        </div>
      </div>
    </div>
  )
}

export default PerformanceMonitor 