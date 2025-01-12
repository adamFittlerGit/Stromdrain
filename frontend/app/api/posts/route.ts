import { NextResponse } from 'next/server';
import { supabaseClient } from '@/utils/supabase/client';
import { NextRequest } from 'next/server';

// Updated API route
export async function POST(request: NextRequest) {
    const { tagType: tag, start: start, end: end } = await request.json();

    let { data, error } = await supabaseClient.rpc('get_posts', {tag: tag, start: 1, number: 10 }) // will implment properly ylater but for now will just leave this here

    console.log(`data: ${data}`);
    console.log(`error: ${error}`);
     // Use the supabase client to request the data
     
    if (tag === "all") {
        // Fetch all posts without filtering by tag
        ({ data, error } = await supabaseClient
            .from('posts')
            .select("post_id, date, title, body, tag, image_urls")
            .order('post_order', { ascending: false })
            .range(start, end)
        );
    } else if (tag === "software-engineering") {
        // Fetch posts filtered by the specific tag wrap it in () to ensure it does an assignment expression not a block
        ({ data, error } = await supabaseClient
            .from('posts')
            .select("post_id, date, title, body, tag, image_urls")
            .order('post_order', { ascending: false })
            .in('tag', ['frontend-learning', 'backend-learning', 'cloud-learning', 'machine-learning', 'azure-data-engineer'])
            .range(start, end)
        );
    } else {
        // Fetch posts filtered by the specific tag wrap it in () to ensure it does an assignment expression not a block
        ({ data, error } = await supabaseClient
            .from('posts')
            .select("post_id, date, title, body, tag, image_urls")
            .order('post_order', { ascending: false })
            .eq('tag', tag)
            .range(start, end)
        );
    }

    // Handle potential error from Supabase query
    if (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return the posts data as JSON response
    return NextResponse.json(data);
}

export const revalidate = 0; // to avoid caching and get new data each time
