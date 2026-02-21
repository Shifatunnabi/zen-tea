import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/lib/models/Admin'
import bcrypt from 'bcryptjs'

export async function GET() {
  await dbConnect()
  const admins = await Admin.find().select('-password').sort({ createdAt: -1 })
  return NextResponse.json(admins)
}

export async function POST(request: NextRequest) {
  await dbConnect()
  const body = await request.json()
  const hashed = await bcrypt.hash(body.password, 12)
  const admin = await Admin.create({ ...body, password: hashed })
  const { password, ...adminData } = admin.toObject()
  return NextResponse.json(adminData, { status: 201 })
}
