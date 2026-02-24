'use client'

import { useRef, useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface FileUploadProps {
  label?: string
  value: string
  onChange: (url: string) => void
  accept?: string
  aspectRatio?: string
}

export default function FileUpload({
  label = 'Upload File',
  value,
  onChange,
  accept = 'image/*',
  aspectRatio,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.url) onChange(data.url)
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const isGif = value && value.toLowerCase().includes('.gif')
  const isVideo = value && !isGif && (
    value.includes('/video/upload/') ||
    /\.(mp4|webm|mov|ogg)$/i.test(value)
  )

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      {value ? (
        <div className="relative inline-block rounded-lg border overflow-hidden" style={{ aspectRatio }}>
          {isVideo ? (
            <video src={value} className="h-40 object-cover" autoPlay loop muted playsInline />
          ) : isGif ? (
            <img src={value} alt="" className="h-40 w-auto object-cover" />
          ) : (
            <Image src={value} alt="" width={320} height={180} className="h-40 w-auto object-cover" />
          )}
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 shadow"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-32 w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500 transition-colors hover:border-primary hover:text-primary"
        >
          {uploading ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Uploading...</>
          ) : (
            <><Upload className="h-5 w-5" /> {label}</>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  )
}
