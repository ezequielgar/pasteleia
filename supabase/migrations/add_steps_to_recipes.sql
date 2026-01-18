-- Migration: Add steps column to recipes table
-- This allows recipes to optionally use step-by-step instructions
-- instead of traditional ingredients/instructions format

-- Add the steps column as JSONB (nullable for backward compatibility)
ALTER TABLE recipes 
ADD COLUMN IF NOT EXISTS steps JSONB;

-- Add a comment to document the column
COMMENT ON COLUMN recipes.steps IS 'Optional step-by-step instructions stored as JSON array of {label: string, content: string} objects';

-- Example of steps data structure:
-- [
--   {"label": "Preparar la masa", "content": "Mezclar harina, azúcar y huevos..."},
--   {"label": "Hornear", "content": "Colocar en horno precalentado a 180°C..."}
-- ]
