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

export interface ICarouselSlide extends Document {
  image: string
  headline: MultiLangText
  subtext: MultiLangText
  order: number
  isHidden: boolean
  createdAt: Date
}

const CarouselSlideSchema = new Schema<ICarouselSlide>({
  image: { type: String, required: true },
  headline: { type: MultiLangSchema, required: true },
  subtext: { type: MultiLangSchema, required: true },
  order: { type: Number, default: 0 },
  isHidden: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.CarouselSlide || mongoose.model<ICarouselSlide>('CarouselSlide', CarouselSlideSchema)
