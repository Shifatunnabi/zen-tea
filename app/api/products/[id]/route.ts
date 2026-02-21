import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Product from '@/lib/models/Product'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  const product = await Product.findById(params.id)
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  const body = await request.json()
  const product = await Product.findByIdAndUpdate(params.id, body, { new: true })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  await Product.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
