'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2, Save, Plus, Trash2, ChevronDown, ChevronUp, UserPlus } from 'lucide-react'
import MultiLangInput from '@/components/admin/multi-lang-input'
import FileUpload from '@/components/admin/file-upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface MultiLang { en: string; bn: string; ar: string }
const emptyLang = (): MultiLang => ({ en: '', bn: '', ar: '' })

interface SiteSettings {
  _id?: string
  logo: string
  phone: string
  email: string
  location: MultiLang
}

interface Admin {
  _id: string
  name: string
  email: string
  role: string
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

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    logo: '',
    phone: '',
    email: '',
    location: emptyLang(),
  })
  const [admins, setAdmins] = useState<Admin[]>([])
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: 'admin' })
  const [loading, setLoading] = useState(true)
  const [savingSettings, setSavingSettings] = useState(false)
  const [savingAdmin, setSavingAdmin] = useState(false)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [settingsRes, adminsRes] = await Promise.all([
        fetch('/api/settings').then(r => r.json()),
        fetch('/api/admins').then(r => r.json()),
      ])
      if (settingsRes && !settingsRes.error) {
        setSettings({
          _id: settingsRes._id,
          logo: settingsRes.logo || '',
          phone: settingsRes.phone || '',
          email: settingsRes.email || '',
          location: settingsRes.location || emptyLang(),
        })
      }
      setAdmins(adminsRes || [])
    } catch {}
    setLoading(false)
  }, [])

  useEffect(() => { loadData() }, [loadData])

  const saveSettings = async () => {
    setSavingSettings(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to save settings')
      }
      
      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Save settings error:', error)
      alert(error instanceof Error ? error.message : 'Failed to save settings')
    } finally {
      setSavingSettings(false)
    }
  }

  const createAdmin = async () => {
    if (!newAdmin.email || !newAdmin.password) {
      alert('Email and password are required')
      return
    }
    
    setSavingAdmin(true)
    try {
      const res = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdmin),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to create admin')
      }
      
      setNewAdmin({ name: '', email: '', password: '', role: 'admin' })
      await loadData()
      alert('Admin created successfully!')
    } catch (error) {
      console.error('Create admin error:', error)
      alert(error instanceof Error ? error.message : 'Failed to create admin')
    } finally {
      setSavingAdmin(false)
    }
  }

  const deleteAdmin = async (admin: Admin) => {
    if (!confirm(`Delete admin "${admin.email}"?`)) return
    try {
      const res = await fetch(`/api/admins/${admin._id}`, { method: 'DELETE' })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to delete admin')
      }
      
      await loadData()
      alert('Admin deleted successfully!')
    } catch (error) {
      console.error('Delete admin error:', error)
      alert(error instanceof Error ? error.message : 'Failed to delete admin')
    }
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
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Site Settings */}
      <Section title="Site Settings">
        <div className="space-y-4">
          <FileUpload
            label="Site Logo"
            value={settings.logo}
            onChange={(url) => setSettings(prev => ({ ...prev, logo: url }))}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                value={settings.phone}
                onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Phone number"
              />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                value={settings.email}
                onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@example.com"
              />
            </div>
          </div>

          <MultiLangInput
            label="Location"
            valueEn={settings.location.en} valueBn={settings.location.bn} valueAr={settings.location.ar}
            onChangeEn={(v) => setSettings(prev => ({ ...prev, location: { ...prev.location, en: v } }))}
            onChangeBn={(v) => setSettings(prev => ({ ...prev, location: { ...prev.location, bn: v } }))}
            onChangeAr={(v) => setSettings(prev => ({ ...prev, location: { ...prev.location, ar: v } }))}
          />

          <Button onClick={saveSettings} disabled={savingSettings}>
            {savingSettings ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Save Settings
          </Button>
        </div>
      </Section>

      {/* Admin Users */}
      <Section title={`Admin Users (${admins.length})`}>
        <div className="space-y-4">
          {/* Existing admins */}
          <div className="space-y-2">
            {admins.map((admin) => (
              <div key={admin._id} className="flex items-center justify-between rounded-lg border p-3 bg-gray-50">
                <div>
                  <p className="font-medium">{admin.name || admin.email}</p>
                  <p className="text-sm text-muted-foreground">{admin.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {admin.role}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500"
                    onClick={() => deleteAdmin(admin)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Add new admin */}
          <div className="rounded-lg border p-4 bg-gray-50 space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <UserPlus className="h-4 w-4" /> Add New Admin
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-xs">Name</Label>
                <Input
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Admin Name"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Email</Label>
                <Input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@example.com"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Password</Label>
                <Input
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Password"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Role</Label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin(prev => ({ ...prev, role: e.target.value }))}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>
            </div>
            <Button size="sm" onClick={createAdmin} disabled={savingAdmin}>
              {savingAdmin ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
              Create Admin
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
