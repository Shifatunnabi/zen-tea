'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface CarouselSlide {
  _id: string
  image: string
  headline: { en: string; bn: string; ar: string }
  subtext: { en: string; bn: string; ar: string }
  order: number
  isHidden: boolean
}

const FALLBACK_SLIDE: CarouselSlide = {
  _id: 'fallback',
  image: '/placeholder.svg?height=800&width=1600',
  headline: {
    en: 'True Taste of Bangladesh',
    bn: 'বাংলাদেশের প্রকৃত স্বাদ',
    ar: 'الطعم الحقيقي لبنغلاديش'
  },
  subtext: {
    en: "Premium quality tea blends from Bangladesh's most iconic tea gardens. Combining tradition, authenticity, and innovation for B2B markets worldwide.",
    bn: 'বাংলাদেশের সবচেয়ে আইকনিক চা বাগান থেকে প্রিমিয়াম মানের চা মিশ্রণ। বিশ্বব্যাপী B2B বাজারের জন্য ঐতিহ্য, সত্যতা এবং উদ্ভাবনের সমন্বয়।',
    ar: 'خلطات الشاي عالية الجودة من أكثر حدائق الشاي شهرة في بنغلاديش. الجمع بين التقاليد والأصالة والابتكار لأسواق B2B في جميع أنحاء العالم.'
  },
  order: 0,
  isHidden: false
}

export function HeroSection() {
  const { t } = useLanguage()
  const [slides, setSlides] = useState<CarouselSlide[]>([FALLBACK_SLIDE])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    fetch('/api/carousel')
      .then(r => r.json())
      .then(data => {
        const visibleSlides = (data || []).filter((s: CarouselSlide) => !s.isHidden)
        if (visibleSlides.length > 0) {
          setSlides(visibleSlides)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (slides.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const currentSlide = slides[currentIndex]

  return (
    <section className="relative w-full overflow-hidden bg-primary-dark aspect-square md:aspect-[20/7] min-h-[200px]">
      {/* Background image fills the frame */}
      <img
        src={currentSlide.image}
        alt="Tea gardens"
        className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity duration-500"
        key={currentSlide._id}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/70 via-primary-dark/30 to-transparent" />

      {/* Text content — bottom-left on mobile, centred vertically on md+ */}
      <div className="absolute inset-0 flex items-end pb-5 md:items-center md:pb-0">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="max-w-[80%] sm:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <h1 className="mb-1 sm:mb-3 lg:mb-6 font-serif font-bold leading-tight text-white text-base sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl">
              {t(currentSlide.headline)}
            </h1>
            <p className="mb-2 sm:mb-4 lg:mb-8 text-white/85 leading-snug text-[11px] sm:text-sm md:text-base lg:text-xl line-clamp-2 sm:line-clamp-none">
              {t(currentSlide.subtext)}
            </p>
            <div className="flex flex-row gap-1.5 sm:gap-4">
              <Button
                size="sm"
                asChild
                className="bg-accent text-primary-dark hover:bg-accent/90 text-[10px] sm:text-sm lg:text-base h-7 sm:h-10 px-2.5 sm:px-5 lg:px-6"
              >
                <Link href="/products">
                  {t({ en: 'Explore Products', bn: 'পণ্য দেখুন', ar: 'استكشف المنتجات' })}
                  <ArrowRight className="ml-1 h-2.5 w-2.5 sm:h-4 sm:w-4 sm:ml-2" />
                </Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-primary-dark text-[10px] sm:text-sm lg:text-base h-7 sm:h-10 px-2.5 sm:px-5 lg:px-6"
              >
                <Link href="/about">{t({ en: 'Our Story', bn: 'আমাদের গল্প', ar: 'قصتنا' })}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows hidden on mobile, pinned to boundary on desktop */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 items-center justify-center rounded-r-lg bg-white/20 p-3 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 items-center justify-center rounded-l-lg bg-white/20 p-3 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-1.5 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 sm:h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-3 sm:w-8 bg-white' : 'w-1 sm:w-2 bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}