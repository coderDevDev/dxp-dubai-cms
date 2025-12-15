import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .eq('id', 1)
      .single()

    if (error) {
      console.error('Error fetching about content:', error)
      return NextResponse.json(
        { error: 'Failed to fetch about content' },
        { status: 500 }
      )
    }

    // Transform to match frontend format
    const aboutData = {
      page: {
        title: "About",
        description: "Award-winning filmmaker and international film production house based in Dubai.",
        founder: {
          name: data.founder_name || '',
          title: data.founder_title || '',
          bio: data.founder_bio || ''
        },
        content: {
          main_text: data.company_description || '',
          video_button: {
            text: data.video_button_text || '',
            video_url: data.video_url || ''
          }
        }
      }
    }

    return NextResponse.json(
      aboutData,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
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
