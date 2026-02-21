import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Admin from '@/lib/models/Admin'
import Product from '@/lib/models/Product'
import CoreValue from '@/lib/models/CoreValue'
import Heritage from '@/lib/models/Heritage'
import SiteSettings from '@/lib/models/SiteSettings'
import Blog from '@/lib/models/Blog'
import CarouselSlide from '@/lib/models/CarouselSlide'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    await dbConnect()
    const results: string[] = []

    // Seed Admin — always upsert with correct password
    const hashedPassword = await bcrypt.hash('admin@zentea', 12)
    await Admin.findOneAndUpdate(
      { email: 'admin@zentea.com' },
      {
        email: 'admin@zentea.com',
        password: hashedPassword,
        name: 'Super Admin',
        role: 'super_admin',
      },
      { upsert: true, new: true }
    )
    results.push('Admin upserted: admin@zentea.com / admin@zentea')

    // Seed Products
    const productCount = await Product.countDocuments()
    if (productCount === 0) {
      await Product.insertMany([
        {
          name: { en: 'Zen Classic Black Tea', bn: 'জেন ক্লাসিক ব্ল্যাক টি', ar: 'شاي زن الأسود الكلاسيكي' },
          slug: 'zen-classic-black-tea',
          photos: ['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'],
          thumbnailIndex: 0,
          taglineOne: { en: 'Garden-packed', bn: 'বাগান-প্যাক করা', ar: 'معبأ من الحديقة' },
          taglineTwo: { en: 'Garden-packed, robust black tea', bn: 'বাগান-প্যাক করা, শক্তিশালী কালো চা', ar: 'شاي أسود قوي معبأ من الحديقة' },
          shortDetails: { en: 'Crafted with the meticulous "two leaves and a bud" plucking technique.', bn: 'দুটি পাতা এবং একটি কুঁড়ি তোলা কৌশল দিয়ে তৈরি।', ar: 'مصنوع بتقنية القطف الدقيقة "ورقتان وبرعم".' },
          description: { en: '<p>Crafted with the meticulous "two leaves and a bud" plucking technique, Zen Classic Black Tea reflects the timeless skill of our tea artisans.</p>', bn: '<p>দুটি পাতা এবং একটি কুঁড়ি তোলা কৌশল দিয়ে তৈরি।</p>', ar: '<p>مصنوع بتقنية القطف الدقيقة.</p>' },
          keyFeatures: [
            { en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' },
            { en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' },
            { en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' },
            { en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' },
            { en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' },
          ],
          regularPrice: 500, sellingPrice: 450,
          unit: { en: 'per 500g', bn: 'প্রতি ৫০০ গ্রাম', ar: 'لكل 500 جرام' },
          shippingDetails: { en: 'Available for shipping across Bangladesh and international markets.', bn: 'বাংলাদেশ জুড়ে শিপিংয়ের জন্য উপলব্ধ।', ar: 'متاح للشحن في جميع أنحاء بنغلاديش.' },
          isHidden: false, order: 1,
        },
        {
          name: { en: 'Zen Premium Blend Tea', bn: 'জেন প্রিমিয়াম ব্লেন্ড টি', ar: 'شاي زن الممتاز المخلوط' },
          slug: 'zen-premium-blend-tea',
          photos: ['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'],
          thumbnailIndex: 0,
          taglineOne: { en: 'Premium Selection', bn: 'প্রিমিয়াম নির্বাচন', ar: 'اختيار ممتاز' },
          taglineTwo: { en: 'Curated from top-tier tea gardens', bn: 'শীর্ষ-স্তরের চা বাগান থেকে সংগৃহীত', ar: 'منسقة من أفضل حدائق الشاي' },
          shortDetails: { en: 'Crafted from the finest tea leaves sourced from the top tea gardens.', bn: 'সেরা চা পাতা থেকে তৈরি।', ar: 'مصنوع من أفضل أوراق الشاي.' },
          description: { en: '<p>Crafted from the finest tea leaves sourced from the top tea gardens in Sylhet, Sreemangal and Panchagarh.</p>', bn: '<p>সিলেট, শ্রীমঙ্গল এবং পঞ্চগড়ের শীর্ষ চা বাগান থেকে সংগৃহীত।</p>', ar: '<p>مصنوع من أفضل أوراق الشاي.</p>' },
          keyFeatures: [
            { en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' },
            { en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' },
            { en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' },
            { en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' },
            { en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' },
          ],
          regularPrice: 600, sellingPrice: 550,
          unit: { en: 'per 500g', bn: 'প্রতি ৫০০ গ্রাম', ar: 'لكل 500 جرام' },
          shippingDetails: { en: 'Available for shipping across Bangladesh and international markets.', bn: 'বাংলাদেশ এবং আন্তর্জাতিক বাজার জুড়ে শিপিংয়ের জন্য উপলব্ধ।', ar: 'متاح للشحن في بنغلاديش والأسواق الدولية.' },
          isHidden: false, order: 2,
        },
        {
          name: { en: 'Zen Royal Gold Tea', bn: 'জেন রয়েল গোল্ড টি', ar: 'شاي زن الذهبي الملكي' },
          slug: 'zen-royal-gold-tea',
          photos: ['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'],
          thumbnailIndex: 0,
          taglineOne: { en: 'Royal Collection', bn: 'রয়্যাল কালেকশন', ar: 'المجموعة الملكية' },
          taglineTwo: { en: 'Strong liquor, luxury richness', bn: 'শক্তিশালী তরল, বিলাসবহুল সমৃদ্ধি', ar: 'سائل قوي، ثراء فاخر' },
          shortDetails: { en: 'More than just a tea; connection to the land and generations.', bn: 'শুধু একটি চা নয়; ভূমি ও প্রজন্মের সংযোগ।', ar: 'أكثر من مجرد شاي.' },
          description: { en: '<p>More than just a tea; it represents a connection to the land and generations of tea pluckers.</p>', bn: '<p>শুধু একটি চা নয়; এটি ভূমি ও প্রজন্মের সংযোগ।</p>', ar: '<p>أكثر من مجرد شاي.</p>' },
          keyFeatures: [
            { en: 'Robust and fresh brewed tea', bn: 'মজবুত এবং তাজা তৈরি চা', ar: 'شاي قوي وطازج' },
            { en: 'Strong and long-lasting liquor', bn: 'শক্তিশালী এবং দীর্ঘস্থায়ী তরল', ar: 'سائل قوي وطويل الأمد' },
            { en: 'Sharp and fresh taste', bn: 'তীক্ষ্ণ এবং তাজা স্বাদ', ar: 'طعم حاد وطازج' },
            { en: 'Rich, long-lasting color', bn: 'সমৃদ্ধ, দীর্ঘস্থায়ী রঙ', ar: 'لون غني وطويل الأمد' },
            { en: 'Attractive and mind-refreshing flavor', bn: 'আকর্ষণীয় এবং মন-সতেজকারী স্বাদ', ar: 'نكهة جذابة ومنعشة للعقل' },
          ],
          regularPrice: 700, sellingPrice: 650,
          unit: { en: 'per 500g', bn: 'প্রতি ৫০০ গ্রাম', ar: 'لكل 500 جرام' },
          shippingDetails: { en: 'Premium shipping available worldwide.', bn: 'বিশ্বব্যাপী প্রিমিয়াম শিপিং উপলব্ধ।', ar: 'الشحن المتميز متاح في جميع أنحاء العالم.' },
          isHidden: false, order: 3,
        },
      ])
      results.push('Products seeded')
    }

    // Seed Core Values
    const cvCount = await CoreValue.countDocuments()
    if (cvCount === 0) {
      await CoreValue.insertMany([
        { image: '/placeholder.svg?height=350&width=1000', name: { en: 'Authenticity', bn: 'সত্যতা', ar: 'الأصالة' }, description: { en: 'Rooted in our land, our stories, and our traditional process', bn: 'আমাদের ভূমি, আমাদের গল্প এবং আমাদের ঐতিহ্যবাহী প্রক্রিয়ায় মূলবদ্ধ', ar: 'متجذر في أرضنا وقصصنا وعمليتنا التقليدية' }, order: 1, isHidden: false },
        { image: '/placeholder.svg?height=350&width=1000', name: { en: 'Purity', bn: 'বিশুদ্ধতা', ar: 'النقاء' }, description: { en: 'No compromise in quality, health, or sourcing standards', bn: 'মান, স্বাস্থ্য বা উৎসের মানদণ্ডে কোনো আপস নেই', ar: 'لا مساومة في معايير الجودة أو الصحة أو المصادر' }, order: 2, isHidden: false },
        { image: '/placeholder.svg?height=350&width=1000', name: { en: 'Sustainability', bn: 'স্থায়িত্ব', ar: 'الاستدامة' }, description: { en: 'Ethical practices in plucking, packaging, and supply chain', bn: 'তোলা, প্যাকেজিং এবং সরবরাহ শৃঙ্খলে নৈতিক অনুশীলন', ar: 'ممارسات أخلاقية في القطف والتعبئة وسلسلة التوريد' }, order: 3, isHidden: false },
        { image: '/placeholder.svg?height=350&width=1000', name: { en: 'Heritage', bn: 'ঐতিহ্য', ar: 'التراث' }, description: { en: 'Celebrating timeless craftsmanship of Bangladeshi tea culture', bn: 'বাংলাদেশী চা সংস্কৃতির নিরন্তন কারুশিল্প উদযাপন', ar: 'الاحتفال بالحرفية الخالدة لثقافة الشاي البنغلاديشية' }, order: 4, isHidden: false },
      ])
      results.push('Core values seeded')
    }

    // Seed Heritage
    const hCount = await Heritage.countDocuments()
    if (hCount === 0) {
      await Heritage.create({
        video: '',
        headline: { en: 'A Legacy of Excellence', bn: 'উৎকর্ষের উত্তরাধিকার', ar: 'إرث من التميز' },
        description: { en: 'From the lush tea gardens of Sylhet, Sreemangal, and Panchagarh, we source only the finest leaves.', bn: 'সিলেট, শ্রীমঙ্গল এবং পঞ্চগড়ের সবুজ চা বাগান থেকে সেরা পাতা সংগ্রহ করি।', ar: 'من حدائق الشاي الخضراء نحصل فقط على أفضل الأوراق.' },
      })
      results.push('Heritage seeded')
    }

    // Seed Settings
    const sCount = await SiteSettings.countDocuments()
    if (sCount === 0) {
      await SiteSettings.create({
        phone: '088 01711-633202',
        email: 'zenteabd@gmail.com',
        location: { en: 'Jaljalpur, Sagardighi, Ghatail, Tangail', bn: 'জালজালপুর, সাগরদিঘি, ঘাটাইল, টাঙ্গাইল', ar: 'جالجالبور، ساغارديغي، غاتايل، تانغايل' },
        missionText: { en: "To offer premium-quality tea blends crafted from Bangladesh's most iconic tea gardens.", bn: 'বাংলাদেশের সবচেয়ে আইকনিক চা বাগান থেকে তৈরি প্রিমিয়াম-মানের চা মিশ্রণ অফার করা।', ar: 'تقديم خلطات شاي عالية الجودة.' },
        visionText: { en: 'To be the most trusted and cherished tea brand from Bangladesh.', bn: 'বাংলাদেশ থেকে সবচেয়ে বিশ্বস্ত চা ব্র্যান্ড হওয়া।', ar: 'أن نكون العلامة التجارية الأكثر موثوقية.' },
        artOfTeaHeadline: { en: 'The Art of Tea Making', bn: 'চা তৈরির শিল্প', ar: 'فن صنع الشاي' },
        artOfTeaDescription: { en: 'Our tea is crafted using the traditional "two leaves and a bud" plucking technique.', bn: 'আমাদের চা ঐতিহ্যবাহী তোলা কৌশল ব্যবহার করে তৈরি।', ar: 'يتم صنع شاينا باستخدام تقنية القطف التقليدية.' },
        artOfTeaFeatures: [
          { en: '100% Chemical-free and natural', bn: '১০০% রাসায়নিক-মুক্ত', ar: '100٪ خالية من الكيميائيات' },
          { en: 'Sourced from Sylhet, Sreemangal & Panchagarh', bn: 'সিলেট, শ্রীমঙ্গল ও পঞ্চগড় থেকে', ar: 'من سيلهيت وسريمانغال' },
          { en: 'Traditional plucking methods preserved', bn: 'ঐতিহ্যবাহী তোলা পদ্ধতি সংরক্ষিত', ar: 'طرق القطف التقليدية' },
          { en: '24-month shelf life', bn: '২৪ মাসের শেল্ফ লাইফ', ar: 'مدة صلاحية 24 شهرًا' },
        ],
      })
      results.push('Site settings seeded')
    }

    // Seed Blogs
    const bCount = await Blog.countDocuments()
    if (bCount === 0) {
      await Blog.insertMany([
        {
          title: { en: 'The Health Benefits of Black Tea', bn: 'কালো চায়ের স্বাস্থ্য উপকারিতা', ar: 'الفوائد الصحية للشاي الأسود' },
          slug: 'health-benefits-black-tea',
          thumbnail: '/placeholder.svg?height=400&width=600',
          excerpt: { en: 'Discover the science-backed health benefits of black tea.', bn: 'কালো চায়ের বিজ্ঞান-সমর্থিত উপকারিতা আবিষ্কার করুন।', ar: 'اكتشف الفوائد الصحية المدعومة بالعلم.' },
          category: { en: 'Health & Wellness', bn: 'স্বাস্থ্য ও সুস্থতা', ar: 'الصحة والعافية' },
          content: { en: '<h2>Rich in Antioxidants</h2><p>Black tea contains powerful antioxidants called polyphenols.</p><h2>Heart Health</h2><p>Regular consumption has been linked to improved heart health.</p>', bn: '<h2>অ্যান্টিঅক্সিড্যান্টে সমৃদ্ধ</h2><p>কালো চায়ে পলিফেনল রয়েছে।</p>', ar: '<h2>غني بمضادات الأكسدة</h2><p>يحتوي الشاي الأسود على البوليفينول.</p>' },
          isHidden: false,
          createdAt: new Date('2024-01-15'),
        },
        {
          title: { en: 'The Rich Heritage of Bangladeshi Tea Gardens', bn: 'বাংলাদেশী চা বাগানের সমৃদ্ধ ঐতিহ্য', ar: 'التراث الغني لحدائق الشاي' },
          slug: 'bangladesh-tea-heritage',
          thumbnail: '/placeholder.svg?height=400&width=600',
          excerpt: { en: 'Journey through the lush tea estates of Sylhet, Sreemangal, and Panchagarh.', bn: 'সিলেট, শ্রীমঙ্গল ও পঞ্চগড়ের চা এস্টেট।', ar: 'رحلة عبر مزارع الشاي الخضراء.' },
          category: { en: 'Heritage', bn: 'ঐতিহ্য', ar: 'تراث' },
          content: { en: '<h2>The Birthplace of Tea</h2><p>Bangladesh tea heritage dates back to the British colonial era.</p>', bn: '<h2>চায়ের জন্মস্থান</h2><p>বাংলাদেশের চা ঐতিহ্য ব্রিটিশ যুগে।</p>', ar: '<h2>مسقط رأس الشاي</h2><p>تراث الشاي يعود للعصر البريطاني.</p>' },
          isHidden: false,
          createdAt: new Date('2024-01-10'),
        },
        {
          title: { en: 'How to Brew the Perfect Cup of Tea', bn: 'কিভাবে নিখুঁত কাপ চা তৈরি করবেন', ar: 'كيفية تحضير كوب الشاي المثالي' },
          slug: 'perfect-cup-brewing-guide',
          thumbnail: '/placeholder.svg?height=400&width=600',
          excerpt: { en: 'Master the art of tea brewing with our guide.', bn: 'চা তৈরির শিল্পে দক্ষতা অর্জন করুন।', ar: 'إتقان فن تحضير الشاي.' },
          category: { en: 'Brewing Tips', bn: 'ব্রিউইং টিপস', ar: 'نصائح التحضير' },
          content: { en: '<h2>Essential Equipment</h2><p>A good teapot, strainer, kettle, and quality tea.</p><h2>The Method</h2><p>Use fresh water, proper temperature, steep 3-5 minutes.</p>', bn: '<h2>প্রয়োজনীয় সরঞ্জাম</h2><p>ভালো চায়ের পাত্র ও ছাঁকনি।</p>', ar: '<h2>المعدات الأساسية</h2><p>إبريق شاي جيد ومصفاة.</p>' },
          isHidden: false,
          createdAt: new Date('2024-01-05'),
        },
      ])
      results.push('Blogs seeded')
    }

    // Seed Carousel
    const cCount = await CarouselSlide.countDocuments()
    if (cCount === 0) {
      await CarouselSlide.insertMany([
        {
          image: '/placeholder.svg?height=350&width=1000',
          headline: { en: 'True Taste of Bangladesh', bn: 'বাংলাদেশের প্রকৃত স্বাদ', ar: 'الطعم الحقيقي لبنغلاديش' },
          subtext: { en: 'Premium quality tea blends from the finest tea gardens', bn: 'সেরা চা বাগান থেকে প্রিমিয়াম মানের চা', ar: 'خلطات الشاي عالية الجودة' },
          order: 1, isHidden: false,
        },
        {
          image: '/placeholder.svg?height=350&width=1000',
          headline: { en: 'Honoring Tea Heritage', bn: 'চা ঐতিহ্যের সম্মান', ar: 'تكريم تراث الشاي' },
          subtext: { en: 'Traditional methods, modern quality', bn: 'ঐতিহ্যবাহী পদ্ধতি, আধুনিক মান', ar: 'طرق تقليدية، جودة حديثة' },
          order: 2, isHidden: false,
        },
      ])
      results.push('Carousel seeded')
    }

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
