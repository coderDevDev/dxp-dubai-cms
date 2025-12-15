export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          client: string | null
          category: string | null
          data_cat: string | null
          languages: string | null
          classification: string | null
          vimeo_id: string | null
          poster_image: string | null
          poster_image_srcset: string | null
          video_url: string | null
          link: string | null
          credits: Json | null
          order_index: number
          is_featured: boolean
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          client?: string | null
          category?: string | null
          data_cat?: string | null
          languages?: string | null
          classification?: string | null
          vimeo_id?: string | null
          poster_image?: string | null
          poster_image_srcset?: string | null
          video_url?: string | null
          link?: string | null
          credits?: Json | null
          order_index?: number
          is_featured?: boolean
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          client?: string | null
          category?: string | null
          data_cat?: string | null
          languages?: string | null
          classification?: string | null
          vimeo_id?: string | null
          poster_image?: string | null
          poster_image_srcset?: string | null
          video_url?: string | null
          link?: string | null
          credits?: Json | null
          order_index?: number
          is_featured?: boolean
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      about_content: {
        Row: {
          id: number
          founder_name: string | null
          founder_title: string | null
          founder_bio: string | null
          company_description: string | null
          video_button_text: string | null
          video_url: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          founder_name?: string | null
          founder_title?: string | null
          founder_bio?: string | null
          company_description?: string | null
          video_button_text?: string | null
          video_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          founder_name?: string | null
          founder_title?: string | null
          founder_bio?: string | null
          company_description?: string | null
          video_button_text?: string | null
          video_url?: string | null
          updated_at?: string
        }
      }
      contact_info: {
        Row: {
          id: number
          email: string | null
          phone: string | null
          city: string | null
          street: string | null
          vimeo_url: string | null
          instagram_url: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          email?: string | null
          phone?: string | null
          city?: string | null
          street?: string | null
          vimeo_url?: string | null
          instagram_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          email?: string | null
          phone?: string | null
          city?: string | null
          street?: string | null
          vimeo_url?: string | null
          instagram_url?: string | null
          updated_at?: string
        }
      }
      staff_members: {
        Row: {
          id: string
          name: string
          email: string | null
          department: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          department?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          department?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      header_config: {
        Row: {
          id: number
          active_preset: string
          config_json: Json | null
          updated_at: string
        }
        Insert: {
          id?: number
          active_preset?: string
          config_json?: Json | null
          updated_at?: string
        }
        Update: {
          id?: number
          active_preset?: string
          config_json?: Json | null
          updated_at?: string
        }
      }
    }
  }
}

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]