import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
    
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    if (error) {
        return NextResponse.json({ loggedIn: false })
        
    }  else{
        return NextResponse.json({ loggedIn: true });
    }

}