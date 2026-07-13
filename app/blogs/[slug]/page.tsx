import { notFound } from 'next/navigation'
import dbConnect from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'
import { BlogDetailClient } from './blog-detail-client'

async function getBlogData(slug: string) {
  await dbConnect()
  const [blog, allBlogs] = await Promise.all([
    Blog.findOne({ slug }).lean(),
    Blog.find().sort({ createdAt: -1 }).lean(),
  ])
  if (!blog) return null

  const related = JSON.parse(JSON.stringify(allBlogs))
    .filter((b: any) => b.slug !== slug && !b.isHidden)
    .slice(0, 3)

  return { blog: JSON.parse(JSON.stringify(blog)), related }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getBlogData(slug)

  if (!data) {
    notFound()
  }

  return <BlogDetailClient blog={data.blog} relatedBlogs={data.related} />
}
