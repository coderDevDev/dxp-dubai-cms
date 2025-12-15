-- =====================================================
-- Insert About, Contact, and Header data
-- Run this AFTER the main schema.sql
-- =====================================================

-- =====================================================
-- INSERT ABOUT CONTENT
-- =====================================================
INSERT INTO about_content (
  id, 
  founder_name, 
  founder_title, 
  founder_bio, 
  company_description, 
  video_button_text, 
  video_url
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
ON CONFLICT (id) DO UPDATE SET
  founder_name = EXCLUDED.founder_name,
  founder_title = EXCLUDED.founder_title,
  founder_bio = EXCLUDED.founder_bio,
  company_description = EXCLUDED.company_description,
  video_button_text = EXCLUDED.video_button_text,
  video_url = EXCLUDED.video_url,
  updated_at = NOW();

-- =====================================================
-- INSERT CONTACT INFO
-- =====================================================
INSERT INTO contact_info (
  id, 
  email, 
  phone, 
  city, 
  street, 
  vimeo_url, 
  instagram_url
)
VALUES (
  1,
  'hello@dubaifilmmaker.ae',
  '+971 50 969 9683',
  'Dubai, UAE',
  '',
  'https://vimeo.com/dubaifilmmaker',
  'https://www.instagram.com/dubaifilmmaker/'
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  city = EXCLUDED.city,
  street = EXCLUDED.street,
  vimeo_url = EXCLUDED.vimeo_url,
  instagram_url = EXCLUDED.instagram_url,
  updated_at = NOW();

-- =====================================================
-- INSERT STAFF MEMBERS
-- =====================================================
-- Clear existing staff first (optional)
-- DELETE FROM staff_members;

INSERT INTO staff_members (name, email, department, order_index)
VALUES ('Ahmed Al Mutawa', 'hello@dubaifilmmaker.ae', 'Head of Studio', 1)
ON CONFLICT DO NOTHING;

-- =====================================================
-- INSERT HEADER CONFIG
-- =====================================================
INSERT INTO header_config (id, active_preset, config_json)
VALUES (
  1,
  'default',
  '{
    "activePreset": "default",
    "description": "Header configuration - switch between different header layouts and logo styles",
    "presets": {
      "default": {
        "name": "Default Layout",
        "description": "Logo left, menu right, optimized for horizontal logo",
        "logo": {
          "src": "assets/img/version_2/dubaifilmmaker.svg",
          "alt": "DubaiFilmMaker"
        },
        "mobile": {
          "headerNav": {
            "alignItems": "center",
            "padding": "10px 0",
            "minHeight": "0px",
            "flexDirection": "row"
          },
          "logoLink": {
            "maxWidth": "calc(100% - 100px)",
            "flex": "1"
          },
          "logo": {
            "maxHeight": "80px",
            "maxWidth": "100%",
            "width": "auto"
          }
        },
        "desktop": {
          "logo": {
            "maxHeight": "80px",
            "width": "100%"
          }
        },
        "extraLarge": {
          "logo": {
            "maxHeight": "100px"
          }
        }
      },
      "reversed": {
        "name": "Reversed Layout",
        "description": "Logo right, menu left - comprehensive layout with navigation positioning",
        "logo": {
          "src": "assets/img/version_1/dubaifilmmaker.svg",
          "alt": "DubaiFilmMaker"
        },
        "mobile": {
          "headerNav": {
            "alignItems": "center",
            "padding": "0px",
            "minHeight": "50px",
            "flexDirection": "row-reverse",
            "justifyContent": "space-between",
            "gap": "24px",
            "width": "100%"
          }
        }
      },
      "stackedLogo": {
        "name": "Stacked Logo",
        "description": "Optimized for tall stacked logo (DUBAI FILM MAKER)",
        "logo": {
          "src": "assets/img/dubaifilmmaker123.svg",
          "alt": "DubaiFilmMaker"
        }
      }
    }
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  active_preset = EXCLUDED.active_preset,
  config_json = EXCLUDED.config_json,
  updated_at = NOW();

-- =====================================================
-- VERIFY INSERTIONS
-- =====================================================
SELECT 'About Content' as table_name, COUNT(*) as rows FROM about_content
UNION ALL
SELECT 'Contact Info', COUNT(*) FROM contact_info
UNION ALL
SELECT 'Staff Members', COUNT(*) FROM staff_members
UNION ALL
SELECT 'Header Config', COUNT(*) FROM header_config;

-- Show the data
SELECT 'ABOUT CONTENT:' as info;
SELECT founder_name, founder_title FROM about_content WHERE id = 1;

SELECT 'CONTACT INFO:' as info;
SELECT email, phone, city FROM contact_info WHERE id = 1;

SELECT 'STAFF MEMBERS:' as info;
SELECT name, department FROM staff_members ORDER BY order_index;

SELECT 'HEADER CONFIG:' as info;
SELECT active_preset FROM header_config WHERE id = 1;
