-- =====================================================
-- DubaiFilmMaker CMS Database Schema
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROJECTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  client TEXT,
  category TEXT,
  data_cat TEXT,
  poster_image TEXT,
  poster_image_srcset TEXT,
  video_url TEXT,
  link TEXT,
  credits JSONB DEFAULT '[]'::jsonb,
  order_index INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(data_cat);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);

-- =====================================================
-- ABOUT CONTENT TABLE (Single row)
-- =====================================================
CREATE TABLE IF NOT EXISTS about_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  founder_name TEXT,
  founder_title TEXT,
  founder_bio TEXT,
  company_description TEXT,
  video_button_text TEXT,
  video_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default about content
INSERT INTO about_content (
  id, founder_name, founder_title, founder_bio, company_description, 
  video_button_text, video_url
)
VALUES (
  1,
  'Ahmed Al Mutawa',
  'FILM DIRECTOR / EXECUTIVE PRODUCER',
  'Emirati award-winning filmmaker and former adjunct professor of film at the American University of Sharjah.<br /><br />With a proven track record of creating internationally acclaimed corporate films, TV shows, documentaries, and commercials, Ahmed holds an MFA in Filmmaking from AAU in California. He is recognized as one of the Top 10 Admired Leaders by Industry Era, New York.<br /><br />As the Founder of DXP, an international film production house based in Dubai, and the Creative Executive Director behind B2C and B2B film campaigns, content, activations, and brand strategy, Ahmed has led major projects for clients including the Abu Dhabi Executive Council, Dubai Economy & Tourism, Sharjah Investment Authority, MOHAP, UAE Armed Forces, Mubadala, Chevrolet, and AD Media.<br /><br />Experienced in recruiting and leading creative teams across major global hubs including Los Angeles, San Francisco, New York, London, Paris, Berlin, Madrid, Lisbon, Singapore, and more.<br /><br />Ahmed has garnered over 25 awards at Cannes, the New York NYX Awards, and the US International Awards in Los Angeles. DXP has also been honored with accolades such as Best Visual Storytelling Media Company at the Global 100 Awards and the M&A Today Global Awards.',
  'Located in the heart of Dubai, our offices are dedicated to audiovisual production, where the expertise and commitment of our teams enable us to bring a wide variety of projects to life: multi-platform advertisements, digital content, music videos, feature films, documentaries, and live performance recordings.<br /><br />Every project is a unique journey for us. We strive to assemble the most suitable team to meet our clients'' specific expectations, combining in-house talent with freelance experts. With an approach that is both meticulous and human-centered, we ensure impeccable quality at every stage.<br /><br />Beyond production, we oversee the entire creative process. From preproduction to final delivery, we adapt to the unique characteristics of each project to offer personalized and attentive support.',
  'view DubaiFilmMaker reel 2025',
  'https://video.wixstatic.com/video/8c2c22_981846f43f714f73845393b8c1d66a5f/720p/mp4/file.mp4'
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- CONTACT INFO TABLE (Single row)
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_info (
  id INTEGER PRIMARY KEY DEFAULT 1,
  email TEXT,
  phone TEXT,
  city TEXT,
  street TEXT,
  vimeo_url TEXT,
  instagram_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default contact info
INSERT INTO contact_info (id, email, phone, city, street, vimeo_url, instagram_url)
VALUES (
  1,
  'hello@dubaifilmmaker.ae',
  '+971 50 969 9683',
  'Dubai, UAE',
  '',
  'https://vimeo.com/dubaifilmmaker',
  'https://www.instagram.com/dubaifilmmaker/'
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STAFF MEMBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS staff_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  department TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default staff member
INSERT INTO staff_members (name, email, department, order_index)
VALUES ('Ahmed Al Mutawa', 'hello@dubaifilmmaker.ae', 'Head of Studio', 1);

CREATE INDEX IF NOT EXISTS idx_staff_order ON staff_members(order_index);

-- =====================================================
-- HEADER CONFIG TABLE (Single row)
-- =====================================================
CREATE TABLE IF NOT EXISTS header_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  active_preset TEXT DEFAULT 'default',
  config_json JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default header config
INSERT INTO header_config (id, active_preset, config_json)
VALUES (1, 'default', '{}')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- AUTO-UPDATE TIMESTAMPS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_updated_at BEFORE UPDATE ON about_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON staff_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_header_updated_at BEFORE UPDATE ON header_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE header_config ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users full access
CREATE POLICY "Allow authenticated access" ON projects 
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated access" ON about_content 
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated access" ON contact_info 
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated access" ON staff_members 
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated access" ON header_config 
  FOR ALL USING (auth.role() = 'authenticated');