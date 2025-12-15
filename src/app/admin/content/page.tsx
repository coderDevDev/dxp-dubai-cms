'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { z } from 'zod'

// Zod validation schemas
const aboutSchema = z.object({
  founder_name: z.string().min(1, 'Founder name is required'),
  founder_title: z.string().min(1, 'Founder title is required'),
  founder_bio: z.string().min(10, 'Bio must be at least 10 characters'),
  company_description: z.string().min(10, 'Description must be at least 10 characters'),
  video_button_text: z.string().optional(),
  video_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
})

const contactSchema = z.object({
  email: z.string().email('Must be a valid email address'),
  phone: z.string().min(1, 'Phone is required'),
  city: z.string().min(1, 'City is required'),
  street: z.string().min(1, 'Street is required'),
  vimeo_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  instagram_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
})

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState('about')
  const [saving, setSaving] = useState(false)
  const [aboutErrors, setAboutErrors] = useState<Record<string, string>>({})
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({})
  const [aboutData, setAboutData] = useState({
    founder_name: '', founder_title: '', founder_bio: '',
    company_description: '', video_button_text: '', video_url: ''
  })
  const [contactData, setContactData] = useState({
    email: '', phone: '', city: '', street: '', vimeo_url: '', instagram_url: ''
  })

  useEffect(() => {
    loadContent()
  }, [])

  async function loadContent() {
    const { data: about } = await supabase.from('about_content').select('*').eq('id', 1).single()
    const { data: contact } = await supabase.from('contact_info').select('*').eq('id', 1).single()
    if (about) setAboutData(about)
    if (contact) setContactData(contact)
  }

  async function saveAbout() {
    setAboutErrors({})
    
    // Validate with Zod
    try {
      aboutSchema.parse(aboutData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setAboutErrors(fieldErrors)
        toast.error('Please fix the form errors')
        return
      }
    }

    setSaving(true)
    const { error } = await supabase.from('about_content').upsert({ id: 1, ...aboutData })
    setSaving(false)
    error ? toast.error('Failed to save') : toast.success('About page saved successfully!')
  }

  async function saveContact() {
    setContactErrors({})
    
    // Validate with Zod
    try {
      contactSchema.parse(contactData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setContactErrors(fieldErrors)
        toast.error('Please fix the form errors')
        return
      }
    }

    setSaving(true)
    const { error } = await supabase.from('contact_info').upsert({ id: 1, ...contactData })
    setSaving(false)
    error ? toast.error('Failed to save') : toast.success('Contact page saved successfully!')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Content Management</h1>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-6">
        <button onClick={() => setActiveTab('about')} 
          className={`px-4 py-2 ${activeTab === 'about' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-slate-500'}`}>
          About Page
        </button>
        <button onClick={() => setActiveTab('contact')}
          className={`px-4 py-2 ml-4 ${activeTab === 'contact' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-slate-500'}`}>
          Contact Page
        </button>
      </div>

      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Founder Name *</label>
            <input 
              value={aboutData.founder_name || ''} 
              onChange={e => {
                setAboutData({...aboutData, founder_name: e.target.value})
                if (aboutErrors.founder_name) {
                  const newErrors = {...aboutErrors}
                  delete newErrors.founder_name
                  setAboutErrors(newErrors)
                }
              }}
              className={`block w-full rounded-lg shadow-sm transition-colors ${
                aboutErrors.founder_name 
                  ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {aboutErrors.founder_name && (
              <p className="mt-1 text-sm text-red-600">{aboutErrors.founder_name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Founder Title *</label>
            <input 
              value={aboutData.founder_title || ''} 
              onChange={e => {
                setAboutData({...aboutData, founder_title: e.target.value})
                if (aboutErrors.founder_title) {
                  const newErrors = {...aboutErrors}
                  delete newErrors.founder_title
                  setAboutErrors(newErrors)
                }
              }}
              className={`block w-full rounded-lg shadow-sm transition-colors ${
                aboutErrors.founder_title 
                  ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {aboutErrors.founder_title && (
              <p className="mt-1 text-sm text-red-600">{aboutErrors.founder_title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Founder Bio *</label>
            <textarea 
              rows={8} 
              value={aboutData.founder_bio || ''} 
              onChange={e => {
                setAboutData({...aboutData, founder_bio: e.target.value})
                if (aboutErrors.founder_bio) {
                  const newErrors = {...aboutErrors}
                  delete newErrors.founder_bio
                  setAboutErrors(newErrors)
                }
              }}
              className={`block w-full rounded-lg shadow-sm transition-colors ${
                aboutErrors.founder_bio 
                  ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {aboutErrors.founder_bio && (
              <p className="mt-1 text-sm text-red-600">{aboutErrors.founder_bio}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Company Description *</label>
            <textarea 
              rows={6} 
              value={aboutData.company_description || ''} 
              onChange={e => {
                setAboutData({...aboutData, company_description: e.target.value})
                if (aboutErrors.company_description) {
                  const newErrors = {...aboutErrors}
                  delete newErrors.company_description
                  setAboutErrors(newErrors)
                }
              }}
              className={`block w-full rounded-lg shadow-sm transition-colors ${
                aboutErrors.company_description 
                  ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {aboutErrors.company_description && (
              <p className="mt-1 text-sm text-red-600">{aboutErrors.company_description}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Video Button Text</label>
            <input 
              value={aboutData.video_button_text || ''} 
              onChange={e => setAboutData({...aboutData, video_button_text: e.target.value})}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Video URL</label>
            <input 
              value={aboutData.video_url || ''} 
              onChange={e => {
                setAboutData({...aboutData, video_url: e.target.value})
                if (aboutErrors.video_url) {
                  const newErrors = {...aboutErrors}
                  delete newErrors.video_url
                  setAboutErrors(newErrors)
                }
              }}
              className={`block w-full rounded-lg shadow-sm transition-colors ${
                aboutErrors.video_url 
                  ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="https://..."
            />
            {aboutErrors.video_url && (
              <p className="mt-1 text-sm text-red-600">{aboutErrors.video_url}</p>
            )}
          </div>
          <button onClick={saveAbout} disabled={saving}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save About Page'}
          </button>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
            <input 
              type="email" 
              value={contactData.email || ''} 
              onChange={e => {
                setContactData({...contactData, email: e.target.value})
                if (contactErrors.email) {
                  const newErrors = {...contactErrors}
                  delete newErrors.email
                  setContactErrors(newErrors)
                }
              }}
              className={`block w-full rounded-lg shadow-sm transition-colors ${
                contactErrors.email 
                  ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {contactErrors.email && (
              <p className="mt-1 text-sm text-red-600">{contactErrors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone *</label>
            <input 
              value={contactData.phone || ''} 
              onChange={e => {
                setContactData({...contactData, phone: e.target.value})
                if (contactErrors.phone) {
                  const newErrors = {...contactErrors}
                  delete newErrors.phone
                  setContactErrors(newErrors)
                }
              }}
              className={`block w-full rounded-lg shadow-sm transition-colors ${
                contactErrors.phone 
                  ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {contactErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{contactErrors.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">City *</label>
            <input 
              value={contactData.city || ''} 
              onChange={e => {
                setContactData({...contactData, city: e.target.value})
                if (contactErrors.city) {
                  const newErrors = {...contactErrors}
                  delete newErrors.city
                  setContactErrors(newErrors)
                }
              }}
              className={`block w-full rounded-lg shadow-sm transition-colors ${
                contactErrors.city 
                  ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {contactErrors.city && (
              <p className="mt-1 text-sm text-red-600">{contactErrors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Street *</label>
            <input 
              value={contactData.street || ''} 
              onChange={e => {
                setContactData({...contactData, street: e.target.value})
                if (contactErrors.street) {
                  const newErrors = {...contactErrors}
                  delete newErrors.street
                  setContactErrors(newErrors)
                }
              }}
              className={`block w-full rounded-lg shadow-sm transition-colors ${
                contactErrors.street 
                  ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {contactErrors.street && (
              <p className="mt-1 text-sm text-red-600">{contactErrors.street}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Vimeo URL</label>
            <input 
              value={contactData.vimeo_url || ''} 
              onChange={e => {
                setContactData({...contactData, vimeo_url: e.target.value})
                if (contactErrors.vimeo_url) {
                  const newErrors = {...contactErrors}
                  delete newErrors.vimeo_url
                  setContactErrors(newErrors)
                }
              }}
              className={`block w-full rounded-lg shadow-sm transition-colors ${
                contactErrors.vimeo_url 
                  ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="https://vimeo.com/..."
            />
            {contactErrors.vimeo_url && (
              <p className="mt-1 text-sm text-red-600">{contactErrors.vimeo_url}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Instagram URL</label>
            <input 
              value={contactData.instagram_url || ''} 
              onChange={e => {
                setContactData({...contactData, instagram_url: e.target.value})
                if (contactErrors.instagram_url) {
                  const newErrors = {...contactErrors}
                  delete newErrors.instagram_url
                  setContactErrors(newErrors)
                }
              }}
              className={`block w-full rounded-lg shadow-sm transition-colors ${
                contactErrors.instagram_url 
                  ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              placeholder="https://instagram.com/..."
            />
            {contactErrors.instagram_url && (
              <p className="mt-1 text-sm text-red-600">{contactErrors.instagram_url}</p>
            )}
          </div>
          <button onClick={saveContact} disabled={saving}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Contact Page'}
          </button>
        </div>
      )}
    </div>
  )
}