import dbConnect from '@/lib/mongodb'
import SiteSettings from '@/lib/models/SiteSettings'
import CoreValue from '@/lib/models/CoreValue'
import { AboutPageClient } from './about-client'

async function getAboutData() {
  try {
    await dbConnect()
    const [settings, coreValues] = await Promise.all([
      SiteSettings.findOne().lean(),
      CoreValue.find().sort({ order: 1, createdAt: -1 }).lean(),
    ])
    return JSON.parse(JSON.stringify({ settings, coreValues }))
  } catch {
    return { settings: null, coreValues: [] }
  }
}

export default async function AboutPage() {
  const { settings, coreValues } = await getAboutData()
  return <AboutPageClient settings={settings} coreValues={coreValues} />
}
