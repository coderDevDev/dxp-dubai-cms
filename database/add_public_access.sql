-- =====================================================
-- Add public read access to published projects
-- Run this after the main schema.sql
-- =====================================================

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow public read access to published projects" ON projects;

-- Create policy for public read access to published projects
CREATE POLICY "Allow public read access to published projects" ON projects
  FOR SELECT USING (is_published = true);

-- Note: The authenticated policy should still exist for admin access
-- This adds an additional policy for public read-only access
