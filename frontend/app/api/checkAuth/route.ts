import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'

export async function GET(request: NextRequest) {
    const token = request.cookies.get('auth_token')?.value;

    // Define the secret from your environment variables
    const jwtSecret = process.env.JWT_SECRET;

    const encodedKey = new TextEncoder().encode(jwtSecret)

    try {
        const { payload } = await jwtVerify(token!, encodedKey, {
          algorithms: ['HS256'],
        })
  
        return NextResponse.json({ loggedIn: true })
        
    } catch (error) {
        return NextResponse.json({ loggedIn: false });
    }

}
