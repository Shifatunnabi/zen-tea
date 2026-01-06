'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, Shield, Globe, Award } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export default function HomePage() {
  const { t } = useLanguage()

  const products = [
    {
      name: t({ 
        en: 'Zen Classic Black Tea',
        bn: 'জেন ক্লাসিক ব্ল্যাক টি',
        ar: 'زن شاي أسود كلاسيكي'
      }),
      description: t({ 
        en: 'Crafted with the meticulous "two leaves and a bud" plucking technique',
        bn: 'দুটি পাতা এবং একটি কুঁড়ি তোলার সূক্ষ্ম কৌশলে তৈরি',
        ar: 'مصنوع بتقنية قطف "ورقتين وبرعم" الدقيقة'
      }),
      image: '/placeholder.svg?height=400&width=400',
      slug: 'zen-classic-black-tea',
    },
    {
      name: t({ 
        en: 'Zen Premium Blend Tea',
        bn: 'জেন প্রিমিয়াম ব্লেন্ড টি',
        ar: 'زن شاي ممتاز مخلوط'
      }),
      description: t({ 
        en: 'Curated from top-tier leaves of Sylhet, Sreemangal & Panchagarh',
        bn: 'সিলেট, শ্রীমঙ্গল ও পঞ্চগড়ের সেরা পাতা থেকে নির্বাচিত',
        ar: 'منتقى من أوراق من الدرجة الأولى من سيلهيت وسريمانجال وبانشاغار'
      }),
      image: '/placeholder.svg?height=400&width=400',
      slug: 'zen-premium-blend-tea',
    },
    {
      name: t({ 
        en: 'Zen Royal Gold Tea',
        bn: 'জেন রয়াল গোল্ড টি',
        ar: 'زن شاي رويال ذهبي'
      }),
      description: t({ 
        en: 'Strong liquor, perfect for milk tea lovers with luxury richness',
        bn: 'শক্তিশালী লিকার, দুধ চা প্রেমীদের জন্য বিলাসবহুল সমৃদ্ধি',
        ar: 'سائل قوي، مثالي لمحبي شاي الحليب بغنى فاخر'
      }),
      image: '/placeholder.svg?height=400&width=400',
      slug: 'zen-royal-gold-tea',
    },
  ]

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
    <>
      {/* Hero Section */}
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

      {/* Brand Statement */}
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

      {/* Product Showcase */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-foreground lg:text-5xl">
              {t({ 
                en: 'Our Premium Product Lines',
                bn: 'আমাদের প্রিমিয়াম পণ্য লাইন',
                ar: 'خطوط منتجاتنا الفاخرة'
              })}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t({ 
                en: 'Three distinctive blends crafted for discerning tea lovers and wholesale partners',
                bn: 'বিচক্ষণ চা প্রেমী এবং পাইকারি অংশীদারদের জন্য তৈরি তিনটি স্বতন্ত্র মিশ্রণ',
                ar: 'ثلاث خلطات مميزة مصنوعة لمحبي الشاي المميزين وشركاء الجملة'
              })}
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group relative overflow-hidden rounded-lg bg-card shadow-lg transition-all hover:shadow-xl"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary font-semibold group-hover:underline">
                    {t({ en: 'Learn More', bn: 'আরও জানুন', ar: 'اعرف المزيد' })} <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B CTA Section */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="mb-4 font-serif text-4xl font-bold lg:text-5xl">
            {t({ 
              en: 'Partner With Zen Tea',
              bn: 'জেন টি-র সাথে অংশীদার হন',
              ar: 'كن شريكًا مع زن تي'
            })}
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-white/90">
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

      {/* Tea Heritage Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Tea heritage"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="mb-6 font-serif text-4xl font-bold text-foreground lg:text-5xl">
                {t({ 
                  en: 'A Legacy of Excellence',
                  bn: 'উৎকর্ষের উত্তরাধিকার',
                  ar: 'إرث من التميز'
                })}
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                {t({ 
                  en: "From the lush tea gardens of Sylhet, Sreemangal, and Panchagarh, we source only the finest leaves picked by skilled artisans whose wisdom has been passed down through generations.",
                  bn: 'সিলেট, শ্রীমঙ্গল এবং পঞ্চগড়ের সবুজ চা বাগান থেকে, আমরা শুধুমাত্র দক্ষ কারিগরদের দ্বারা বাছাই করা সেরা পাতা সংগ্রহ করি যাদের জ্ঞান প্রজন্মের মাধ্যমে প্রবাহিত হয়েছে।',
                  ar: 'من حدائق الشاي الخضراء في سيلهيت وسريمانجال وبانشاغار، نحصل فقط على أفضل الأوراق التي يتم اختيارها من قبل حرفيين ماهرين الذين تم تمرير حكمتهم عبر الأجيال.'
                })}
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
    </>
  )
}
