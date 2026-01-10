-- Fix admin_users RLS policies
-- First, drop the existing policy
DROP POLICY IF EXISTS "Allow all operations on admin_users" ON admin_users;

-- Create separate policies for better clarity and debugging
-- Policy for SELECT (read)
CREATE POLICY "Enable read access for all users" ON admin_users
    FOR SELECT
    USING (true);

-- Policy for INSERT (create)
CREATE POLICY "Enable insert access for all users" ON admin_users
    FOR INSERT
    WITH CHECK (true);

-- Policy for UPDATE (modify)
CREATE POLICY "Enable update access for all users" ON admin_users
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Policy for DELETE (remove)
CREATE POLICY "Enable delete access for all users" ON admin_users
    FOR DELETE
    USING (true);

-- Verify RLS is enabled
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
