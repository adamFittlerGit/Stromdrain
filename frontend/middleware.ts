import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  // Define the secret from your environment variables
  const jwtSecret = process.env.JWT_SECRET;

  const encodedKey = new TextEncoder().encode(jwtSecret)

  // Define the path that needs authentication
  const protectedPaths = ['/blog/new', '/stormai', '/habits'];

  const isProtectedPath = protectedPaths.some(path => path === request.nextUrl.pathname); // Check if requested path is in that list .some returns true if at least one item in list equalates to true with this 


  if (isProtectedPath) {
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
