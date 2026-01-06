'use client'

import { useLanguage } from '@/lib/language-context'
import { ProductCard } from '@/components/product-card'

export function ProductShowcase() {
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

  return (
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
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
