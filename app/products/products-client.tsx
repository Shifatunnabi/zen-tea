'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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

export function ProductsPageClient({ products }: { products: Product[] }) {
  const { t } = useLanguage()

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-dark py-20 text-white lg:py-32">
        <div className="absolute inset-0">
          <Image
            src="/hero_bg.jpg"
            alt={t({ en: 'Our heritage', bn: 'আমাদের ঐতিহ্য', ar: 'تراثنا' })}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
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
                      <div className="group relative aspect-square overflow-hidden rounded-lg shadow-2xl">
                        <Image
                          src={thumbnailSrc}
                          alt={t(product.name)}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                        />
                        <Image
                          src={hoverSrc}
                          alt={t(product.name)}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
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
