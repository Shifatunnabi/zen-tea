'use client'

import { useLanguage } from '@/lib/language-context'

export function BrandStatement() {
  const { t } = useLanguage()

  return (
    <section className="bg-accent py-16">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-primary-dark lg:text-4xl">
          {t({ 
            en: 'Honoring Tea Heritage, Purity, and Wellness',
            bn: 'চা ঐতিহ্য, বিশুদ্ধতা এবং সুস্থতার সম্মান',
            ar: 'تكريم تراث الشاي والنقاء والعافية'
          })}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-primary-dark/80">
          {t({ 
            en: 'To be the most trusted and cherished tea brand from Bangladesh, known globally for our commitment to quality and tradition',
            bn: 'বাংলাদেশ থেকে সবচেয়ে বিশ্বস্ত এবং প্রিয় চা ব্র্যান্ড হতে, বিশ্বব্যাপী মান এবং ঐতিহ্যের প্রতি আমাদের প্রতিশ্রুতির জন্য পরিচিত',
            ar: 'أن نكون العلامة التجارية للشاي الأكثر ثقة وعزيزة من بنغلاديش، المعروفة عالميًا بالتزامنا بالجودة والتقاليد'
          })}
        </p>
      </div>
    </section>
  )
}
