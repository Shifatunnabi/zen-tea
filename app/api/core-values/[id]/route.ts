import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import CoreValue from '@/lib/models/CoreValue'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    const body = await request.json()
    const value = await CoreValue.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!value) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(value)
  } catch (error) {
    console.error('CoreValue PUT error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    await CoreValue.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('CoreValue DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
