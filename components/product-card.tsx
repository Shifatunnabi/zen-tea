'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface ProductCardProps {
  name: string
  description: string
  image: string
  slug: string
}

export function ProductCard({ name, description, image, slug }: ProductCardProps) {
  const { t } = useLanguage()

  return (
    <Link
      href={`/products/${slug}`}
      className="group relative overflow-hidden rounded-lg bg-card shadow-lg transition-all hover:shadow-xl"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">
          {name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-4 flex items-center text-primary font-semibold group-hover:underline">
          {t({ en: 'Learn More', bn: 'আরও জানুন', ar: 'اعرف المزيد' })} <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  )
}
