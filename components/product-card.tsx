'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface ProductCardProps {
  name: string
  description: string
  image: string
  hoverImage?: string
  slug: string
}

export function ProductCard({ name, description, image, hoverImage, slug }: ProductCardProps) {
  const { t } = useLanguage()

  return (
    <Link
      href={`/products/${slug}`}
      className="group relative overflow-hidden rounded-lg bg-card shadow-lg transition-all hover:shadow-xl"
    >
      <div className="aspect-square overflow-hidden relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={`object-cover transition-opacity duration-500 ${hoverImage ? 'group-hover:opacity-0' : 'group-hover:scale-105 transition-transform duration-300'}`}
        />
        {hoverImage && (
          <Image
            src={hoverImage}
            alt={`${name} alternate`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">
          {name}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-4 flex items-center text-primary font-semibold group-hover:underline">
          {t({ en: 'Learn More', bn: 'আরও জানুন', ar: 'اعرف المزيد' })} <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  )
}
