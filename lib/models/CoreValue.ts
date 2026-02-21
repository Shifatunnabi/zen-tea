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

export interface ICoreValue extends Document {
  image: string
  name: MultiLangText
  description: MultiLangText
  order: number
  isHidden: boolean
  createdAt: Date
}

const CoreValueSchema = new Schema<ICoreValue>({
  image: { type: String, required: true },
  name: { type: MultiLangSchema, required: true },
  description: { type: MultiLangSchema, required: true },
  order: { type: Number, default: 0 },
  isHidden: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.CoreValue || mongoose.model<ICoreValue>('CoreValue', CoreValueSchema)
