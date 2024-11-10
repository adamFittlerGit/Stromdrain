import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  // Define the secret from your environment variables
  const jwtSecret = process.env.JWT_SECRET;

  const encodedKey = new TextEncoder().encode(jwtSecret)

  // Define the path that needs authentication
  const protectedPath = '/new';

  if (request.nextUrl.pathname === protectedPath) {
    if (!token) {
      // Redirect to login if there's no token
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, encodedKey, {
        algorithms: ['HS256'],
      })

      if (payload.username === "Stormed") {
        return NextResponse.next();
      }
    } catch (error) {
      console.log(error)
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

}
