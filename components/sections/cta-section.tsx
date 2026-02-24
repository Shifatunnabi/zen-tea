'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="bg-primary py-20 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="mb-4 font-serif text-2xl sm:text-3xl lg:text-5xl font-bold">
          {t({ 
            en: 'Partner With Zen Tea',
            bn: 'জেন টি-র সাথে অংশীদার হন',
            ar: 'كن شريكًا مع زن تي'
          })}
        </h2>
        <p className="mb-8 text-sm sm:text-base lg:text-lg leading-relaxed text-white/90">
          {t({ 
            en: 'Join our network of international dealers, retailers, and distributors. Experience competitive wholesale pricing and authentic Bangladeshi tea quality.',
            bn: 'আমাদের আন্তর্জাতিক ডিলার, খুচরা বিক্রেতা এবং পরিবেশকদের নেটওয়ার্কে যোগ দিন। প্রতিযোগিতামূলক পাইকারি মূল্য এবং খাঁটি বাংলাদেশী চা মান অনুভব করুন।',
            ar: 'انضم إلى شبكتنا من التجار والموزعين الدوليين. استمتع بأسعار جملة تنافسية وجودة شاي بنغلاديشي أصيل.'
          })}
        </p>
        <Button size="lg" asChild className="bg-accent text-primary-dark hover:bg-accent/90">
          <Link href="/products">
            {t({ en: 'Become a Dealer', bn: 'ডিলার হন', ar: 'كن موزعًا' })} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
