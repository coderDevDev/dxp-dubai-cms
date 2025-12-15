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

    // Get contact info
    const { data: contactData, error: contactError } = await supabase
      .from('contact_info')
      .select('*')
      .eq('id', 1)
      .single()

    if (contactError) {
      console.error('Error fetching contact info:', contactError)
      return NextResponse.json(
        { error: 'Failed to fetch contact info' },
        { status: 500 }
      )
    }

    // Get staff members
    const { data: staffData, error: staffError } = await supabase
      .from('staff_members')
      .select('*')
      .order('order_index', { ascending: true })

    if (staffError) {
      console.error('Error fetching staff:', staffError)
    }

    // Group staff by department
    const staffByDepartment: { [key: string]: any[] } = {}
    if (staffData) {
      staffData.forEach(member => {
        const dept = member.department || 'General'
        if (!staffByDepartment[dept]) {
          staffByDepartment[dept] = []
        }
        staffByDepartment[dept].push({
          name: member.name,
          email: member.email
        })
      })
    }

    // Transform to match frontend format
    const contactResponse = {
      page: {
        title: "Contact",
        description: "Get in touch with our team",
        staff: Object.keys(staffByDepartment).map(dept => ({
          title: dept,
          members: staffByDepartment[dept]
        })),
        address: {
          street: contactData.street || '',
          city: contactData.city || '',
          phone: contactData.phone || '',
          email: contactData.email || ''
        },
        social: {
          vimeo: contactData.vimeo_url || '',
          instagram: contactData.instagram_url || ''
        }
      }
    }

    return NextResponse.json(
      contactResponse,
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
