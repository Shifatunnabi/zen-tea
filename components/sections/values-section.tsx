'use client'

import { Leaf, Shield, Globe, Award } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { ValueCard } from '@/components/value-card'

export function ValuesSection() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Leaf,
      title: t({ en: 'Authenticity', bn: 'সত্যতা', ar: 'الأصالة' }),
      description: t({ 
        en: 'Rooted in our land, our stories, and our traditional process',
        bn: 'আমাদের ভূমি, আমাদের গল্প এবং আমাদের ঐতিহ্যবাহী প্রক্রিয়ায় মূলবদ্ধ',
        ar: 'متجذر في أرضنا وقصصنا وعمليتنا التقليدية'
      }),
    },
    {
      icon: Shield,
      title: t({ en: 'Purity', bn: 'বিশুদ্ধতা', ar: 'النقاء' }),
      description: t({ 
        en: 'No compromise in quality, health, or sourcing standards',
        bn: 'মান, স্বাস্থ্য বা উৎসের মানদণ্ডে কোনো আপস নেই',
        ar: 'لا مساومة في معايير الجودة أو الصحة أو المصادر'
      }),
    },
    {
      icon: Globe,
      title: t({ en: 'Sustainability', bn: 'স্থায়িত্ব', ar: 'الاستدامة' }),
      description: t({ 
        en: 'Ethical practices in plucking, packaging, and supply chain',
        bn: 'তোলা, প্যাকেজিং এবং সরবরাহ শৃঙ্খলে নৈতিক অনুশীলন',
        ar: 'ممارسات أخلاقية في القطف والتعبئة وسلسلة التوريد'
      }),
    },
    {
      icon: Award,
      title: t({ en: 'Heritage', bn: 'ঐতিহ্য', ar: 'التراث' }),
      description: t({ 
        en: 'Celebrating timeless craftsmanship of Bangladeshi tea culture',
        bn: 'বাংলাদেশী চা সংস্কৃতির নিরন্তন কারুশিল্প উদযাপন',
        ar: 'الاحتفال بالحرفية الخالدة لثقافة الشاي البنغلاديشية'
      }),
    },
  ]

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground lg:text-5xl">
            {t({ 
              en: 'Our Core Values',
              bn: 'আমাদের মূল মূল্যবোধ',
              ar: 'قيمنا الأساسية'
            })}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t({ 
              en: 'The principles that guide everything we do',
              bn: 'যে নীতিগুলি আমরা যা করি তা পরিচালনা করে',
              ar: 'المبادئ التي توجه كل ما نقوم به'
            })}
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <ValueCard key={value.title} {...value} />
          ))}
        </div>
      </div>
    </section>
  )
}
