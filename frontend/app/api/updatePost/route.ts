import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from '@/supabase/client';

export async function POST(res: NextRequest) {
    const {id, title, body} = await res.json()
    console.log(id, title, body)

    try {
        const { data, error } = await supabaseClient.rpc('update_post', {
            update_id: id,
            new_title: title, 
            new_body: body, 
        })
        console.log(error)
        console.log(data)

        return NextResponse.json({ status: 'updated successfully'})

    } catch (error) {
            return NextResponse.json({ status: 'Update failed'})
    }
}