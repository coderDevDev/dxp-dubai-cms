'use client'

import { Toaster } from 'react-hot-toast'
import { AdminNavigation } from '@/components/admin/AdminNavigation'
import { AuthProvider } from '@/components/admin/AuthProvider'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50">
        <AdminNavigation />
        {/* Main content with left margin for sidebar */}
        <div className="ml-64">
          <main className="min-h-screen">
            <div className="px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Toaster position="top-right" />
    </AuthProvider>
  )
}