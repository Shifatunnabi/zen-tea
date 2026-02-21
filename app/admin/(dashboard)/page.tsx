'use client'

import { useEffect, useState } from 'react'
import { Package, PenSquare, Image, Eye } from 'lucide-react'
import Link from 'next/link'

interface Stats {
  products: number
  blogs: number
  carousel: number
  coreValues: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ products: 0, blogs: 0, carousel: 0, coreValues: 0 })

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/blogs').then(r => r.json()),
      fetch('/api/carousel').then(r => r.json()),
      fetch('/api/core-values').then(r => r.json()),
    ]).then(([products, blogs, carousel, coreValues]) => {
      setStats({
        products: products.length || 0,
        blogs: blogs.length || 0,
        carousel: carousel.length || 0,
        coreValues: coreValues.length || 0,
      })
    })
  }, [])

  const cards = [
    { label: 'Products', count: stats.products, icon: Package, href: '/admin/products', color: 'bg-blue-500' },
    { label: 'Blog Posts', count: stats.blogs, icon: PenSquare, href: '/admin/blogs', color: 'bg-green-500' },
    { label: 'Carousel Slides', count: stats.carousel, icon: Image, href: '/admin', color: 'bg-purple-500' },
    { label: 'Core Values', count: stats.coreValues, icon: Eye, href: '/admin', color: 'bg-orange-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(card => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl bg-white p-6 shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-3xl font-bold mt-1">{card.count}</p>
              </div>
              <div className={`${card.color} rounded-lg p-3 text-white`}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/admin/products" className="rounded-lg border p-4 hover:bg-gray-50 transition-colors">
              <Package className="h-5 w-5 text-primary mb-2" />
              <p className="font-medium text-sm">Manage Products</p>
            </Link>
            <Link href="/admin/blogs" className="rounded-lg border p-4 hover:bg-gray-50 transition-colors">
              <PenSquare className="h-5 w-5 text-primary mb-2" />
              <p className="font-medium text-sm">Manage Blogs</p>
            </Link>
            <Link href="/admin" className="rounded-lg border p-4 hover:bg-gray-50 transition-colors">
              <Image className="h-5 w-5 text-primary mb-2" />
              <p className="font-medium text-sm">Edit Homepage</p>
            </Link>
            <Link href="/admin/settings" className="rounded-lg border p-4 hover:bg-gray-50 transition-colors">
              <Eye className="h-5 w-5 text-primary mb-2" />
              <p className="font-medium text-sm">Site Settings</p>
            </Link>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Helpful Links</h2>
          <div className="space-y-3 text-sm">
            <a href="/" target="_blank" className="flex items-center gap-2 text-primary hover:underline">
              <Eye className="h-4 w-4" /> View Live Site
            </a>
            <a href="/api/seed" target="_blank" className="flex items-center gap-2 text-primary hover:underline">
              <Package className="h-4 w-4" /> Seed Database (first time setup)
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
