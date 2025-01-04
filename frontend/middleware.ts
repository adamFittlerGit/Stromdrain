import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabaseClient } from '@/supabase/client';

export async function middleware(request: NextRequest) {
  
  // Define the path that needs authentication
  const protectedPaths = ['/blog/new', '/stormai'];

  const isProtectedPath = protectedPaths.some(path => path === request.nextUrl.pathname); // Check if requested path is in that list .some returns true if at least one item in list equalates to true with this 

  const { data, error } = await supabaseClient.auth.getSession()

  if (isProtectedPath) {
    if (!error) {
      // Redirect to login if there's no token
      return NextResponse.redirect(new URL('/login', request.url));
    } else {
      return NextResponse.next();
    }
  }
}
