'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { PartnershipCard, QualityGuaranteeCard } from '@/components/sections/partnership-cards'

interface MultiLang {
  en: string
  bn?: string
  ar?: string
}

interface Product {
  _id: string
  name: MultiLang
  slug: string
  photos: string[]
  thumbnailIndex: number
  taglineOne: MultiLang
  taglineTwo: MultiLang
  shortDetails: MultiLang
  description: MultiLang
  keyFeatures: MultiLang[]
  regularPrice: number
  sellingPrice: number
  unit: MultiLang
  isHidden: boolean
}

const staticProducts: Product[] = [
  {
    _id: '1',
    name: { en: 'Zen Classic Black Tea', bn: 'জেন ক্লাসিক ব্ল্যাক টি', ar: 'شاي زن الأسود الكلاسيكي' },
    slug: 'zen-classic-black-tea',
    photos: ['/placeholder.svg?height=600&width=600'],
    thumbnailIndex: 0,
    taglineOne: { en: 'Garden-packed, robust black tea', bn: 'বাগান-প্যাক করা, শক্তিশালী কালো চা', ar: 'شاي أسود قوي معبأ من الحديقة' },
    taglineTwo: { en: 'Traditional flavor, local familiarity', bn: 'ঐতিহ্যবাহী স্বাদ, স্থানীয় পরিচিতি', ar: 'نكهة تقليدية، ألفة محلية' },
    shortDetails: {
      en: 'Crafted with the meticulous "two leaves and a bud" plucking technique, reflecting the timeless skill of our tea artisans. This legacy passed down from mothers to daughters ensures only the finest leaves are included in our blend.',
      bn: 'আমাদের চা শিল্পীদের নিরবধি দক্ষতা প্রতিফলিত করে সতর্কতার সাথে "দুটি পাতা এবং একটি কুঁড়ি" তোলা কৌশল দিয়ে তৈরি।',
      ar: 'مصنوع بتقنية القطف الدقيقة "ورقتان وبرعم"، مما يعكس المهارة الخالدة لحرفيي الشاي لدينا.'
    },
    description: { en: '', bn: '', ar: '' },
    keyFeatures: [
      { en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' },
      { en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' },
      { en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' },
      { en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' },
      { en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' },
    ],
    regularPrice: 0,
    sellingPrice: 0,
    unit: { en: '', bn: '', ar: '' },
    isHidden: false,
  },
  {
    _id: '2',
    name: { en: 'Zen Premium Blend Tea', bn: 'জেন প্রিমিয়াম ব্লেন্ড টি', ar: 'شاي زن الممتاز المخلوط' },
    slug: 'zen-premium-blend-tea',
    photos: ['/placeholder.svg?height=600&width=600'],
    thumbnailIndex: 0,
    taglineOne: { en: 'Curated from top-tier tea gardens', bn: 'শীর্ষ-স্তরের চা বাগান থেকে সংগৃহীত', ar: 'منسقة من أفضل حدائق الشاي' },
    taglineTwo: { en: 'Balance of strength and aroma', bn: 'শক্তি এবং সুগন্ধের ভারসাম্য', ar: 'توازن القوة والرائحة' },
    shortDetails: {
      en: 'Crafted from the finest tea leaves sourced from the top tea gardens in Sylhet, Sreemangal and Panchagarh of Bangladesh. This tea is entirely chemical-free and will invigorate you with its natural color, taste, and aroma.',
      bn: 'বাংলাদেশের সিলেট, শ্রীমঙ্গল এবং পঞ্চগড়ের শীর্ষ চা বাগান থেকে সংগৃহীত সেরা চা পাতা থেকে তৈরি।',
      ar: 'مصنوع من أفضل أوراق الشاي من أفضل حدائق الشاي في سيلهت وسريمانغال وبانشاغار في بنغلاديش.'
    },
    description: { en: '', bn: '', ar: '' },
    keyFeatures: [
      { en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' },
      { en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' },
      { en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' },
      { en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' },
      { en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' },
    ],
    regularPrice: 0,
    sellingPrice: 0,
    unit: { en: '', bn: '', ar: '' },
    isHidden: false,
  },
  {
    _id: '3',
    name: { en: 'Zen Royal Gold Tea', bn: 'জেন রয়েল গোল্ড টি', ar: 'شاي زن الذهبي الملكي' },
    slug: 'zen-royal-gold-tea',
    photos: ['/placeholder.svg?height=600&width=600'],
    thumbnailIndex: 0,
    taglineOne: { en: 'Strong liquor, luxury richness', bn: 'শক্তিশালী তরল, বিলাসবহুল সমৃদ্ধি', ar: 'سائل قوي، ثراء فاخر' },
    taglineTwo: { en: 'High energy, luxury, everyday richness', bn: 'উচ্চ শক্তি, বিলাসিতা, দৈনন্দিন সমৃদ্ধি', ar: 'طاقة عالية، رفاهية، ثراء يومي' },
    shortDetails: {
      en: 'More than just a tea; it represents a connection to the land and generations of tea pluckers who have cultivated it. Embodies the rich cultural heritage of Bangladesh with the taste of home and the essence of tradition.',
      bn: 'শুধু একটি চা নয়; এটি ভূমি এবং চা তোলা প্রজন্মের সাথে একটি সংযোগ প্রতিনিধিত্ব করে।',
      ar: 'أكثر من مجرد شاي؛ إنه يمثل اتصالاً بالأرض وأجيال من قاطفي الشاي الذين زرعوه.'
    },
    description: { en: '', bn: '', ar: '' },
    keyFeatures: [
      { en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' },
      { en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' },
      { en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' },
      { en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' },
      { en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' },
    ],
    regularPrice: 0,
    sellingPrice: 0,
    unit: { en: '', bn: '', ar: '' },
    isHidden: false,
  },
]

export default function ProductsPage() {
  const { t, language } = useLanguage()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products')
        if (!res.ok) throw new Error('Failed to fetch')
        const data: Product[] = await res.json()
        const visible = data.filter((p) => !p.isHidden)
        setProducts(visible.length > 0 ? visible : staticProducts)
      } catch {
        setProducts(staticProducts)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <>
      {/* Hero Section */}

            <section className="relative overflow-hidden bg-primary-dark py-20 text-white lg:py-32">
        <div className="absolute inset-0">
          <img
            src="/hero_bg.jpg?height=800&width=1600"
            alt={t({ en: 'Our heritage', bn: 'আমাদের ঐতিহ্য', ar: 'تراثنا' })}
            className="h-full w-full object-cover opacity-50"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h1 className="mb-6 font-serif text-2xl sm:text-4xl lg:text-6xl font-bold">
              {t({ en: 'Our Products', bn: 'আমাদের পণ্যসমুহ', ar: 'مجموعة منتجاتنا' })}
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              {t({
                en: "Three distinctive blends crafted from Bangladesh's finest tea gardens, each offering a unique taste experience for wholesale partners and tea lovers worldwide.",
                bn: 'বাংলাদেশের সেরা চা বাগান থেকে তৈরি তিনটি স্বতন্ত্র মিশ্রণ, প্রতিটি পাইকারি অংশীদার এবং বিশ্বব্যাপী চা প্রেমীদের জন্য একটি অনন্য স্বাদ অভিজ্ঞতা প্রদান করে।',
                ar: 'ثلاث خلطات مميزة مصنوعة من أفضل حدائق الشاي في بنغلاديش، كل منها يقدم تجربة طعم فريدة لشركاء الجملة وعشاق الشاي في جميع أنحاء العالم.',
              })}
            </p>
        </div>
      </section>



      {/* Products Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-20">
              {products.map((product, index) => {
                const thumbnailSrc =
                  product.photos && product.photos.length > 0
                    ? product.photos[product.thumbnailIndex ?? 0] || product.photos[0]
                    : '/placeholder.svg?height=600&width=600'
                const hoverSrc =
                  product.photos && product.photos.length > 1
                    ? product.photos[1]
                    : thumbnailSrc

                return (
                  <div
                    key={product._id || product.slug}
                    className={`grid gap-12 lg:grid-cols-2 lg:items-center ${
                      index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                    }`}
                  >
                    {/* Text Content */}
                    <div className={`order-last lg:order-none ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      {t(product.taglineTwo) && (
                        <div className="mb-4 inline-block rounded-full bg-accent px-4 py-1 text-sm font-semibold text-primary-dark">
                          {t(product.taglineTwo)}
                        </div>
                      )}
                      <h2 className="mb-4 font-serif text-xl sm:text-2xl lg:text-4xl font-bold text-foreground">
                        {t(product.name)}
                      </h2>
                      {t(product.taglineOne) && (
                        <p className="mb-2 text-xl font-medium text-primary">
                          {t(product.taglineOne)}
                        </p>
                      )}
                      <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                        {t(product.shortDetails) || t(product.description)}
                      </p>

                      {product.keyFeatures && product.keyFeatures.length > 0 && (
                        <div className="mb-8 space-y-2">
                          <h3 className="font-semibold text-foreground">
                            {t({ en: 'Key Features:', bn: 'মূল বৈশিষ্ট্য:', ar: 'الميزات الرئيسية:' })}
                          </h3>
                          <ul className="space-y-2">
                            {product.keyFeatures.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <span>{t(feature)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
                      >
                        {t({ en: 'View Details', bn: 'বিস্তারিত দেখুন', ar: 'عرض التفاصيل' })}{' '}
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>

                    {/* Image */}
                    <div className={`order-first lg:order-none ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <Link href={`/products/${product.slug}`} className="block">
                        <div className="group relative overflow-hidden rounded-lg shadow-2xl">
                          <img
                            src={thumbnailSrc}
                            alt={t(product.name)}
                            className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                          />
                          <img
                            src={hoverSrc}
                            alt={t(product.name)}
                            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Partnership & Quality Cards */}
      <section className="space-y-8 py-20 bg-muted">
        <PartnershipCard />
      </section>

      <section className="space-y-8 py-20">
        <QualityGuaranteeCard />
      </section>
    </>
  )
}
