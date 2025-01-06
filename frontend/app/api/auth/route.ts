import { supabaseClient } from '@/supabase/client';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    
    const { data, error } = await supabaseClient.auth.getSession()
    console.log(`supabase.auth:${data.session}`)
    if (data.session === null) {
        return NextResponse.json({ loggedIn: false })
        
    }  else{
        return NextResponse.json({ loggedIn: true });
    }

}
