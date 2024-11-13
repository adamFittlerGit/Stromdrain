import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient } from '@/supabase/client';

export async function POST(req: NextRequest) {
  // Parse the request body
  const { name, description, frequency, active = true, goal } = await req.json();

  // Validate required fields
  if (typeof name !== 'string' || typeof description !== 'string' || typeof frequency !== 'string' || typeof goal !== 'number') {
    return NextResponse.json({ error: 'Invalid data. Ensure name, description, frequency, and goal are provided.' }, { status: 400 });
  }

  try {
    // Insert a new habit into the habit_type table
    const { data, error } = await supabaseClient
      .from('habit_type')
      .insert([
        {
          name,
          description,
          frequency,
          active,
          goal,
          last_completed: null  // Initialize with null, assuming habit hasn't been completed yet
        }
      ]);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to add habit to the database.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Habit added successfully.', data }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
