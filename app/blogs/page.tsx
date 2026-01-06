'use client'

import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export default function BlogsPage() {
  const { t } = useLanguage()
  
  const blogPosts = [
    {
      slug: 'health-benefits-black-tea',
      title: t({ 
        en: 'The Health Benefits of Black Tea: Why It\'s Good for You', 
        bn: 'কালো চায়ের স্বাস্থ্য উপকারিতা: কেন এটি আপনার জন্য ভাল', 
        ar: 'الفوائد الصحية للشاي الأسود: لماذا هو جيد لك' 
      }),
      excerpt: t({ 
        en: 'Discover the science-backed health benefits of black tea, from antioxidants to heart health and mental clarity.', 
        bn: 'অ্যান্টিঅক্সিড্যান্ট থেকে হৃদযন্ত্রের স্বাস্থ্য এবং মানসিক স্বচ্ছতা পর্যন্ত কালো চায়ের বিজ্ঞান-সমর্থিত স্বাস্থ্য উপকারিতা আবিষ্কার করুন।', 
        ar: 'اكتشف الفوائد الصحية للشاي الأسود المدعومة بالعلم، من مضادات الأكسدة إلى صحة القلب والوضوح العقلي.' 
      }),
      image: '/placeholder.svg?height=400&width=600',
      date: '2024-01-15',
      readTime: t({ en: '5 min read', bn: '৫ মিনিট পড়া', ar: '5 دقائق قراءة' }),
      category: t({ en: 'Health & Wellness', bn: 'স্বাস্থ্য ও সুস্থতা', ar: 'الصحة والعافية' }),
    },
    {
      slug: 'bangladesh-tea-heritage',
      title: t({ 
        en: 'The Rich Heritage of Bangladeshi Tea Gardens', 
        bn: 'বাংলাদেশী চা বাগানের সমৃদ্ধ ঐতিহ্য', 
        ar: 'التراث الغني لحدائق الشاي البنغلاديشية' 
      }),
      excerpt: t({ 
        en: 'Journey through the lush tea estates of Sylhet, Sreemangal, and Panchagarh—the heartland of Bangladesh\'s tea culture.', 
        bn: 'সিলেট, শ্রীমঙ্গল এবং পঞ্চগড়ের সবুজ চা এস্টেট দিয়ে যাত্রা করুন—বাংলাদেশের চা সংস্কৃতির হৃদয়ভূমি।', 
        ar: 'رحلة عبر مزارع الشاي الخضراء في سيلهت وسريمانغال وبانشاغار - قلب ثقافة الشاي في بنغلاديش.' 
      }),
      image: '/placeholder.svg?height=400&width=600',
      date: '2024-01-10',
      readTime: t({ en: '7 min read', bn: '৭ মিনিট পড়া', ar: '7 دقائق قراءة' }),
      category: t({ en: 'Heritage', bn: 'ঐতিহ্য', ar: 'تراث' }),
    },
    {
      slug: 'perfect-cup-brewing-guide',
      title: t({ 
        en: 'How to Brew the Perfect Cup of Tea: A Complete Guide', 
        bn: 'কিভাবে নিখুঁত কাপ চা তৈরি করবেন: একটি সম্পূর্ণ নির্দেশিকা', 
        ar: 'كيفية تحضير كوب الشاي المثالي: دليل كامل' 
      }),
      excerpt: t({ 
        en: 'Master the art of tea brewing with our comprehensive guide covering water temperature, steeping time, and more.', 
        bn: 'জলের তাপমাত্রা, স্টিপিং সময় এবং আরও অনেক কিছু কভার করে আমাদের ব্যাপক গাইড সহ চা তৈরির শিল্পে দক্ষতা অর্জন করুন।', 
        ar: 'إتقان فن تحضير الشاي مع دليلنا الشامل الذي يغطي درجة حرارة الماء ووقت النقع والمزيد.' 
      }),
      image: '/placeholder.svg?height=400&width=600',
      date: '2024-01-05',
      readTime: t({ en: '6 min read', bn: '৬ মিনিট পড়া', ar: '6 دقائق قراءة' }),
      category: t({ en: 'Brewing Tips', bn: 'ব্রিউইং টিপস', ar: 'نصائح التحضير' }),
    },
    {
      slug: 'tea-trade-bangladesh',
      title: t({ 
        en: 'The Global Journey of Bangladeshi Tea', 
        bn: 'বাংলাদেশী চায়ের বৈশ্বিক যাত্রা', 
        ar: 'الرحلة العالمية للشاي البنغلاديشي' 
      }),
      excerpt: t({ 
        en: 'Learn how Bangladesh\'s premium tea reaches international markets and the role of B2B partnerships in global tea trade.', 
        bn: 'জানুন কিভাবে বাংলাদেশের প্রিমিয়াম চা আন্তর্জাতিক বাজারে পৌঁছায় এবং বৈশ্বিক চা বাণিজ্যে B2B অংশীদারিত্বের ভূমিকা।', 
        ar: 'تعرف على كيفية وصول الشاي الممتاز من بنغلاديش إلى الأسواق الدولية ودور شراكات B2B في تجارة الشاي العالمية.' 
      }),
      image: '/placeholder.svg?height=400&width=600',
      date: '2023-12-28',
      readTime: t({ en: '8 min read', bn: '৮ মিনিট পড়া', ar: '8 دقائق قراءة' }),
      category: t({ en: 'Industry', bn: 'শিল্প', ar: 'صناعة' }),
    },
    {
      slug: 'sustainability-tea-production',
      title: t({ 
        en: 'Sustainable Tea Production: Our Commitment to the Environment', 
        bn: 'টেকসই চা উৎপাদন: পরিবেশের প্রতি আমাদের প্রতিশ্রুতি', 
        ar: 'إنتاج الشاي المستدام: التزامنا تجاه البيئة' 
      }),
      excerpt: t({ 
        en: 'Explore our ethical practices in tea cultivation, from organic farming to fair labor and environmental conservation.', 
        bn: 'জৈব কৃষি থেকে ন্যায্য শ্রম এবং পরিবেশ সংরক্ষণ পর্যন্ত চা চাষে আমাদের নৈতিক অনুশীলন অন্বেষণ করুন।', 
        ar: 'استكشف ممارساتنا الأخلاقية في زراعة الشاي، من الزراعة العضوية إلى العمل العادل والحفاظ على البيئة.' 
      }),
      image: '/placeholder.svg?height=400&width=600',
      date: '2023-12-20',
      readTime: t({ en: '5 min read', bn: '৫ মিনিট পড়া', ar: '5 دقائق قراءة' }),
      category: t({ en: 'Sustainability', bn: 'স্থায়িত্ব', ar: 'الاستدامة' }),
    },
    {
      slug: 'tea-culture-bangladesh',
      title: t({ 
        en: 'Tea Culture in Bangladesh: More Than Just a Beverage', 
        bn: 'বাংলাদেশে চা সংস্কৃতি: শুধু একটি পানীয়ের চেয়ে বেশি', 
        ar: 'ثقافة الشاي في بنغلاديش: أكثر من مجرد مشروب' 
      }),
      excerpt: t({ 
        en: 'Tea is woven into the social fabric of Bangladesh. Discover how chai brings communities together across the country.', 
        bn: 'চা বাংলাদেশের সামাজিক কাঠামোতে বোনা। আবিষ্কার করুন কিভাবে চা সারা দেশে সম্প্রদায়কে একত্রিত করে।', 
        ar: 'الشاي منسوج في النسيج الاجتماعي لبنغلاديش. اكتشف كيف يجمع الشاي المجتمعات في جميع أنحاء البلاد.' 
      }),
      image: '/placeholder.svg?height=400&width=600',
      date: '2023-12-15',
      readTime: t({ en: '6 min read', bn: '৬ মিনিট পড়া', ar: '6 دقائق قراءة' }),
      category: t({ en: 'Culture', bn: 'সংস্কৃতি', ar: 'ثقافة' }),
    },
  ]

  const categories = Array.from(new Set(blogPosts.map(post => post.category)))

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 font-serif text-5xl font-bold lg:text-6xl">
              {t({ en: 'Tea Stories & Insights', bn: 'চা গল্প এবং অন্তর্দৃষ্টি', ar: 'قصص ورؤى الشاي' })}
            </h1>
            <p className="text-xl leading-relaxed text-white/90">
              {t({ 
                en: 'Explore the world of tea through our articles on culture, health, heritage, and the art of brewing the perfect cup.', 
                bn: 'সংস্কৃতি, স্বাস্থ্য, ঐতিহ্য এবং নিখুঁত কাপ তৈরির শিল্পের উপর আমাদের নিবন্ধের মাধ্যমে চায়ের জগৎ অন্বেষণ করুন।', 
                ar: 'استكشف عالم الشاي من خلال مقالاتنا حول الثقافة والصحة والتراث وفن تحضير الكوب المثالي.' 
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="border-b border-border bg-muted py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark">
              {t({ en: 'All Posts', bn: 'সব পোস্ট', ar: 'جميع المنشورات' })}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/5"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-lg border border-border bg-card shadow-md transition-all hover:shadow-xl"
              >
                <Link href={`/blogs/${post.slug}`}>
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary-dark">
                      {post.category}
                    </div>
                    <h2 className="mb-3 font-serif text-xl font-bold text-foreground group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-primary-dark py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="mb-4 font-serif text-3xl font-bold">
            {t({ en: 'Stay Updated with Zen Tea', bn: 'জেন টি-এর সাথে আপডেট থাকুন', ar: 'ابقَ على اطلاع مع زن تي' })}
          </h2>
          <p className="mb-8 text-lg text-white/80">
            {t({ 
              en: 'Subscribe to receive the latest articles, tea tips, and updates about our products and B2B opportunities.', 
              bn: 'আমাদের পণ্য এবং B2B সুযোগ সম্পর্কে সর্বশেষ নিবন্ধ, চা টিপস এবং আপডেট পেতে সাবস্ক্রাইব করুন।', 
              ar: 'اشترك لتلقي أحدث المقالات ونصائح الشاي والتحديثات حول منتجاتنا وفرص B2B.' 
            })}
          </p>
          <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder={t({ en: 'Enter your email', bn: 'আপনার ইমেল লিখুন', ar: 'أدخل بريدك الإلكتروني' })}
              className="flex-1 rounded-md border-0 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="rounded-md bg-accent px-6 py-3 font-semibold text-primary-dark transition-colors hover:bg-accent/90"
            >
              {t({ en: 'Subscribe', bn: 'সাবস্ক্রাইব করুন', ar: 'اشترك' })}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
