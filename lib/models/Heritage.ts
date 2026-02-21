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

export interface IHeritage extends Document {
  video: string
  headline: MultiLangText
  description: MultiLangText
  createdAt: Date
}

const HeritageSchema = new Schema<IHeritage>({
  video: { type: String, default: '' },
  headline: { type: MultiLangSchema, required: true },
  description: { type: MultiLangSchema, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Heritage || mongoose.model<IHeritage>('Heritage', HeritageSchema)
