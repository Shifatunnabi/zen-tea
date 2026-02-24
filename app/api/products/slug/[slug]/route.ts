import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/lib/models/Product'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  await dbConnect()
  const { slug } = await params
  const product = await Product.findOne({ slug })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}
