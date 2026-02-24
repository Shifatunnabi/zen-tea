'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function NavigationLoader() {
  const pathname = usePathname()
  const [active, setActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const prevPathname = useRef(pathname)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only trigger on actual pathname changes (not first mount)
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname

    // Clear any in-progress animation
    if (timerRef.current) clearTimeout(timerRef.current)

    setProgress(0)
    setVisible(true)
    setActive(true)

    // Fill to 90% quickly, then finish after a brief pause
    const t1 = setTimeout(() => setProgress(70), 50)
    const t2 = setTimeout(() => setProgress(90), 300)
    const t3 = setTimeout(() => setProgress(100), 500)
    const t4 = setTimeout(() => {
      setActive(false)
      setTimeout(() => setVisible(false), 400)
    }, 700)

    timerRef.current = t4

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-primary rounded-full transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? '200ms' : '400ms',
          opacity: active ? 1 : 0,
          transition: `width ${progress === 100 ? '200ms' : '400ms'} ease-out, opacity 400ms ease`,
        }}
      />
    </div>
  )
}
