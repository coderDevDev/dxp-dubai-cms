-- =====================================================
-- Migration: Add new fields for client data structure
-- Adds: languages, classification, vimeo_id
-- Safe to run multiple times
-- =====================================================

-- Add languages field (e.g., "Arabic & English", "Arabic only")
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'languages'
    ) THEN
        ALTER TABLE projects ADD COLUMN languages TEXT;
        RAISE NOTICE 'Added languages column';
    ELSE
        RAISE NOTICE 'Languages column already exists';
    END IF;
END $$;

-- Add classification field (e.g., "TVC", "BRAND FILM")
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'classification'
    ) THEN
        ALTER TABLE projects ADD COLUMN classification TEXT;
        RAISE NOTICE 'Added classification column';
    ELSE
        RAISE NOTICE 'Classification column already exists';
    END IF;
END $$;

-- Add vimeo_id field (extracted from vimeo URL for easier management)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'vimeo_id'
    ) THEN
        ALTER TABLE projects ADD COLUMN vimeo_id TEXT;
        RAISE NOTICE 'Added vimeo_id column';
    ELSE
        RAISE NOTICE 'Vimeo_id column already exists';
    END IF;
END $$;

-- Add credits field if it doesn't exist (from previous migration)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'credits'
    ) THEN
        ALTER TABLE projects ADD COLUMN credits JSONB DEFAULT '[]'::jsonb;
        RAISE NOTICE 'Added credits column';
    ELSE
        RAISE NOTICE 'Credits column already exists';
    END IF;
END $$;

-- Verify all columns
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'projects' 
AND column_name IN ('languages', 'classification', 'vimeo_id', 'credits')
ORDER BY column_name;

-- Show current table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'projects'
ORDER BY ordinal_position;
