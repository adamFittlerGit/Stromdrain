import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Load environment variables
  const storedUsername = process.env.USERNAME;
  const storedPassword = process.env.PASSWORD;
  const jwtSecret = process.env.JWT_SECRET; // Add a JWT_SECRET to your .env file

  // Hash the incoming password to compare with the stored hash
  const hashedPassword = CryptoJS.SHA256(storedPassword!).toString();

  // Check if the credentials match the stored values
  if (username === storedUsername && password === hashedPassword) {
    // Generate a JWT token
    const token = jwt.sign({ username }, jwtSecret!, { expiresIn: '1h' });

    // Set the JWT as an HTTP-only cookie
    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.cookies.set('auth_token', token, {
      httpOnly: false,
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
