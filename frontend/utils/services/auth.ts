'use server'
import { createClient } from '@/utils/supabase/server'
// Function to check call the backend to check if the user is authenticated, this could probably be moved to server side rendering
export const checkAuth = async () => {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.getUser()

  return !error && !!data;
}