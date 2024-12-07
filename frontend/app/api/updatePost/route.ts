import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from '@/supabase/client';

export async function POST(res: NextRequest) {
  const {id, title, body} = await res.json()
  
  const { data } = await supabaseClient.rpc('update_post', {
    update_id: id,
    new_title: title, // Choose an appropriate threshold for your data
    new_body: body, // Choose the number of matches
  })

  return NextResponse.json({ data })
}