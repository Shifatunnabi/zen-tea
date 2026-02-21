'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useLanguage, TranslationObject } from '@/lib/language-context'

interface CoreValue {
  _id: string
  image: string
  name: { en: string; bn?: string; ar?: string }
  description: { en: string; bn?: string; ar?: string }
  order: number
  isHidden: boolean
}

interface CoreValuesSectionProps {
  title?: TranslationObject
  subtitle?: TranslationObject
}

const FALLBACK_VALUES: CoreValue[] = [
  {
    _id: 'fallback-1',
    image: '/placeholder.svg?height=700&width=2000',
    name: { en: 'Authenticity', bn: 'সত্যতা', ar: 'الأصالة' },
    description: {
      en: 'Rooted in our land, our stories, and our traditional process',
      bn: 'আমাদের ভূমি, আমাদের গল্প এবং আমাদের ঐতিহ্যবাহী প্রক্রিয়ায় মূলবদ্ধ',
      ar: 'متجذر في أرضنا وقصصنا وعمليتنا التقليدية',
    },
    order: 1,
    isHidden: false,
  },
  {
    _id: 'fallback-2',
    image: '/placeholder.svg?height=700&width=2000',
    name: { en: 'Purity', bn: 'বিশুদ্ধতা', ar: 'النقاء' },
    description: {
      en: 'No compromise in quality, health, or sourcing standards',
      bn: 'মান, স্বাস্থ্য বা উৎসের মানদণ্ডে কোনো আপস নেই',
      ar: 'لا مساومة في معايير الجودة أو الصحة أو المصادر',
    },
    order: 2,
    isHidden: false,
  },
  {
    _id: 'fallback-3',
    image: '/placeholder.svg?height=700&width=2000',
    name: { en: 'Sustainability', bn: 'স্থায়িত্ব', ar: 'الاستدامة' },
    description: {
      en: 'Ethical practices in plucking, packaging, and supply chain',
      bn: 'তোলা, প্যাকেজিং এবং সরবরাহ শৃঙ্খলে নৈতিক অনুশীলন',
      ar: 'ممارسات أخلاقية في القطف والتعبئة وسلسلة التوريد',
    },
    order: 3,
    isHidden: false,
  },
  {
    _id: 'fallback-4',
    image: '/placeholder.svg?height=700&width=2000',
    name: { en: 'Heritage', bn: 'ঐতিহ্য', ar: 'التراث' },
    description: {
      en: 'Celebrating timeless craftsmanship of Bangladeshi tea culture',
      bn: 'বাংলাদেশী চা সংস্কৃতির নিরন্তন কারুশিল্প উদযাপন',
      ar: 'الاحتفال بالحرفية الخالدة لثقافة الشاي البنغلاديشية',
    },
    order: 4,
    isHidden: false,
  },
]

function CoreValueItem({
  value,
  index,
}: {
  value: CoreValue
  index: number
}) {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Values 1 and 3 (index 0, 2) → text RIGHT; values 2 and 4 (index 1, 3) → text LEFT
  const textOnRight = index % 2 === 0

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      {/* 20:7 aspect ratio container */}
      <div className="relative w-full" style={{ aspectRatio: '20 / 7' }}>
        {/* Background image */}
        <img
          src={value.image}
          alt={t(value.name as TranslationObject)}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Text overlay */}
        <div
          className={`
            absolute inset-0 flex items-center
            ${textOnRight ? 'justify-end' : 'justify-start'}
            px-6 sm:px-10 md:px-16 lg:px-24
          `}
        >
          <div
            className={`
              max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg
              transition-all duration-700 ease-out
              ${
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : textOnRight
                    ? 'translate-x-16 opacity-0'
                    : '-translate-x-16 opacity-0'
              }
            `}
          >
            <h3 className="mb-2 font-serif text-2xl font-bold text-white drop-shadow-lg sm:text-3xl md:mb-3 md:text-4xl lg:text-5xl">
              {t(value.name as TranslationObject)}
            </h3>
            <p className="text-sm leading-relaxed text-white/90 drop-shadow-md sm:text-base md:text-lg lg:text-xl">
              {t(value.description as TranslationObject)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CoreValuesSection({ title, subtitle }: CoreValuesSectionProps) {
  const { t } = useLanguage()
  const [values, setValues] = useState<CoreValue[]>([])
  const [loaded, setLoaded] = useState(false)

  const fetchValues = useCallback(async () => {
    try {
      const res = await fetch('/api/core-values')
      if (!res.ok) throw new Error('Failed to fetch')
      const data: CoreValue[] = await res.json()
      const visible = data.filter((v) => !v.isHidden)
      setValues(visible.length > 0 ? visible : FALLBACK_VALUES)
    } catch {
      setValues(FALLBACK_VALUES)
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    fetchValues()
  }, [fetchValues])

  const heading = title
    ? t(title)
    : t({
        en: 'Our Core Values',
        bn: 'আমাদের মূল মূল্যবোধ',
        ar: 'قيمنا الأساسية',
      })

  const sub = subtitle
    ? t(subtitle)
    : t({
        en: 'The principles that guide everything we do',
        bn: 'যে নীতিগুলি আমরা যা করি তা পরিচালনা করে',
        ar: 'المبادئ التي توجه كل ما نقوم به',
      })

  if (!loaded) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <div className="mb-4 h-10 w-64 mx-auto animate-pulse rounded bg-muted" />
          <div className="mb-12 h-6 w-96 mx-auto animate-pulse rounded bg-muted" />
          <div className="space-y-0">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full animate-pulse bg-muted"
                style={{ aspectRatio: '20 / 7' }}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground lg:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {sub}
          </p>
        </div>
      </div>

      {/* Full-width stacked images – no gaps */}
      <div className="flex flex-col">
        {values.map((value, index) => (
          <CoreValueItem key={value._id} value={value} index={index} />
        ))}
      </div>
    </section>
  )
}
