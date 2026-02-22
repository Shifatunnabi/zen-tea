'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface Blog {
  _id: string
  title: { en: string; bn: string; ar: string }
  slug: string
  thumbnail: string
  excerpt: { en: string; bn: string; ar: string }
  category: { en: string; bn: string; ar: string }
  content: { en: string; bn: string; ar: string }
  isHidden: boolean
  createdAt: string
}

const FALLBACK_BLOGS: Blog[] = [
  {
    _id: 'fallback-1',
    slug: 'health-benefits-black-tea',
    title: { 
      en: 'The Health Benefits of Black Tea: Why It\'s Good for You', 
      bn: 'কালো চায়ের স্বাস্থ্য উপকারিতা: কেন এটি আপনার জন্য ভাল', 
      ar: 'الفوائد الصحية للشاي الأسود: لماذا هو جيد لك' 
    },
    excerpt: { 
      en: 'Discover the science-backed health benefits of black tea, from antioxidants to heart health and mental clarity.', 
      bn: 'অ্যান্টিঅক্সিড্যান্ট থেকে হৃদযন্ত্রের স্বাস্থ্য এবং মানসিক স্বচ্ছতা পর্যন্ত কালো চায়ের বিজ্ঞান-সমর্থিত স্বাস্থ্য উপকারিতা আবিষ্কার করুন।', 
      ar: 'اكتشف الفوائد الصحية للشاي الأسود المدعومة بالعلم، من مضادات الأكسدة إلى صحة القلب والوضوح العقلي.' 
    },
    thumbnail: '/placeholder.svg?height=400&width=600',
    createdAt: '2024-01-15',
    category: { en: 'Health & Wellness', bn: 'স্বাস্থ্য ও সুস্থতা', ar: 'الصحة والعافية' },
    content: { en: '', bn: '', ar: '' },
    isHidden: false
  },
  {
    _id: 'fallback-2',
    slug: 'bangladesh-tea-heritage',
    title: { 
      en: 'The Rich Heritage of Bangladeshi Tea Gardens', 
      bn: 'বাংলাদেশী চা বাগানের সমৃদ্ধ ঐতিহ্য', 
      ar: 'التراث الغني لحدائق الشاي البنغلاديشية' 
    },
    excerpt: { 
      en: 'Journey through the lush tea estates of Sylhet, Sreemangal, and Panchagarh—the heartland of Bangladesh\'s tea culture.', 
      bn: 'সিলেট, শ্রীমঙ্গল এবং পঞ্চগড়ের সবুজ চা এস্টেট দিয়ে যাত্রা করুন—বাংলাদেশের চা সংস্কৃতির হৃদয়ভূমি।', 
      ar: 'رحلة عبر مزارع الشاي الخضراء في سيلهت وسريمانغال وبانشاغار - قلب ثقافة الشاي في بنغلاديش.' 
    },
    thumbnail: '/placeholder.svg?height=400&width=600',
    createdAt: '2024-01-10',
    category: { en: 'Heritage', bn: 'ঐতিহ্য', ar: 'تراث' },
    content: { en: '', bn: '', ar: '' },
    isHidden: false
  },
  {
    _id: 'fallback-3',
    slug: 'perfect-cup-brewing-guide',
    title: { 
      en: 'How to Brew the Perfect Cup of Tea: A Complete Guide', 
      bn: 'কিভাবে নিখুঁত কাপ চা তৈরি করবেন: একটি সম্পূর্ণ নির্দেশিকা', 
      ar: 'كيفية تحضير كوب الشاي المثالي: دليل كامل' 
    },
    excerpt: { 
      en: 'Master the art of tea brewing with our comprehensive guide covering water temperature, steeping time, and more.', 
      bn: 'জলের তাপমাত্রা, স্টিপিং সময় এবং আরও অনেক কিছু কভার করে আমাদের ব্যাপক গাইড সহ চা তৈরির শিল্পে দক্ষতা অর্জন করুন।', 
      ar: 'إتقان فن تحضير الشاي مع دليلنا الشامل الذي يغطي درجة حرارة الماء ووقت النقع والمزيد.' 
    },
    thumbnail: '/placeholder.svg?height=400&width=600',
    createdAt: '2024-01-05',
    category: { en: 'Brewing Tips', bn: 'ব্রিউইং টিপস', ar: 'نصائح التحضير' },
    content: { en: '', bn: '', ar: '' },
    isHidden: false
  }
]

export default function BlogsPage() {
  const { t } = useLanguage()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    setLoading(true)
    fetch('/api/blogs')
      .then(r => r.json())
      .then(data => {
        const visibleBlogs = (data || []).filter((b: Blog) => !b.isHidden)
        setBlogs(visibleBlogs.length > 0 ? visibleBlogs : FALLBACK_BLOGS)
      })
      .catch(() => setBlogs(FALLBACK_BLOGS))
      .finally(() => setLoading(false))
  }, [])

  const categories = Array.from(new Set(blogs.map(blog => t(blog.category))))
  const filteredBlogs = selectedCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => t(blog.category) === selectedCategory)

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return t({ en: `${minutes} min read`, bn: `${minutes} মিনিট পড়া`, ar: `${minutes} دقائق قراءة` })
  }

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
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'border border-border bg-card text-foreground hover:border-primary hover:bg-primary/5'
              }`}
            >
              {t({ en: 'All Posts', bn: 'সব পোস্ট', ar: 'جميع المنشورات' })}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'border border-border bg-card text-foreground hover:border-primary hover:bg-primary/5'
                }`}
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
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">
                {t({ en: 'No blog posts available.', bn: 'কোন ব্লগ পোস্ট উপলব্ধ নেই।', ar: 'لا توجد مشاركات مدونة متاحة.' })}
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((post) => (
                <article
                  key={post._id}
                  className="group overflow-hidden rounded-lg border border-border bg-card shadow-md transition-all hover:shadow-xl"
                >
                  <Link href={`/blogs/${post.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.thumbnail || "/placeholder.svg?height=400&width=600"}
                        alt={t(post.title)}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary-dark">
                        {t(post.category)}
                      </div>
                      <h2 className="mb-3 font-serif text-xl font-bold text-foreground group-hover:text-primary">
                        {t(post.title)}
                      </h2>
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {t(post.excerpt)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {calculateReadTime(t(post.content))}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
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
