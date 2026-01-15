import { createClient as createBrowserClient } from '../supabase/client'
import { createClient as createServerClient } from '../supabase/server'

/**
 * Sign in with email and password
 */
export async function signIn(email, password, isServer = false) {
    try {
        const supabase = isServer ? await createServerClient() : createBrowserClient()

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error signing in:', error)
        return { data: null, error }
    }
}

/**
 * Sign out
 */
export async function signOut(isServer = false) {
    try {
        const supabase = isServer ? await createServerClient() : createBrowserClient()

        const { error } = await supabase.auth.signOut()

        if (error) throw error
        return { error: null }
    } catch (error) {
        console.error('Error signing out:', error)
        return { error }
    }
}

/**
 * Get current session
 */
export async function getSession(isServer = false) {
    try {
        const supabase = isServer ? await createServerClient() : createBrowserClient()

        const { data, error } = await supabase.auth.getSession()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error getting session:', error)
        return { data: null, error }
    }
}

/**
 * Get current user
 */
export async function getUser(isServer = false) {
    try {
        const supabase = isServer ? await createServerClient() : createBrowserClient()

        const { data, error } = await supabase.auth.getUser()

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error getting user:', error)
        return { data: null, error }
    }
}

/**
 * Sign up new user (admin only - should be done via Supabase dashboard)
 */
export async function signUp(email, password, isServer = false) {
    try {
        const supabase = isServer ? await createServerClient() : createBrowserClient()

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error signing up:', error)
        return { data: null, error }
    }
}
