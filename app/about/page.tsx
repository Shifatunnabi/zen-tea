'use client'

import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { CoreValuesSection } from '@/components/sections/core-values-section'
import { PartnershipCard, QualityGuaranteeCard } from '@/components/sections/partnership-cards'

interface MultiLang {
  en: string
  bn: string
  ar: string
}

interface Settings {
  visionText?: MultiLang
  missionText?: MultiLang
  artOfTeaPhoto?: string
  artOfTeaHeadline?: MultiLang
  artOfTeaDescription?: MultiLang
  artOfTeaFeatures?: MultiLang[]
}

const defaultVision: MultiLang = {
  en: 'To be the most trusted and cherished tea brand from Bangladesh, known globally for honoring tea heritage, purity, and wellness. We envision a world where every cup of Zen Tea connects people to the authentic taste and rich culture of Bangladeshi tea traditions.',
  bn: 'বাংলাদেশ থেকে সবচেয়ে বিশ্বস্ত এবং লালিত চা ব্র্যান্ড হওয়া, চা ঐতিহ্য, বিশুদ্ধতা এবং সুস্থতার জন্য বিশ্বব্যাপী পরিচিত। আমরা এমন একটি বিশ্বের কল্পনা করি যেখানে জেন টি-এর প্রতিটি কাপ মানুষকে বাংলাদেশী চা ঐতিহ্যের খাঁটি স্বাদ এবং সমৃদ্ধ সংস্কৃতির সাথে সংযুক্ত করে।',
  ar: 'أن نكون العلامة التجارية الأكثر موثوقية وعزيزة للشاي من بنغلاديش، معروفة عالميًا بتكريم تراث الشاي والنقاء والعافية.',
}

const defaultMission: MultiLang = {
  en: 'To offer premium-quality tea blends crafted from Bangladesh\'s most iconic tea gardens, combining tradition, authenticity, and innovation to enrich everyday life. We are committed to ethical sourcing and bringing the true taste of Bangladesh to the world.',
  bn: 'বাংলাদেশের সবচেয়ে আইকনিক চা বাগান থেকে তৈরি প্রিমিয়াম-মানের চা মিশ্রণ অফার করা, দৈনন্দিন জীবনকে সমৃদ্ধ করতে ঐতিহ্য, সত্যতা এবং উদ্ভাবন একত্রিত করা।',
  ar: 'تقديم خلطات شاي عالية الجودة من أشهر حدائق الشاي في بنغلاديش، والجمع بين التقاليد والأصالة والابتكار لإثراء الحياة اليومية.',
}

const defaultArtOfTeaHeadline: MultiLang = {
  en: 'The Art of Tea Making',
  bn: 'চা তৈরির শিল্প',
  ar: 'فن صنع الشاي',
}

const defaultArtOfTeaDescription: MultiLang = {
  en: 'Our tea is crafted using the traditional "two leaves and a bud" plucking technique—a method that has been perfected over generations. This careful selection ensures only the finest, most flavorful leaves make it into every package.\n\nThe wisdom of our tea artisans resonates through every leaf. They recognize the perfect moment to pluck, a skill passed down from mothers to daughters, ensuring that each cup delivers the authentic taste of Bangladesh.',
  bn: 'আমাদের চা ঐতিহ্যবাহী "দুটি পাতা এবং একটি কুঁড়ি" তোলা কৌশল ব্যবহার করে তৈরি করা হয়—একটি পদ্ধতি যা প্রজন্মের মধ্যে নিখুঁত হয়েছে।\n\nআমাদের চা শিল্পীদের প্রজ্ঞা প্রতিটি পাতার মাধ্যমে অনুরণিত হয়। তারা তোলার নিখুঁত মুহূর্ত চিনতে পারে, মা থেকে মেয়ে পর্যন্ত হস্তান্তরিত একটি দক্ষতা।',
  ar: 'يتم صنع شاينا باستخدام تقنية القطف التقليدية "ورقتان وبرعم" - وهي طريقة تم إتقانها على مدى أجيال.\n\nتتردد حكمة حرفيي الشاي لدينا من خلال كل ورقة. يتعرفون على اللحظة المثالية للقطف، وهي مهارة تنتقل من الأمهات إلى البنات.',
}

const defaultArtOfTeaFeatures: MultiLang[] = [
  { en: '100% Chemical-free and natural', bn: '১০০% রাসায়নিক-মুক্ত এবং প্রাকৃতিক', ar: '100٪ خالية من المواد الكيميائية وطبيعية' },
  { en: 'Sourced from Sylhet, Sreemangal & Panchagarh', bn: 'সিলেট, শ্রীমঙ্গল এবং পঞ্চগড় থেকে সংগৃহীত', ar: 'من سيلهيت وسريمانغال وبانشاغار' },
  { en: 'Traditional plucking methods preserved', bn: 'ঐতিহ্যবাহী তোলা পদ্ধতি সংরক্ষিত', ar: 'طرق القطف التقليدية المحفوظة' },
  { en: '24-month shelf life from packing date', bn: 'প্যাকিং তারিখ থেকে ২৪ মাসের শেল্ফ লাইফ', ar: 'مدة صلاحية 24 شهرًا من تاريخ التعبئة' },
]

export default function AboutPage() {
  const { t } = useLanguage()
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => setSettings(null))
  }, [])

  const visionText = settings?.visionText || defaultVision
  const missionText = settings?.missionText || defaultMission
  const artOfTeaPhoto = settings?.artOfTeaPhoto || '/placeholder.svg?height=600&width=800'
  const artOfTeaHeadline = settings?.artOfTeaHeadline || defaultArtOfTeaHeadline
  const artOfTeaDescription = settings?.artOfTeaDescription || defaultArtOfTeaDescription
  const artOfTeaFeatures = settings?.artOfTeaFeatures || defaultArtOfTeaFeatures

  const milestones = [
    {
      year: t({ en: 'Heritage', bn: 'ঐতিহ্য', ar: 'تراث' }),
      description: t({ en: 'Generations of tea expertise from Bangladesh\'s finest regions', bn: 'বাংলাদেশের সেরা অঞ্চল থেকে প্রজন্মের চা দক্ষতা', ar: 'أجيال من خبرة الشاي من أفضل مناطق بنغلاديش' }),
    },
    {
      year: t({ en: 'Tradition', bn: 'ঐতিহ্য', ar: 'التقليد' }),
      description: t({ en: 'Preserving authentic plucking and processing methods', bn: 'খাঁটি তোলা এবং প্রক্রিয়াকরণ পদ্ধতি সংরক্ষণ', ar: 'الحفاظ على طرق القطف والمعالجة الأصيلة' }),
    },
    {
      year: t({ en: 'Innovation', bn: 'উদ্ভাবন', ar: 'ابتكار' }),
      description: t({ en: 'Modern quality control with traditional craftsmanship', bn: 'ঐতিহ্যবাহী কারুশিল্পের সাথে আধুনিক মান নিয়ন্ত্রণ', ar: 'مراقبة الجودة الحديثة مع الحرفية التقليدية' }),
    },
    {
      year: t({ en: 'Global Reach', bn: 'বৈশ্বিক পৌঁছান', ar: 'الوصول العالمي' }),
      description: t({ en: 'Serving B2B partners across international markets', bn: 'আন্তর্জাতিক বাজার জুড়ে B2B অংশীদারদের সেবা প্রদান', ar: 'خدمة شركاء B2B عبر الأسواق الدولية' }),
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-dark py-20 text-white lg:py-32">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=800&width=1600"
            alt={t({ en: 'Our heritage', bn: 'আমাদের ঐতিহ্য', ar: 'تراثنا' })}
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="mb-6 font-serif text-5xl font-bold lg:text-6xl">
            {t({ en: 'Our Story', bn: 'আমাদের গল্প', ar: 'قصتنا' })}
          </h1>
          <p className="text-xl leading-relaxed text-white/90 lg:text-2xl">
            {t({ en: 'Rooted in tradition, driven by excellence', bn: 'ঐতিহ্যে শিকড়, শ্রেষ্ঠত্ব দ্বারা চালিত', ar: 'متجذرة في التقاليد، مدفوعة بالتميز' })}
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-lg bg-muted p-8">
              <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                {t({ en: 'Our Vision', bn: 'আমাদের দৃষ্টিভঙ্গি', ar: 'رؤيتنا' })}
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t(visionText)}
              </p>
            </div>
            <div className="rounded-lg bg-primary p-8 text-white">
              <h2 className="mb-4 font-serif text-3xl font-bold">
                {t({ en: 'Our Mission', bn: 'আমাদের মিশন', ar: 'مهمتنا' })}
              </h2>
              <p className="text-lg leading-relaxed text-white/90">
                {t(missionText)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <CoreValuesSection />

      {/* Our Journey / Timeline */}
      <section className="bg-primary-dark py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold">
              {t({ en: 'Our Journey', bn: 'আমাদের যাত্রা', ar: 'رحلتنا' })}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/80">
              {t({ en: 'From traditional roots to global recognition', bn: 'ঐতিহ্যবাহী শিকড় থেকে বিশ্বব্যাপী স্বীকৃতি', ar: 'من الجذور التقليدية إلى الاعتراف العالمي' })}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 text-4xl font-bold text-accent">
                  {milestone.year}
                </div>
                <p className="leading-relaxed text-white/80">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-foreground">
              {t({ en: 'Who We Serve', bn: 'আমরা কাদের সেবা করি', ar: 'من نخدم' })}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t({ en: 'Bringing authentic Bangladeshi tea to diverse markets', bn: 'বিভিন্ন বাজারে খাঁটি বাংলাদেশী চা নিয়ে আসা', ar: 'جلب الشاي البنغلاديشي الأصيل إلى أسواق متنوعة' })}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
                {t({ en: 'B2B Partners', bn: 'B2B অংশীদার', ar: 'شركاء B2B' })}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {t({ en: 'Dealers, retailers, tea stalls, and general stores looking for premium wholesale tea supplies', bn: 'ডিলার, খুচরা বিক্রেতা, চায়ের স্টল এবং সাধারণ দোকানগুলি প্রিমিয়াম পাইকারি চা সরবরাহের সন্ধান করছে', ar: 'التجار وتجار التجزئة وأكشاك الشاي والمتاجر العامة التي تبحث عن إمدادات الشاي بالجملة المتميزة' })}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
                {t({ en: 'B2C Customers', bn: 'B2C গ্রাহক', ar: 'عملاء B2C' })}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {t({ en: 'Families, millennials, and wellness-conscious individuals seeking authentic tea experiences', bn: 'পরিবার, সহস্রাব্দ এবং সুস্থতা-সচেতন ব্যক্তিরা খাঁটি চায়ের অভিজ্ঞতা খুঁজছেন', ar: 'العائلات وجيل الألفية والأفراد المهتمين بالصحة الذين يبحثون عن تجارب الشاي الأصيلة' })}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <h3 className="mb-3 font-serif text-2xl font-bold text-foreground">
                {t({ en: 'International Markets', bn: 'আন্তর্জাতিক বাজার', ar: 'الأسواق الدولية' })}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {t({ en: 'Exporters, international buyers, and diaspora consumers worldwide', bn: 'রপ্তানিকারক, আন্তর্জাতিক ক্রেতা এবং বিশ্বব্যাপী প্রবাসী ভোক্তারা', ar: 'المصدرون والمشترون الدوليون ومستهلكو الشتات في جميع أنحاء العالم' })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Art of Making Tea */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <h2 className="mb-6 font-serif text-4xl font-bold text-foreground">
                {t(artOfTeaHeadline)}
              </h2>
              {t(artOfTeaDescription)
                .split('\n\n')
                .map((paragraph, i) => (
                  <p key={i} className="mb-4 text-lg leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}

              <div className="mt-6 space-y-3">
                {artOfTeaFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-muted-foreground">{t(feature)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={artOfTeaPhoto}
                alt={t({ en: 'Tea making process', bn: 'চা তৈরির প্রক্রিয়া', ar: 'عملية صنع الشاي' })}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership & Quality Guarantee */}
      <section className="py-20 space-y-8 bg-muted">
        <PartnershipCard />
        <QualityGuaranteeCard />
      </section>
    </>
  )
}
