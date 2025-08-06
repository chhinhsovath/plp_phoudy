-- =====================================================
-- Examination Structure Migration Script
-- =====================================================

-- First, let's create the examination_categories table
CREATE TABLE examination_categories (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    subject_id INTEGER NOT NULL,
    grade VARCHAR, -- Will store enum values like 'grade1', 'grade2', etc.
    special_grade_id INTEGER,
    type VARCHAR NOT NULL DEFAULT 'test' CHECK (type IN ('test', 'exam')),
    status VARCHAR NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint to subjects table
    CONSTRAINT fk_examination_categories_subject 
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_examination_categories_subject_id ON examination_categories(subject_id);
CREATE INDEX idx_examination_categories_type ON examination_categories(type);
CREATE INDEX idx_examination_categories_grade ON examination_categories(grade);

-- =====================================================
-- Handle existing exams table
-- =====================================================

-- Step 1: Backup existing exams data
CREATE TABLE exams_backup AS SELECT * FROM exams;

-- Step 2: Create new examinations table with updated structure
CREATE TABLE examinations (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    time_spent INTEGER, -- in minutes, nullable
    time_limit INTEGER NOT NULL, -- in minutes
    average_point DECIMAL(5,2), -- nullable, calculated field
    passing_score DECIMAL(5,2) NOT NULL,
    examination_category_id INTEGER NOT NULL,
    status VARCHAR NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint to examination_categories
    CONSTRAINT fk_examinations_category 
        FOREIGN KEY (examination_category_id) REFERENCES examination_categories(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_examinations_category_id ON examinations(examination_category_id);
CREATE INDEX idx_examinations_status ON examinations(status);

-- =====================================================
-- Data Migration from old exams to new structure
-- =====================================================

-- First, create examination categories based on existing exam data
INSERT INTO examination_categories (title, subject_id, grade, type, status, created_at)
SELECT DISTINCT 
    CONCAT(s.name_en, ' - ', e.grade_level) as title,
    COALESCE(e.subject_id, 1) as subject_id, -- Use subject_id or default to 1
    e.grade_level as grade,
    'exam' as type, -- Default to 'exam' type
    e.status,
    e.created_at
FROM exams e
LEFT JOIN subjects s ON e.subject_id = s.id
WHERE e.subject_id IS NOT NULL
ON CONFLICT DO NOTHING; -- In case of duplicates

-- Handle exams without subject_id by creating a general category
INSERT INTO examination_categories (title, subject_id, grade, type, status)
SELECT DISTINCT 
    CONCAT('General Exam - ', COALESCE(grade_level, 'Unknown')) as title,
    1 as subject_id, -- Assuming subject_id = 1 exists, adjust as needed
    grade_level as grade,
    'exam' as type,
    'active' as status
FROM exams 
WHERE subject_id IS NULL
ON CONFLICT DO NOTHING;

-- Now migrate exam data to the new examinations table
INSERT INTO examinations (
    title, 
    time_limit, 
    passing_score, 
    examination_category_id, 
    status, 
    created_at
)
SELECT 
    e.exam_title as title,
    e.time_limit,
    e.passing_score,
    ec.id as examination_category_id,
    e.status,
    e.created_at
FROM exams e
LEFT JOIN subjects s ON e.subject_id = s.id
LEFT JOIN examination_categories ec ON (
    ec.subject_id = COALESCE(e.subject_id, 1) 
    AND ec.grade = e.grade_level
    AND ec.title = CASE 
        WHEN e.subject_id IS NOT NULL THEN CONCAT(s.name_en, ' - ', e.grade_level)
        ELSE CONCAT('General Exam - ', COALESCE(e.grade_level, 'Unknown'))
    END
);

-- =====================================================
-- Update related tables to point to new examinations table
-- =====================================================

-- If you have exam_questions table, update the foreign key reference
-- First add the new column
ALTER TABLE exam_questions ADD COLUMN new_examination_id INTEGER;

-- Update with the mapping from old exam_id to new examination_id
UPDATE exam_questions eq
SET new_examination_id = ex.id
FROM examinations ex
JOIN exams_backup eb ON ex.title = eb.exam_title 
    AND ex.time_limit = eb.time_limit 
    AND ex.passing_score = eb.passing_score
WHERE eq.exam_id = eb.id;

-- Drop old foreign key and rename column
ALTER TABLE exam_questions DROP CONSTRAINT IF EXISTS fk_exam_questions_exam;
ALTER TABLE exam_questions DROP COLUMN exam_id;
ALTER TABLE exam_questions RENAME COLUMN new_examination_id TO examination_id;

-- Add new foreign key constraint
ALTER TABLE exam_questions 
ADD CONSTRAINT fk_exam_questions_examination 
FOREIGN KEY (examination_id) REFERENCES examinations(id) ON DELETE CASCADE;

-- =====================================================
-- Clean up - Drop old exams table (BE CAREFUL!)
-- =====================================================

-- Only uncomment these lines AFTER verifying the migration was successful
-- DROP TABLE exams;
-- DROP TABLE exams_backup; -- Keep this as backup for now

-- =====================================================
-- Create trigger for updated_at timestamps
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for examination_categories
CREATE TRIGGER update_examination_categories_updated_at
    BEFORE UPDATE ON examination_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Triggers for examinations
CREATE TRIGGER update_examinations_updated_at
    BEFORE UPDATE ON examinations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Insert some sample examination categories (optional)
-- =====================================================

-- Uncomment to insert sample data
/*
INSERT INTO examination_categories (title, subject_id, grade, type, status) VALUES
('Mathematics Grade 1 Test', 1, 'grade1', 'test', 'active'),
('Mathematics Grade 1 Exam', 1, 'grade1', 'exam', 'active'),
('English Grade 2 Test', 2, 'grade2', 'test', 'active'),
('Science Grade 3 Exam', 3, 'grade3', 'exam', 'active');

INSERT INTO examinations (title, time_limit, passing_score, examination_category_id, status) VALUES
('Math Quiz #1', 30, 70.00, 1, 'active'),
('Math Final Exam', 120, 60.00, 2, 'active'),
('English Vocabulary Test', 45, 75.00, 3, 'active');
*/

-- =====================================================
-- Verification queries
-- =====================================================

-- Check the migration results
SELECT 'Examination Categories Count' as description, COUNT(*) as count FROM examination_categories
UNION ALL
SELECT 'Examinations Count' as description, COUNT(*) as count FROM examinations
UNION ALL
SELECT 'Original Exams Count' as description, COUNT(*) as count FROM exams_backup;

-- Show sample data
SELECT 
    ec.title as category_title,
    ec.type,
    s.name_en as subject_name,
    COUNT(e.id) as exam_count
FROM examination_categories ec
LEFT JOIN subjects s ON ec.subject_id = s.id
LEFT JOIN examinations e ON e.examination_category_id = ec.id
GROUP BY ec.id, ec.title, ec.type, s.name_en
ORDER BY ec.title;

COMMIT;