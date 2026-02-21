'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Trash2, Eye, EyeOff, GripVertical, Loader2, Save, ChevronDown, ChevronUp } from 'lucide-react'
import MultiLangInput from '@/components/admin/multi-lang-input'
import FileUpload from '@/components/admin/file-upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/* ─── Types ─── */
interface MultiLang { en: string; bn: string; ar: string }
const emptyLang = (): MultiLang => ({ en: '', bn: '', ar: '' })

interface CarouselSlide {
  _id?: string
  image: string
  headline: MultiLang
  subtext: MultiLang
  order: number
  isHidden: boolean
}

interface CoreValue {
  _id?: string
  image: string
  name: MultiLang
  description: MultiLang
  order: number
  isHidden: boolean
}

interface Heritage {
  _id?: string
  video: string
  headline: MultiLang
  description: MultiLang
}

/* ─── Section wrapper ─── */
function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left"
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {open && <div className="border-t p-5 pt-4">{children}</div>}
    </div>
  )
}

/* ─── Main Page ─── */
export default function AdminHomepage() {
  const [slides, setSlides] = useState<CarouselSlide[]>([])
  const [coreValues, setCoreValues] = useState<CoreValue[]>([])
  const [heritage, setHeritage] = useState<Heritage>({ video: '', headline: emptyLang(), description: emptyLang() })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [slidesRes, cvRes, hRes] = await Promise.all([
        fetch('/api/carousel').then(r => r.json()),
        fetch('/api/core-values').then(r => r.json()),
        fetch('/api/heritage').then(r => r.json()),
      ])
      setSlides(slidesRes || [])
      setCoreValues(cvRes || [])
      if (hRes && !hRes.error) setHeritage(hRes)
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { loadData() }, [loadData])

  /* ─── Carousel CRUD ─── */
  const addSlide = () => {
    setSlides([...slides, { image: '', headline: emptyLang(), subtext: emptyLang(), order: slides.length, isHidden: false }])
  }

  const updateSlide = (i: number, patch: Partial<CarouselSlide>) => {
    setSlides(slides.map((s, idx) => (idx === i ? { ...s, ...patch } : s)))
  }

  const saveSlide = async (slide: CarouselSlide, i: number) => {
    setSaving(`slide-${i}`)
    try {
      if (slide._id) {
        const res = await fetch(`/api/carousel/${slide._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slide),
        })
        const data = await res.json()
        updateSlide(i, data)
      } else {
        const res = await fetch('/api/carousel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slide),
        })
        const data = await res.json()
        updateSlide(i, data)
      }
    } catch {}
    setSaving(null)
  }

  const deleteSlide = async (slide: CarouselSlide, i: number) => {
    if (!confirm('Delete this slide?')) return
    if (slide._id) {
      await fetch(`/api/carousel/${slide._id}`, { method: 'DELETE' })
    }
    setSlides(slides.filter((_, idx) => idx !== i))
  }

  /* ─── Core Values CRUD ─── */
  const addCoreValue = () => {
    setCoreValues([...coreValues, { image: '', name: emptyLang(), description: emptyLang(), order: coreValues.length, isHidden: false }])
  }

  const updateCoreValue = (i: number, patch: Partial<CoreValue>) => {
    setCoreValues(coreValues.map((cv, idx) => (idx === i ? { ...cv, ...patch } : cv)))
  }

  const saveCoreValue = async (cv: CoreValue, i: number) => {
    setSaving(`cv-${i}`)
    try {
      if (cv._id) {
        const res = await fetch(`/api/core-values/${cv._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cv),
        })
        const data = await res.json()
        updateCoreValue(i, data)
      } else {
        const res = await fetch('/api/core-values', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cv),
        })
        const data = await res.json()
        updateCoreValue(i, data)
      }
    } catch {}
    setSaving(null)
  }

  const deleteCoreValue = async (cv: CoreValue, i: number) => {
    if (!confirm('Delete this core value?')) return
    if (cv._id) {
      await fetch(`/api/core-values/${cv._id}`, { method: 'DELETE' })
    }
    setCoreValues(coreValues.filter((_, idx) => idx !== i))
  }

  /* ─── Heritage save ─── */
  const saveHeritage = async () => {
    setSaving('heritage')
    try {
      const res = await fetch('/api/heritage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heritage),
      })
      const data = await res.json()
      setHeritage(data)
    } catch {}
    setSaving(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Homepage Management</h1>

      {/* ── Carousel Section ── */}
      <Section title={`Carousel Slides (${slides.length})`}>
        <div className="space-y-6">
          {slides.map((slide, i) => (
            <div key={slide._id || `new-${i}`} className="rounded-lg border p-4 space-y-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-semibold">Slide {i + 1}</span>
                  {slide.isHidden && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Hidden</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateSlide(i, { isHidden: !slide.isHidden })}
                  >
                    {slide.isHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-500" onClick={() => deleteSlide(slide, i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <FileUpload
                label="Slide Image (20:7 recommended)"
                value={slide.image}
                onChange={(url) => updateSlide(i, { image: url })}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <MultiLangInput
                  label="Headline"
                  valueEn={slide.headline.en} valueBn={slide.headline.bn} valueAr={slide.headline.ar}
                  onChangeEn={(v) => updateSlide(i, { headline: { ...slide.headline, en: v } })}
                  onChangeBn={(v) => updateSlide(i, { headline: { ...slide.headline, bn: v } })}
                  onChangeAr={(v) => updateSlide(i, { headline: { ...slide.headline, ar: v } })}
                />
                <MultiLangInput
                  label="Subtext"
                  valueEn={slide.subtext.en} valueBn={slide.subtext.bn} valueAr={slide.subtext.ar}
                  onChangeEn={(v) => updateSlide(i, { subtext: { ...slide.subtext, en: v } })}
                  onChangeBn={(v) => updateSlide(i, { subtext: { ...slide.subtext, bn: v } })}
                  onChangeAr={(v) => updateSlide(i, { subtext: { ...slide.subtext, ar: v } })}
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm">Order:</label>
                <Input
                  type="number"
                  value={slide.order}
                  onChange={(e) => updateSlide(i, { order: Number(e.target.value) })}
                  className="w-20"
                />
                <Button
                  size="sm"
                  onClick={() => saveSlide(slide, i)}
                  disabled={saving === `slide-${i}`}
                >
                  {saving === `slide-${i}` ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
                  Save
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addSlide} className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" /> Add Slide
          </Button>
        </div>
      </Section>

      {/* ── Core Values Section ── */}
      <Section title={`Core Values (${coreValues.length})`}>
        <div className="space-y-6">
          {coreValues.map((cv, i) => (
            <div key={cv._id || `new-${i}`} className="rounded-lg border p-4 space-y-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-semibold">Core Value {i + 1}</span>
                  {cv.isHidden && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Hidden</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => updateCoreValue(i, { isHidden: !cv.isHidden })}>
                    {cv.isHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-500" onClick={() => deleteCoreValue(cv, i)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <FileUpload
                label="Core Value Image"
                value={cv.image}
                onChange={(url) => updateCoreValue(i, { image: url })}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <MultiLangInput
                  label="Name"
                  valueEn={cv.name.en} valueBn={cv.name.bn} valueAr={cv.name.ar}
                  onChangeEn={(v) => updateCoreValue(i, { name: { ...cv.name, en: v } })}
                  onChangeBn={(v) => updateCoreValue(i, { name: { ...cv.name, bn: v } })}
                  onChangeAr={(v) => updateCoreValue(i, { name: { ...cv.name, ar: v } })}
                />
                <MultiLangInput
                  label="Description"
                  valueEn={cv.description.en} valueBn={cv.description.bn} valueAr={cv.description.ar}
                  onChangeEn={(v) => updateCoreValue(i, { description: { ...cv.description, en: v } })}
                  onChangeBn={(v) => updateCoreValue(i, { description: { ...cv.description, bn: v } })}
                  onChangeAr={(v) => updateCoreValue(i, { description: { ...cv.description, ar: v } })}
                  multiline
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm">Order:</label>
                <Input
                  type="number"
                  value={cv.order}
                  onChange={(e) => updateCoreValue(i, { order: Number(e.target.value) })}
                  className="w-20"
                />
                <Button size="sm" onClick={() => saveCoreValue(cv, i)} disabled={saving === `cv-${i}`}>
                  {saving === `cv-${i}` ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
                  Save
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" onClick={addCoreValue} className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" /> Add Core Value
          </Button>
        </div>
      </Section>

      {/* ── Heritage Section ── */}
      <Section title="Heritage Section">
        <div className="space-y-4">
          <FileUpload
            label="Heritage Video"
            value={heritage.video}
            onChange={(url) => setHeritage({ ...heritage, video: url })}
            accept="video/*"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <MultiLangInput
              label="Headline"
              valueEn={heritage.headline.en} valueBn={heritage.headline.bn} valueAr={heritage.headline.ar}
              onChangeEn={(v) => setHeritage({ ...heritage, headline: { ...heritage.headline, en: v } })}
              onChangeBn={(v) => setHeritage({ ...heritage, headline: { ...heritage.headline, bn: v } })}
              onChangeAr={(v) => setHeritage({ ...heritage, headline: { ...heritage.headline, ar: v } })}
            />
            <MultiLangInput
              label="Description"
              valueEn={heritage.description.en} valueBn={heritage.description.bn} valueAr={heritage.description.ar}
              onChangeEn={(v) => setHeritage({ ...heritage, description: { ...heritage.description, en: v } })}
              onChangeBn={(v) => setHeritage({ ...heritage, description: { ...heritage.description, bn: v } })}
              onChangeAr={(v) => setHeritage({ ...heritage, description: { ...heritage.description, ar: v } })}
              multiline
            />
          </div>

          <Button onClick={saveHeritage} disabled={saving === 'heritage'}>
            {saving === 'heritage' ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Heritage Section
          </Button>
        </div>
      </Section>
    </div>
  )
}
