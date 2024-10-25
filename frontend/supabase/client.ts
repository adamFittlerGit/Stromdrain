import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Now you can access your environment variables using process.env
const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_MASTER_KEY!;

// Update this to not use direct keys on the frontend, we need to move the backend logic to an api route on the api folder in order to make this possible, the frontend will not have access to these environment vairables
export const supabaseClient = createClient("https://jzlzzjcinqypqardzzfq.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6bHp6amNpbnF5cHFhcmR6emZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTYwMTk1NSwiZXhwIjoyMDQ1MTc3OTU1fQ.E_Rl9yfXiZPWXx-v5PKy8nSq1fsDilwc8EijkIqwGN4")