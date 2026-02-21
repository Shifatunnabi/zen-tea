import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'

export async function GET() {
  await dbConnect()
  const blogs = await Blog.find().sort({ createdAt: -1 })
  return NextResponse.json(blogs)
}

export async function POST(request: NextRequest) {
  await dbConnect()
  const body = await request.json()
  const blog = await Blog.create(body)
  return NextResponse.json(blog, { status: 201 })
}
