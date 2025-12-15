'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from './AuthProvider'
import { useState } from 'react'
import {
  HomeIcon,
  FolderIcon,
  DocumentTextIcon,
  PhotoIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Projects', href: '/admin/projects', icon: FolderIcon },
  { name: 'Content', href: '/admin/content', icon: DocumentTextIcon },
  
]

export function AdminNavigation() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <>
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-30">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">DubaiFilmMaker</h1>
              <p className="text-xs text-slate-400">CMS</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            // Dashboard should only be active on exact /admin route
            // Other routes should be active on exact match or sub-routes
            const isActive = item.href === '/admin' 
              ? pathname === '/admin'
              : pathname === item.href || pathname.startsWith(item.href + '/')
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                } group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150`}
              >
                <item.icon className={`${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                } mr-3 h-5 w-5 flex-shrink-0`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User Menu */}
        <div className="border-t border-slate-800 p-3">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <UserCircleIcon className="h-8 w-8 text-slate-400" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white truncate">
                  {user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
              <ChevronDownIcon className={`h-4 w-4 text-slate-400 transition-transform ${
                userMenuOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Dropdown */}
            {userMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-1">
                <button
                  onClick={() => {
                    signOut()
                    setUserMenuOpen(false)
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}