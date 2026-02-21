'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, ArrowLeft, CheckCircle, Package, Truck, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/language-context'
import { PartnershipCard, QualityGuaranteeCard } from '@/components/sections/partnership-cards'

type TranslationField = { en: string; bn?: string; ar?: string }

interface Product {
  _id: string
  name: TranslationField
  slug: string
  photos: string[]
  thumbnailIndex: number
  taglineOne: TranslationField
  taglineTwo: TranslationField
  shortDetails: TranslationField
  description: TranslationField
  keyFeatures: TranslationField[]
  regularPrice: number
  sellingPrice: number
  unit: TranslationField
  shippingDetails: TranslationField
  isHidden: boolean
}

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const { t } = useLanguage()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'shipping'>('description')
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch product data
  useEffect(() => {
    if (!slug) return
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/slug/${slug}`)
        if (!res.ok) {
          setNotFound(true)
          setLoading(false)
          return
        }
        const data = await res.json()
        setProduct(data)
      } catch {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [slug])

  // Auto-slide
  const startAutoSlide = useCallback(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current)
    autoSlideRef.current = setInterval(() => {
      setActiveImageIndex((prev) =>
        product ? (prev + 1) % product.photos.length : 0
      )
    }, 4000)
  }, [product])

  useEffect(() => {
    if (product && product.photos.length > 1) {
      startAutoSlide()
    }
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current)
    }
  }, [product, startAutoSlide])

  const goToPrevImage = () => {
    if (!product) return
    setActiveImageIndex((prev) => (prev - 1 + product.photos.length) % product.photos.length)
    startAutoSlide()
  }

  const goToNextImage = () => {
    if (!product) return
    setActiveImageIndex((prev) => (prev + 1) % product.photos.length)
    startAutoSlide()
  }

  const selectThumbnail = (index: number) => {
    setActiveImageIndex(index)
    startAutoSlide()
  }

  const discount = product
    ? Math.round(((product.regularPrice - product.sellingPrice) / product.regularPrice) * 100)
    : 0

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb skeleton */}
          <div className="mb-8 h-5 w-48 animate-pulse rounded bg-muted" />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Image skeleton */}
            <div className="space-y-4">
              <div className="aspect-square w-full animate-pulse rounded-2xl bg-muted" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 w-16 animate-pulse rounded-lg bg-muted" />
                ))}
              </div>
            </div>
            {/* Info skeleton */}
            <div className="space-y-4">
              <div className="h-8 w-40 animate-pulse rounded-full bg-muted" />
              <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
              <div className="h-20 w-full animate-pulse rounded bg-muted" />
              <div className="h-8 w-1/3 animate-pulse rounded bg-muted" />
              <div className="flex gap-4">
                <div className="h-12 w-32 animate-pulse rounded bg-muted" />
                <div className="h-12 w-32 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Not found state
  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
          <Package className="mb-6 h-20 w-20 text-muted-foreground/40" />
          <h1 className="mb-3 font-serif text-3xl font-bold text-foreground">
            {t({ en: 'Product Not Found', bn: 'পণ্য পাওয়া যায়নি', ar: 'المنتج غير موجود' })}
          </h1>
          <p className="mb-8 max-w-md text-lg text-muted-foreground">
            {t({
              en: 'The product you are looking for does not exist or may have been removed.',
              bn: 'আপনি যে পণ্যটি খুঁজছেন সেটি বিদ্যমান নেই বা সরানো হয়েছে।',
              ar: 'المنتج الذي تبحث عنه غير موجود أو ربما تمت إزالته.',
            })}
          </p>
          <Link href="/products">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t({ en: 'Back to Products', bn: 'পণ্যগুলিতে ফিরে যান', ar: 'العودة إلى المنتجات' })}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/products" className="transition-colors hover:text-primary">
            {t({ en: 'Products', bn: 'পণ্যসমূহ', ar: 'المنتجات' })}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{t(product.name)}</span>
        </nav>

        {/* Back link */}
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          {t({ en: 'Back to Products', bn: 'পণ্যগুলিতে ফিরে যান', ar: 'العودة إلى المنتجات' })}
        </Link>

        {/* Top Section: Two columns */}
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* LEFT: Photo slider */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
              {product.photos.length > 0 ? (
                <Image
                  src={product.photos[activeImageIndex]}
                  alt={t(product.name)}
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <Package className="h-20 w-20" />
                </div>
              )}

              {/* Arrow buttons */}
              {product.photos.length > 1 && (
                <>
                  <button
                    onClick={goToPrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-foreground" />
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-foreground" />
                  </button>
                </>
              )}

              {/* Image counter badge */}
              {product.photos.length > 1 && (
                <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {activeImageIndex + 1} / {product.photos.length}
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => selectThumbnail(index)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      index === activeImageIndex
                        ? 'border-primary ring-2 ring-primary/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={photo}
                      alt={`${t(product.name)} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product info */}
          <div className="flex flex-col">
            {/* Tagline One capsule */}
            {t(product.taglineOne) && (
              <span className="mb-3 inline-block w-fit rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-primary-dark">
                {t(product.taglineOne)}
              </span>
            )}

            {/* Product Name */}
            <h1 className="mb-2 font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              {t(product.name)}
            </h1>

            {/* Tagline Two */}
            {t(product.taglineTwo) && (
              <p className="mb-4 text-lg font-medium text-primary">
                {t(product.taglineTwo)}
              </p>
            )}

            {/* Short details */}
            {t(product.shortDetails) && (
              <p className="mb-6 leading-relaxed text-muted-foreground">
                {t(product.shortDetails)}
              </p>
            )}

            {/* Price Section */}
            <div className="mb-6 flex items-end gap-3">
              <span className="text-3xl font-bold text-foreground">
                ৳{product.sellingPrice.toLocaleString()}
              </span>
              {product.regularPrice > product.sellingPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ৳{product.regularPrice.toLocaleString()}
                  </span>
                  <span className="rounded-md bg-red-100 px-2 py-0.5 text-sm font-semibold text-red-600">
                    -{discount}%
                  </span>
                </>
              )}
              {t(product.unit) && (
                <span className="text-sm text-muted-foreground">/ {t(product.unit)}</span>
              )}
            </div>

            {/* Quantity selector */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-foreground">
                {t({ en: 'Quantity', bn: 'পরিমাণ', ar: 'الكمية' })}
              </label>
              <div className="inline-flex items-center rounded-lg border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-l-lg transition-colors hover:bg-muted"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-10 w-14 border-x border-border bg-transparent text-center text-sm font-medium text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-r-lg transition-colors hover:bg-muted"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-primary text-primary hover:bg-primary/5"
              >
                <Heart className="h-5 w-5" />
                {t({ en: 'Add to Favorites', bn: 'পছন্দে যোগ করুন', ar: 'أضف إلى المفضلة' })}
              </Button>
              <Button
                size="lg"
                className="gap-2 bg-primary text-white hover:bg-primary-dark"
              >
                <ShoppingCart className="h-5 w-5" />
                {t({ en: 'Add to Cart', bn: 'কার্টে যোগ করুন', ar: 'أضف إلى السلة' })}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          {/* Tab buttons */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('description')}
              className={`relative px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === 'description'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t({ en: 'Description', bn: 'বিবরণ', ar: 'الوصف' })}
              {activeTab === 'description' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`relative px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === 'features'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t({ en: 'Key Features', bn: 'মূল বৈশিষ্ট্য', ar: 'الميزات الرئيسية' })}
              {activeTab === 'features' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`relative px-5 py-3 text-sm font-medium transition-colors ${
                activeTab === 'shipping'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t({ en: 'Shipping Details', bn: 'শিপিং বিবরণ', ar: 'تفاصيل الشحن' })}
              {activeTab === 'shipping' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>

          {/* Tab content */}
          <div className="py-8">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none text-muted-foreground prose-headings:font-serif prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground">
                <div
                  dangerouslySetInnerHTML={{ __html: t(product.description) }}
                />
              </div>
            )}

            {/* Key Features Tab */}
            {activeTab === 'features' && (
              <div className="space-y-3">
                {product.keyFeatures && product.keyFeatures.length > 0 ? (
                  product.keyFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg bg-muted/50 p-4"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-foreground">{t(feature)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    {t({ en: 'No features listed.', bn: 'কোন বৈশিষ্ট্য তালিকাভুক্ত নেই।', ar: 'لا توجد ميزات مدرجة.' })}
                  </p>
                )}
              </div>
            )}

            {/* Shipping Tab */}
            {activeTab === 'shipping' && (
              <div className="flex items-start gap-4 rounded-xl bg-muted/50 p-6">
                <Truck className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div className="prose prose-lg max-w-none text-muted-foreground prose-headings:font-serif prose-headings:text-foreground">
                  <div
                    dangerouslySetInnerHTML={{ __html: t(product.shippingDetails) }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Partnership & Quality Guarantee Cards */}
        <div className="mt-12 space-y-8 pb-16">
          <PartnershipCard />
          <QualityGuaranteeCard />
        </div>
      </div>
    </div>
  )
}
