'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useEffect, useState } from 'react'

export function HeritageSection() {
  const { t } = useLanguage()
  const [heritage, setHeritage] = useState<any>(null)

  useEffect(() => {
    fetch('/api/heritage')
      .then(r => r.json())
      .then(data => setHeritage(data))
      .catch(() => {})
  }, [])

  const headline = heritage?.headline
    ? t(heritage.headline)
    : t({ en: 'A Legacy of Excellence', bn: 'উৎকর্ষের উত্তরাধিকার', ar: 'إرث من التميز' })

  const description = heritage?.description
    ? t(heritage.description)
    : t({
        en: "From the lush tea gardens of Sylhet, Sreemangal, and Panchagarh, we source only the finest leaves picked by skilled artisans whose wisdom has been passed down through generations.",
        bn: 'সিলেট, শ্রীমঙ্গল এবং পঞ্চগড়ের সবুজ চা বাগান থেকে, আমরা শুধুমাত্র দক্ষ কারিগরদের দ্বারা বাছাই করা সেরা পাতা সংগ্রহ করি।',
        ar: 'من حدائق الشاي الخضراء نحصل فقط على أفضل الأوراق.'
      })

  const videoUrl = heritage?.video || ''

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                className="w-full rounded-lg shadow-xl object-cover"
                style={{ aspectRatio: '1/1' }}
                poster="/placeholder.svg?height=600&width=600"
              />
            ) : (
              <div className="relative rounded-lg shadow-xl overflow-hidden bg-primary-dark" style={{ aspectRatio: '1/1' }}>
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Heritage video placeholder"
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <h2 className="mb-6 font-serif text-4xl font-bold text-foreground lg:text-5xl">
              {headline}
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              {t({
                en: 'Our commitment to traditional plucking methods ensures that every cup delivers the authentic taste of Bangladeshi tea culture.',
                bn: 'ঐতিহ্যবাহী তোলার পদ্ধতির প্রতি আমাদের প্রতিশ্রুতি নিশ্চিত করে যে প্রতিটি কাপ বাংলাদেশী চা সংস্কৃতির খাঁটি স্বাদ প্রদান করে।',
                ar: 'التزامنا بطرق القطف التقليدية يضمن أن كل كوب يقدم الطعم الأصيل لثقافة الشاي البنغلاديشية.'
              })}
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">
                {t({ en: 'Discover Our Story', bn: 'আমাদের গল্প আবিষ্কার করুন', ar: 'اكتشف قصتنا' })} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
