import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import SiteSettings from '@/lib/models/SiteSettings'

export async function GET() {
  await dbConnect()
  let settings = await SiteSettings.findOne()
  if (!settings) {
    settings = await SiteSettings.create({})
  }
  return NextResponse.json(settings)
}

export async function POST(request: NextRequest) {
  await dbConnect()
  const body = await request.json()
  let settings = await SiteSettings.findOne()
  if (settings) {
    settings = await SiteSettings.findByIdAndUpdate(settings._id, { ...body, updatedAt: new Date() }, { new: true })
  } else {
    settings = await SiteSettings.create(body)
  }
  return NextResponse.json(settings)
}
