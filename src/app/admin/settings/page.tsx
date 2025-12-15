'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/components/admin/AuthProvider'
import toast from 'react-hot-toast'
import { 
  CogIcon, 
  UserCircleIcon, 
  PaintBrushIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline'

export default function SettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('header')
  const [loading, setLoading] = useState(false)
  
  // Header settings
  const [headerPreset, setHeaderPreset] = useState('default')
  
  const tabs = [
    { id: 'header', name: 'Header', icon: PaintBrushIcon },
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
  ]

  const headerPresets = [
    {
      id: 'default',
      name: 'Default',
      description: 'Logo on the left, menu on the right',
      preview: 'Logo ← | → Menu'
    },
    {
      id: 'reversed',
      name: 'Reversed',
      description: 'Logo on the right, menu on the left',
      preview: 'Menu ← | → Logo'
    },
  
  ]

  useEffect(() => {
    loadHeaderConfig()
  }, [])

  async function loadHeaderConfig() {
    try {
      const { data, error } = await supabase
        .from('header_config')
        .select('active_preset')
        .eq('id', 1)
        .single()

      if (data) {
        setHeaderPreset(data.active_preset || 'default')
      }
    } catch (error) {
      console.error('Error loading header config:', error)
    }
  }

  async function saveHeaderPreset(preset: string) {
    setLoading(true)
    try {
      // Only update the active_preset, don't overwrite config_json
      const { error } = await supabase
        .from('header_config')
        .update({ 
          active_preset: preset
        })
        .eq('id', 1)

      if (error) throw error

      setHeaderPreset(preset)
      toast.success('Header preset updated successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update header preset')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-slate-600">
          Manage your CMS configuration and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Header Settings Tab */}
      {activeTab === 'header' && (
        <div className="space-y-6">
          <div className="bg-white shadow-sm rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Header Configuration</h2>
            <p className="text-sm text-slate-600 mb-6">
              Choose the header layout for your main website
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {headerPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => saveHeaderPreset(preset.id)}
                  disabled={loading}
                  className={`relative p-6 rounded-lg border-2 transition-all text-left ${
                    headerPreset === preset.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {headerPreset === preset.id && (
                    <div className="absolute top-4 right-4">
                      <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                    </div>
                  )}
                  
                  <h3 className="font-semibold text-slate-900 mb-2">{preset.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{preset.description}</p>
                  
                  <div className="bg-slate-100 rounded p-3 text-center text-xs font-mono text-slate-600">
                    {preset.preview}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Active Preset */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-900">Active Preset</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Currently using: <strong>{headerPresets.find(p => p.id === headerPreset)?.name}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* General Settings Tab */}
      {activeTab === 'general' && (
        <div className="bg-white shadow-sm rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">General Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                defaultValue="DubaiFilmMaker"
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Site URL
              </label>
              <input
                type="url"
                defaultValue="https://dubaifilmmaker.ae"
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                defaultValue="hello@dubaifilmmaker.ae"
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Save General Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white shadow-sm rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">User Profile</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                <UserCircleIcon className="h-10 w-10 text-slate-500" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">{user?.email?.split('@')[0]}</h3>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="block w-full rounded-lg border-slate-300 bg-slate-50 shadow-sm sm:text-sm cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-slate-500">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                User ID
              </label>
              <input
                type="text"
                value={user?.id || ''}
                disabled
                className="block w-full rounded-lg border-slate-300 bg-slate-50 shadow-sm sm:text-sm cursor-not-allowed font-mono text-xs"
              />
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}