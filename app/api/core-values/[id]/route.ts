import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import CoreValue from '@/lib/models/CoreValue'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  const body = await request.json()
  const value = await CoreValue.findByIdAndUpdate(params.id, body, { new: true })
  if (!value) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(value)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  await CoreValue.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
