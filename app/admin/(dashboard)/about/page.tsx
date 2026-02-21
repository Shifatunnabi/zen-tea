'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2, Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import MultiLangInput from '@/components/admin/multi-lang-input'
import FileUpload from '@/components/admin/file-upload'
import { Button } from '@/components/ui/button'

interface MultiLang { en: string; bn: string; ar: string }
const emptyLang = (): MultiLang => ({ en: '', bn: '', ar: '' })

interface Settings {
  _id?: string
  missionText: MultiLang
  visionText: MultiLang
  artOfTeaPhoto: string
  artOfTeaHeadline: MultiLang
  artOfTeaDescription: MultiLang
  artOfTeaFeatures: MultiLang[]
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between p-5 text-left">
        <h2 className="text-lg font-semibold">{title}</h2>
        {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {open && <div className="border-t p-5 pt-4">{children}</div>}
    </div>
  )
}

export default function AdminAboutPage() {
  const [settings, setSettings] = useState<Settings>({
    missionText: emptyLang(),
    visionText: emptyLang(),
    artOfTeaPhoto: '',
    artOfTeaHeadline: emptyLang(),
    artOfTeaDescription: emptyLang(),
    artOfTeaFeatures: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      if (data && !data.error) {
        setSettings({
          _id: data._id,
          missionText: data.missionText || emptyLang(),
          visionText: data.visionText || emptyLang(),
          artOfTeaPhoto: data.artOfTeaPhoto || '',
          artOfTeaHeadline: data.artOfTeaHeadline || emptyLang(),
          artOfTeaDescription: data.artOfTeaDescription || emptyLang(),
          artOfTeaFeatures: data.artOfTeaFeatures || [],
        })
      }
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { loadData() }, [loadData])

  const update = (patch: Partial<Settings>) => setSettings(prev => ({ ...prev, ...patch }))

  const addFeature = () => {
    setSettings(prev => ({ ...prev, artOfTeaFeatures: [...prev.artOfTeaFeatures, emptyLang()] }))
  }

  const updateFeature = (i: number, patch: Partial<MultiLang>) => {
    const updated = settings.artOfTeaFeatures.map((f, idx) => idx === i ? { ...f, ...patch } : f)
    setSettings(prev => ({ ...prev, artOfTeaFeatures: updated }))
  }

  const removeFeature = (i: number) => {
    setSettings(prev => ({ ...prev, artOfTeaFeatures: prev.artOfTeaFeatures.filter((_, idx) => idx !== i) }))
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
    } catch {}
    setSaving(false)
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">About Page Management</h1>
        <Button onClick={saveSettings} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Save All Changes
        </Button>
      </div>

      {/* Mission & Vision */}
      <Section title="Mission & Vision">
        <div className="grid gap-6 md:grid-cols-2">
          <MultiLangInput
            label="Mission Text"
            valueEn={settings.missionText.en} valueBn={settings.missionText.bn} valueAr={settings.missionText.ar}
            onChangeEn={(v) => update({ missionText: { ...settings.missionText, en: v } })}
            onChangeBn={(v) => update({ missionText: { ...settings.missionText, bn: v } })}
            onChangeAr={(v) => update({ missionText: { ...settings.missionText, ar: v } })}
            multiline rows={4}
          />
          <MultiLangInput
            label="Vision Text"
            valueEn={settings.visionText.en} valueBn={settings.visionText.bn} valueAr={settings.visionText.ar}
            onChangeEn={(v) => update({ visionText: { ...settings.visionText, en: v } })}
            onChangeBn={(v) => update({ visionText: { ...settings.visionText, bn: v } })}
            onChangeAr={(v) => update({ visionText: { ...settings.visionText, ar: v } })}
            multiline rows={4}
          />
        </div>
      </Section>

      {/* Art of Tea Section */}
      <Section title="Art of Tea Section">
        <div className="space-y-4">
          <FileUpload
            label="Art of Tea Photo"
            value={settings.artOfTeaPhoto}
            onChange={(url) => update({ artOfTeaPhoto: url })}
          />

          <MultiLangInput
            label="Art of Tea Headline"
            valueEn={settings.artOfTeaHeadline.en} valueBn={settings.artOfTeaHeadline.bn} valueAr={settings.artOfTeaHeadline.ar}
            onChangeEn={(v) => update({ artOfTeaHeadline: { ...settings.artOfTeaHeadline, en: v } })}
            onChangeBn={(v) => update({ artOfTeaHeadline: { ...settings.artOfTeaHeadline, bn: v } })}
            onChangeAr={(v) => update({ artOfTeaHeadline: { ...settings.artOfTeaHeadline, ar: v } })}
          />

          <MultiLangInput
            label="Art of Tea Description"
            valueEn={settings.artOfTeaDescription.en} valueBn={settings.artOfTeaDescription.bn} valueAr={settings.artOfTeaDescription.ar}
            onChangeEn={(v) => update({ artOfTeaDescription: { ...settings.artOfTeaDescription, en: v } })}
            onChangeBn={(v) => update({ artOfTeaDescription: { ...settings.artOfTeaDescription, bn: v } })}
            onChangeAr={(v) => update({ artOfTeaDescription: { ...settings.artOfTeaDescription, ar: v } })}
            multiline rows={4}
          />

          {/* Features List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Key Features</h3>
            {settings.artOfTeaFeatures.map((feature, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="flex-1">
                  <MultiLangInput
                    label={`Feature ${i + 1}`}
                    valueEn={feature.en} valueBn={feature.bn} valueAr={feature.ar}
                    onChangeEn={(v) => updateFeature(i, { en: v })}
                    onChangeBn={(v) => updateFeature(i, { bn: v })}
                    onChangeAr={(v) => updateFeature(i, { ar: v })}
                  />
                </div>
                <Button size="sm" variant="outline" className="text-red-500 mt-7" onClick={() => removeFeature(i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addFeature} className="border-dashed">
              <Plus className="h-4 w-4 mr-2" /> Add Feature
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
