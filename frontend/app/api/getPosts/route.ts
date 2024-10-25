import { NextResponse } from 'next/server';
import { supabaseClient } from '@/supabase/client';
// Need next repsonse to parse the data and ensure correct formatiing and parse the json

// Updated API route
export async function GET() {
    // Use the supabase client to request the data
    let { data, error } = await supabaseClient
        .from('posts')
        .select("post_id, date, title, body, tag, image_urls")
        .order('date', { ascending: false });

    // Handle the error if the request fails 
    if (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return the posts data as JSON response, we use next response ot package the data into the http request sent to the client otherwise we would have to do that ourselves
    return NextResponse.json(data);
}
