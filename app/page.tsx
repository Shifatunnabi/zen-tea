import { HeroSection } from '@/components/sections/hero-section'
import { BrandStatement } from '@/components/sections/brand-statement'
import { ProductShowcase } from '@/components/sections/product-showcase'
import { ValuesSection } from '@/components/sections/values-section'
import { CTASection } from '@/components/sections/cta-section'
import { HeritageSection } from '@/components/sections/heritage-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStatement />
      <ProductShowcase />
      <ValuesSection />
      <CTASection />
      <HeritageSection />
    </>
  )
}
