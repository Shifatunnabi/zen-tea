'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [showText, setShowText] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Text + line appear right as logo animation finishes (1.6s)
    const textTimer = setTimeout(() => setShowText(true), 1550)
    // Begin fade-out at 3.8s
    const fadeTimer = setTimeout(() => setFadeOut(true), 3800)
    // Unmount at 4.6s (after 800ms transition)
    const removeTimer = setTimeout(() => setVisible(false), 4600)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-[800ms] ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo: scales from near-zero to full size */}
        <div className="animate-logo-grow">
          <Image
            src="/logo.png"
            alt="Zen Tea"
            width={130}
            height={130}
            className="object-contain"
            priority
          />
        </div>

        {/* Text + progress bar fade in together */}
        <div
          className={`flex flex-col items-center gap-3 transition-opacity duration-300 ${
            showText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="font-serif text-lg font-medium tracking-wide text-foreground">
            Honoring Tea Heritage
          </p>

          {/* Progress line — fills left to right */}
          <div className="h-[5px] w-52 overflow-hidden rounded-full bg-border">
            <div
              className={`h-full rounded-full bg-primary transition-all duration-[2500ms] ease-out ${
                showText ? 'w-full' : 'w-0'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
