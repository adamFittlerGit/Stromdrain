// app/api/updateHabits/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient } from '@/supabase/client';
import { Data3DTexture } from 'three';

export async function POST(req: NextRequest) {
  // Parse the request body
  const data = await req.json();
  console.log(data)

  try {
    data.map(async (habit: any) => {
      const hid = habit.hid
      const date = habit.date
      const percent_completion = habit.percent_completion
        // Use the shared supabase client to update or insert habit_instance
      const { data, error } = await supabaseClient
          .from('habit_instance')
          .upsert(
            {
              hid,
              date,
              percent_completion
            },
            { onConflict: 'hid,date' }  // Updated to comma-separated string
          );

        if (error) {
          console.error('Database error:', error);
          return NextResponse.json({ error: 'Database update failed.' }, { status: 500 });
      }
    })
    
    return NextResponse.json({ message: 'Habit updated successfully.', data }, { status: 200 });

  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
