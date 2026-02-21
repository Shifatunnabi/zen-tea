'use client'

import { useLanguage } from '@/lib/language-context'

export function PartnershipCard() {
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8">
      <div className="rounded-2xl bg-muted p-8 md:p-12 text-center">
        <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
          {t({ en: 'Interested in Wholesale Partnership?', bn: 'পাইকারি অংশীদারিত্বে আগ্রহী?', ar: 'مهتم بشراكة الجملة؟' })}
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          {t({
            en: 'Join our network of dealers and retailers. Contact us to discuss wholesale pricing, minimum order quantities, and partnership opportunities.',
            bn: 'আমাদের ডিলার এবং খুচরা বিক্রেতাদের নেটওয়ার্কে যোগ দিন। পাইকারি মূল্য, ন্যূনতম অর্ডার পরিমাণ এবং অংশীদারিত্বের সুযোগ নিয়ে আলোচনা করতে আমাদের সাথে যোগাযোগ করুন।',
            ar: 'انضم إلى شبكة التجار وتجار التجزئة لدينا. اتصل بنا لمناقشة أسعار الجملة والحد الأدنى لكميات الطلب وفرص الشراكة.'
          })}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="tel:08801711633202"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            {t({ en: 'Call: 088 01711-633202', bn: 'কল করুন: ০৮৮ ০১৭১১-৬৩৩২০২', ar: 'اتصل: 088 01711-633202' })}
          </a>
          <a
            href="mailto:zenteabd@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-transparent px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {t({ en: 'Email Us', bn: 'আমাদের ইমেল করুন', ar: 'راسلنا عبر البريد الإلكتروني' })}
          </a>
        </div>
      </div>
    </div>
  )
}

export function QualityGuaranteeCard() {
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8">
      <div className="rounded-2xl bg-primary-dark p-8 md:p-12 text-white text-center">
        <h2 className="mb-6 font-serif text-3xl font-bold">
          {t({ en: 'Quality Guarantee', bn: 'গুণমান গ্যারান্টি', ar: 'ضمان الجودة' })}
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-white/90">
          {t({
            en: 'All Zen Tea products are 100% Halal, chemical-free, and sourced from certified tea gardens. Each package comes with a 24-month shelf life from packing date when stored in cool, dry conditions.',
            bn: 'সমস্ত জেন টি পণ্য ১০০% হালাল, রাসায়নিক-মুক্ত এবং প্রত্যয়িত চা বাগান থেকে সংগৃহীত। প্রতিটি প্যাকেজ ঠান্ডা, শুষ্ক অবস্থায় সংরক্ষিত হলে প্যাকিং তারিখ থেকে ২৪ মাসের শেল্ফ লাইফ সহ আসে।',
            ar: 'جميع منتجات شاي زن 100٪ حلال، خالية من المواد الكيميائية، ومن حدائق الشاي المعتمدة.'
          })}
        </p>
        <p className="text-white/70">
          {t({ en: 'Authentic Tea Traders • Jaljalpur, Sagardighi, Ghatail, Tangail', bn: 'অথেন্টিক টি ট্রেডার্স • জালজালপুর, সাগরদিঘি, ঘাটাইল, টাঙ্গাইল', ar: 'تجار الشاي الأصليون • جالجالبور، ساغارديغي، غاتايل، تانغايل' })}
        </p>
      </div>
    </div>
  )
}
