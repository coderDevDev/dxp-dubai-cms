import { Suspense } from 'react'
import { FolderIcon, StarIcon, ClockIcon, PlusIcon, DocumentTextIcon, PhotoIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

async function DashboardStats() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Fetch real statistics from database
  const { data: projects } = await supabase
    .from('projects')
    .select('id, is_published, is_featured, updated_at')
    .order('updated_at', { ascending: false })

  const totalProjects = projects?.length || 0
  const publishedProjects = projects?.filter(p => p.is_published).length || 0
  const featuredProjects = projects?.filter(p => p.is_featured).length || 0
  
  // Get most recent update
  const lastUpdated = projects?.[0]?.updated_at
  let lastUpdatedText = 'Never'
  if (lastUpdated) {
    const date = new Date(lastUpdated)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffHours < 1) lastUpdatedText = 'Just now'
    else if (diffHours < 24) lastUpdatedText = `${diffHours}h ago`
    else if (diffHours < 48) lastUpdatedText = 'Yesterday'
    else lastUpdatedText = `${Math.floor(diffHours / 24)}d ago`
  }

  const stats = [
    {
      name: 'Total Projects',
      value: totalProjects,
      icon: FolderIcon,
      color: 'blue',
    },
    {
      name: 'Published',
      value: publishedProjects,
      icon: DocumentTextIcon,
      color: 'green',
    },
    {
      name: 'Featured',
      value: featuredProjects,
      icon: StarIcon,
      color: 'yellow',
    },
    {
      name: 'Last Updated',
      value: lastUpdatedText,
      icon: ClockIcon,
      color: 'purple',
    },
  ]

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white overflow-hidden shadow-sm rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200 hover:scale-105"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Welcome back! Here's what's happening with your content.
        </p>
      </div>
      
      <Suspense fallback={<div>Loading stats...</div>}>
        <DashboardStats />
      </Suspense>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white shadow-sm rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/projects/new"
              className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-50/50 text-blue-700 rounded-lg hover:from-blue-100 hover:to-blue-100/50 transition-all duration-200 border border-blue-100"
            >
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <PlusIcon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Add New Project</p>
                <p className="text-xs text-blue-600">Create a new portfolio item</p>
              </div>
            </Link>
            <Link
              href="/admin/content"
              className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-50 to-green-50/50 text-green-700 rounded-lg hover:from-green-100 hover:to-green-100/50 transition-all duration-200 border border-green-100"
            >
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <DocumentTextIcon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Edit Page Content</p>
                <p className="text-xs text-green-600">Update About & Contact pages</p>
              </div>
            </Link>
            {/* <Link
              href="/admin/media"
              className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-50 to-purple-50/50 text-purple-700 rounded-lg hover:from-purple-100 hover:to-purple-100/50 transition-all duration-200 border border-purple-100"
            >
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <PhotoIcon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Manage Media</p>
                <p className="text-xs text-purple-600">Upload images and videos</p>
              </div>
            </Link> */}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-sm rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="p-2 bg-green-50 rounded-lg mt-0.5">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Project Updated</p>
                <p className="text-xs text-slate-500 mt-0.5">"Moving Forward" was modified</p>
                <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="p-2 bg-blue-50 rounded-lg mt-0.5">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Media Uploaded</p>
                <p className="text-xs text-slate-500 mt-0.5">New video file added</p>
                <p className="text-xs text-slate-400 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="p-2 bg-purple-50 rounded-lg mt-0.5">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Content Modified</p>
                <p className="text-xs text-slate-500 mt-0.5">About page content updated</p>
                <p className="text-xs text-slate-400 mt-1">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}