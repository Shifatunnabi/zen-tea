import mongoose, { Schema, Document } from 'mongoose'

interface MultiLangText {
  en: string
  bn: string
  ar: string
}

const MultiLangSchema = {
  en: { type: String, default: '' },
  bn: { type: String, default: '' },
  ar: { type: String, default: '' },
}

export interface IBlog extends Document {
  title: MultiLangText
  slug: string
  thumbnail: string
  excerpt: MultiLangText
  category: MultiLangText
  content: MultiLangText
  isHidden: boolean
  createdAt: Date
}

const BlogSchema = new Schema<IBlog>({
  title: { type: MultiLangSchema, required: true },
  slug: { type: String, required: true, unique: true },
  thumbnail: { type: String, default: '' },
  excerpt: { type: MultiLangSchema, default: {} },
  category: { type: MultiLangSchema, default: {} },
  content: { type: MultiLangSchema, default: {} },
  isHidden: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
