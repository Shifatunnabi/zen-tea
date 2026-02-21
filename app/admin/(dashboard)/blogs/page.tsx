'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2, Save, Plus, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react'
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

interface Blog {
  _id?: string
  title: MultiLang
  slug: string
  thumbnail: string
  excerpt: MultiLang
  category: MultiLang
  content: MultiLang
  isHidden: boolean
  createdAt?: string
}

const emptyBlog = (): Blog => ({
  title: emptyLang(),
  slug: '',
  thumbnail: '',
  excerpt: emptyLang(),
  category: emptyLang(),
  content: emptyLang(),
  isHidden: false,
})

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/* ─── Blog List ─── */
function BlogList({
  blogs,
  onEdit,
  onToggleHide,
  onDelete,
  onAdd,
}: {
  blogs: Blog[]
  onEdit: (b: Blog) => void
  onToggleHide: (b: Blog) => void
  onDelete: (b: Blog) => void
  onAdd: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog Posts ({blogs.length})</h1>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" /> Add Blog Post
        </Button>
      </div>

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {blog.thumbnail && (
              <Image
                src={blog.thumbnail}
                alt={blog.title.en}
                width={120}
                height={80}
                className="h-20 w-30 rounded-lg object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{blog.title.en || 'Untitled'}</h3>
              <p className="text-sm text-muted-foreground truncate">{blog.excerpt.en}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                {blog.category.en && (
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">{blog.category.en}</span>
                )}
                {blog.createdAt && <span>{new Date(blog.createdAt).toLocaleDateString()}</span>}
                {blog.isHidden && (
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">Hidden</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => onToggleHide(blog)}>
                {blog.isHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={() => onEdit(blog)}>
                Edit
              </Button>
              <Button size="sm" variant="outline" className="text-red-500" onClick={() => onDelete(blog)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {blogs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No blog posts yet.</p>
            <Button onClick={onAdd} variant="outline" className="mt-4">
              <Plus className="h-4 w-4 mr-2" /> Write Your First Blog Post
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Blog Form ─── */
function BlogForm({
  blog,
  onSave,
  onCancel,
  saving,
}: {
  blog: Blog
  onSave: (b: Blog) => void
  onCancel: () => void
  saving: boolean
}) {
  const [form, setForm] = useState<Blog>(blog)
  const isNew = !blog._id

  const update = (patch: Partial<Blog>) => setForm(prev => ({ ...prev, ...patch }))

  const handleTitleChangeEn = (v: string) => {
    update({ title: { ...form.title, en: v } })
    if (isNew) update({ title: { ...form.title, en: v }, slug: slugify(v) })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="text-2xl font-bold">{isNew ? 'Add Blog Post' : 'Edit Blog Post'}</h1>
      </div>

      {/* Basic Info */}
      <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Basic Information</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <MultiLangInput
            label="Title"
            valueEn={form.title.en} valueBn={form.title.bn} valueAr={form.title.ar}
            onChangeEn={handleTitleChangeEn}
            onChangeBn={(v) => update({ title: { ...form.title, bn: v } })}
            onChangeAr={(v) => update({ title: { ...form.title, ar: v } })}
          />
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input
              value={form.slug}
              onChange={(e) => update({ slug: e.target.value })}
              placeholder="blog-post-slug"
            />
          </div>
        </div>

        <FileUpload
          label="Thumbnail Image"
          value={form.thumbnail}
          onChange={(url) => update({ thumbnail: url })}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <MultiLangInput
            label="Category"
            valueEn={form.category.en} valueBn={form.category.bn} valueAr={form.category.ar}
            onChangeEn={(v) => update({ category: { ...form.category, en: v } })}
            onChangeBn={(v) => update({ category: { ...form.category, bn: v } })}
            onChangeAr={(v) => update({ category: { ...form.category, ar: v } })}
          />
          <MultiLangInput
            label="Excerpt"
            valueEn={form.excerpt.en} valueBn={form.excerpt.bn} valueAr={form.excerpt.ar}
            onChangeEn={(v) => update({ excerpt: { ...form.excerpt, en: v } })}
            onChangeBn={(v) => update({ excerpt: { ...form.excerpt, bn: v } })}
            onChangeAr={(v) => update({ excerpt: { ...form.excerpt, ar: v } })}
            multiline rows={3}
          />
        </div>
      </div>

      {/* Content */}
      <div className="rounded-xl border bg-white p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Content</h2>
        <MultiLangRichText
          label="Blog Content"
          valueEn={form.content.en} valueBn={form.content.bn} valueAr={form.content.ar}
          onChangeEn={(v) => update({ content: { ...form.content, en: v } })}
          onChangeBn={(v) => update({ content: { ...form.content, bn: v } })}
          onChangeAr={(v) => update({ content: { ...form.content, ar: v } })}
        />
      </div>

      {/* Save */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(form)} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {isNew ? 'Create Blog Post' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Blog | null>(null)
  const [saving, setSaving] = useState(false)

  const loadBlogs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/blogs')
      const data = await res.json()
      setBlogs(data || [])
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { loadBlogs() }, [loadBlogs])

  const handleSave = async (blog: Blog) => {
    setSaving(true)
    try {
      if (blog._id) {
        await fetch(`/api/blogs/${blog._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blog),
        })
      } else {
        await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blog),
        })
      }
      setEditing(null)
      loadBlogs()
    } catch {}
    setSaving(false)
  }

  const handleToggleHide = async (blog: Blog) => {
    if (!blog._id) return
    await fetch(`/api/blogs/${blog._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...blog, isHidden: !blog.isHidden }),
    })
    loadBlogs()
  }

  const handleDelete = async (blog: Blog) => {
    if (!blog._id || !confirm('Delete this blog post?')) return
    await fetch(`/api/blogs/${blog._id}`, { method: 'DELETE' })
    loadBlogs()
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
      <BlogForm
        blog={editing}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
        saving={saving}
      />
    )
  }

  return (
    <BlogList
      blogs={blogs}
      onEdit={(b) => setEditing(b)}
      onToggleHide={handleToggleHide}
      onDelete={handleDelete}
      onAdd={() => setEditing(emptyBlog())}
    />
  )
}
