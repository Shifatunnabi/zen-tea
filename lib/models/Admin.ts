import mongoose, { Schema, Document } from 'mongoose'

export interface IAdmin extends Document {
  email: string
  password: string
  name: string
  role: 'super_admin' | 'admin'
  createdAt: Date
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['super_admin', 'admin'], default: 'admin' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema)
