import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    const blog = await Blog.findById(id)
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(blog)
  } catch (error) {
    console.error('Blog GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    const body = await request.json()
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(blog)
  } catch (error) {
    console.error('Blog PUT error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    await Blog.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Blog DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
