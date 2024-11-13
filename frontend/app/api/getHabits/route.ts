import { NextResponse } from 'next/server';
import { supabaseClient } from '@/supabase/client';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {

    const { data, error } = await supabaseClient.rpc('create_daily_habit_instances')

    // Handle potential errors from Supabase query
    if (error) {
        console.error("Error fetching habits:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
        // Return the habits data along with today's habit instances as JSON response
        const { data, error } = await supabaseClient.rpc('get_habit_details')
        
        if (error) {
            console.error("Error fetching habits:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    }

    
}

export const revalidate = 0; // Avoid caching to fetch fresh data each time
