import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Create a public client for API access
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching projects:', error)
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      )
    }

    // Transform data to match frontend format
    const projects = data.map((project, index) => ({
      id: index + 1, // Sequential ID for frontend
      title: project.title,
      client: project.client || '',
      category: project.category || '',
      data_cat: project.data_cat || '',
      languages: project.languages || '',
      classification: project.classification || '',
      vimeo_id: project.vimeo_id || '',
      poster_image: project.poster_image || '',
      poster_image_srcset: project.poster_image_srcset || '',
      video_url: project.video_url || '',
      link: `works/project-detail#id=${index + 1}`,
      credits: project.credits || []
    }))

    return NextResponse.json(
      { projects },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
        }
      }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
