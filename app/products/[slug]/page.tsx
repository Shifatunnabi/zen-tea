import { notFound } from 'next/navigation'
import dbConnect from '@/lib/mongodb'
import Product from '@/lib/models/Product'
import { ProductDetailClient } from './product-detail-client'

async function getProduct(slug: string) {
  await dbConnect()
  const product = await Product.findOne({ slug }).lean()
  if (!product) return null
  return JSON.parse(JSON.stringify(product))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
