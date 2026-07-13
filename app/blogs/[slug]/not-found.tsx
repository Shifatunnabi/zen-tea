import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BlogNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-foreground">
        Article Not Found
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        The blog post you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>
    </div>
  )
}
