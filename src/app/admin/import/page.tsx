'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

const projectsData = [
  {
    title: "MOVING FORWARD",
    client: "SHUROOQ - Sharjah Investment and Development Authority",
    category: "Corporate / Investment Promotion",
    data_cat: "corporate",
    poster_image: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760833991/MOVING_FORWARD_erghda.png",
    poster_image_srcset: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760833991/MOVING_FORWARD_erghda.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760833991/MOVING_FORWARD_erghda.png 800w",
    video_url: "https://video.wixstatic.com/video/8c2c22_981846f43f714f73845393b8c1d66a5f/720p/mp4/file.mp4",
    link: "works/moving-forward.html",
    order_index: 1,
    is_published: true,
    is_featured: false
  },
  {
    title: "SETUP YOUR BUSINESS",
    client: "Dubai Economy and Tourism",
    category: "Business Promotion / Government Service",
    data_cat: "business",
    poster_image: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760833996/SETUP_YOUR_BUSINESS_t7bbfa.png",
    poster_image_srcset: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760833996/SETUP_YOUR_BUSINESS_t7bbfa.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760833996/SETUP_YOUR_BUSINESS_t7bbfa.png 800w",
    video_url: "https://video.wixstatic.com/video/8c2c22_91dd4962f3be4c0592b5e1c7ec6f397e/720p/mp4/file.mp4",
    link: "works/setup-your-business.html",
    order_index: 2,
    is_published: true,
    is_featured: false
  },
  {
    title: "IMPOSSIBLE TO DEFINE",
    client: "Dubai Economy and Tourism",
    category: "Tourism Campaign",
    data_cat: "tourism",
    poster_image: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834192/IMPOSSIBLE_TO_DEFINE_wxopj4.png",
    poster_image_srcset: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834192/IMPOSSIBLE_TO_DEFINE_wxopj4.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834192/IMPOSSIBLE_TO_DEFINE_wxopj4.png 800w",
    video_url: "https://video.wixstatic.com/video/8c2c22_4b66a34c69754d2585da905ba36ca85b/720p/mp4/file.mp4",
    link: "works/impossible-to-define.html",
    order_index: 3,
    is_published: true,
    is_featured: true
  },
  {
    title: "INVEST IN SHARJAH",
    client: "Invest in Sharjah Office",
    category: "Corporate / Investment Promotion",
    data_cat: "corporate",
    poster_image: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834311/INVEST_IN_SHARJAH_dwp7xf.png",
    poster_image_srcset: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834311/INVEST_IN_SHARJAH_dwp7xf.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834311/INVEST_IN_SHARJAH_dwp7xf.png 800w",
    video_url: "https://video.wixstatic.com/video/8c2c22_407b1dbffc774b7ba45d6c4c9cd43896/720p/mp4/file.mp4",
    link: "works/invest-in-sharjah.html",
    order_index: 4,
    is_published: true,
    is_featured: false
  },
  {
    title: "THE ABU DHABI PLAN - FAISAL",
    client: "Abu Dhabi Executive Council",
    category: "Government / Strategic Communication",
    data_cat: "government",
    poster_image: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834423/THE_ABU_DHABI_PLAN_-_FAISA_kcjtth.png",
    poster_image_srcset: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834423/THE_ABU_DHABI_PLAN_-_FAISA_kcjtth.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834423/THE_ABU_DHABI_PLAN_-_FAISA_kcjtth.png 800w",
    video_url: "https://video.wixstatic.com/video/8c2c22_8d2edc77f66e4a18825ff08edc9c549c/720p/mp4/file.mp4",
    link: "works/the-abu-dhabi-plan-faisal.html",
    order_index: 5,
    is_published: true,
    is_featured: false
  },
  {
    title: "THE ABU DHABI PLAN - REEM",
    client: "Abu Dhabi Executive Council",
    category: "Government / Strategic Communication",
    data_cat: "government",
    poster_image: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834423/THE_ABU_DHABI_PLAN_-_FAISA_kcjtth.png",
    poster_image_srcset: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834423/THE_ABU_DHABI_PLAN_-_FAISA_kcjtth.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834423/THE_ABU_DHABI_PLAN_-_FAISA_kcjtth.png 800w",
    video_url: "https://video.wixstatic.com/video/8c2c22_8d2edc77f66e4a18825ff08edc9c549c/720p/mp4/file.mp4",
    link: "works/the-abu-dhabi-plan-reem.html",
    order_index: 6,
    is_published: true,
    is_featured: false
  },
  {
    title: "THE ABU DHABI PLAN",
    client: "Abu Dhabi Executive Council",
    category: "Government / Strategic Communication",
    data_cat: "government",
    poster_image: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png",
    poster_image_srcset: "https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 800w",
    video_url: "https://video.wixstatic.com/video/8c2c22_13c6aa4d9ebb4e6d9e591dcaaa7cb89e/720p/mp4/file.mp4",
    link: "works/the-abu-dhabi-plan.html",
    order_index: 7,
    is_published: true,
    is_featured: false
  }
]

export default function ImportPage() {
  const [loading, setLoading] = useState(false)
  const [imported, setImported] = useState(false)

  const handleImport = async () => {
    setLoading(true)

    try {
      // First, check if projects already exist
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .limit(1)

      if (existing && existing.length > 0) {
        const confirm = window.confirm(
          'Projects already exist in the database. Do you want to delete all and re-import?'
        )
        if (!confirm) {
          setLoading(false)
          return
        }

        // Delete all existing projects
        await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000')
      }

      // Import all projects
      const { error } = await supabase
        .from('projects')
        .insert(projectsData)

      if (error) throw error

      toast.success(`Successfully imported ${projectsData.length} projects!`)
      setImported(true)
    } catch (error) {
      console.error(error)
      toast.error('Failed to import projects')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Import Projects</h1>
        <p className="mt-2 text-slate-600">
          Import {projectsData.length} projects from project.json into Supabase
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-slate-200 p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Projects to Import:</h2>
          <div className="space-y-2">
            {projectsData.map((project, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-500">#{index + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{project.title}</p>
                  <p className="text-xs text-slate-500">{project.client}</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                  {project.data_cat}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t border-slate-200">
          <button
            onClick={handleImport}
            disabled={loading || imported}
            className="px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Importing...' : imported ? 'Imported ✓' : `Import ${projectsData.length} Projects`}
          </button>
          
          {imported && (
            <Link
              href="/admin/projects"
              className="px-5 py-2.5 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              View Projects
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}