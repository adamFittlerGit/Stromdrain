// app/api/updateHabits/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient } from '@/supabase/client';

export async function POST(req: NextRequest) {
  // Parse the request body
  const { hid, date, percent_completion } = await req.json();

  // Validate incoming data
  if (typeof hid !== 'number' || typeof percent_completion !== 'number' || typeof date !== 'string') {
    return NextResponse.json({ error: 'Invalid data. Ensure hid, date, and percent_completion are provided.' }, { status: 400 });
  }

  try {
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

    return NextResponse.json({ message: 'Habit updated successfully.', data }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
