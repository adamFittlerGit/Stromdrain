import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { supabaseClient } from '@/supabase/client';

const jwtSecret = process.env.JWT_SECRET; // Add a JWT_SECRET to your .env file

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  console.log(data, error);
  // Check if the credentials match the stored values
  if (!error) {
    return NextResponse.json({ success: true, message: 'Login successful' });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 401 });
  }
}
