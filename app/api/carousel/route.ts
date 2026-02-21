import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import CarouselSlide from '@/lib/models/CarouselSlide'

export async function GET() {
  await dbConnect()
  const slides = await CarouselSlide.find().sort({ order: 1, createdAt: -1 })
  return NextResponse.json(slides)
}

export async function POST(request: NextRequest) {
  await dbConnect()
  const body = await request.json()
  const slide = await CarouselSlide.create(body)
  return NextResponse.json(slide, { status: 201 })
}
