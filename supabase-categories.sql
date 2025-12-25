-- АНХААРУУЛГА: Энэ SQL нь categories table-г устгаад дахин үүсгэнэ!
-- Хэрэв өмнө нь категори оруулсан бол тэдгээр устах болно.

-- Drop existing table (this will remove all data!)
DROP TABLE IF EXISTS categories CASCADE;

-- Categories table (зөвхөн id, name, created_at)
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories
CREATE POLICY "Categories are viewable by everyone"
    ON categories FOR SELECT
    USING (true);

CREATE POLICY "Categories can be created by authenticated users"
    ON categories FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Categories can be updated by authenticated users"
    ON categories FOR UPDATE
    USING (true);

CREATE POLICY "Categories can be deleted by authenticated users"
    ON categories FOR DELETE
    USING (true);

-- Insert default categories
INSERT INTO categories (name) VALUES
    ('Wellness'),
    ('Personal Growth'),
    ('Psychology'),
    ('Mindfulness'),
    ('Relationships');

-- Index for faster lookups
CREATE INDEX idx_categories_name ON categories(name);
