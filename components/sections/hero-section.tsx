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
    <section className="relative overflow-hidden bg-primary-dark">
      <div className="absolute inset-0">
        <img
          src={currentSlide.image}
          alt="Tea gardens"
          className="h-full w-full object-cover opacity-30 transition-opacity duration-500"
          key={currentSlide._id}
        />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-white lg:text-7xl">
            {t(currentSlide.headline)}
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-white/90 lg:text-2xl">
            {t(currentSlide.subtext)}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild className="bg-accent text-primary-dark hover:bg-accent/90">
              <Link href="/products">
                {t({ en: 'Explore Products', bn: 'পণ্য দেখুন', ar: 'استكشف المنتجات' })} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary-dark">
              <Link href="/about">{t({ en: 'Learn Our Story', bn: 'আমাদের গল্প জানুন', ar: 'تعرف على قصتنা' })}</Link>
            </Button>
          </div>
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
