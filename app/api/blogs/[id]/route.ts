import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  const blog = await Blog.findById(params.id)
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(blog)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  const body = await request.json()
  const blog = await Blog.findByIdAndUpdate(params.id, body, { new: true })
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(blog)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  await Blog.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
