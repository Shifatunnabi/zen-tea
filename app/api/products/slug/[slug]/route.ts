import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/lib/models/Product'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  await dbConnect()
  const product = await Product.findOne({ slug: params.slug })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}
