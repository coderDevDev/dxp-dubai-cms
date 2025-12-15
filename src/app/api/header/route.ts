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

    // Get active_preset from database
    const { data, error } = await supabase
      .from('header_config')
      .select('active_preset')
      .eq('id', 1)
      .single()

    if (error) {
      console.error('Error fetching header config:', error)
      return NextResponse.json(
        { activePreset: 'default' },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
          }
        }
      )
    }

    // Return only the active_preset value
    return NextResponse.json(
      { activePreset: data.active_preset || 'default' },
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
