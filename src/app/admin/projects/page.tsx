'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, Filter, ArrowUpDown, ChevronLeft, ChevronRight, Languages } from 'lucide-react'
import toast from 'react-hot-toast'

type Project = Database['public']['Tables']['projects']['Row']

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'title' | 'created_at' | 'order_index'>('order_index')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order(sortBy, { ascending: sortOrder === 'asc' })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      toast.error('Failed to load projects')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [sortBy, sortOrder])

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast.success('Project deleted successfully')
      fetchProjects()
    } catch (error) {
      toast.error('Failed to delete project')
      console.error(error)
    }
  }

  async function togglePublish(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ is_published: !currentStatus })
        .eq('id', id)

      if (error) throw error
      toast.success(currentStatus ? 'Project unpublished' : 'Project published')
      fetchProjects()
    } catch (error) {
      toast.error('Failed to update project')
      console.error(error)
    }
  }

  // Filter and search
  let filteredProjects = projects

  if (filter !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.classification === filter)
  }

  if (searchQuery) {
    filteredProjects = filteredProjects.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

  const classifications = ['all', ...Array.from(new Set(projects.map(p => p.classification).filter(Boolean)))]

  const toggleSort = (field: 'title' | 'created_at' | 'order_index') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading projects...</div>
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="mt-2 text-slate-600">
            Manage your portfolio projects ({filteredProjects.length} total)
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Plus className="h-5 w-5" />
            New Project
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 bg-white shadow-sm border border-slate-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search projects by title or client..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Classification Filter */}
          <div className="flex gap-2 flex-wrap">
            {classifications.map(classification => (
              <button
                key={classification}
                onClick={() => {
                  setFilter(classification || 'all')
                  setCurrentPage(1)
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === classification
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Filter className="h-3.5 w-3.5" />
                {classification === 'all' ? 'All Classifications' : classification}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white shadow-sm border border-slate-200 overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => toggleSort('title')}
                    className="inline-flex items-center gap-1 hover:text-gray-700"
                  >
                    Project
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Classification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Languages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {project.poster_image && (
                        <img
                          src={project.poster_image}
                          alt={project.title}
                          className="h-10 w-16 object-cover rounded mr-3"
                        />
                      )}
                      <div className="text-sm font-medium text-gray-900">
                        {project.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      {project.classification || 'Not set'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Languages className="h-4 w-4" />
                      <span>{project.languages || 'Not specified'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublish(project.id, project.is_published)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full transition-colors ${
                          project.is_published
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {project.is_published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        {project.is_published ? 'Published' : 'Draft'}
                      </button>
                      {project.is_featured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium sticky right-0 bg-white">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {searchQuery || filter !== 'all' ? 'No projects match your filters.' : 'No projects found. Create your first project!'}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between bg-white shadow-sm border border-slate-200 rounded-xl px-6 py-4">
          <div className="text-sm text-slate-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}