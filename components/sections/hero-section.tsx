'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-primary-dark">
      <div className="absolute inset-0">
        <img
          src="/placeholder.svg?height=800&width=1600"
          alt="Tea gardens"
          className="h-full w-full object-cover opacity-30"
        />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-white lg:text-7xl">
            {t({ 
              en: 'True Taste of Bangladesh',
              bn: 'বাংলাদেশের প্রকৃত স্বাদ',
              ar: 'الطعم الحقيقي لبنغلاديش'
            })}
          </h1>
          <p className="mb-8 text-xl leading-relaxed text-white/90 lg:text-2xl">
            {t({ 
              en: "Premium quality tea blends from Bangladesh's most iconic tea gardens. Combining tradition, authenticity, and innovation for B2B markets worldwide.",
              bn: 'বাংলাদেশের সবচেয়ে আইকনিক চা বাগান থেকে প্রিমিয়াম মানের চা মিশ্রণ। বিশ্বব্যাপী B2B বাজারের জন্য ঐতিহ্য, সত্যতা এবং উদ্ভাবনের সমন্বয়।',
              ar: 'خلطات الشاي عالية الجودة من أكثر حدائق الشاي شهرة في بنغلاديش. الجمع بين التقاليد والأصالة والابتكار لأسواق B2B في جميع أنحاء العالم.'
            })}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild className="bg-accent text-primary-dark hover:bg-accent/90">
              <Link href="/products">
                {t({ en: 'Explore Products', bn: 'পণ্য দেখুন', ar: 'استكشف المنتجات' })} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary-dark">
              <Link href="/about">{t({ en: 'Learn Our Story', bn: 'আমাদের গল্প জানুন', ar: 'تعرف على قصتنا' })}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
