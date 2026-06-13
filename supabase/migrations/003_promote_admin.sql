-- Promote an existing user to admin (run in Supabase SQL Editor)
-- Replace the email with your staff account email

UPDATE profiles
SET role = 'admin', updated_at = NOW()
WHERE email = 'ampahnyame10@icloud.com';

-- Or promote by user id:
-- UPDATE profiles SET role = 'admin' WHERE id = 'your-user-uuid-here';
