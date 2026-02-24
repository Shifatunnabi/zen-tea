'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Loader2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface MultiLang {
  en: string
  bn?: string
  ar?: string
}

interface Blog {
  _id: string
  title: MultiLang
  slug: string
  thumbnail: string
  excerpt: MultiLang
  category: MultiLang
  content: MultiLang
  isHidden: boolean
  createdAt: string
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>()
  const { t, language } = useLanguage()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setNotFound(false)

      try {
        // Fetch current blog
        const res = await fetch(`/api/blogs/slug/${params.slug}`)
        if (!res.ok) {
          setNotFound(true)
          return
        }
        const blogData: Blog = await res.json()
        setBlog(blogData)

        // Fetch all blogs for related articles
        const allRes = await fetch('/api/blogs')
        if (allRes.ok) {
          const allBlogs: Blog[] = await allRes.json()
          const related = allBlogs
            .filter((b) => b.slug !== params.slug && !b.isHidden)
            .slice(0, 3)
          setRelatedBlogs(related)
        }
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchData()
    }
  }, [params.slug])

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  // Not found state
  if (notFound || !blog) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-foreground">
          {t({ en: 'Article Not Found', bn: 'নিবন্ধ পাওয়া যায়নি', ar: 'المقال غير موجود' })}
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          {t({
            en: 'The blog post you are looking for does not exist or has been removed.',
            bn: 'আপনি যে ব্লগ পোস্টটি খুঁজছেন তা বিদ্যমান নেই বা সরানো হয়েছে।',
            ar: 'مقال المدونة الذي تبحث عنه غير موجود أو تمت إزالته.',
          })}
        </p>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          {t({ en: 'Back to Blog', bn: 'ব্লগে ফিরে যান', ar: 'العودة إلى المدونة' })}
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(blog.createdAt).toLocaleDateString(
    language === 'bn' ? 'bn-BD' : language === 'ar' ? 'ar-SA' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted py-4">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            {t({ en: 'Back to Blog', bn: 'ব্লগে ফিরে যান', ar: 'العودة إلى المدونة' })}
          </Link>
        </div>
      </div>

      <article className="py-8 md:py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Featured Image */}
          {blog.thumbnail && (
            <div className="mb-8 overflow-hidden rounded-xl shadow-lg">
              <img
                src={blog.thumbnail}
                alt={t(blog.title)}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          {/* Category Badge */}
          {t(blog.category) && (
            <div className="mb-4">
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-sm font-semibold text-primary-dark">
                {t(blog.category)}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {t(blog.title)}
          </h1>

          {/* Date */}
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={blog.createdAt}>{formattedDate}</time>
          </div>

          {/* Divider */}
          <hr className="mb-8 border-border" />

          {/* Content rendered as HTML */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: t(blog.content) }}
          />

          {/* CTA */}
          <div className="mt-12 rounded-xl border-2 border-primary bg-primary/5 p-8">
            <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">
              {t({ en: 'Experience Zen Tea', bn: 'জেন টি অনুভব করুন', ar: 'تجربة شاي زن' })}
            </h3>
            <p className="mb-6 text-muted-foreground">
              {t({
                en: 'Discover our premium tea collection crafted from the finest Bangladeshi tea gardens.',
                bn: 'বাংলাদেশের সেরা চা বাগান থেকে তৈরি আমাদের প্রিমিয়াম চা সংগ্রহ আবিষ্কার করুন।',
                ar: 'اكتشف مجموعة الشاي الممتازة المصنوعة من أفضل حدائق الشاي في بنغلاديش.',
              })}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {t({ en: 'Explore Our Products', bn: 'আমাদের পণ্য দেখুন', ar: 'استكشف منتجاتنا' })}
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="border-t border-border bg-muted py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mb-8 font-serif text-3xl font-bold text-foreground">
              {t({ en: 'Related Articles', bn: 'সম্পর্কিত নিবন্ধ', ar: 'مقالات ذات صلة' })}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {relatedBlogs.map((related) => (
                <Link
                  key={related._id || related.slug}
                  href={`/blogs/${related.slug}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card shadow transition-all hover:shadow-lg"
                >
                  {related.thumbnail && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={related.thumbnail}
                        alt={t(related.title)}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    {t(related.category) && (
                      <span className="mb-2 inline-block rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-primary-dark">
                        {t(related.category)}
                      </span>
                    )}
                    <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary">
                      {t(related.title)}
                    </h3>
                    {t(related.excerpt) && (
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {t(related.excerpt)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
