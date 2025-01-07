import { NextResponse } from 'next/server';
import { supabaseClient } from '@/supabase/client';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log("hello")
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
 
  if (!error) {
    return NextResponse.json({ success: true, message: 'Login successful' });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 401 });
  }
}
