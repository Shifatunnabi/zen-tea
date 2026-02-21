'use client'

import { HeroSection } from '@/components/sections/hero-section'
import { BrandStatement } from '@/components/sections/brand-statement'
import { ProductShowcase } from '@/components/sections/product-showcase'
import { CoreValuesSection } from '@/components/sections/core-values-section'
import { HeritageSection } from '@/components/sections/heritage-section'
import { PartnershipCard, QualityGuaranteeCard } from '@/components/sections/partnership-cards'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStatement />
      <ProductShowcase />
      <CoreValuesSection />
      <HeritageSection />
      <section className="py-20 space-y-8 bg-muted">
        <PartnershipCard />
        <QualityGuaranteeCard />
      </section>
    </>
  )
}
