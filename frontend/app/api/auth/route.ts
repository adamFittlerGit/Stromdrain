import { supabaseClient } from '@/supabase/client';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    
    const { data, error } = await supabaseClient.auth.getSession()

    if (!error) {
        return NextResponse.json({ loggedIn: true })
        
    }  else{
        return NextResponse.json({ loggedIn: false });
    }

}
