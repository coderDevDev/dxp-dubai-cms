-- =====================================================
-- Insert all 16 projects from client data
-- Run this AFTER migration_add_new_fields.sql
-- =====================================================

-- Clear existing projects (optional - comment out if you want to keep existing data)
-- TRUNCATE TABLE projects;

-- Insert all 16 projects
INSERT INTO projects (
  title, client, category, data_cat, languages, classification, vimeo_id,
  video_url, poster_image, poster_image_srcset, credits, order_index, is_published
) VALUES
(
  'The Abu Dhabi Plan',
  'Abu Dhabi Executive Council',
  'Government / Strategic Communication',
  'government',
  'Arabic & English',
  'TVC',
  '414307456',
  'https://player.vimeo.com/video/414307456',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 800w',
  '[{"role": "Client", "name": "Abu Dhabi Executive Council"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  1, true
),
(
  'The Abu Dhabi Plan Reem Cutdown',
  'Abu Dhabi Executive Council',
  'Government / Strategic Communication',
  'government',
  'Arabic & English',
  'TVC',
  '204205086',
  'https://player.vimeo.com/video/204205086',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834423/THE_ABU_DHABI_PLAN_-_FAISA_kcjtth.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834423/THE_ABU_DHABI_PLAN_-_FAISA_kcjtth.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834423/THE_ABU_DHABI_PLAN_-_FAISA_kcjtth.png 800w',
  '[{"role": "Client", "name": "Abu Dhabi Executive Council"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  2, true
),
(
  'The Abu Dhabi Plan Faisal Cutdown',
  'Abu Dhabi Executive Council',
  'Government / Strategic Communication',
  'government',
  'Arabic & English',
  'TVC',
  '204200281',
  'https://player.vimeo.com/video/204200281',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834423/THE_ABU_DHABI_PLAN_-_FAISA_kcjtth.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834423/THE_ABU_DHABI_PLAN_-_FAISA_kcjtth.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834423/THE_ABU_DHABI_PLAN_-_FAISA_kcjtth.png 800w',
  '[{"role": "Client", "name": "Abu Dhabi Executive Council"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  3, true
),
(
  'Invest in Sharjah',
  'Invest in Sharjah Office',
  'Corporate / Investment Promotion',
  'corporate',
  'Arabic & English',
  'TVC',
  '739200966',
  'https://player.vimeo.com/video/739200966',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834311/INVEST_IN_SHARJAH_dwp7xf.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834311/INVEST_IN_SHARJAH_dwp7xf.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834311/INVEST_IN_SHARJAH_dwp7xf.png 800w',
  '[{"role": "Client", "name": "Invest in Sharjah Office"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  4, true
),
(
  'Invest in Sharjah',
  'Invest in Sharjah Office',
  'Corporate / Investment Promotion',
  'corporate',
  'Arabic & English',
  'TVC',
  '883724746',
  'https://player.vimeo.com/video/883724746',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834311/INVEST_IN_SHARJAH_dwp7xf.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834311/INVEST_IN_SHARJAH_dwp7xf.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834311/INVEST_IN_SHARJAH_dwp7xf.png 800w',
  '[{"role": "Client", "name": "Invest in Sharjah Office"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  5, true
),
(
  'Impossible To Define',
  'Dubai Economy and Tourism',
  'Tourism Campaign',
  'tourism',
  'Arabic & English',
  'TVC',
  '739262822',
  'https://player.vimeo.com/video/739262822',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834192/IMPOSSIBLE_TO_DEFINE_wxopj4.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834192/IMPOSSIBLE_TO_DEFINE_wxopj4.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834192/IMPOSSIBLE_TO_DEFINE_wxopj4.png 800w',
  '[{"role": "Client", "name": "Dubai Economy and Tourism"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  6, true
),
(
  'Setup Your Business',
  'Dubai Economy and Tourism',
  'Business Promotion / Government Service',
  'business',
  'Arabic & English',
  'TVC',
  '739286803',
  'https://player.vimeo.com/video/739286803',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760833996/SETUP_YOUR_BUSINESS_t7bbfa.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760833996/SETUP_YOUR_BUSINESS_t7bbfa.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760833996/SETUP_YOUR_BUSINESS_t7bbfa.png 800w',
  '[{"role": "Client", "name": "Dubai Economy and Tourism"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  7, true
),
(
  'Moving Forward',
  'SHUROOQ – Sharjah Investment and Development Authority',
  'Corporate / Investment Promotion',
  'corporate',
  'Arabic & English',
  'TVC',
  '840513516',
  'https://player.vimeo.com/video/840513516',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760833991/MOVING_FORWARD_erghda.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760833991/MOVING_FORWARD_erghda.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760833991/MOVING_FORWARD_erghda.png 800w',
  '[{"role": "Client", "name": "SHUROOQ – Sharjah Investment and Development Authority"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  8, true
),
(
  'Time To Care: Main Film',
  'Ministry of Health & Prevention UAE',
  'Government / Healthcare Campaign',
  'government',
  'Arabic & English',
  'TVC',
  '326285655',
  'https://player.vimeo.com/video/326285655',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 800w',
  '[{"role": "Client", "name": "Ministry of Health & Prevention UAE"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  9, true
),
(
  'Time To Care: Army Cut',
  'Ministry of Health & Prevention UAE',
  'Government / Healthcare Campaign',
  'government',
  '—',
  'TVC',
  '732616667',
  'https://player.vimeo.com/video/732616667',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 800w',
  '[{"role": "Client", "name": "Ministry of Health & Prevention UAE"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  10, true
),
(
  'SHAMS',
  'Sharjah Media City',
  'Corporate / Media Promotion',
  'corporate',
  'Arabic & English',
  'TVC',
  '490464362',
  'https://player.vimeo.com/video/490464362',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 800w',
  '[{"role": "Client", "name": "Sharjah Media City"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  11, true
),
(
  'KEEP THE DREAMS ALIVE TVC 01',
  'Ministry of Interior UAE',
  'Government / Public Safety Campaign',
  'government',
  'Arabic only',
  'TVC',
  '739216015',
  'https://player.vimeo.com/video/739216015',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 800w',
  '[{"role": "Client", "name": "Ministry of Interior UAE"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  12, true
),
(
  'KEEP THE DREAMS ALIVE TVC 02',
  'Ministry of Interior UAE',
  'Government / Public Safety Campaign',
  'government',
  'Arabic & English',
  'TVC',
  '431008060',
  'https://player.vimeo.com/video/431008060',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 800w',
  '[{"role": "Client", "name": "Ministry of Interior UAE"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  13, true
),
(
  'KEEP THE DREAMS ALIVE TVC 03',
  'Ministry of Interior UAE',
  'Government / Public Safety Campaign',
  'government',
  'Arabic & English',
  'TVC',
  '431009165',
  'https://player.vimeo.com/video/431009165',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 800w',
  '[{"role": "Client", "name": "Ministry of Interior UAE"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  14, true
),
(
  'LIVE HD',
  'Abu Dhabi Media',
  'Media / Broadcasting',
  'corporate',
  'Arabic only',
  'TVC',
  '205882460',
  'https://player.vimeo.com/video/205882460',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 800w',
  '[{"role": "Client", "name": "Abu Dhabi Media"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  15, true
),
(
  'Inspiring The Inspired',
  'Sharjah Research Technology and Innovation Park (SRTIP)',
  'Corporate / Innovation',
  'corporate',
  'Arabic & English',
  'BRAND FILM',
  '1121147230',
  'https://player.vimeo.com/video/1121147230/bc7e8ebc72',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png',
  'https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 300w, https://res.cloudinary.com/dvqsa7ko7/image/upload/v1760834561/THE_ABU_DHABI_PLAN_rakbuq.png 800w',
  '[{"role": "Client", "name": "Sharjah Research Technology and Innovation Park (SRTIP)"}, {"role": "Production Company", "name": "DubaiFilmMaker"}]'::jsonb,
  16, true
);

-- Verify insertion
SELECT COUNT(*) as total_projects FROM projects;

-- Show all projects
SELECT id, title, client, classification, languages, is_published 
FROM projects 
ORDER BY order_index;
