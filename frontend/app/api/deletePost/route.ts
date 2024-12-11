import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from '@/supabase/client';

export async function POST(res: NextRequest) {
    const {id} = await res.json()

    try {
        const { data, error } = await supabaseClient.rpc('delete_post', {
            delete_id: id
        })
        console.log(error)
        console.log(data)

        return NextResponse.json({ status: 'deleted successfully'})

    } catch (error) {
            return NextResponse.json({ status: 'Deletion failed'})
    }
}