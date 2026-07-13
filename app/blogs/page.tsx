import dbConnect from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'
import { BlogsPageClient } from './blogs-client'

const FALLBACK_BLOGS = [
  {
    _id: 'fallback-1',
    slug: 'health-benefits-black-tea',
    title: {
      en: 'The Health Benefits of Black Tea: Why It\'s Good for You',
      bn: 'কালো চায়ের স্বাস্থ্য উপকারিতা: কেন এটি আপনার জন্য ভাল',
      ar: 'الفوائد الصحية للشاي الأسود: لماذا هو جيد لك'
    },
    excerpt: {
      en: 'Discover the science-backed health benefits of black tea, from antioxidants to heart health and mental clarity.',
      bn: 'অ্যান্টিঅক্সিড্যান্ট থেকে হৃদযন্ত্রের স্বাস্থ্য এবং মানসিক স্বচ্ছতা পর্যন্ত কালো চায়ের বিজ্ঞান-সমর্থিত স্বাস্থ্য উপকারিতা আবিষ্কার করুন।',
      ar: 'اكتشف الفوائد الصحية للشاي الأسود المدعومة بالعلم، من مضادات الأكسدة إلى صحة القلب والوضوح العقلي.'
    },
    thumbnail: '/placeholder.svg?height=400&width=600',
    createdAt: '2024-01-15',
    category: { en: 'Health & Wellness', bn: 'স্বাস্থ্য ও সুস্থতা', ar: 'الصحة والعافية' },
    content: { en: '', bn: '', ar: '' },
    isHidden: false
  },
  {
    _id: 'fallback-2',
    slug: 'bangladesh-tea-heritage',
    title: {
      en: 'The Rich Heritage of Bangladeshi Tea Gardens',
      bn: 'বাংলাদেশী চা বাগানের সমৃদ্ধ ঐতিহ্য',
      ar: 'التراث الغني لحدائق الشاي البنغلاديشية'
    },
    excerpt: {
      en: 'Journey through the lush tea estates of Sylhet, Sreemangal, and Panchagarh—the heartland of Bangladesh\'s tea culture.',
      bn: 'সিলেট, শ্রীমঙ্গল এবং পঞ্চগড়ের সবুজ চা এস্টেট দিয়ে যাত্রা করুন—বাংলাদেশের চা সংস্কৃতির হৃদয়ভূমি।',
      ar: 'رحلة عبر مزارع الشاي الخضراء في سيلهت وسريمانغال وبانشاغار - قلب ثقافة الشاي في بنغلاديش.'
    },
    thumbnail: '/placeholder.svg?height=400&width=600',
    createdAt: '2024-01-10',
    category: { en: 'Heritage', bn: 'ঐতিহ্য', ar: 'تراث' },
    content: { en: '', bn: '', ar: '' },
    isHidden: false
  },
  {
    _id: 'fallback-3',
    slug: 'perfect-cup-brewing-guide',
    title: {
      en: 'How to Brew the Perfect Cup of Tea: A Complete Guide',
      bn: 'কিভাবে নিখুঁত কাপ চা তৈরি করবেন: একটি সম্পূর্ণ নির্দেশিকা',
      ar: 'كيفية تحضير كوب الشاي المثالي: دليل كامل'
    },
    excerpt: {
      en: 'Master the art of tea brewing with our comprehensive guide covering water temperature, steeping time, and more.',
      bn: 'জলের তাপমাত্রা, স্টিপিং সময় এবং আরও অনেক কিছু কভার করে আমাদের ব্যাপক গাইড সহ চা তৈরির শিল্পে দক্ষতা অর্জন করুন।',
      ar: 'إتقان فن تحضير الشاي مع دليلنا الشامل الذي يغطي درجة حرارة الماء ووقت النقع والمزيد.'
    },
    thumbnail: '/placeholder.svg?height=400&width=600',
    createdAt: '2024-01-05',
    category: { en: 'Brewing Tips', bn: 'ব্রিউইং টিপস', ar: 'نصائح التحضير' },
    content: { en: '', bn: '', ar: '' },
    isHidden: false
  }
]

async function getBlogs() {
  try {
    await dbConnect()
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean()
    const visible = JSON.parse(JSON.stringify(blogs)).filter((b: any) => !b.isHidden)
    return visible.length > 0 ? visible : FALLBACK_BLOGS
  } catch {
    return FALLBACK_BLOGS
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs()
  return <BlogsPageClient blogs={blogs} />
}
