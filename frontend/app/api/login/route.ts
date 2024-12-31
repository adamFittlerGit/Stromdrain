import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Load environment variables
  const storedUsername = "Stormed";
  const storedPassword = "7135";
  const jwtSecret = process.env.JWT_SECRET; // Add a JWT_SECRET to your .env file

  // Hash the incoming password to compare with the stored hash
  const hashedPassword = CryptoJS.SHA256(storedPassword!).toString();

  // Check if the credentials match the stored values
  if (username === storedUsername && password === hashedPassword) {
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
