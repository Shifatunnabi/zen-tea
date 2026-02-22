import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import CarouselSlide from '@/lib/models/CarouselSlide'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    const body = await request.json()
    const slide = await CarouselSlide.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!slide) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(slide)
  } catch (error) {
    console.error('Carousel PUT error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    await CarouselSlide.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Carousel DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
