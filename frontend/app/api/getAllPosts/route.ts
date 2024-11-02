import { NextResponse } from 'next/server';
import { supabaseClient } from '@/supabase/client';
import { NextRequest } from 'next/server';

// Updated API route
export async function POST(request: NextRequest) {
    const { tagType: tag } = await request.json();

    // Use the supabase client to request the data
    let data, error;

    if (tag === "all") {
        // Fetch all posts without filtering by tag
        ({ data, error } = await supabaseClient
            .from('posts')
            .select("post_id, date, title, body, tag, image_urls")
            .order('date', { ascending: false })
        );
    } else {
        // Fetch posts filtered by the specific tag wrap it in () to ensure it does an assignment expression not a block
        ({ data, error } = await supabaseClient
            .from('posts')
            .select("post_id, date, title, body, tag, image_urls")
            .order('date', { ascending: false })
            .eq('tag', tag)
        );
    }

    // Handle potential error from Supabase query
    if (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(data);
    // Return the posts data as JSON response
    return NextResponse.json(data);
}

export const revalidate = 0; // to avoid caching and get new data each time
