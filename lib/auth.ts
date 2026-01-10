'use client'

import { supabase } from './supabase'

// Check if user email is in admin whitelist
export async function checkAdminAccess(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single()

    if (error || !data) {
      return false
    }

    return true
  } catch (error) {
    console.error('Error checking admin access:', error)
    return false
  }
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Error signing in with email:', error)
    throw error
  }

  return data
}

// Sign up with email and password (for initial admin setup)
export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/admin/auth/callback`,
    }
  })

  if (error) {
    console.error('Error signing up with email:', error)
    throw error
  }

  return data
}

// Sign in with Google
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/admin/auth/callback`,
    }
  })

  if (error) {
    console.error('Error signing in with Google:', error)
    throw error
  }

  return data
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

// Get current session
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      // Session missing is expected when not logged in
      if (error.message !== 'Auth session missing!') {
        console.error('Error getting session:', error)
      }
      return null
    }
    return data.session
  } catch (error) {
    return null
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      // Session missing is expected when not logged in
      if (error.message !== 'Auth session missing!') {
        console.error('Error getting user:', error)
      }
      return null
    }
    return user
  } catch (error) {
    return null
  }
}
