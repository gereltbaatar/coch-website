import { supabase } from './supabase'

/**
 * Ensure default admin exists in database
 * This runs automatically and creates the admin if not exists
 */
export async function ensureDefaultAdmin(): Promise<void> {
  const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL

  if (!defaultAdminEmail) {
    console.warn('DEFAULT_ADMIN_EMAIL not configured in environment variables')
    return
  }

  try {
    // Check if default admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', defaultAdminEmail.toLowerCase())
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is fine
      console.error('Error checking for default admin:', checkError)
      return
    }

    if (existingAdmin) {
      // Admin already exists, do nothing
      return
    }

    // Create default admin
    const { error: insertError } = await supabase
      .from('admin_users')
      .insert({
        email: defaultAdminEmail.toLowerCase(),
      })

    if (insertError) {
      console.error('Error creating default admin:', insertError)
      return
    }

    console.log(`✅ Default admin created: ${defaultAdminEmail}`)
  } catch (error) {
    console.error('Error ensuring default admin:', error)
  }
}
