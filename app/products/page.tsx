import dbConnect from '@/lib/mongodb'
import Product from '@/lib/models/Product'
import { ProductsPageClient } from './products-client'

const staticProducts = [
  {
    _id: '1',
    name: { en: 'Zen Classic Black Tea', bn: 'জেন ক্লাসিক ব্ল্যাক টি', ar: 'شاي زن الأسود الكلاسيكي' },
    slug: 'zen-classic-black-tea',
    photos: ['/placeholder.svg?height=600&width=600'],
    thumbnailIndex: 0,
    taglineOne: { en: 'Garden-packed, robust black tea', bn: 'বাগান-প্যাক করা, শক্তিশালী কালো চা', ar: 'شاي أسود قوي معبأ من الحديقة' },
    taglineTwo: { en: 'Traditional flavor, local familiarity', bn: 'ঐতিহ্যবাহী স্বাদ, স্থানীয় পরিচিতি', ar: 'نكهة تقليدية، ألفة محلية' },
    shortDetails: {
      en: 'Crafted with the meticulous "two leaves and a bud" plucking technique, reflecting the timeless skill of our tea artisans. This legacy passed down from mothers to daughters ensures only the finest leaves are included in our blend.',
      bn: 'আমাদের চা শিল্পীদের নিরবধি দক্ষতা প্রতিফলিত করে সতর্কতার সাথে "দুটি পাতা এবং একটি কুঁড়ি" তোলা কৌশল দিয়ে তৈরি।',
      ar: 'مصنوع بتقنية القطف الدقيقة "ورقتان وبرعم"، مما يعكس المهارة الخالدة لحرفيي الشاي لدينا.'
    },
    description: { en: '', bn: '', ar: '' },
    keyFeatures: [
      { en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' },
      { en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' },
      { en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' },
      { en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' },
      { en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' },
    ],
    regularPrice: 0,
    sellingPrice: 0,
    unit: { en: '', bn: '', ar: '' },
    isHidden: false,
  },
  {
    _id: '2',
    name: { en: 'Zen Premium Blend Tea', bn: 'জেন প্রিমিয়াম ব্লেন্ড টি', ar: 'شاي زن الممتاز المخلوط' },
    slug: 'zen-premium-blend-tea',
    photos: ['/placeholder.svg?height=600&width=600'],
    thumbnailIndex: 0,
    taglineOne: { en: 'Curated from top-tier tea gardens', bn: 'শীর্ষ-স্তরের চা বাগান থেকে সংগৃহীত', ar: 'منسقة من أفضل حدائق الشاي' },
    taglineTwo: { en: 'Balance of strength and aroma', bn: 'শক্তি এবং সুগন্ধের ভারসাম্য', ar: 'توازن القوة والرائحة' },
    shortDetails: {
      en: 'Crafted from the finest tea leaves sourced from the top tea gardens in Sylhet, Sreemangal and Panchagarh of Bangladesh. This tea is entirely chemical-free and will invigorate you with its natural color, taste, and aroma.',
      bn: 'বাংলাদেশের সিলেট, শ্রীমঙ্গল এবং পঞ্চগড়ের শীর্ষ চা বাগান থেকে সংগৃহীত সেরা চা পাতা থেকে তৈরি।',
      ar: 'مصنوع من أفضل أوراق الشاي من أفضل حدائق الشاي في سيلهت وسريمانغال وبانشاغار في بنغلاديش.'
    },
    description: { en: '', bn: '', ar: '' },
    keyFeatures: [
      { en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' },
      { en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' },
      { en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' },
      { en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' },
      { en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' },
    ],
    regularPrice: 0,
    sellingPrice: 0,
    unit: { en: '', bn: '', ar: '' },
    isHidden: false,
  },
  {
    _id: '3',
    name: { en: 'Zen Royal Gold Tea', bn: 'জেন রয়েল গোল্ড টি', ar: 'شاي زن الذهبي الملكي' },
    slug: 'zen-royal-gold-tea',
    photos: ['/placeholder.svg?height=600&width=600'],
    thumbnailIndex: 0,
    taglineOne: { en: 'Strong liquor, luxury richness', bn: 'শক্তিশালী তরল, বিলাসবহুল সমৃদ্ধি', ar: 'سائل قوي، ثراء فاخر' },
    taglineTwo: { en: 'High energy, luxury, everyday richness', bn: 'উচ্চ শক্তি, বিলাসিতা, দৈনন্দিন সমৃদ্ধি', ar: 'طاقة عالية، رفاهية، ثراء يومي' },
    shortDetails: {
      en: 'More than just a tea; it represents a connection to the land and generations of tea pluckers who have cultivated it. Embodies the rich cultural heritage of Bangladesh with the taste of home and the essence of tradition.',
      bn: 'শুধু একটি চা নয়; এটি ভূমি এবং চা তোলা প্রজন্মের সাথে একটি সংযোগ প্রতিনিধিত্ব করে।',
      ar: 'أكثر من مجرد شاي؛ إنه يمثل اتصالاً بالأرض وأجيال من قاطفي الشاي الذين زرعوه.'
    },
    description: { en: '', bn: '', ar: '' },
    keyFeatures: [
      { en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' },
      { en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' },
      { en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' },
      { en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' },
      { en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' },
    ],
    regularPrice: 0,
    sellingPrice: 0,
    unit: { en: '', bn: '', ar: '' },
    isHidden: false,
  },
]

async function getProducts() {
  try {
    await dbConnect()
    const products = await Product.find().sort({ order: 1, createdAt: -1 }).lean()
    const visible = JSON.parse(JSON.stringify(products)).filter((p: any) => !p.isHidden)
    return visible.length > 0 ? visible : staticProducts
  } catch {
    return staticProducts
  }
}

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductsPageClient products={products} />
}
