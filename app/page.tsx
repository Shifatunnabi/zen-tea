import { HeroSection } from '@/components/sections/hero-section'
import { BrandStatement } from '@/components/sections/brand-statement'
import { ProductShowcase } from '@/components/sections/product-showcase'
import { CoreValuesSection } from '@/components/sections/core-values-section'
import { HeritageSection } from '@/components/sections/heritage-section'
import { PartnershipCard, QualityGuaranteeCard } from '@/components/sections/partnership-cards'
import dbConnect from '@/lib/mongodb'
import CarouselSlide from '@/lib/models/CarouselSlide'
import Product from '@/lib/models/Product'
import CoreValue from '@/lib/models/CoreValue'
import Heritage from '@/lib/models/Heritage'

async function getHomeData() {
  try {
    await dbConnect()
    const [slides, products, coreValues, heritage] = await Promise.all([
      CarouselSlide.find().sort({ order: 1, createdAt: -1 }).lean(),
      Product.find().sort({ order: 1, createdAt: -1 }).lean(),
      CoreValue.find().sort({ order: 1, createdAt: -1 }).lean(),
      Heritage.findOne().lean(),
    ])
    return JSON.parse(JSON.stringify({ slides, products, coreValues, heritage }))
  } catch {
    return { slides: [], products: [], coreValues: [], heritage: null }
  }
}

export default async function HomePage() {
  const { slides, products, coreValues, heritage } = await getHomeData()

  return (
    <>
      <HeroSection initialSlides={slides} />
      <BrandStatement />
      <ProductShowcase initialProducts={products} />
      <CoreValuesSection initialValues={coreValues} />
      <HeritageSection initialHeritage={heritage} />
      <section className="py-20 space-y-8 bg-muted">
        <PartnershipCard />
        <QualityGuaranteeCard />
      </section>
    </>
  )
}
