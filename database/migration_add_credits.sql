-- =====================================================
-- Migration: Add credits field to existing projects table
-- Run this if you already have the projects table set up
-- =====================================================

-- Add credits column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' AND column_name = 'credits'
    ) THEN
        ALTER TABLE projects ADD COLUMN credits JSONB DEFAULT '[]'::jsonb;
        RAISE NOTICE 'Added credits column to projects table';
    ELSE
        RAISE NOTICE 'Credits column already exists';
    END IF;
END $$;

-- Verify the column was added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'projects' AND column_name = 'credits';
