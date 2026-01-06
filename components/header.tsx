'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLanguage } from '@/lib/language-context'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navigation = [
    { name: t({ en: 'Home', bn: 'হোম', ar: 'الرئيسية' }), href: '/' },
    { name: t({ en: 'About', bn: 'সম্পর্কে', ar: 'من نحن' }), href: '/about' },
    { name: t({ en: 'Products', bn: 'পণ্য', ar: 'المنتجات' }), href: '/products' },
    { name: t({ en: 'Blog', bn: 'ব্লগ', ar: 'المدونة' }), href: '/blogs' },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="font-serif text-2xl font-bold text-primary">Zen Tea</span>
            </Link>
          </div>
          
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium leading-6 text-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 lg:items-center">
            <LanguageSwitcher />
            <Button asChild>
              <Link href="/products">{t({ en: 'Become a Dealer', bn: 'ডিলার হন', ar: 'كن موزعًا' })}</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-0 z-50 w-full sm:max-w-md overflow-y-auto transition-transform duration-500 ease-in-out lg:hidden ml-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#162517' }}
      >
        <div className="flex flex-col h-full px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="font-serif text-2xl font-bold text-white">Zen Tea</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-12 flex-1">
            <div className="space-y-4">
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block text-2xl font-medium text-white hover:text-accent transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${(index + 1) * 100}ms` : '0ms',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className={`space-y-6 transition-all duration-500 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: mobileMenuOpen ? '500ms' : '0ms',
          }}>
            <div className="flex justify-center">
              <LanguageSwitcher />
            </div>
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-foreground">
              <Link href="/products">{t({ en: 'Become a Dealer', bn: 'ডিলার হন', ar: 'كن موزعًا' })}</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
