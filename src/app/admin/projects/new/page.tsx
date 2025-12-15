'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { z } from 'zod'

type ProjectInsert = Database['public']['Tables']['projects']['Insert']

// Zod validation schema
const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  client: z.string().min(1, 'Client is required'),
  category: z.string().min(1, 'Category is required'),
  data_cat: z.string().min(1, 'Data category is required'),
  classification: z.string().optional(),
  languages: z.string().optional(),
  poster_image: z.string().url('Must be a valid URL').min(1, 'Poster image is required'),
  poster_image_srcset: z.string().optional(),
  video_url: z.string().url('Must be a valid URL').min(1, 'Video URL is required'),
  link: z.string().optional(),
  order_index: z.number().int().min(0),
  is_featured: z.boolean(),
  is_published: z.boolean(),
})

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<Partial<ProjectInsert>>({
    title: '',
    client: '',
    category: '',
    data_cat: '',
    classification: '',
    languages: '',
    poster_image: '',
    poster_image_srcset: '',
    video_url: '',
    link: '',
    order_index: 0,
    is_featured: false,
    is_published: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validate with Zod
    try {
      projectSchema.parse(formData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
        toast.error('Please fix the form errors')
        return
      }
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from('projects')
        .insert([formData as ProjectInsert])

      if (error) throw error

      toast.success('Project created successfully!')
      router.push('/admin/projects')
    } catch (error) {
      toast.error('Failed to create project')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : name === 'order_index' 
          ? parseInt(value) || 0
          : value
    }))
  }

  const handleBlur = (fieldName: string) => {
    // Validate single field on blur
    try {
      projectSchema.pick({ [fieldName]: true } as any).parse({ [fieldName]: formData[fieldName as keyof typeof formData] })
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: error.errors[0]?.message || 'Invalid value'
        }))
      }
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Create New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-xl border border-slate-200 p-8 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={() => handleBlur('title')}
            className={`block w-full rounded-lg shadow-sm sm:text-sm transition-colors ${
              errors.title 
                ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="Enter project title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Client */}
        <div>
          <label htmlFor="client" className="block text-sm font-semibold text-slate-700 mb-2">
            Client
          </label>
          <input
            type="text"
            name="client"
            id="client"
            value={formData.client || ''}
            onChange={handleChange}
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
            placeholder="Client name"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category || ''}
            onChange={handleChange}
            placeholder="e.g., Corporate / Investment Promotion"
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
          />
        </div>

        {/* Data Category */}
        <div>
          <label htmlFor="data_cat" className="block text-sm font-semibold text-slate-700 mb-2">
            Data Category (for filtering)
          </label>
          <select
            name="data_cat"
            id="data_cat"
            value={formData.data_cat || ''}
            onChange={handleChange}
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
          >
            <option value="">Select category</option>
            <option value="corporate">Corporate</option>
            <option value="business">Business</option>
            <option value="tourism">Tourism</option>
            <option value="government">Government</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {/* Classification */}
        <div>
          <label htmlFor="classification" className="block text-sm font-semibold text-slate-700 mb-2">
            Classification
          </label>
          <select
            name="classification"
            id="classification"
            value={formData.classification || ''}
            onChange={handleChange}
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
          >
            <option value="">Select classification</option>
            <option value="TVC">TVC</option>
            <option value="Documentary">Documentary</option>
            <option value="Corporate Video">Corporate Video</option>
            <option value="Commercial">Commercial</option>
            <option value="Music Video">Music Video</option>
            <option value="Short Film">Short Film</option>
          </select>
        </div>

        {/* Languages */}
        <div>
          <label htmlFor="languages" className="block text-sm font-semibold text-slate-700 mb-2">
            Available Languages
          </label>
          <input
            type="text"
            name="languages"
            id="languages"
            value={formData.languages || ''}
            onChange={handleChange}
            placeholder="e.g., Arabic & English"
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
          />
          <p className="mt-1 text-xs text-slate-500">Enter languages separated by &amp; or commas</p>
        </div>

        {/* Poster Image */}
        <div>
          <label htmlFor="poster_image" className="block text-sm font-semibold text-slate-700 mb-2">
            Poster Image URL
          </label>
          <input
            type="url"
            name="poster_image"
            id="poster_image"
            value={formData.poster_image || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('poster_image')}
            placeholder="https://res.cloudinary.com/..."
            className={`block w-full rounded-lg shadow-sm sm:text-sm transition-colors ${
              errors.poster_image 
                ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {errors.poster_image && (
            <p className="mt-1 text-sm text-red-600">{errors.poster_image}</p>
          )}
          {formData.poster_image && !errors.poster_image && (
            <img src={formData.poster_image} alt="Preview" className="mt-3 h-32 rounded-lg border border-slate-200" />
          )}
        </div>

        {/* Poster Image Srcset */}
        <div>
          <label htmlFor="poster_image_srcset" className="block text-sm font-medium text-gray-700">
            Poster Image Srcset (responsive)
          </label>
          <textarea
            name="poster_image_srcset"
            id="poster_image_srcset"
            rows={2}
            value={formData.poster_image_srcset || ''}
            onChange={handleChange}
            placeholder="https://... 300w, https://... 800w"
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
          />
        </div>

        {/* Video URL */}
        <div>
          <label htmlFor="video_url" className="block text-sm font-semibold text-slate-700 mb-2">
            Video URL
          </label>
          <input
            type="url"
            name="video_url"
            id="video_url"
            value={formData.video_url || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('video_url')}
            placeholder="https://video.wixstatic.com/..."
            className={`block w-full rounded-lg shadow-sm sm:text-sm transition-colors ${
              errors.video_url 
                ? 'border-2 border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border border-slate-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {errors.video_url && (
            <p className="mt-1 text-sm text-red-600">{errors.video_url}</p>
          )}
        </div>

        {/* Link */}
        <div>
          <label htmlFor="link" className="block text-sm font-semibold text-slate-700 mb-2">
            Project Page Link
          </label>
          <input
            type="text"
            name="link"
            id="link"
            value={formData.link || ''}
            onChange={handleChange}
            placeholder="works/project-name.html"
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
          />
        </div>

        {/* Order Index */}
        <div>
          <label htmlFor="order_index" className="block text-sm font-semibold text-slate-700 mb-2">
            Order Index (for sorting)
          </label>
          <input
            type="number"
            name="order_index"
            id="order_index"
            value={formData.order_index}
            onChange={handleChange}
            className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_featured"
              id="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
              Featured Project
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_published"
              id="is_published"
              checked={formData.is_published}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
              Published
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
          <Link
            href="/admin/projects"
            className="px-5 py-2.5 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  )
}