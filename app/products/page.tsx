'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export default function ProductsPage() {
  const { t } = useLanguage()
  
  const products = [
    {
      name: t({ en: 'Zen Classic Black Tea', bn: 'জেন ক্লাসিক ব্ল্যাক টি', ar: 'شاي زن الأسود الكلاسيكي' }),
      slug: 'zen-classic-black-tea',
      tagline: t({ en: 'Garden-packed, robust black tea', bn: 'বাগান-প্যাক করা, শক্তিশালী কালো চা', ar: 'شاي أسود قوي معبأ من الحديقة' }),
      description: t({ 
        en: 'Crafted with the meticulous "two leaves and a bud" plucking technique, reflecting the timeless skill of our tea artisans. This legacy passed down from mothers to daughters ensures only the finest leaves are included in our blend.', 
        bn: 'আমাদের চা শিল্পীদের নিরবধি দক্ষতা প্রতিফলিত করে সতর্কতার সাথে "দুটি পাতা এবং একটি কুঁড়ি" তোলা কৌশল দিয়ে তৈরি। এই উত্তরাধিকার মা থেকে মেয়ে পর্যন্ত হস্তান্তরিত হয়েছে যা নিশ্চিত করে যে কেবল সেরা পাতাগুলি আমাদের মিশ্রণে অন্তর্ভুক্ত করা হয়েছে।', 
        ar: 'مصنوع بتقنية القطف الدقيقة "ورقتان وبرعم"، مما يعكس المهارة الخالدة لحرفيي الشاي لدينا. هذا الإرث المتوارث من الأمهات إلى البنات يضمن تضمين أفضل الأوراق فقط في مزيجنا.' 
      }),
      features: [
        t({ en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' }),
        t({ en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' }),
        t({ en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' }),
        t({ en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' }),
        t({ en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' }),
      ],
      focus: t({ en: 'Traditional flavor, local familiarity', bn: 'ঐতিহ্যবাহী স্বাদ, স্থানীয় পরিচিতি', ar: 'نكهة تقليدية، ألفة محلية' }),
      image: '/placeholder.svg?height=600&width=600',
    },
    {
      name: t({ en: 'Zen Premium Blend Tea', bn: 'জেন প্রিমিয়াম ব্লেন্ড টি', ar: 'شاي زن الممتاز المخلوط' }),
      slug: 'zen-premium-blend-tea',
      tagline: t({ en: 'Curated from top-tier tea gardens', bn: 'শীর্ষ-স্তরের চা বাগান থেকে সংগৃহীত', ar: 'منسقة من أفضل حدائق الشاي' }),
      description: t({ 
        en: 'Crafted from the finest tea leaves sourced from the top tea gardens in Sylhet, Sreemangal and Panchagarh of Bangladesh. This tea is entirely chemical-free and will invigorate you with its natural color, taste, and aroma.', 
        bn: 'বাংলাদেশের সিলেট, শ্রীমঙ্গল এবং পঞ্চগড়ের শীর্ষ চা বাগান থেকে সংগৃহীত সেরা চা পাতা থেকে তৈরি। এই চা সম্পূর্ণ রাসায়নিক-মুক্ত এবং এর প্রাকৃতিক রঙ, স্বাদ এবং সুগন্ধ দিয়ে আপনাকে উজ্জীবিত করবে।', 
        ar: 'مصنوع من أفضل أوراق الشاي من أفضل حدائق الشاي في سيلهت وسريمانغال وبانشاغار في بنغلاديش. هذا الشاي خالٍ تمامًا من المواد الكيميائية وسينشطك بلونه وطعمه ورائحته الطبيعية.' 
      }),
      features: [
        t({ en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' }),
        t({ en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' }),
        t({ en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' }),
        t({ en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' }),
        t({ en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' }),
      ],
      focus: t({ en: 'Balance of strength and aroma', bn: 'শক্তি এবং সুগন্ধের ভারসাম্য', ar: 'توازن القوة والرائحة' }),
      image: '/placeholder.svg?height=600&width=600',
    },
    {
      name: t({ en: 'Zen Royal Gold Tea', bn: 'জেন রয়েল গোল্ড টি', ar: 'شاي زن الذهبي الملكي' }),
      slug: 'zen-royal-gold-tea',
      tagline: t({ en: 'Strong liquor, luxury richness', bn: 'শক্তিশালী তরল, বিলাসবহুল সমৃদ্ধি', ar: 'سائل قوي، ثراء فاخر' }),
      description: t({ 
        en: 'More than just a tea; it represents a connection to the land and generations of tea pluckers who have cultivated it. Embodies the rich cultural heritage of Bangladesh with the taste of home and the essence of tradition.', 
        bn: 'শুধু একটি চা নয়; এটি ভূমি এবং চা তোলা প্রজন্মের সাথে একটি সংযোগ প্রতিনিধিত্ব করে যারা এটি চাষ করেছে। বাংলাদেশের সমৃদ্ধ সাংস্কৃতিক ঐতিহ্য মূর্ত করে ঘরের স্বাদ এবং ঐতিহ্যের সারাংশ সহ।', 
        ar: 'أكثر من مجرد شاي؛ إنه يمثل اتصالاً بالأرض وأجيال من قاطفي الشاي الذين زرعوه. يجسد التراث الثقافي الغني لبنغلاديش بطعم المنزل وجوهر التقاليد.' 
      }),
      features: [
        t({ en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' }),
        t({ en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' }),
        t({ en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' }),
        t({ en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' }),
        t({ en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' }),
      ],
      focus: t({ en: 'High energy, luxury, everyday richness', bn: 'উচ্চ শক্তি, বিলাসিতা, দৈনন্দিন সমৃদ্ধি', ar: 'طاقة عالية، رفاهية، ثراء يومي' }),
      image: '/placeholder.svg?height=600&width=600',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 font-serif text-5xl font-bold lg:text-6xl">
              {t({ en: 'Our Product Collection', bn: 'আমাদের পণ্য সংগ্রহ', ar: 'مجموعة منتجاتنا' })}
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              {t({ 
                en: 'Three distinctive blends crafted from Bangladesh\'s finest tea gardens, each offering a unique taste experience for wholesale partners and tea lovers worldwide.', 
                bn: 'বাংলাদেশের সেরা চা বাগান থেকে তৈরি তিনটি স্বতন্ত্র মিশ্রণ, প্রতিটি পাইকারি অংশীদার এবং বিশ্বব্যাপী চা প্রেমীদের জন্য একটি অনন্য স্বাদ অভিজ্ঞতা প্রদান করে।', 
                ar: 'ثلاث خلطات مميزة مصنوعة من أفضل حدائق الشاي في بنغلاديش، كل منها يقدم تجربة طعم فريدة لشركاء الجملة وعشاق الشاي في جميع أنحاء العالم.' 
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-20">
            {products.map((product, index) => (
              <div
                key={product.slug}
                className={`grid gap-12 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="mb-4 inline-block rounded-full bg-accent px-4 py-1 text-sm font-semibold text-primary-dark">
                    {product.focus}
                  </div>
                  <h2 className="mb-4 font-serif text-4xl font-bold text-foreground">
                    {product.name}
                  </h2>
                  <p className="mb-2 text-xl font-medium text-primary">
                    {product.tagline}
                  </p>
                  <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  
                  <div className="mb-8 space-y-2">
                    <h3 className="font-semibold text-foreground">{t({ en: 'Key Features:', bn: 'মূল বৈশিষ্ট্য:', ar: 'الميزات الرئيسية:' })}</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    {t({ en: 'View Details', bn: 'বিস্তারিত দেখুন', ar: 'عرض التفاصيل' })} <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="overflow-hidden rounded-lg shadow-2xl">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B CTA Section */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground">
            {t({ en: 'Interested in Wholesale Partnership?', bn: 'পাইকারি অংশীদারিত্বে আগ্রহী?', ar: 'مهتم بشراكة الجملة؟' })}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            {t({ 
              en: 'Join our network of dealers and retailers. Contact us to discuss wholesale pricing, minimum order quantities, and partnership opportunities.', 
              bn: 'আমাদের ডিলার এবং খুচরা বিক্রেতাদের নেটওয়ার্কে যোগ দিন। পাইকারি মূল্য, ন্যূনতম অর্ডার পরিমাণ এবং অংশীদারিত্বের সুযোগ নিয়ে আলোচনা করতে আমাদের সাথে যোগাযোগ করুন।', 
              ar: 'انضم إلى شبكة التجار وتجار التجزئة لدينا. اتصل بنا لمناقشة أسعار الجملة والحد الأدنى لكميات الطلب وفرص الشراكة.' 
            })}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="tel:08801711633202"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {t({ en: 'Call: 088 01711-633202', bn: 'কল করুন: 088 01711-633202', ar: 'اتصل: 088 01711-633202' })}
            </a>
            <a
              href="mailto:zenteabd@gmail.com"
              className="inline-flex items-center gap-2 rounded-md border-2 border-primary bg-transparent px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {t({ en: 'Email Us', bn: 'আমাদের ইমেল করুন', ar: 'راسلنا عبر البريد الإلكتروني' })}
            </a>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-lg bg-primary-dark p-12 text-white">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 font-serif text-3xl font-bold">
                {t({ en: 'Quality Guarantee', bn: 'গুণমান গ্যারান্টি', ar: 'ضمان الجودة' })}
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-white/90">
                {t({ 
                  en: 'All Zen Tea products are 100% Halal, chemical-free, and sourced from certified tea gardens. Each package comes with a 24-month shelf life from packing date when stored in cool, dry conditions.', 
                  bn: 'সমস্ত জেন টি পণ্য 100% হালাল, রাসায়নিক-মুক্ত এবং প্রত্যয়িত চা বাগান থেকে সংগৃহীত। প্রতিটি প্যাকেজ ঠান্ডা, শুষ্ক অবস্থায় সংরক্ষিত হলে প্যাকিং তারিখ থেকে 24 মাসের শেল্ফ লাইফ সহ আসে।', 
                  ar: 'جميع منتجات شاي زن 100٪ حلال، خالية من المواد الكيميائية، ومن حدائق الشاي المعتمدة. كل عبوة لها مدة صلاحية 24 شهرًا من تاريخ التعبئة عند تخزينها في ظروف باردة وجافة.' 
                })}
              </p>
              <p className="text-white/80">
                {t({ en: 'Authentic Tea Traders • Jaljalpur, Sagardighi, Ghatail, Tangail', bn: 'অথেন্টিক টি ট্রেডার্স • জালজালপুর, সাগরদিঘি, ঘাটাইল, টাঙ্গাইল', ar: 'تجار الشاي الأصليون • جالجالبور، ساغارديغي، غاتايل، تانغايل' })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
