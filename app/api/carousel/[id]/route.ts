import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import CarouselSlide from '@/lib/models/CarouselSlide'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  const body = await request.json()
  const slide = await CarouselSlide.findByIdAndUpdate(params.id, body, { new: true })
  if (!slide) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(slide)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  await CarouselSlide.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
