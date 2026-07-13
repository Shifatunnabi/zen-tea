'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
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

export function BlogsPageClient({ blogs }: { blogs: Blog[] }) {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

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
          {filteredBlogs.length === 0 ? (
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
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.thumbnail || "/placeholder.svg?height=400&width=600"}
                        alt={t(post.title)}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
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
