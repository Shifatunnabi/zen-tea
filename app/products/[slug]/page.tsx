'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'

const getProductsData = (t: any) => ({
  'zen-classic-black-tea': {
    name: t({ en: 'Zen Classic Black Tea', bn: 'জেন ক্লাসিক ব্ল্যাক টি', ar: 'شاي زن الأسود الكلاسيكي' }),
    tagline: t({ en: 'Garden-packed, robust black tea', bn: 'বাগান-প্যাক করা, শক্তিশালী কালো চা', ar: 'شاي أسود قوي معبأ من الحديقة' }),
    description: t({ 
      en: 'Crafted with the meticulous "two leaves and a bud" plucking technique, Zen Classic Black Tea reflects the timeless skill of our tea artisans. Their wisdom resonates through the leaves, as they recognize the perfect moment to pluck. This legacy passed down from mothers to daughters ensures that only the finest leaves are included in our blend.', 
      bn: 'সতর্কতার সাথে "দুটি পাতা এবং একটি কুঁড়ি" তোলা কৌশল দিয়ে তৈরি, জেন ক্লাসিক ব্ল্যাক টি আমাদের চা শিল্পীদের নিরবধি দক্ষতা প্রতিফলিত করে।', 
      ar: 'مصنوع بتقنية القطف الدقيقة "ورقتان وبرعم"، يعكس شاي زن الأسود الكلاسيكي المهارة الخالدة لحرفيي الشاي لدينا.' 
    }),
    longDescription: t({ 
      en: 'The authenticity of Bangladesh in every cup: strength, flavor, color, and refreshment. This dedication, unity, and continuous mixing tradition ensures vibrant freshness in every sip.', 
      bn: 'প্রতিটি কাপে বাংলাদেশের সত্যতা: শক্তি, স্বাদ, রঙ এবং সতেজতা।', 
      ar: 'أصالة بنغلاديش في كل كوب: القوة والنكهة واللون والانتعاش.' 
    }),
    features: [
      t({ en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' }),
      t({ en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' }),
      t({ en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' }),
      t({ en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' }),
      t({ en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' }),
    ],
    specifications: [
      { label: t({ en: 'Product/Ingredient', bn: 'পণ্য/উপাদান', ar: 'المنتج/المكون' }), value: t({ en: 'Black Tea', bn: 'কালো চা', ar: 'شاي أسود' }) },
      { label: t({ en: 'Net Weight', bn: 'নেট ওজন', ar: 'الوزن الصافي' }), value: t({ en: '500 grams', bn: '500 গ্রাম', ar: '500 جرام' }) },
      { label: t({ en: 'Shelf Life', bn: 'শেল্ফ লাইফ', ar: 'مدة الصلاحية' }), value: t({ en: '24 months from packing date', bn: 'প্যাকিং তারিখ থেকে ২৪ মাস', ar: '24 شهرًا من تاريخ التعبئة' }) },
      { label: t({ en: 'Storage', bn: 'সংরক্ষণ', ar: 'التخزين' }), value: t({ en: 'Store in a cool and dry place', bn: 'ঠান্ডা এবং শুষ্ক জায়গায় সংরক্ষণ করুন', ar: 'يُحفظ في مكان بارد وجاف' }) },
      { label: t({ en: 'Origin', bn: 'উৎপত্তি', ar: 'الأصل' }), value: t({ en: 'Sylhet, Sreemangal, Panchagarh, Bangladesh', bn: 'সিলেট, শ্রীমঙ্গল, পঞ্চগড়, বাংলাদেশ', ar: 'سيلهت، سريمانغال، بانشاغار، بنغلاديش' }) },
      { label: t({ en: 'Certification', bn: 'সার্টিফিকেশন', ar: 'الشهادة' }), value: t({ en: '100% Halal Bangladeshi Product', bn: '100% হালাল বাংলাদেশী পণ্য', ar: '100٪ منتج بنغلاديشي حلال' }) },
    ],
    focus: t({ en: 'Traditional flavor, local familiarity', bn: 'ঐতিহ্যবাহী স্বাদ, স্থানীয় পরিচিতি', ar: 'نكهة تقليدية، ألفة محلية' }),
    image: '/placeholder.svg?height=800&width=800',
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
    ],
  },
  'zen-premium-blend-tea': {
    name: t({ en: 'Zen Premium Blend Tea', bn: 'জেন প্রিমিয়াম ব্লেন্ড টি', ar: 'شاي زن الممتاز المخلوط' }),
    tagline: t({ en: 'Curated from top-tier leaves', bn: 'শীর্ষ-স্তরের পাতা থেকে সংগৃহীত', ar: 'منسقة من أوراق من الدرجة الأولى' }),
    description: t({ 
      en: 'Crafted from the finest tea leaves sourced from the top tea gardens in Sylhet, Sreemangal and Panchagarh of Bangladesh. This tea is entirely chemical-free and will invigorate you with its natural color, taste, and aroma.', 
      bn: 'বাংলাদেশের সিলেট, শ্রীমঙ্গল এবং পঞ্চগড়ের শীর্ষ চা বাগান থেকে সংগৃহীত সেরা চা পাতা থেকে তৈরি।', 
      ar: 'مصنوع من أفضل أوراق الشاي من أفضل حدائق الشاي في سيلهت وسريمانغال وبانشاغار في بنغلاديش.' 
    }),
    longDescription: t({ 
      en: 'Selected from the best tea gardens, this premium blend offers the perfect balance of strength and aroma. Each leaf is carefully chosen to deliver a superior tea experience.', 
      bn: 'সেরা চা বাগান থেকে নির্বাচিত, এই প্রিমিয়াম মিশ্রণ শক্তি এবং সুগন্ধের নিখুঁত ভারসাম্য প্রদান করে।', 
      ar: 'مختارة من أفضل حدائق الشاي، يقدم هذا المزيج الممتاز التوازن المثالي بين القوة والرائحة.' 
    }),
    features: [
      t({ en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' }),
      t({ en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' }),
      t({ en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' }),
      t({ en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' }),
      t({ en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' }),
    ],
    specifications: [
      { label: t({ en: 'Product/Ingredient', bn: 'পণ্য/উপাদান', ar: 'المنتج/المكون' }), value: t({ en: 'Premium Black Tea Blend', bn: 'প্রিমিয়াম কালো চা মিশ্রণ', ar: 'خليط شاي أسود ممتاز' }) },
      { label: t({ en: 'Net Weight', bn: 'নেট ওজন', ar: 'الوزن الصافي' }), value: t({ en: '500 grams', bn: '500 গ্রাম', ar: '500 جرام' }) },
      { label: t({ en: 'Shelf Life', bn: 'শেল্ফ লাইফ', ar: 'مدة الصلاحية' }), value: t({ en: '24 months from packing date', bn: 'প্যাকিং তারিখ থেকে ২৪ মাস', ar: '24 شهرًا من تاريخ التعبئة' }) },
      { label: t({ en: 'Storage', bn: 'সংরক্ষণ', ar: 'التخزين' }), value: t({ en: 'Store in a cool and dry place', bn: 'ঠান্ডা এবং শুষ্ক জায়গায় সংরক্ষণ করুন', ar: 'يُحفظ في مكان بارد وجاف' }) },
      { label: t({ en: 'Origin', bn: 'উৎপত্তি', ar: 'الأصل' }), value: t({ en: 'Top gardens of Sylhet, Sreemangal & Panchagarh', bn: 'সিলেট, শ্রীমঙ্গল এবং পঞ্চগড়ের শীর্ষ বাগান', ar: 'أفضل حدائق سيلهت وسريمانغال وبانشاغار' }) },
      { label: t({ en: 'Certification', bn: 'সার্টিফিকেশন', ar: 'الشهادة' }), value: t({ en: '100% Halal, Chemical-free', bn: '100% হালাল, রাসায়নিক-মুক্ত', ar: '100٪ حلال، خالٍ من المواد الكيميائية' }) },
    ],
    focus: t({ en: 'Balance of strength and aroma', bn: 'শক্তি এবং সুগন্ধের ভারসাম্য', ar: 'توازن القوة والرائحة' }),
    image: '/placeholder.svg?height=800&width=800',
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
    ],
  },
  'zen-royal-gold-tea': {
    name: t({ en: 'Zen Royal Gold Tea', bn: 'জেন রয়েল গোল্ড টি', ar: 'شاي زن الذهبي الملكي' }),
    tagline: t({ en: 'Strong liquor, luxury richness', bn: 'শক্তিশালী তরল, বিলাসবহুল সমৃদ্ধি', ar: 'سائل قوي، ثراء فاخر' }),
    description: t({ 
      en: 'More than just a tea; it represents a connection to the land and generations of tea pluckers who have cultivated it as well as embodies the rich cultural heritage of Bangladesh. It is the taste of home, the essence of tradition, and the true flavor of Bangladeshi tea.', 
      bn: 'শুধু একটি চা নয়; এটি ভূমি এবং চা তোলা প্রজন্মের সাথে একটি সংযোগ প্রতিনিধিত্ব করে।', 
      ar: 'أكثر من مجرد شاي؛ إنه يمثل اتصالاً بالأرض وأجيال من قاطفي الشاي.' 
    }),
    longDescription: t({ 
      en: 'Not just a tea; it\'s a connection to the cultural relationship with the land and generations of tea artisans who have nurtured tea cultivation for ages. Authentic Tea embodies Bangladesh\'s cultural heritage, delivering the authentic taste of Bangladeshi tea in every cup.', 
      bn: 'শুধু একটি চা নয়; এটি ভূমির সাথে সাংস্কৃতিক সম্পর্ক এবং প্রজন্মের চা শিল্পীদের সাথে একটি সংযোগ।', 
      ar: 'ليس مجرد شاي؛ إنه اتصال بالعلاقة الثقافية مع الأرض وأجيال من حرفيي الشاي.' 
    }),
    features: [
      t({ en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' }),
      t({ en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' }),
      t({ en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' }),
      t({ en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' }),
      t({ en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' }),
    ],
    specifications: [
      { label: t({ en: 'Product/Ingredient', bn: 'পণ্য/উপাদান', ar: 'المنتج/المكون' }), value: t({ en: 'Royal Gold Black Tea', bn: 'রয়েল গোল্ড কালো চা', ar: 'شاي أسود ذهبي ملكي' }) },
      { label: t({ en: 'Net Weight', bn: 'নেট ওজন', ar: 'الوزن الصافي' }), value: t({ en: '500 grams', bn: '500 গ্রাম', ar: '500 جرام' }) },
      { label: t({ en: 'Shelf Life', bn: 'শেল্ফ লাইফ', ar: 'مدة الصلاحية' }), value: t({ en: '24 months from packing date', bn: 'প্যাকিং তারিখ থেকে ২৪ মাস', ar: '24 شهرًا من تاريخ التعبئة' }) },
      { label: t({ en: 'Storage', bn: 'সংরক্ষণ', ar: 'التخزين' }), value: t({ en: 'Store in a cool and dry place', bn: 'ঠান্ডা এবং শুষ্ক জায়গায় সংরক্ষণ করুন', ar: 'يُحفظ في مكان بارد وجاف' }) },
      { label: t({ en: 'Origin', bn: 'উৎপত্তি', ar: 'الأصل' }), value: t({ en: 'Premium estates of Bangladesh', bn: 'বাংলাদেশের প্রিমিয়াম এস্টেট', ar: 'العقارات الممتازة في بنغلاديش' }) },
      { label: t({ en: 'Certification', bn: 'সার্টিফিকেশন', ar: 'الشهادة' }), value: t({ en: '100% Halal Bangladeshi Product', bn: '100% হালাল বাংলাদেশী পণ্য', ar: '100٪ منتج بنغلاديشي حلال' }) },
    ],
    focus: t({ en: 'High energy, luxury, everyday richness', bn: 'উচ্চ শক্তি, বিলাসিতা, দৈনন্দিন সমৃদ্ধি', ar: 'طاقة عالية، رفاهية، ثراء يومي' }),
    image: '/placeholder.svg?height=800&width=800',
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
    ],
  },
})

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { t } = useLanguage()
  const productsData = getProductsData(t)
  const product = productsData[params.slug as keyof typeof productsData]

  if (!product) {
    notFound()
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t({ en: 'Back to Products', bn: 'পণ্যে ফিরে যান', ar: 'العودة إلى المنتجات' })}
          </Link>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Product Image */}
            <div>
              <div className="overflow-hidden rounded-lg bg-muted shadow-xl">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Thumbnail Gallery */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                {product.images.map((img, idx) => (
                  <div key={idx} className="overflow-hidden rounded-md border-2 border-border">
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} ${t({ en: 'view', bn: 'দেখুন', ar: 'عرض' })} ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4 inline-block rounded-full bg-accent px-4 py-1 text-sm font-semibold text-primary-dark">
                {product.focus}
              </div>
              <h1 className="mb-4 font-serif text-4xl font-bold text-foreground lg:text-5xl">
                {product.name}
              </h1>
              <p className="mb-6 text-xl font-medium text-primary">
                {product.tagline}
              </p>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <p className="mb-8 leading-relaxed text-muted-foreground">
                {product.longDescription}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
                  {t({ en: 'Key Features', bn: 'মূল বৈশিষ্ট্য', ar: 'الميزات الرئيسية' })}
                </h2>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="rounded-lg border-2 border-primary bg-primary/5 p-6">
                <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
                  {t({ en: 'Interested in Bulk Orders?', bn: 'বাল্ক অর্ডারে আগ্রহী?', ar: 'مهتم بالطلبات بالجملة؟' })}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t({ en: 'Contact us for wholesale pricing and partnership opportunities', bn: 'পাইকারি মূল্য এবং অংশীদারিত্বের সুযোগের জন্য আমাদের সাথে যোগাযোগ করুন', ar: 'اتصل بنا للحصول على أسعار الجملة وفرص الشراكة' })}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="flex-1">
                    <a href="tel:08801711633202">{t({ en: 'Call: 088 01711-633202', bn: 'কল: 088 01711-633202', ar: 'اتصل: 088 01711-633202' })}</a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <a href="mailto:zenteabd@gmail.com">{t({ en: 'Email Us', bn: 'ইমেল করুন', ar: 'راسلنا' })}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-8 font-serif text-3xl font-bold text-foreground">
            {t({ en: 'Product Specifications', bn: 'পণ্যের বিশেষ বৈশিষ্ট্য', ar: 'مواصفات المنتج' })}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.specifications.map((spec, idx) => (
              <div key={idx} className="rounded-lg bg-card p-6 shadow">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <Package className="h-5 w-5" />
                  <h3 className="font-semibold">{spec.label}</h3>
                </div>
                <p className="text-muted-foreground">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Guarantee */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
            {t({ en: 'Our Quality Promise', bn: 'আমাদের মানের প্রতিশ্রুতি', ar: 'وعد الجودة لدينا' })}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            {t({ 
              en: 'Every package of Zen Tea is carefully prepared to maintain the highest standards of quality, freshness, and authenticity. We are committed to delivering the true taste of Bangladesh in every cup.', 
              bn: 'জেন টি-এর প্রতিটি প্যাকেজ গুণমান, সতেজতা এবং সত্যতার সর্বোচ্চ মান বজায় রাখতে সাবধানে প্রস্তুত করা হয়।', 
              ar: 'يتم إعداد كل عبوة من شاي زن بعناية للحفاظ على أعلى معايير الجودة والنضارة والأصالة.' 
            })}
          </p>
          <div className="rounded-lg bg-primary p-8 text-white">
            <p className="text-lg font-medium">
              {t({ 
                en: '100% Halal • Chemical-Free • Ethically Sourced • 24-Month Shelf Life', 
                bn: '100% হালাল • রাসায়নিক-মুক্ত • নৈতিকভাবে সংগৃহীত • ২৪ মাসের শেল্ফ লাইফ', 
                ar: '100٪ حلال • خالٍ من المواد الكيميائية • مصدره أخلاقي • مدة صلاحية 24 شهرًا' 
              })}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
