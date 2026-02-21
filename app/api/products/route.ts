import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/lib/models/Product'

export async function GET() {
  await dbConnect()
  const products = await Product.find().sort({ order: 1, createdAt: -1 })
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  await dbConnect()
  const body = await request.json()
  const product = await Product.create(body)
  return NextResponse.json(product, { status: 201 })
}
