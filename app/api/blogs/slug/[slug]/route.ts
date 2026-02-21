import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  await dbConnect()
  const blog = await Blog.findOne({ slug: params.slug })
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(blog)
}
