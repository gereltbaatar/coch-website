-- Create admin_users table for email whitelist
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES admin_users(id)
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies (permissive for now, matching existing pattern)
CREATE POLICY "Allow all operations on admin_users" ON admin_users
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create index on email for faster lookups
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- Insert initial admin (replace with your email)
-- INSERT INTO admin_users (email, name) VALUES ('your-email@example.com', 'Initial Admin');
