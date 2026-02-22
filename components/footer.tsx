'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function Footer() {
  const { t } = useLanguage()
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => setSettings(data))
      .catch(() => {})
  }, [])

  const phone = settings?.phone || '088 01711-633202'
  const email = settings?.email || 'zenteabd@gmail.com'
  const location = settings?.location?.en || 'Jaljalpur, Sagardighi, Ghatail, Tangail'

  return (
    <footer className="border-t border-border bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="mb-4 font-serif text-2xl font-bold">Zen Tea</h3>
            <p className="mb-4 max-w-md text-sm leading-relaxed text-white/80">
              {t({ 
                en: 'TRUE TASTE OF BANGLADESH', 
                bn: 'বাংলাদেশের প্রকৃত স্বাদ',
                ar: 'الطعم الحقيقي لبنغلاديش'
              })}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-white/80">
              {t({ 
                en: "Premium quality tea blends from Bangladesh's finest tea gardens. Honoring tradition, authenticity, and wellness.",
                bn: 'বাংলাদেশের সেরা চা বাগান থেকে প্রিমিয়াম মানের চা। ঐতিহ্য, সত্যতা এবং সুস্থতার সম্মান।',
                ar: 'خلطات الشاي عالية الجودة من أفضل حدائق الشاي في بنغلاديش. تكريم التقاليد والأصالة والعافية.'
              })}
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">{t({ en: 'Quick Links', bn: 'দ্রুত লিংক', ar: 'روابط سريعة' })}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-white/80 transition-colors hover:text-white">
                  {t({ en: 'About Us', bn: 'আমাদের সম্পর্কে', ar: 'من نحن' })}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 transition-colors hover:text-white">
                  {t({ en: 'Our Products', bn: 'আমাদের পণ্য', ar: 'منتجاتنا' })}
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-white/80 transition-colors hover:text-white">
                  {t({ en: 'Blog', bn: 'ব্লগ', ar: 'المدونة' })}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-semibold">{t({ en: 'Contact', bn: 'যোগাযোগ', ar: 'اتصل بنا' })}</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-white/80">
              {t({ 
                en: 'Authentic Tea Traders',
                bn: 'অথেন্টিক টি ট্রেডার্স',
                ar: 'تجار الشاي الأصليون'
              })}<br />
              {settings?.location ? t(settings.location) : location}
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          <p>
            &copy; {new Date().getFullYear()} Zen Tea. {t({ 
              en: 'All rights reserved.',
              bn: 'সর্বস্বত্ব সংরক্ষিত।',
              ar: 'جميع الحقوق محفوظة.'
            })}
          </p>
        </div>
      </div>
    </footer>
  )
}
