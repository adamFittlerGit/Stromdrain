import { NextResponse } from 'next/server';
import { supabaseClient } from '@/supabase/client';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    // Get today’s date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Fetch active habits along with today's habit instance if it exists, this won't work we will need to switch to direct sql queries in order to get this to work correctly
    // We will probably have to do a left join on the tables to get the data that we want. 
    const { data, error } = await supabaseClient
        .from('habit_type')
        .select(`
            hid,
            name,
            description,
            frequency,
            active,
            last_completed,
            goal,
            habit_instance (
                date,
                percent_completion
            )
        `)
        .eq('active', true) // Only fetch active habits
        .eq('habit_instance.date', today) // Join with today's instances

    // Handle potential errors from Supabase query
    if (error) {
        console.error("Error fetching habits:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return the habits data along with today's habit instances as JSON response
    return NextResponse.json(data);
}

export const revalidate = 0; // Avoid caching to fetch fresh data each time
