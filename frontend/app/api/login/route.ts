import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { supabaseClient } from '@/supabase/client';

const jwtSecret = process.env.JWT_SECRET; // Add a JWT_SECRET to your .env file

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Get the hashed pasword for that user
  const { data, error } = await supabaseClient
    .from('users')
    .select('password')
    .eq('name', username);
    
    console.log(username)
    console.log(data);

  if (!data || data.length === 0) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }
  
  const hashedPassword = data[0].password;

  // Check if the credentials match the stored values
  if (password === hashedPassword) {
    // Generate a JWT token
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(jwtSecret));

    // Set the JWT as an HTTP-only cookie
    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Helps mitigate CSRF
      maxAge: 60 * 60, // 1 hour
      path: '/', // Cookie available site-wide
    });
    return response;
  } else {
    return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 401 });
  }
}
