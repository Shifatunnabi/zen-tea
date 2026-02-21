'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface MultiLangInputProps {
  label: string
  valueEn: string
  valueBn: string
  valueAr: string
  onChangeEn: (v: string) => void
  onChangeBn: (v: string) => void
  onChangeAr: (v: string) => void
  multiline?: boolean
  rows?: number
  placeholder?: string
}

const LANG_TABS = [
  { key: 'en', label: 'English' },
  { key: 'bn', label: 'বাংলা' },
  { key: 'ar', label: 'العربية' },
] as const

export default function MultiLangInput({
  label,
  valueEn,
  valueBn,
  valueAr,
  onChangeEn,
  onChangeBn,
  onChangeAr,
  multiline = false,
  rows = 3,
  placeholder = '',
}: MultiLangInputProps) {
  const [activeLang, setActiveLang] = useState<'en' | 'bn' | 'ar'>('en')

  const values = { en: valueEn, bn: valueBn, ar: valueAr }
  const handlers = { en: onChangeEn, bn: onChangeBn, ar: onChangeAr }

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>

      <div className="flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        {LANG_TABS.map((lang) => (
          <button
            key={lang.key}
            type="button"
            onClick={() => setActiveLang(lang.key)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeLang === lang.key
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {multiline ? (
        <Textarea
          dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
          value={values[activeLang]}
          onChange={(e) => handlers[activeLang](e.target.value)}
          rows={rows}
          placeholder={placeholder || `${label} (${activeLang.toUpperCase()})`}
          className="mt-1"
        />
      ) : (
        <Input
          dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
          value={values[activeLang]}
          onChange={(e) => handlers[activeLang](e.target.value)}
          placeholder={placeholder || `${label} (${activeLang.toUpperCase()})`}
          className="mt-1"
        />
      )}

      <div className="flex gap-2 text-[10px] text-muted-foreground">
        {valueEn && <span className="bg-green-50 text-green-600 px-1.5 py-0.5 rounded">EN ✓</span>}
        {valueBn && <span className="bg-green-50 text-green-600 px-1.5 py-0.5 rounded">BN ✓</span>}
        {valueAr && <span className="bg-green-50 text-green-600 px-1.5 py-0.5 rounded">AR ✓</span>}
      </div>
    </div>
  )
}
