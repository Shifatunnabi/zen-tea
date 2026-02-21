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

export interface IProduct extends Document {
  name: MultiLangText
  slug: string
  photos: string[]
  thumbnailIndex: number
  taglineOne: MultiLangText
  taglineTwo: MultiLangText
  shortDetails: MultiLangText
  description: MultiLangText
  keyFeatures: MultiLangText[]
  regularPrice: number
  sellingPrice: number
  unit: MultiLangText
  shippingDetails: MultiLangText
  isHidden: boolean
  order: number
  createdAt: Date
}

const ProductSchema = new Schema<IProduct>({
  name: { type: MultiLangSchema, required: true },
  slug: { type: String, required: true, unique: true },
  photos: [{ type: String }],
  thumbnailIndex: { type: Number, default: 0 },
  taglineOne: { type: MultiLangSchema, default: {} },
  taglineTwo: { type: MultiLangSchema, default: {} },
  shortDetails: { type: MultiLangSchema, default: {} },
  description: { type: MultiLangSchema, default: {} },
  keyFeatures: [{ type: MultiLangSchema }],
  regularPrice: { type: Number, default: 0 },
  sellingPrice: { type: Number, default: 0 },
  unit: { type: MultiLangSchema, default: {} },
  shippingDetails: { type: MultiLangSchema, default: {} },
  isHidden: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
