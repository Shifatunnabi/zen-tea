'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Loader2, Save, Plus, Trash2, Eye, EyeOff, ArrowLeft,
  X, Star, Upload, ChevronDown, ChevronUp
} from 'lucide-react'
import MultiLangInput from '@/components/admin/multi-lang-input'
import FileUpload from '@/components/admin/file-upload'
import { MultiLangRichText } from '@/components/admin/rich-text-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

/* ─── Types ─── */
interface MultiLang { en: string; bn: string; ar: string }
const emptyLang = (): MultiLang => ({ en: '', bn: '', ar: '' })

interface Product {
  _id?: string
  name: MultiLang
  slug: string
  photos: string[]
  thumbnailIndex: number
  taglineOne: MultiLang
  taglineTwo: MultiLang
  shortDetails: MultiLang
  description: MultiLang
  keyFeatures: MultiLang[]
  regularPrice: number
  sellingPrice: number
  unit: MultiLang
  shippingDetails: MultiLang
  isHidden: boolean
  order: number
}

const emptyProduct = (): Product => ({
  name: emptyLang(),
  slug: '',
  photos: [],
  thumbnailIndex: 0,
  taglineOne: emptyLang(),
  taglineTwo: emptyLang(),
  shortDetails: emptyLang(),
  description: emptyLang(),
  keyFeatures: [],
  regularPrice: 0,
  sellingPrice: 0,
  unit: emptyLang(),
  shippingDetails: emptyLang(),
  isHidden: false,
  order: 0,
})

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/* ─── Product List View ─── */
function ProductList({
  products,
  onEdit,
  onToggleHide,
  onDelete,
  onAdd,
}: {
  products: Product[]
  onEdit: (p: Product) => void
  onToggleHide: (p: Product) => void
  onDelete: (p: Product) => void
  onAdd: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products ({products.length})</h1>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {product.photos[0] && (
              <Image
                src={product.photos[0]}
                alt={product.name.en}
                width={80}
                height={80}
                className="h-20 w-20 rounded-lg object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{product.name.en || 'Untitled'}</h3>
              <p className="text-sm text-muted-foreground truncate">{product.slug}</p>
              <div className="flex items-center gap-2 mt-1 text-sm">
                {product.sellingPrice > 0 && (
                  <span className="font-medium text-primary">৳{product.sellingPrice}</span>
                )}
                {product.regularPrice > 0 && product.regularPrice !== product.sellingPrice && (
                  <span className="text-muted-foreground line-through">৳{product.regularPrice}</span>
                )}
                {product.isHidden && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Hidden</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => onToggleHide(product)}>
                {product.isHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={() => onEdit(product)}>
                Edit
              </Button>
              <Button size="sm" variant="outline" className="text-red-500" onClick={() => onDelete(product)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No products yet.</p>
            <Button onClick={onAdd} variant="outline" className="mt-4">
              <Plus className="h-4 w-4 mr-2" /> Add Your First Product
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Photo Manager ─── */
function PhotoManager({
  photos,
  thumbnailIndex,
  onChange,
  onChangeThumbnail,
}: {
  photos: string[]
  thumbnailIndex: number
  onChange: (photos: string[]) => void
  onChangeThumbnail: (i: number) => void
}) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    setUploading(true)
    const newPhotos = [...photos]
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        if (data.url) newPhotos.push(data.url)
      } catch {}
    }
    onChange(newPhotos)
    setUploading(false)
  }

  const removePhoto = (i: number) => {
    const newPhotos = photos.filter((_, idx) => idx !== i)
    onChange(newPhotos)
    if (thumbnailIndex >= newPhotos.length) onChangeThumbnail(0)
  }

  return (
    <div className="space-y-3">
      <Label>Product Photos</Label>
      <div className="flex flex-wrap gap-3">
        {photos.map((photo, i) => (
          <div key={i} className="relative group">
            <Image
              src={photo}
              alt={`Photo ${i + 1}`}
              width={120}
              height={120}
              className={`h-28 w-28 rounded-lg object-cover border-2 ${
                i === thumbnailIndex ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200'
              }`}
            />
            <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => onChangeThumbnail(i)}
                className="rounded-full bg-white p-1.5 text-primary hover:bg-primary hover:text-white transition-colors"
                title="Set as thumbnail"
              >
                <Star className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="rounded-full bg-white p-1.5 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                title="Remove"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            {i === thumbnailIndex && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">
                Thumb
              </span>
            )}
          </div>
        ))}

        <label className="flex h-28 w-28 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-primary hover:bg-primary/5 transition-colors">
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <Upload className="h-5 w-5 text-gray-400" />
          )}
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
        </label>
      </div>
      <p className="text-xs text-muted-foreground">Click the star icon to set thumbnail. Upload multiple photos at once.</p>
    </div>
  )
}

/* ─── Product Form ─── */
function ProductForm({
  product,
  onSave,
  onCancel,
  saving,
}: {
  product: Product
  onSave: (p: Product) => void
  onCancel: () => void
  saving: boolean
}) {
  const [form, setForm] = useState<Product>(product)
  const isNew = !product._id

  const update = (patch: Partial<Product>) => setForm(prev => ({ ...prev, ...patch }))

  // Auto-generate slug from English name
  const handleNameChangeEn = (v: string) => {
    update({ name: { ...form.name, en: v } })
    if (isNew) update({ name: { ...form.name, en: v }, slug: slugify(v) })
  }

  const addKeyFeature = () => {
    setForm(prev => ({ ...prev, keyFeatures: [...prev.keyFeatures, emptyLang()] }))
  }

  const updateKeyFeature = (i: number, patch: Partial<MultiLang>) => {
    const updated = form.keyFeatures.map((f, idx) => idx === i ? { ...f, ...patch } : f)
    setForm(prev => ({ ...prev, keyFeatures: updated }))
  }

  const removeKeyFeature = (i: number) => {
    setForm(prev => ({ ...prev, keyFeatures: prev.keyFeatures.filter((_, idx) => idx !== i) }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="text-2xl font-bold">{isNew ? 'Add Product' : 'Edit Product'}</h1>
      </div>

      {/* Basic Info */}
      <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Basic Information</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <MultiLangInput
            label="Product Name"
            valueEn={form.name.en} valueBn={form.name.bn} valueAr={form.name.ar}
            onChangeEn={handleNameChangeEn}
            onChangeBn={(v) => update({ name: { ...form.name, bn: v } })}
            onChangeAr={(v) => update({ name: { ...form.name, ar: v } })}
          />
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input
              value={form.slug}
              onChange={(e) => update({ slug: e.target.value })}
              placeholder="product-slug"
            />
          </div>
        </div>

        <PhotoManager
          photos={form.photos}
          thumbnailIndex={form.thumbnailIndex}
          onChange={(photos) => update({ photos })}
          onChangeThumbnail={(i) => update({ thumbnailIndex: i })}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <MultiLangInput
            label="Tagline One"
            valueEn={form.taglineOne.en} valueBn={form.taglineOne.bn} valueAr={form.taglineOne.ar}
            onChangeEn={(v) => update({ taglineOne: { ...form.taglineOne, en: v } })}
            onChangeBn={(v) => update({ taglineOne: { ...form.taglineOne, bn: v } })}
            onChangeAr={(v) => update({ taglineOne: { ...form.taglineOne, ar: v } })}
          />
          <MultiLangInput
            label="Tagline Two"
            valueEn={form.taglineTwo.en} valueBn={form.taglineTwo.bn} valueAr={form.taglineTwo.ar}
            onChangeEn={(v) => update({ taglineTwo: { ...form.taglineTwo, en: v } })}
            onChangeBn={(v) => update({ taglineTwo: { ...form.taglineTwo, bn: v } })}
            onChangeAr={(v) => update({ taglineTwo: { ...form.taglineTwo, ar: v } })}
          />
        </div>

        <MultiLangInput
          label="Short Details"
          valueEn={form.shortDetails.en} valueBn={form.shortDetails.bn} valueAr={form.shortDetails.ar}
          onChangeEn={(v) => update({ shortDetails: { ...form.shortDetails, en: v } })}
          onChangeBn={(v) => update({ shortDetails: { ...form.shortDetails, bn: v } })}
          onChangeAr={(v) => update({ shortDetails: { ...form.shortDetails, ar: v } })}
          multiline rows={3}
        />
      </div>

      {/* Description */}
      <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Description</h2>
        <MultiLangRichText
          label="Full Description"
          valueEn={form.description.en} valueBn={form.description.bn} valueAr={form.description.ar}
          onChangeEn={(v) => update({ description: { ...form.description, en: v } })}
          onChangeBn={(v) => update({ description: { ...form.description, bn: v } })}
          onChangeAr={(v) => update({ description: { ...form.description, ar: v } })}
        />
      </div>

      {/* Key Features */}
      <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Key Features</h2>
        {form.keyFeatures.map((feature, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1">
              <MultiLangInput
                label={`Feature ${i + 1}`}
                valueEn={feature.en} valueBn={feature.bn} valueAr={feature.ar}
                onChangeEn={(v) => updateKeyFeature(i, { en: v })}
                onChangeBn={(v) => updateKeyFeature(i, { bn: v })}
                onChangeAr={(v) => updateKeyFeature(i, { ar: v })}
              />
            </div>
            <Button size="sm" variant="outline" className="text-red-500 mt-7" onClick={() => removeKeyFeature(i)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addKeyFeature} className="border-dashed">
          <Plus className="h-4 w-4 mr-2" /> Add Feature
        </Button>
      </div>

      {/* Pricing & Details */}
      <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Pricing & Details</h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Regular Price (৳)</Label>
            <Input
              type="number"
              value={form.regularPrice}
              onChange={(e) => update({ regularPrice: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label>Selling Price (৳)</Label>
            <Input
              type="number"
              value={form.sellingPrice}
              onChange={(e) => update({ sellingPrice: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label>Order</Label>
            <Input
              type="number"
              value={form.order}
              onChange={(e) => update({ order: Number(e.target.value) })}
            />
          </div>
        </div>

        <MultiLangInput
          label="Unit"
          valueEn={form.unit.en} valueBn={form.unit.bn} valueAr={form.unit.ar}
          onChangeEn={(v) => update({ unit: { ...form.unit, en: v } })}
          onChangeBn={(v) => update({ unit: { ...form.unit, bn: v } })}
          onChangeAr={(v) => update({ unit: { ...form.unit, ar: v } })}
        />

        <MultiLangInput
          label="Shipping Details"
          valueEn={form.shippingDetails.en} valueBn={form.shippingDetails.bn} valueAr={form.shippingDetails.ar}
          onChangeEn={(v) => update({ shippingDetails: { ...form.shippingDetails, en: v } })}
          onChangeBn={(v) => update({ shippingDetails: { ...form.shippingDetails, bn: v } })}
          onChangeAr={(v) => update({ shippingDetails: { ...form.shippingDetails, ar: v } })}
          multiline rows={3}
        />
      </div>

      {/* Save */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(form)} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {isNew ? 'Create Product' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Product | null>(null)
  const [saving, setSaving] = useState(false)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data || [])
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { loadProducts() }, [loadProducts])

  const handleSave = async (product: Product) => {
    setSaving(true)
    try {
      if (product._id) {
        await fetch(`/api/products/${product._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        })
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        })
      }
      setEditing(null)
      loadProducts()
    } catch {}
    setSaving(false)
  }

  const handleToggleHide = async (product: Product) => {
    if (!product._id) return
    await fetch(`/api/products/${product._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, isHidden: !product.isHidden }),
    })
    loadProducts()
  }

  const handleDelete = async (product: Product) => {
    if (!product._id || !confirm('Delete this product?')) return
    await fetch(`/api/products/${product._id}`, { method: 'DELETE' })
    loadProducts()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (editing) {
    return (
      <ProductForm
        product={editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
        saving={saving}
      />
    )
  }

  return (
    <ProductList
      products={products}
      onEdit={(p) => setEditing(p)}
      onToggleHide={handleToggleHide}
      onDelete={handleDelete}
      onAdd={() => setEditing(emptyProduct())}
    />
  )
}
