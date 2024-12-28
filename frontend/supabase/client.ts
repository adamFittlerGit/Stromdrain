import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Now you can access your environment variables using process.env
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Update this to not use direct keys on the frontend, we need to move the backend logic to an api route on the api folder in order to make this possible, the frontend will not have access to these environment vairables
export const supabaseClient = createClient(supabaseUrl, supabaseKey)