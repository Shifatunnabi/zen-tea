import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import CoreValue from '@/lib/models/CoreValue'

export async function GET() {
  await dbConnect()
  const values = await CoreValue.find().sort({ order: 1, createdAt: -1 })
  return NextResponse.json(values)
}

export async function POST(request: NextRequest) {
  await dbConnect()
  const body = await request.json()
  const value = await CoreValue.create(body)
  return NextResponse.json(value, { status: 201 })
}
