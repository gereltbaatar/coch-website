# Admin Authentication Setup Guide

This guide will help you set up Google OAuth authentication for your admin panel.

## 1. Create the Admin Users Table in Supabase

1. Go to your Supabase dashboard: https://app.supabase.com/project/amhauqdhanbnszgajqxv
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase_migration_admin_users.sql` and run it
4. This will create the `admin_users` table with proper RLS policies

## 2. Configure Google OAuth in Supabase

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: Your app name
   - User support email: Your email
   - Developer contact: Your email
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: Coch Website Admin
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://your-domain.com` (for production)
   - Authorized redirect URIs:
     - `https://amhauqdhanbnszgajqxv.supabase.co/auth/v1/callback`
7. Copy your **Client ID** and **Client Secret**

### Step 2: Configure in Supabase

1. Go to your Supabase dashboard
2. Navigate to **Authentication** > **Providers**
3. Find **Google** and enable it
4. Paste your **Client ID** and **Client Secret**
5. Click **Save**

## 3. Add Your Email to Admin Whitelist

You need to manually add your email to the `admin_users` table to give yourself admin access:

1. Go to Supabase dashboard > **Table Editor**
2. Select the `admin_users` table
3. Click **Insert row**
4. Fill in:
   - email: your-google-email@gmail.com
   - name: Your Name (optional)
5. Click **Save**

## 4. Test the Authentication

1. Start your development server: `yarn dev`
2. Navigate to `http://localhost:3000/admin`
3. You should be redirected to `/admin/login`
4. Click the **Google** button to sign in
5. After signing in with Google, you'll be redirected back to the app
6. The system will check if your email is in the `admin_users` table
7. If your email is whitelisted, you'll be redirected to `/admin`
8. If not, you'll see an error toast: "Таны имэйл админ жагсаалтанд байхгүй байна"

## 5. Managing Admin Users

Once you're logged in as an admin:

1. Navigate to **Админ удирдлага** in the sidebar (or go to `/admin/users`)
2. You can:
   - Add new admin users by entering their Gmail address
   - View all current admin users
   - Remove admin users (except yourself)

## Features Implemented

✅ Google OAuth authentication
✅ Email whitelist system
✅ Beautiful login page with animated Silk background
✅ Protected admin routes
✅ Admin user management interface
✅ Logout functionality
✅ User info display in sidebar

## Security Notes

- Only emails in the `admin_users` table can access the admin panel
- Users are immediately logged out if their email is not whitelisted
- You cannot delete yourself from the admin list
- All admin routes are protected by the AuthGuard component

## Troubleshooting

### "Таны имэйл админ жагсаалтанд байхгүй байна"
- Make sure your Gmail address is added to the `admin_users` table
- Check that the email in the database matches your Google account email exactly
- Email comparison is case-insensitive (automatically converted to lowercase)

### Google OAuth redirect errors
- Verify your redirect URIs are correctly configured in Google Cloud Console
- Make sure the Supabase callback URL is added: `https://amhauqdhanbnszgajqxv.supabase.co/auth/v1/callback`

### Can't access admin pages after login
- Check browser console for errors
- Verify your session is active: `await supabase.auth.getSession()`
- Clear browser cache and cookies, then try again

## Files Created/Modified

### New Files:
- `/components/ui/Silk.tsx` - Animated background component
- `/lib/auth.ts` - Authentication utility functions
- `/components/admin/AuthGuard.tsx` - Route protection component
- `/app/admin/login/page.tsx` - Login page with Silk background
- `/app/admin/auth/callback/page.tsx` - OAuth callback handler
- `/app/admin/users/page.tsx` - Admin user management page
- `supabase_migration_admin_users.sql` - Database migration

### Modified Files:
- `/lib/supabase.ts` - Added AdminUser interface
- `/app/admin/layout.tsx` - Added AuthGuard, logout button, and user info
- `/package.json` - Added @react-three/fiber and three dependencies

## Next Steps

1. Run the SQL migration in Supabase
2. Configure Google OAuth credentials
3. Add your email to the admin_users table
4. Test the authentication flow
5. Add other admin users through the management interface

Enjoy your secure admin authentication system! 🎉
