import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/lib/models/Admin'

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect()
  await Admin.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
