import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Heritage from '@/lib/models/Heritage'

export async function GET() {
  await dbConnect()
  const heritage = await Heritage.findOne()
  return NextResponse.json(heritage)
}

export async function POST(request: NextRequest) {
  await dbConnect()
  const body = await request.json()
  // Upsert - only one heritage record
  let heritage = await Heritage.findOne()
  if (heritage) {
    heritage = await Heritage.findByIdAndUpdate(heritage._id, body, { new: true })
  } else {
    heritage = await Heritage.create(body)
  }
  return NextResponse.json(heritage)
}
