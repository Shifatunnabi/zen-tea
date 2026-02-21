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

export interface ISiteSettings extends Document {
  logo: string
  phone: string
  email: string
  location: MultiLangText
  missionText: MultiLangText
  visionText: MultiLangText
  artOfTeaPhoto: string
  artOfTeaHeadline: MultiLangText
  artOfTeaDescription: MultiLangText
  artOfTeaFeatures: MultiLangText[]
  updatedAt: Date
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  logo: { type: String, default: '' },
  phone: { type: String, default: '088 01711-633202' },
  email: { type: String, default: 'zenteabd@gmail.com' },
  location: { type: MultiLangSchema, default: { en: 'Jaljalpur, Sagardighi, Ghatail, Tangail', bn: 'জালজালপুর, সাগরদিঘি, ঘাটাইল, টাঙ্গাইল', ar: 'جالجالبور، ساغارديغي، غاتايل، تانغايل' } },
  missionText: { type: MultiLangSchema, default: {} },
  visionText: { type: MultiLangSchema, default: {} },
  artOfTeaPhoto: { type: String, default: '' },
  artOfTeaHeadline: { type: MultiLangSchema, default: {} },
  artOfTeaDescription: { type: MultiLangSchema, default: {} },
  artOfTeaFeatures: [{ type: MultiLangSchema }],
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)
